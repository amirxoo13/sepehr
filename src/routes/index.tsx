import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Glyph } from "@/components/chart/glyphs";
import { NatalWheel } from "@/components/chart/natal-wheel";
import { Constellation } from "@/components/decor/constellations";
import {
  IconArmillary,
  IconArrowLead,
  IconBiWheel,
  IconEcliptic,
  IconMidpoint,
  IconSextant,
  IconSolarReturn,
  IconSpiral,
  IconTimeGlass,
  IconTransit,
  IconWheel,
} from "@/components/icons/astro-icons";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import { computeNatal, EINSTEIN } from "@/lib/astro/chart";
import { PLANET_COLOR } from "@/lib/astro/chart-theme";
import type { ChartMode } from "@/lib/astro/constants";
import { isRtl, t, tx } from "@/lib/astro/i18n";
import { planetId } from "@/lib/astro/math";
import type { ChartResult } from "@/lib/astro/types";

export const Route = createFileRoute("/")({ component: Home });

type ModeIcon = typeof IconWheel;

const MODES: {
  mode: ChartMode;
  blurb: "natalD" | "transitD" | "synastryD" | "compositeD" | "solarD" | "progressedD";
  icon: ModeIcon;
}[] = [
  { mode: "natal", blurb: "natalD", icon: IconWheel },
  { mode: "transit", blurb: "transitD", icon: IconTransit },
  { mode: "synastry", blurb: "synastryD", icon: IconBiWheel },
  { mode: "composite", blurb: "compositeD", icon: IconMidpoint },
  { mode: "solar_return", blurb: "solarD", icon: IconSolarReturn },
  { mode: "progressed", blurb: "progressedD", icon: IconSpiral },
];

function Home() {
  const { locale } = useLocale();
  const [demo, setDemo] = useState<ChartResult | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void computeNatal(EINSTEIN)
      .then((chart) => {
        if (!cancelled) setDemo(chart);
      })
      .catch((e: unknown) => {
        if (!cancelled) setDemoError(e instanceof Error ? e.message : t(locale, "error"));
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const sun = demo?.positions.find((p) => planetId(p) === "SUN");
  const moon = demo?.positions.find((p) => planetId(p) === "MOON");

  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Two constellations anchor the hero corners — real star
            positions, so the page is decorated with the sky itself
            rather than with generic sparkles. */}
        <Constellation
          figure="ursaMajor"
          className="pointer-events-none absolute -top-4 start-[-4%] hidden h-40 w-64 opacity-[0.22] lg:block"
        />
        <Constellation
          figure="orion"
          className="pointer-events-none absolute bottom-4 end-[-3%] hidden h-56 w-48 opacity-[0.18] xl:block"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-[0.2em] text-gold uppercase">
              <IconEcliptic size={13} />
              {t(locale, "subtitle")}
            </p>

            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
              <span className="foil">{t(locale, "app")}</span>
              <span className="mt-3 block font-body text-xl font-normal text-muted sm:text-2xl">
                {t(locale, "tagline")}
              </span>
            </h1>

            <div className="rule-fade my-7 max-w-sm" />

            <p className="max-w-xl text-base leading-relaxed text-muted">{t(locale, "heroLead")}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/chart">
                  {t(locale, "start")}
                  <IconArrowLead size={17} rtl={isRtl(locale)} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/now">
                  <IconSextant size={17} />
                  {t(locale, "skyNow")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Demo wheel, mounted like an instrument on a plate */}
          <div className="plate panel relative p-3">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--color-gold) 16%, transparent), transparent 70%)",
              }}
            />
            {demo ? (
              <>
                <NatalWheel chart={demo} locale={locale} compact />
                <p className="px-2 pt-1 text-center text-xs text-muted">
                  {t(locale, "demoCaption")}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 px-1 pb-1 font-mono text-xs">
                  <LiveStat
                    label="ASC"
                    color="var(--color-gold)"
                    value={
                      <>
                        {Math.floor(demo.ascendant % 30)}°
                        <Glyph name={signGlyph(demo.ascendant)} size={14} />
                      </>
                    }
                  />
                  {sun && (
                    <LiveStat
                      label={t(locale, "sun")}
                      color={PLANET_COLOR.SUN}
                      value={
                        <>
                          {Math.floor(sun.degree_in_sign)}°
                          <Glyph name={String(sun.sign)} size={14} />
                          <span>{tx(locale, String(sun.sign))}</span>
                        </>
                      }
                    />
                  )}
                  {moon && (
                    <LiveStat
                      label={t(locale, "moon")}
                      color={PLANET_COLOR.MOON}
                      value={
                        <>
                          {Math.floor(moon.degree_in_sign)}°
                          <Glyph name={String(moon.sign)} size={14} />
                          <span>{tx(locale, String(moon.sign))}</span>
                        </>
                      }
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-80 items-center justify-center gap-3 p-8 text-sm text-muted">
                {!demoError && (
                  <IconArmillary size={18} className="animate-spin text-gold [animation-duration:6s]" />
                )}
                {demoError ?? t(locale, "loadEngine")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Three pillars ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <Feature
            icon={IconArmillary}
            title={t(locale, "featureNatal")}
            body={t(locale, "featureNatalD")}
          />
          <Feature
            icon={IconWheel}
            title={t(locale, "featureWheel")}
            body={t(locale, "featureWheelD")}
          />
          <Feature
            icon={IconTimeGlass}
            title={t(locale, "featureTime")}
            body={t(locale, "featureTimeD")}
          />
        </div>
      </section>

      {/* ── Six calculation modes ───────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-4 py-12">
        <Constellation
          figure="cassiopeia"
          className="pointer-events-none absolute end-4 top-6 hidden h-20 w-40 opacity-20 md:block"
        />
        <SectionHeading>{t(locale, "modesTitle")}</SectionHeading>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map(({ mode, blurb, icon: Icon }) => (
            <Link
              key={mode}
              to="/chart"
              search={{ mode }}
              className="panel group relative overflow-hidden p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* gold wash that lights up on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-gold) 13%, transparent), transparent 70%)",
                }}
              />
              <span className="relative flex items-start gap-3">
                <Icon
                  size={26}
                  className="mt-0.5 shrink-0 text-gold/80 transition-colors group-hover:text-gold"
                />
                <span>
                  <span className="block text-base font-medium">{t(locale, mode)}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    {t(locale, blurb)}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Provenance ──────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20">
        <Constellation
          figure="lyra"
          className="pointer-events-none absolute start-2 bottom-2 hidden h-24 w-24 opacity-20 md:block"
        />
        <SectionHeading>{t(locale, "credibility")}</SectionHeading>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {(["cred1", "cred2", "cred3", "cred4"] as const).map((key, i) => (
            <li
              key={key}
              className="panel flex items-start gap-3 px-5 py-4 text-sm leading-relaxed text-muted"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_var(--color-gold)]" />
              <span>{t(locale, key)}</span>
              <span className="sr-only">{i + 1}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-display text-3xl tracking-tight whitespace-nowrap">{children}</h2>
      <span className="rule-fade flex-1" />
    </div>
  );
}

function signGlyph(lon: number) {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  ];
  return signs[Math.floor((((lon % 360) + 360) % 360) / 30)]!;
}

function LiveStat({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface/40 px-2 py-2 text-center">
      <p className="text-[0.65rem] tracking-wider text-subtle uppercase">{label}</p>
      <div
        className="mt-1 flex flex-wrap items-center justify-center gap-1"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: ModeIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="panel flex flex-col gap-3 p-5">
      <Icon size={28} className="text-gold/85" />
      <h2 className="text-base font-medium">{title}</h2>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
