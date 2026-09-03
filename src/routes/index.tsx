import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Compass, Orbit, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { NatalWheel } from "@/components/chart/natal-wheel";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { computeNatal, EINSTEIN } from "@/lib/astro/chart";
import type { ChartMode } from "@/lib/astro/constants";
import { SIGN_FA, SIGN_GLYPH, t } from "@/lib/astro/i18n";
import { planetId } from "@/lib/astro/math";
import type { ChartResult } from "@/lib/astro/types";

export const Route = createFileRoute("/")({ component: Home });

const MODES: { mode: ChartMode; blurb: "natalD" | "transitD" | "synastryD" | "compositeD" | "solarD" | "progressedD" }[] = [
  { mode: "natal", blurb: "natalD" },
  { mode: "transit", blurb: "transitD" },
  { mode: "synastry", blurb: "synastryD" },
  { mode: "composite", blurb: "compositeD" },
  { mode: "solar_return", blurb: "solarD" },
  { mode: "progressed", blurb: "progressedD" },
];

function Home() {
  const { locale } = useLocale();
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;
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
    <main className="starfield">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">{t(locale, "subtitle")}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-6xl">
            {t(locale, "app")}
            <span className="mt-2 block text-2xl text-muted sm:text-3xl">{t(locale, "tagline")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{t(locale, "heroLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/chart">
                {t(locale, "start")}
                <Arrow className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/now">{t(locale, "skyNow")}</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-chart-paper p-2 shadow-border">
          {demo ? (
            <>
              <NatalWheel chart={demo} locale={locale} compact />
              <p className="px-2 pb-2 text-center text-xs text-chart-ink/55">{t(locale, "demoCaption")}</p>
              <div className="grid grid-cols-3 gap-2 px-2 pb-3 font-mono text-xs text-chart-ink">
                <LiveStat
                  label="ASC"
                  value={`${Math.floor(demo.ascendant % 30)}° ${signGlyph(demo.ascendant)}`}
                />
                {sun && (
                  <LiveStat
                    label={locale === "fa" ? "خورشید" : "Sun"}
                    value={`${Math.floor(sun.degree_in_sign)}° ${locale === "fa" ? SIGN_FA[String(sun.sign)] : sun.sign}`}
                  />
                )}
                {moon && (
                  <LiveStat
                    label={locale === "fa" ? "ماه" : "Moon"}
                    value={`${Math.floor(moon.degree_in_sign)}° ${locale === "fa" ? SIGN_FA[String(moon.sign)] : moon.sign}`}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex min-h-80 items-center justify-center p-8 text-sm text-chart-ink/60">
              {demoError ?? t(locale, "loadEngine")}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <Feature icon={Orbit} title={t(locale, "featureNatal")} body={t(locale, "featureNatalD")} />
          <Feature icon={Compass} title={t(locale, "featureWheel")} body={t(locale, "featureWheelD")} />
          <Feature icon={Timer} title={t(locale, "featureTime")} body={t(locale, "featureTimeD")} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl tracking-tight">{t(locale, "modesTitle")}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((item) => (
            <Link
              key={item.mode}
              to="/chart"
              search={{ mode: item.mode }}
              className="rounded-xl bg-surface p-5 shadow-border transition-colors duration-150 hover:bg-surface-2"
            >
              <h3 className="text-base font-medium">{t(locale, item.mode)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(locale, item.blurb)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-2xl tracking-tight">{t(locale, "credibility")}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {(["cred1", "cred2", "cred3", "cred4"] as const).map((key) => (
            <li key={key} className="rounded-xl bg-surface px-5 py-4 text-sm text-muted shadow-border">
              {t(locale, key)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function signGlyph(lon: number) {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const s = signs[Math.floor((((lon % 360) + 360) % 360) / 30)]!;
  return SIGN_GLYPH[s] ?? s;
}

function LiveStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-chart-ink/5 px-2 py-2 text-center">
      <p className="text-chart-ink/50">{label}</p>
      <p className="mt-0.5 text-chart-ink">{value}</p>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Orbit;
  title: string;
  body: string;
}) {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <Icon className="size-5 text-muted" strokeWidth={1.5} />
      <h2 className="text-base font-medium">{title}</h2>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </Card>
  );
}
