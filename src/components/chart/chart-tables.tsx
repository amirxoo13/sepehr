import { ASPECT_COLOR, PLANET_COLOR } from "@/lib/astro/chart-theme";
import { type ElementName, type ModalityName } from "@/lib/astro/constants";
import { ASPECT_GLYPH, PLANET_GLYPH, type Locale } from "@/lib/astro/i18n";
import type { ChartResult } from "@/lib/astro/types";
import {
  angleBodies,
  degreeStripItems,
  elementModalityGrid,
  findWheelAspects,
  GRID_IDS,
  wheelBodies,
} from "@/lib/astro/wheel-data";
import { cn } from "@/lib/utils";

const EL_LABEL: Record<ElementName, { fa: string; en: string; key: string }> = {
  FIRE: { fa: "آتش", en: "FIR", key: "FIR" },
  EARTH: { fa: "خاک", en: "EAR", key: "EAR" },
  AIR: { fa: "هوا", en: "AIR", key: "AIR" },
  WATER: { fa: "آب", en: "WAT", key: "WAT" },
};

const MD_LABEL: Record<ModalityName, { fa: string; en: string }> = {
  CARDINAL: { fa: "کاردینال", en: "CAR" },
  FIXED: { fa: "ثابت", en: "FIX" },
  MUTABLE: { fa: "متغیر", en: "MUT" },
};

function gridBodies(chart: ChartResult) {
  const planets = wheelBodies(chart).filter((b) => b.id !== "SOUTH_NODE" && b.id !== "FORTUNE");
  const angles = angleBodies(chart).filter((b) => b.id === "ASC" || b.id === "MC");
  const all = [...planets, ...angles];
  return GRID_IDS.map((id) => all.find((b) => b.id === id)).filter((b): b is NonNullable<typeof b> => Boolean(b));
}

