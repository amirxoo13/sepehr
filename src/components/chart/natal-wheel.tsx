/**
 * Astro-Seek / Astrodienst radix: white paper wheel, ASC at 9 o'clock,
 * houses counterclockwise, degree ticks, coloured glyphs, red/blue aspects.
 */
import { useMemo, useState } from "react";
import { ASPECT_COLOR, CHART, PLANET_COLOR, SIGN_COLOR } from "@/lib/astro/chart-theme";
import { ZODIAC_SIGNS } from "@/lib/astro/constants";
import { eclipticLongitude, normalizeAngle, planetDisplayName } from "@/lib/astro/math";
import type { ChartResult } from "@/lib/astro/types";
import {
  angleBodies,
  assignTracks,
  findWheelAspects,
  fmtDegMin,
  spreadLongitudes,
  wheelBodies,
  type WheelBody,
} from "@/lib/astro/wheel-data";
import { cn } from "@/lib/utils";
import { Glyph, GlyphAt } from "@/components/chart/glyphs";

function chartToDrawingAngle(lon: number, asc: number) {
  return normalizeAngle(180 - (lon - asc));
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function sectorPath(asc: number, startLon: number, endLon: number, r0: number, r1: number, cx: number, cy: number) {
  const a0 = chartToDrawingAngle(startLon, asc);
  const a1 = chartToDrawingAngle(endLon, asc);
  const p0 = polar(cx, cy, r1, a0);
  const p1 = polar(cx, cy, r1, a1);
  const p2 = polar(cx, cy, r0, a1);
  const p3 = polar(cx, cy, r0, a0);
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r1} ${r1} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} A ${r0} ${r0} 0 0 0 ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} Z`;
}

export function NatalWheel({
  chart,
  className,
  locale = "fa",
  compact = false,
  selected = null,
  onSelect,
}: {
  chart: ChartResult;
  className?: string;
  locale?: "fa" | "en";
  compact?: boolean;
  selected?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const size = compact ? 560 : 840;
  const cx = size / 2;
  const cy = size / 2;
  const R = {
    outer: size * 0.47,
    signInner: size * 0.392,
    planet: size * 0.338,
    planetIn: size * 0.302,
    planetDeep: size * 0.266,
    houseNum: size * 0.232,
    aspect: size * 0.188,
  };
  const asc = chart.ascendant;
  const active = hover ?? selected;

  const bodies = useMemo(() => wheelBodies(chart).filter((b) => b.id !== "FORTUNE"), [chart]);
  const angles = useMemo(() => angleBodies(chart), [chart]);
  const drawnBodies = useMemo(
    () => bodies.filter((b) => b.id !== "SOUTH_NODE" || !compact),
    [bodies, compact],
  );
  const lons = useMemo(() => drawnBodies.map((b) => eclipticLongitude(b)), [drawnBodies]);
  const spread = useMemo(() => spreadLongitudes(lons, compact ? 14 : 11), [lons, compact]);
  const tracks = useMemo(() => {
    const t = assignTracks(spread, compact ? 16 : 13);
    drawnBodies.forEach((b, i) => {
      if (b.id === "SOUTH_NODE") t[i] = 2;
      else if (b.id === "CHIRON" || b.id === "LILITH" || b.id === "TRUE_NODE") t[i] = Math.max(t[i] ?? 0, 1);
    });
    return t;
  }, [spread, compact, drawnBodies]);
  const indexById = useMemo(
    () => Object.fromEntries(drawnBodies.map((b, i) => [b.id, i])),
    [drawnBodies],
  );

  const aspects = useMemo(() => {
    const gridBodies: WheelBody[] = [
      ...bodies.filter((b) => b.id !== "SOUTH_NODE" && b.id !== "FORTUNE"),
      ...angles.filter((a) => a.id === "ASC" || a.id === "MC"),
    ];
    return findWheelAspects(gridBodies).filter((a) => a.aspect_name !== "CONJUNCTION");
  }, [bodies, angles]);

  const related = useMemo(() => {
    if (!active) return null;
    const ids = new Set<string>([active]);
    for (const a of aspects) {
      if (a.planet1 === active || a.planet2 === active) {
        ids.add(a.planet1);
        ids.add(a.planet2);
      }
    }
    return ids;
  }, [active, aspects]);

  const ticks = useMemo(() => {
    const marks: { x1: number; y1: number; x2: number; y2: number; w: number }[] = [];
    for (let deg = 0; deg < 360; deg++) {
      const a = chartToDrawingAngle(deg, asc);
      const sign = deg % 30 === 0;
      const ten = deg % 10 === 0;
      const five = deg % 5 === 0;
      const len = sign ? 15 : ten ? 10 : five ? 6 : 3;
      const p0 = polar(cx, cy, R.outer, a);
      const p1 = polar(cx, cy, R.outer - len, a);
      marks.push({ x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y, w: sign ? 1.4 : ten ? 1 : 0.55 });
    }
    return marks;
  }, [asc, cx, cy, R.outer]);

  const pad = compact ? 18 : 36;
  const ink = CHART.ink;

  return (
    <div className={cn("relative mx-auto w-full overflow-visible", compact ? "max-w-[420px]" : "max-w-[840px]", className)} dir="ltr">
      <svg
        id="natal-wheel"
        viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Natal chart wheel"
        style={{ background: CHART.paper }}
      >
        <circle cx={cx} cy={cy} r={R.outer + 1} fill={CHART.paper} stroke={ink} strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r={R.signInner} fill={CHART.paper} stroke={ink} strokeWidth="1.1" />
        <circle cx={cx} cy={cy} r={R.aspect} fill={CHART.paper} stroke={ink} strokeWidth="1.1" />

        {ZODIAC_SIGNS.map((sign, i) => {
          const start = i * 30;
          const end = start + 30;
          const mid = polar(cx, cy, (R.outer + R.signInner) / 2 - 2, chartToDrawingAngle(start + 15, asc));
          const a0 = chartToDrawingAngle(start, asc);
          const s0 = polar(cx, cy, R.outer, a0);
          const s1 = polar(cx, cy, R.signInner, a0);
          return (
            <g key={sign}>
              <path d={sectorPath(asc, start, end, R.signInner, R.outer, cx, cy)} fill="none" />
              <line x1={s0.x} y1={s0.y} x2={s1.x} y2={s1.y} stroke={ink} strokeWidth="1.15" />
              <GlyphAt name={sign} x={mid.x} y={mid.y} size={compact ? 16 : 22} color={SIGN_COLOR[sign]} />
            </g>
          );
        })}

        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={ink} strokeWidth={t.w} />
        ))}

        {chart.houses.map((h) => {
          const a = chartToDrawingAngle(h.cusp, asc);
          const isAngle = h.house === 1 || h.house === 4 || h.house === 7 || h.house === 10;
          const p0 = polar(cx, cy, R.aspect, a);
          const p1 = polar(cx, cy, isAngle ? R.outer + 10 : R.signInner, a);
          const midLon = normalizeAngle(h.cusp + 12);
          const lp = polar(cx, cy, R.houseNum, chartToDrawingAngle(midLon, asc));
          return (
            <g key={h.house}>
              <line
                x1={p0.x}
                y1={p0.y}
                x2={p1.x}
                y2={p1.y}
                stroke={ink}
                strokeWidth={isAngle ? 2.4 : 0.85}
              />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={ink}
                fontSize={compact ? 10 : 13}
                fontFamily="var(--font-mono)"
              >
                {h.house}
              </text>
            </g>
          );
        })}

        {([
          ["ASC", chart.ascendant, 1],
          ["MC", chart.mediumCoeli, 1],
          ["DSC", normalizeAngle(chart.ascendant + 180), compact ? 0 : 1],
          ["IC", normalizeAngle(chart.mediumCoeli + 180), compact ? 0 : 1],
        ] as const)
          .filter(([, , show]) => show)
          .map(([label, lon]) => {
            const p = polar(cx, cy, R.outer + (compact ? 12 : 20), chartToDrawingAngle(lon, asc));
            const dms = fmtDegMin(((lon % 30) + 30) % 30);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={ink}
                fontSize={compact ? 9 : 11}
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                {label}
                {!compact ? ` ${dms.d}°${String(dms.m).padStart(2, "0")}` : ""}
              </text>
            );
          })}

        {aspects.map((asp, i) => {
          const i1 = indexById[asp.planet1];
          const i2 = indexById[asp.planet2];
          if (i1 == null || i2 == null) return null;
          const a1 = chartToDrawingAngle(spread[i1]!, asc);
          const a2 = chartToDrawingAngle(spread[i2]!, asc);
          const p1 = polar(cx, cy, R.aspect, a1);
          const p2 = polar(cx, cy, R.aspect, a2);
          const involved = !related || asp.planet1 === active || asp.planet2 === active;
          const opacity = involved ? (asp.orb < 2 ? 0.95 : 0.7) : related ? 0.08 : 0.55;
          return (
            <line
              key={`${asp.planet1}-${asp.planet2}-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={ASPECT_COLOR[asp.aspect_name] ?? CHART.muted}
              strokeWidth={involved && related ? 1.7 : asp.orb < 2 ? 1.4 : 1}
              strokeDasharray={asp.applying ? undefined : "3 3"}
              opacity={opacity}
            />
          );
        })}

        {drawnBodies.map((b, i) => {
          const trueA = chartToDrawingAngle(eclipticLongitude(b), asc);
          const mark = polar(cx, cy, R.signInner, trueA);
          const markIn = polar(cx, cy, R.signInner - 6, trueA);
          const color = PLANET_COLOR[b.id] ?? ink;
          return (
            <line
              key={`tick-${b.id}`}
              x1={markIn.x}
              y1={markIn.y}
              x2={mark.x}
              y2={mark.y}
              stroke={color}
              strokeWidth="1.6"
            />
          );
        })}

        {drawnBodies.map((b, i) => {
          const a = chartToDrawingAngle(spread[i]!, asc);
          const trueA = chartToDrawingAngle(eclipticLongitude(b), asc);
          const radius = tracks[i] === 2 ? R.planetDeep : tracks[i] ? R.planetIn : R.planet;
          const pt = polar(cx, cy, radius, a);
          const truePt = polar(cx, cy, R.signInner - 8, trueA);
          const dms = fmtDegMin(b.degree_in_sign, b.degree_minute);
          const isOn = active === b.id;
          const dimmed = Boolean(related && !related.has(b.id));
          const color = PLANET_COLOR[b.id] ?? ink;
          const extra = b.id === "SOUTH_NODE" || b.id === "LILITH" || b.id === "CHIRON" || b.id === "TRUE_NODE";
          const glyphR = extra ? 9 : 11;
          const offset = Math.abs(normalizeAngle(spread[i]! - eclipticLongitude(b)));
          const wrap = offset > 180 ? 360 - offset : offset;
          return (
            <g
              key={b.id}
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(b.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(b.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${planetDisplayName(b)} ${dms.label} ${b.sign}`}
              className="cursor-pointer outline-none"
              opacity={dimmed ? 0.28 : 1}
            >
              {wrap > 2.5 && (
                <line
                  x1={pt.x}
                  y1={pt.y}
                  x2={truePt.x}
                  y2={truePt.y}
                  stroke={color}
                  strokeWidth="0.5"
                  opacity="0.45"
                />
              )}
              <circle cx={pt.x} cy={pt.y} r={isOn ? glyphR + 3 : glyphR + 1} fill={CHART.paper} />
              <GlyphAt name={b.id} x={pt.x} y={pt.y} size={extra ? (compact ? 13 : 16) : compact ? 15 : 19} color={color} />
              {!compact && (
                <text
                  x={pt.x}
                  y={pt.y + 15}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fill={color}
                  stroke={CHART.paper}
                  strokeWidth="3.2"
                  paintOrder="stroke"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                >
                  {dms.d}°{String(dms.m).padStart(2, "0")}{b.retrograde ? "R" : ""}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {active && !compact && (
        <div className="mx-auto mt-2 w-fit rounded-md bg-bg-elevated px-3 py-1.5 text-xs text-fg shadow-border">
          {(() => {
            const b = drawnBodies.find((x) => x.id === active);
            if (!b) return null;
            const dms = fmtDegMin(b.degree_in_sign, b.degree_minute);
            const here = aspects.filter((a) => a.planet1 === active || a.planet2 === active);
            return (
              <span className="inline-flex flex-wrap items-center gap-1.5">
                <Glyph name={b.id} size={14} color={PLANET_COLOR[b.id] ?? CHART.ink} />
                <span>
                  {planetDisplayName(b)} {dms.label} {b.sign}
                  {b.house ? ` · H${b.house}` : ""}
                  {b.retrograde ? " Rx" : ""}
                </span>
                {here.slice(0, 5).map((a) => {
                  const other = a.planet1 === active ? a.planet2 : a.planet1;
                  return (
                    <span key={`${a.planet1}-${a.planet2}`} className="inline-flex items-center gap-0.5">
                      <Glyph name={a.aspect_name} size={11} color={ASPECT_COLOR[a.aspect_name] ?? CHART.ink} />
                      <Glyph name={other} size={12} color={PLANET_COLOR[other] ?? CHART.ink} />
                    </span>
                  );
                })}
              </span>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export function downloadWheelSvg(svg: SVGSVGElement | null, filename: string) {
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("style", `background:${CHART.paper}`);
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>${clone.outerHTML}`], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
