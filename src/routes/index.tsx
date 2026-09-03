import { createFileRoute, Link } from "@tanstack/react-router";
import { EmptyWheel } from "@/components/chart/natal-wheel";
import { Constellation } from "@/components/decor/constellations";
import {
  IconArmillary,
  IconArrowLead,
  IconBiWheel,
  IconEcliptic,
  IconGrid,
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
import type { ChartMode } from "@/lib/astro/constants";
import { isRtl, t } from "@/lib/astro/i18n";

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

  return (
    <main>
      <section className="relative">
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
                <Link to="/numerology">
                  <IconGrid size={17} />
                  {t(locale, "numbers")}
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

          <div className="plate panel relative p-3">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--color-gold) 16%, transparent), transparent 70%)",
              }}
            />
            <EmptyWheel compact />
            <p className="px-2 pt-1 pb-2 text-center text-xs text-muted">{t(locale, "wheelCaption")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          <Feature
            icon={IconGrid}
            title={t(locale, "featureNumbers")}
            body={t(locale, "featureNumbersD")}
          />
        </div>
      </section>

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