export function AspectTriangle({
  chart,
  locale,
  onSelect,
}: {
  chart: ChartResult;
  locale: Locale;
  onSelect?: (id: string) => void;
}) {
  const bodies = gridBodies(chart);
  const aspects = findWheelAspects(bodies);
  const byPair = new Map<string, (typeof aspects)[number]>();
  for (const a of aspects) {
    byPair.set([a.planet1, a.planet2].sort().join("|"), a);
  }
  const ids = bodies.map((b) => b.id);

  return (
    <div className="overflow-x-auto" dir="ltr">
      <table className="border-collapse font-mono text-[11px] leading-tight">
        <tbody>
          {ids.map((row, ri) => (
            <tr key={row}>
              <th className="px-1.5 py-1 text-start font-medium text-chart-ink">
                <button type="button" className="inline-flex min-h-8 items-center gap-1" onClick={() => onSelect?.(row)}>
                  <span style={{ color: PLANET_COLOR[row] }}>{PLANET_GLYPH[row] ?? row}</span>
                  <span className="hidden text-chart-ink/55 sm:inline">
                    {row === "TRUE_NODE" ? "Node" : row === "ASC" ? "AC" : row[0] + row.slice(1).toLowerCase()}
                  </span>
                </button>
              </th>
              {ids.map((col, ci) => {
                if (ci < ri) {
                  return <td key={col} className="min-w-8" />;
                }
                if (ci === ri) {
                  return (
                    <td key={col} className="min-w-9 border border-chart-ink/20 bg-chart-ink/5 px-1 py-1 text-center text-chart-ink/70">
                      <span style={{ color: PLANET_COLOR[row] }}>{PLANET_GLYPH[row] ?? row}</span>
                    </td>
                  );
                }
                const hit = byPair.get([row, col].sort().join("|"));
                if (!hit) {
                  return <td key={col} className="min-w-9 border border-chart-ink/15 px-1 py-1" />;
                }
                const orb = Math.round(hit.orb);
                return (
                  <td
                    key={col}
                    className="min-w-9 border border-chart-ink/20 px-1 py-1 text-center"
                    title={`${row} ${hit.aspect_name} ${col} ${hit.orb.toFixed(2)}° ${hit.applying ? "a" : "s"}`}
                  >
                    <span style={{ color: ASPECT_COLOR[hit.aspect_name] }}>{ASPECT_GLYPH[hit.aspect_name]}</span>
                    <span className={cn("ms-0.5 tabular-nums text-chart-ink", hit.orb >= 2 && "text-chart-ink/55")}>
                      {orb}
                      <sup>{hit.applying ? "a" : "s"}</sup>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-chart-ink/55">
        {locale === "fa"
          ? "شبکهٔ جنبه‌ها — a رونده، s جداشونده. قرمز = تربیع/مقابله، آبی = تثلیث/تسدیس، سبز = قرآن."
          : "Aspect grid — a applying, s separating. Red = square/opposition, blue = trine/sextile, green = conjunction."}
      </p>
    </div>
  );
}

export function ElementTable({ chart, locale }: { chart: ChartResult; locale: Locale }) {
  const bodies = gridBodies(chart);
  const { cells, colTotals, rowTotals } = elementModalityGrid(bodies);
  const elements: ElementName[] = ["FIRE", "EARTH", "AIR", "WATER"];
  const modalities: ModalityName[] = ["CARDINAL", "FIXED", "MUTABLE"];

  return (
    <div className="overflow-x-auto" dir="ltr">
      <table className="w-full min-w-[280px] border-collapse text-sm">
        <thead>
          <tr className="text-xs text-chart-ink/55">
            <th className="p-2 text-start font-medium" />
            {modalities.map((m) => (
              <th key={m} className="p-2 text-center font-medium">
                {locale === "fa" ? MD_LABEL[m].fa : MD_LABEL[m].en} {colTotals[m]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {elements.map((el) => (
            <tr key={el} className="border-t border-chart-ink/15">
              <th className="p-2 text-start text-xs font-medium text-chart-ink/70">
                {locale === "fa" ? EL_LABEL[el].fa : EL_LABEL[el].key} {rowTotals[el]}
              </th>
              {modalities.map((md) => {
                const cell = cells.find((c) => c.element === el && c.modality === md);
                return (
                  <td key={md} className="p-2 text-center">
                    <span className="inline-flex flex-wrap justify-center gap-1 text-lg">
                      {cell?.ids.map((id) => (
                        <span key={id} style={{ color: PLANET_COLOR[id] }} title={id}>
                          {PLANET_GLYPH[id] ?? id}
                        </span>
                      ))}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DegreeStrip({ chart }: { chart: ChartResult }) {
  const items = degreeStripItems(gridBodies(chart));
  return (
    <div className="w-full" dir="ltr">
      <div className="relative h-20">
        {items.map((it, i) => {
          const left = (it.degree / 30) * 100;
          const bump = (i % 3) * 16;
          return (
            <div
              key={it.id}
              className="absolute flex flex-col items-center"
              style={{ left: `${left}%`, transform: "translateX(-50%)", top: bump }}
              title={`${it.id} ${it.degree.toFixed(1)}° ${it.sign}`}
            >
              <span className="text-base" style={{ color: PLANET_COLOR[it.id] }}>
                {PLANET_GLYPH[it.id] ?? it.id}
              </span>
              <span className="font-mono text-[10px] text-chart-ink/55">{Math.floor(it.degree)}°</span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-1 h-3 border-t border-chart-ink/40">
        {Array.from({ length: 31 }, (_, d) => (
          <span
            key={d}
            className="absolute top-0 w-px bg-chart-ink/50"
            style={{
              left: `${(d / 30) * 100}%`,
              height: d % 5 === 0 ? 10 : 5,
            }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-chart-ink/50">
        <span>0°</span>
        <span>5°</span>
        <span>10°</span>
        <span>15°</span>
        <span>20°</span>
        <span>25°</span>
        <span>30°</span>
      </div>
    </div>
  );
}

export function ChartSheetHeader({ chart, locale }: { chart: ChartResult; locale: Locale }) {
  const lat = chart.subject.latitude;
  const lon = chart.subject.longitude;
  const latAbs = Math.abs(lat);
  const lonAbs = Math.abs(lon);
  const latStr = `${Math.floor(latAbs)}°${String(Math.round((latAbs % 1) * 60)).padStart(2, "0")}′${lat >= 0 ? "N" : "S"}`;
  const lonStr = `${Math.floor(lonAbs)}°${String(Math.round((lonAbs % 1) * 60)).padStart(2, "0")}′${lon >= 0 ? "E" : "W"}`;
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 text-xs text-chart-ink/60">
      <div>
        <p className="font-medium text-chart-ink">{locale === "fa" ? "چارت تولد" : "Birth chart"}</p>
        <p>
          {chart.subject.date} {chart.subject.time}
          {chart.subject.timeUnknown ? (locale === "fa" ? " (ساعت نامشخص)" : " (time unknown)") : ""}
        </p>
        <p>{chart.subject.locationName}</p>
        <p className="font-mono">
          {latStr}, {lonStr}
        </p>
        <p>{chart.houseSystem === "P" ? "Placidus" : chart.houseSystem}</p>
      </div>
      <p className="font-mono text-[10px] text-chart-ink/45">
        {chart.engine}
        <br />
        JD {chart.julianDay.toFixed(5)}
      </p>
    </div>
  );
}

