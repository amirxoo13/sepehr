import { useEffect } from "react";
import { buildReport, reportStrings, type ReportBlock } from "@/lib/astro/report";
import { PLANET_NAME, t, tx, type Locale } from "@/lib/astro/i18n";
import { HOUSE_UI_LEAD } from "@/lib/astro/house-copy";
import { useLocale } from "@/components/layout/locale-provider";
import { MAIN_PLANET_IDS } from "@/lib/astro/constants";
import { PLANET_COLOR, SIGN_COLOR } from "@/lib/astro/chart-theme";
import { trueAspectOrb } from "@/lib/astro/math";
import type { ChartResult } from "@/lib/astro/types";
import { cn } from "@/lib/utils";
import { Glyph } from "@/components/chart/glyphs";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Dossier({
  block,
  locale,
  active,
  onSelect,
}: {
  block: ReportBlock;
  locale: Locale;
  active?: boolean;
  onSelect?: (id: string) => void;
}) {
  const pid =
    block.planetId ??
    ((MAIN_PLANET_IDS as readonly string[]).includes(block.id) ? block.id : undefined);
  const htmlId = pid && block.id === pid ? `planet-${pid}` : block.id;
  return (
    <article
      id={htmlId}
      className={cn(
        "scroll-mt-28 rounded-xl bg-surface p-5 shadow-border",
        active && "ring-1 ring-fg/40",
      )}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs tracking-wide text-subtle">{tx(locale, block.kicker)}</p>
          <h3 className="flex items-center gap-2 font-display text-xl tracking-tight">
            {pid ? <Glyph name={pid} size={20} color={PLANET_COLOR[pid]} /> : null}
            {pid && onSelect ? (
              <button
                type="button"
                className="text-start hover:text-muted"
                onClick={() => onSelect(pid)}
              >
                {tx(locale, block.title)}
              </button>
            ) : (
              tx(locale, block.title)
            )}
          </h3>
        </div>
        {block.meta ? <p className="font-mono text-xs text-muted tabular-nums">{block.meta}</p> : null}
      </header>
      <div className="mt-3 flex max-w-prose flex-col gap-3 text-[15px] leading-7 text-pretty">
        {block.body.map((p, i) => (
          <p key={`${block.id}-${i}`} className="text-fg/90">
            {tx(locale, p)}
          </p>
        ))}
      </div>
      {block.aspects && block.aspects.length > 0 ? (
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-xs tracking-wide text-subtle">
            {tx(locale, "Aspects of this planet")}
          </p>
          <ul className="flex flex-col gap-3">
            {block.aspects.map((a) => (
              <li key={a.id} className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto] sm:items-start">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-start font-mono text-xs text-fg"
                  onClick={() => {
                    onSelect?.(a.other);
                    scrollToId(`planet-${a.other}`);
                  }}
                >
                  <Glyph name={a.aspect} size={13} />
                  <Glyph name={a.other} size={13} color={PLANET_COLOR[a.other]} />
                  {tx(locale, a.title)}
                </button>
                <p className="text-sm leading-relaxed text-muted">{tx(locale, a.body)}</p>
                <span className="font-mono text-xs text-subtle tabular-nums">{a.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function AspectGrid({ chart, locale }: { chart: ChartResult; locale: Locale }) {
  const ids = [...MAIN_PLANET_IDS];
  const byPair = new Map<string, { name: string; orb: number }>();
  for (const a of chart.aspects) {
    const key = [a.planet1, a.planet2].map((x) => x.toUpperCase()).sort().join("-");
    byPair.set(key, { name: String(a.aspect_name), orb: trueAspectOrb(a) });
  }
  return (
    <div className="overflow-x-auto rounded-xl bg-surface p-4 shadow-border">
      <table className="w-full min-w-[420px] border-collapse text-center font-mono text-xs">
        <thead>
          <tr>
            <th className="p-1" />
            {ids.map((id) => (
              <th key={id} className="p-1 font-medium text-muted">
                <Glyph name={id} size={14} color={PLANET_COLOR[id]} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ids.map((row, ri) => (
            <tr key={row}>
              <th className="p-1 text-start font-medium text-muted">
                <Glyph name={row} size={14} color={PLANET_COLOR[row]} />
              </th>
              {ids.map((col, ci) => {
                if (ci <= ri) {
                  return (
                    <td key={col} className="p-1 text-subtle">
                      {ci === ri ? "·" : ""}
                    </td>
                  );
                }
                const key = [row, col].sort().join("-");
                const hit = byPair.get(key);
                if (!hit) return <td key={col} className="p-1" />;
                const tight = hit.orb < 2;
                return (
                  <td
                    key={col}
                    className={cn("p-1", tight ? "text-fg" : "text-muted")}
                    title={`${row} ${hit.name} ${col} (${hit.orb.toFixed(2)}°)`}
                  >
                    <Glyph name={hit.name} size={13} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-subtle">
        {tx(locale, "Aspect grid among the ten classical planets. Strong glyph = orb under 2°.")}
      </p>
    </div>
  );
}

function Bars({
  items,
}: {
  items: { key: string; label: string; n: number; color: string }[];
}) {
  const max = Math.max(1, ...items.map((i) => i.n));
  return (
    <ul className="flex flex-col gap-2">
      {items.map((i) => (
        <li key={i.key} className="flex items-center gap-3 text-xs">
          <span className="w-16 text-muted">{i.label}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <span
              className="block h-full rounded-full"
              style={{ width: `${(i.n / max) * 100}%`, background: i.color }}
            />
          </span>
          <span className="w-6 tabular-nums text-muted">{i.n}</span>
        </li>
      ))}
    </ul>
  );
}

function HouseLordTable({
  report,
  locale,
}: {
  report: ReturnType<typeof buildReport>;
  locale: Locale;
}) {
  const dig = (d: string) => t(locale, d as "domicile" | "exaltation" | "detriment" | "fall" | "peregrine");
  return (
    <div className="overflow-x-auto rounded-xl bg-surface p-4 shadow-border">
      {(report.houseIntro ?? []).map((p) => (
        <p key={p.slice(0, 48)} className="mb-3 max-w-prose text-sm leading-relaxed text-muted">
          {tx(locale, p)}
        </p>
      ))}
      <table className="w-full min-w-[520px] text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-border text-start">
            <th className="py-2 font-medium">{tx(locale, "House")}</th>
            <th className="py-2 font-medium">{tx(locale, "Cusp")}</th>
            <th className="py-2 font-medium">{tx(locale, "Lord")}</th>
            <th className="py-2 font-medium">{tx(locale, "Lord sits")}</th>
            <th className="py-2 font-medium">{t(locale, "dignity")}</th>
          </tr>
        </thead>
        <tbody>
          {report.houseLords.map((h) => (
            <tr key={h.house} className="border-b border-border/60">
              <td className="py-2.5 tabular-nums">
                <a href={`#H${h.house}`} className="text-fg hover:text-muted" onClick={(e) => { e.preventDefault(); scrollToId(`H${h.house}`); }}>
                  {h.house}
                </a>
              </td>
              <td className="py-2.5 font-mono text-xs">
                <span className="inline-flex items-center gap-1">
                  <Glyph name={h.cuspSign} size={14} color={SIGN_COLOR[h.cuspSign]} />
                  {tx(locale, h.cuspSign)}
                </span>
              </td>
              <td className="py-2.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-1"
                  onClick={() => scrollToId(`planet-${h.ruler}`)}
                >
                  <Glyph name={h.ruler} size={14} color={PLANET_COLOR[h.ruler]} />
                  {tx(locale, PLANET_NAME[h.ruler] ?? h.ruler)}
                </button>
              </td>
              <td className="py-2.5 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                  <Glyph name={h.rulerSign} size={14} color={SIGN_COLOR[h.rulerSign]} />
                  {tx(locale, h.rulerSign)}
                  {h.rulerHouse ? ` · ${tx(locale, "H")}${h.rulerHouse}` : ""}
                </span>
              </td>
              <td className="py-2.5 text-xs text-subtle">{dig(h.dignity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChartReportView({
  chart,
  locale,
  selectedPlanet,
  onSelectPlanet,
}: {
  chart: ChartResult;
  locale: Locale;
  selectedPlanet?: string | null;
  onSelectPlanet?: (id: string) => void;
}) {
  const report = buildReport(chart, locale);
  const analysis = report.analysis;
  const el = analysis.counts.elements;
  const md = analysis.counts.modalities;
  const { ensure } = useLocale();
  useEffect(() => {
    void ensure([...reportStrings(report), HOUSE_UI_LEAD]);
    // report is rebuilt each render; key off the chart identity instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, ensure, chart.julianDay, chart.mode]);

  const toc: { id: string; label: string }[] = [
    { id: "section-portrait", label: tx(locale, "Portrait") },
    { id: "section-big", label: tx(locale, "Big three") },
    { id: "section-planets", label: t(locale, "planets") },
    { id: "section-houses", label: t(locale, "houses") },
    { id: "section-aspects", label: t(locale, "aspects") },
    { id: "section-pattern", label: tx(locale, "Pattern") },
  ];

  return (
    <div className="flex flex-col gap-10">
      <nav className="sticky top-14 z-20 -mx-1 overflow-x-auto bg-bg/92 px-1 py-2">
        <ul className="flex min-w-max gap-1">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="min-h-11 rounded-md px-3 text-sm text-muted hover:text-fg"
                onClick={() => scrollToId(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section id="section-portrait" className="scroll-mt-28 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl tracking-tight">
            {tx(locale, "Portrait of this map")}
          </h2>
          <p className="text-xs text-subtle">{tx(locale, report.frame)}</p>
          <div className="flex max-w-prose flex-col gap-3 text-sm leading-relaxed text-pretty">
            {report.portrait.map((p) => (
              <p key={p.slice(0, 48)}>{tx(locale, p)}</p>
            ))}
          </div>
        </div>
        <aside className="flex flex-col gap-5 rounded-xl bg-surface p-4 shadow-border">
          <div>
            <p className="mb-2 text-xs text-subtle">{t(locale, "elements")}</p>
            <Bars
              items={[
                { key: "FIRE", label: t(locale, "fire"), n: el.FIRE, color: "var(--fire)" },
                { key: "EARTH", label: t(locale, "earth"), n: el.EARTH, color: "var(--earth)" },
                { key: "AIR", label: t(locale, "air"), n: el.AIR, color: "var(--air)" },
                { key: "WATER", label: t(locale, "water"), n: el.WATER, color: "var(--water)" },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-xs text-subtle">{tx(locale, "Mode")}</p>
            <Bars
              items={[
                { key: "C", label: tx(locale, "Cardinal"), n: md.CARDINAL, color: "var(--fg)" },
                { key: "F", label: tx(locale, "Fixed"), n: md.FIXED, color: "var(--muted)" },
                { key: "M", label: tx(locale, "Mutable"), n: md.MUTABLE, color: "var(--subtle)" },
              ]}
            />
          </div>
          <p className="text-xs text-muted">
            {tx(locale, `${analysis.sect} chart · ${analysis.lunarPhase.name.replace("_", " ")} Moon`)}
          </p>
        </aside>
      </section>

      <section id="section-big" className="scroll-mt-28 flex flex-col gap-4">
        <h2 className="font-display text-xl tracking-tight">
          {tx(locale, "The big three")}
        </h2>
        {report.bigThree.map((b) => (
          <Dossier
            key={b.id}
            block={b}
            locale={locale}
            active={selectedPlanet === b.planetId}
            onSelect={onSelectPlanet}
          />
        ))}
        <Dossier
          block={report.ruler}
          locale={locale}
          active={selectedPlanet === report.ruler.planetId}
          onSelect={onSelectPlanet}
        />
      </section>

      <section id="section-planets" className="scroll-mt-28 flex flex-col gap-4">
        <h2 className="font-display text-xl tracking-tight">{t(locale, "planets")}</h2>
        <p className="max-w-prose text-sm text-muted">
          {tx(
            locale,
            "Each dossier is keyed off this birth’s computed longitude: the planet’s function, sign, house, Ptolemaic dignity, retrograde, combustion, houses it rules, and every major aspect.",
          )}
        </p>
        {report.planets.map((b) => (
          <Dossier
            key={b.id}
            block={b}
            locale={locale}
            active={selectedPlanet === b.planetId}
            onSelect={onSelectPlanet}
          />
        ))}
      </section>

      <section id="section-houses" className="scroll-mt-28 flex flex-col gap-4">
        <h2 className="font-display text-xl tracking-tight">{t(locale, "houses")}</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          {tx(locale, HOUSE_UI_LEAD)}
        </p>
        <HouseLordTable report={report} locale={locale} />
        {report.houses.map((b) => (
          <Dossier key={b.id} block={b} locale={locale} />
        ))}
      </section>

      <section id="section-aspects" className="scroll-mt-28 flex flex-col gap-4">
        <h2 className="font-display text-xl tracking-tight">{t(locale, "aspects")}</h2>
        <AspectGrid chart={chart} locale={locale} />
        <p className="text-sm text-muted">
          {tx(locale, "Tightest aspects — higher weight in the reading.")}
        </p>
        {report.aspects.map((b) => (
          <Dossier key={b.id} block={b} locale={locale} />
        ))}
      </section>

      {report.pattern.length > 0 && (
        <section id="section-pattern" className="scroll-mt-28 flex flex-col gap-4">
          <h2 className="font-display text-xl tracking-tight">
            {tx(locale, "Overall pattern")}
          </h2>
          {report.pattern.map((b) => (
            <Dossier key={b.id} block={b} locale={locale} />
          ))}
        </section>
      )}

      {report.extra.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl tracking-tight">
            {tx(locale, "Further points")}
          </h2>
          {report.extra.map((b) => (
            <Dossier key={b.id} block={b} locale={locale} />
          ))}
        </section>
      )}

      <p className="max-w-prose text-xs leading-relaxed text-subtle">
        {tx(
          locale,
          "Traditional Western tropical interpretation, not empirical science and not medical, legal or financial advice. Every paragraph is keyed off this chart’s computed longitudes — sign, house, aspect, sect, lunar phase, chart ruler and cusp lords. Sources: Ptolemy, Lilly, and standard CAE correspondences.",
        )}
      </p>
    </div>
  );
}
