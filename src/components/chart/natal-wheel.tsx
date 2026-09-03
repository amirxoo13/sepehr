/**
 * Radix wheel — ASC at 9 o'clock, houses counterclockwise.
 *
 * Rebuilt around a `WheelTheme` so the same geometry renders either as
 * an engraved night plate (screen default) or as the classic
 * Astro-Seek / Astrodienst paper radix (print / export default).
 *
 * What changed against the previous version, and why:
 *  · Element-washed zodiac band. Twelve sign sectors tinted by element
 *    give the eye an instant read on chart balance — the single most
 *    useful thing a wheel can show before you read a single degree.
 *  · A real degree ring. Ticks now sit in their own band with 10°
 *    numerals, instead of biting into the sign band.
 *  · Aspect lines weighted by exactness and drawn *under* a hub disc,
 *    with hard/soft separated by colour and applying/separating by dash.
 *  · Luminous glyphs (night theme) via a single reusable SVG filter —
 *    one filter instance, not one per glyph, so it stays cheap.
 *  · Angle markers (ASC/MC/DSC/IC) as flagged ticks outside the rim
 *    rather than floating text.
 */
import { useId, useMemo, useState } from "react";
import { SIGN_ELEMENT, wheelTheme, type WheelThemeName } from "@/lib/astro/chart-theme";
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

function sectorPath(
  asc: number,
  startLon: number,
  endLon: number,
  r0: number,
  r1: number,
  cx: number,
  cy: number,
) {
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
  locale = "en",
  compact = false,
  selected = null,
  onSelect,
  theme: themeName = "night",
}: {
  chart: ChartResult;
  className?: string;
  locale?: string;
  compact?: boolean;
  selected?: string | null;
  onSelect?: (id: string) => void;
  theme?: WheelThemeName;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const T = wheelTheme(themeName);

  const size = compact ? 560 : 840;
  const cx = size / 2;
  const cy = size / 2;

  /* Radial bands, outermost first. The degree ring is new: it buys the
     zodiac band room to breathe and gives numerals somewhere to live. */
  const R = {
    rim: size * 0.478,
    degOuter: size * 0.452,
    degInner: size * 0.418,
    signInner: size * 0.352,
    planet: size * 0.306,
    planetIn: size * 0.268,
    planetDeep: size * 0.232,
    houseNum: size * 0.202,
    aspect: size * 0.172,
    hub: size * 0.034,
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
      else if (b.id === "CHIRON" || b.id === "LILITH" || b.id === "TRUE_NODE")
        t[i] = Math.max(t[i] ?? 0, 1);
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

  /* Degree ticks live in their own band now. Sign boundaries are full
     height, 10° marks are two-thirds, singles are hairlines. */
  const ticks = useMemo(() => {
    const marks: { x1: number; y1: number; x2: number; y2: number; w: number; o: number }[] = [];
    const span = R.degOuter - R.degInner;
    for (let deg = 0; deg < 360; deg++) {
      const a = chartToDrawingAngle(deg, asc);
      const inSign = deg % 30;
      const isSign = inSign === 0;
      const isTen = inSign % 10 === 0;
      const isFive = inSign % 5 === 0;
      const len = isSign ? span : isTen ? span * 0.66 : isFive ? span * 0.42 : span * 0.24;
      const p0 = polar(cx, cy, R.degOuter, a);
      const p1 = polar(cx, cy, R.degOuter - len, a);
      marks.push({
        x1: p0.x,
        y1: p0.y,
        x2: p1.x,
        y2: p1.y,
        w: isSign ? 1.5 : isTen ? 1 : 0.55,
        o: isSign ? 1 : isTen ? 0.8 : isFive ? 0.55 : 0.3,
      });
    }
    return marks;
  }, [asc, cx, cy, R.degOuter, R.degInner]);

  const pad = compact ? 20 : 40;
  const ink = T.ink;
  const glowId = `wheel-glow-${uid}`;
  const rimId = `wheel-rim-${uid}`;
  const hubId = `wheel-hub-${uid}`;

  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-visible",
        compact ? "max-w-[420px]" : "max-w-[840px]",
        className,
      )}
      dir="ltr"
    >
      <svg
        id="natal-wheel"
        viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Natal chart wheel"
        style={{ background: T.paper }}
      >
        <defs>
          {/* One glow filter, reused by every luminous glyph. */}
          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Rim gradient: gold catching light from the upper left. */}
          <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.rim} stopOpacity={T.luminous ? 1 : 1} />
            <stop offset="45%" stopColor={T.rim} stopOpacity={T.luminous ? 0.5 : 1} />
            <stop offset="100%" stopColor={T.rim} stopOpacity={T.luminous ? 0.9 : 1} />
          </linearGradient>

          {/* Hub: a soft well at the centre so aspect lines converge into
              something rather than crossing in a tangle. */}
          <radialGradient id={hubId}>
            <stop offset="0%" stopColor={T.paper} stopOpacity="1" />
            <stop offset="70%" stopColor={T.paper} stopOpacity="0.9" />
            <stop offset="100%" stopColor={T.paper} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x={-pad} y={-pad} width={size + pad * 2} height={size + pad * 2} fill={T.paper} />

        {/* ── Rings ── */}
        <circle cx={cx} cy={cy} r={R.rim} fill="none" stroke={`url(#${rimId})`} strokeWidth="2.2" />
        <circle cx={cx} cy={cy} r={R.degOuter} fill="none" stroke={T.rim} strokeWidth="0.9" opacity="0.7" />
        <circle cx={cx} cy={cy} r={R.degInner} fill="none" stroke={T.rim} strokeWidth="0.9" opacity="0.7" />
        <circle cx={cx} cy={cy} r={R.signInner} fill="none" stroke={T.rim} strokeWidth="1.1" opacity="0.85" />
        <circle cx={cx} cy={cy} r={R.aspect} fill="none" stroke={T.rim} strokeWidth="1" opacity="0.6" />

        {/* ── Zodiac band, washed by element ── */}
        {ZODIAC_SIGNS.map((sign, i) => {
          const start = i * 30;
          const end = start + 30;
          const el = SIGN_ELEMENT[sign] ?? "fire";
          const tint = T.element[el];
          const mid = polar(
            cx,
            cy,
            (R.degInner + R.signInner) / 2,
            chartToDrawingAngle(start + 15, asc),
          );
          const a0 = chartToDrawingAngle(start, asc);
          const s0 = polar(cx, cy, R.degInner, a0);
          const s1 = polar(cx, cy, R.signInner, a0);
          return (
            <g key={sign}>
              <path
                d={sectorPath(asc, start, end, R.signInner, R.degInner, cx, cy)}
                fill={tint}
                opacity={T.luminous ? 0.11 : 0.07}
              />
              <line x1={s0.x} y1={s0.y} x2={s1.x} y2={s1.y} stroke={T.rim} strokeWidth="1" opacity="0.75" />
              <GlyphAt
                name={sign}
                x={mid.x}
                y={mid.y}
                size={compact ? 17 : 24}
                color={T.signs[sign] ?? ink}
              />
            </g>
          );
        })}

        {/* ── Degree ticks ── */}
        <g>
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={T.rim}
              strokeWidth={t.w}
              opacity={t.o}
            />
          ))}
        </g>

        {/* 10° numerals inside the degree ring — only on the full wheel,
            where there is room for them to stay legible. */}
        {!compact && (
          <g>
            {Array.from({ length: 36 }, (_, k) => k * 10).map((deg) => {
              const inSign = deg % 30;
              if (inSign === 0) return null;
              const a = chartToDrawingAngle(deg, asc);
              const p = polar(cx, cy, (R.degOuter + R.degInner) / 2, a);
              return (
                <text
                  key={deg}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={T.muted}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  opacity="0.75"
                >
                  {inSign}
                </text>
              );
            })}
          </g>
        )}

        {/* ── House cusps ── */}
        {chart.houses.map((h) => {
          const a = chartToDrawingAngle(h.cusp, asc);
          const isAngle = h.house === 1 || h.house === 4 || h.house === 7 || h.house === 10;
          const p0 = polar(cx, cy, R.hub, a);
          const p1 = polar(cx, cy, isAngle ? R.rim : R.signInner, a);
          const midLon = normalizeAngle(h.cusp + 12);
          const lp = polar(cx, cy, R.houseNum, chartToDrawingAngle(midLon, asc));
          return (
            <g key={h.house}>
              <line
                x1={p0.x}
                y1={p0.y}
                x2={p1.x}
                y2={p1.y}
                stroke={isAngle ? T.axis : T.rim}
                strokeWidth={isAngle ? 2.2 : 0.7}
                opacity={isAngle ? 0.9 : 0.42}
              />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={T.muted}
                fontSize={compact ? 10 : 13}
                fontFamily="var(--font-mono)"
                opacity="0.85"
              >
                {h.house}
              </text>
            </g>
          );
        })}

        {/* ── Angle flags outside the rim ── */}
        {(
          [
            ["ASC", chart.ascendant, 1],
            ["MC", chart.mediumCoeli, 1],
            ["DSC", normalizeAngle(chart.ascendant + 180), compact ? 0 : 1],
            ["IC", normalizeAngle(chart.mediumCoeli + 180), compact ? 0 : 1],
          ] as const
        )
          .filter(([, , show]) => show)
          .map(([label, lon]) => {
            const a = chartToDrawingAngle(lon, asc);
            const tickOut = polar(cx, cy, R.rim + (compact ? 7 : 11), a);
            const tickIn = polar(cx, cy, R.rim, a);
            const p = polar(cx, cy, R.rim + (compact ? 15 : 24), a);
            const dms = fmtDegMin(((lon % 30) + 30) % 30);
            return (
              <g key={label}>
                <line
                  x1={tickIn.x}
                  y1={tickIn.y}
                  x2={tickOut.x}
                  y2={tickOut.y}
                  stroke={T.axis}
                  strokeWidth="2"
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={T.axis}
                  fontSize={compact ? 9 : 11}
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                  letterSpacing="0.06em"
                >
                  {label}
                  {!compact ? ` ${dms.d}°${String(dms.m).padStart(2, "0")}` : ""}
                </text>
              </g>
            );
          })}

        {/* ── Aspect lines ── */}
        <g>
          {aspects.map((asp, i) => {
            const i1 = indexById[asp.planet1];
            const i2 = indexById[asp.planet2];
            if (i1 == null || i2 == null) return null;
            const a1 = chartToDrawingAngle(spread[i1]!, asc);
            const a2 = chartToDrawingAngle(spread[i2]!, asc);
            const p1 = polar(cx, cy, R.aspect, a1);
            const p2 = polar(cx, cy, R.aspect, a2);
            const involved = !related || asp.planet1 === active || asp.planet2 === active;
            const tight = asp.orb < 2;
            const opacity = involved ? (tight ? 0.92 : 0.62) : related ? 0.07 : 0.5;
            return (
              <line
                key={`${asp.planet1}-${asp.planet2}-${i}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={T.aspects[asp.aspect_name] ?? T.muted}
                strokeWidth={involved && related ? 1.8 : tight ? 1.35 : 0.9}
                strokeDasharray={asp.applying ? undefined : "3 3.5"}
                strokeLinecap="round"
                opacity={opacity}
              />
            );
          })}
        </g>

        {/* Hub well — softens the convergence at dead centre. */}
        <circle cx={cx} cy={cy} r={R.hub * 2.6} fill={`url(#${hubId})`} />
        <circle cx={cx} cy={cy} r={R.hub} fill="none" stroke={T.rim} strokeWidth="0.8" opacity="0.55" />

        {/* ── True-longitude tick marks on the sign ring ── */}
        {drawnBodies.map((b) => {
          const trueA = chartToDrawingAngle(eclipticLongitude(b), asc);
          const mark = polar(cx, cy, R.signInner, trueA);
          const markIn = polar(cx, cy, R.signInner - 7, trueA);
          const color = T.planets[b.id] ?? ink;
          return (
            <line
              key={`tick-${b.id}`}
              x1={markIn.x}
              y1={markIn.y}
              x2={mark.x}
              y2={mark.y}
              stroke={color}
              strokeWidth="1.8"
            />
          );
        })}

        {/* ── Bodies ── */}
        {drawnBodies.map((b, i) => {
          const a = chartToDrawingAngle(spread[i]!, asc);
          const trueA = chartToDrawingAngle(eclipticLongitude(b), asc);
          const radius = tracks[i] === 2 ? R.planetDeep : tracks[i] ? R.planetIn : R.planet;
          const pt = polar(cx, cy, radius, a);
          const truePt = polar(cx, cy, R.signInner - 9, trueA);
          const dms = fmtDegMin(b.degree_in_sign, b.degree_minute);
          const isOn = active === b.id;
          const dimmed = Boolean(related && !related.has(b.id));
          const color = T.planets[b.id] ?? ink;
          const extra =
            b.id === "SOUTH_NODE" || b.id === "LILITH" || b.id === "CHIRON" || b.id === "TRUE_NODE";
          const glyphR = extra ? 9 : 11.5;
          const offset = Math.abs(normalizeAngle(spread[i]! - eclipticLongitude(b)));
          const wrap = offset > 180 ? 360 - offset : offset;
          const luminary = b.id === "SUN" || b.id === "MOON";
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
              className="cursor-pointer outline-none transition-opacity duration-150"
              opacity={dimmed ? 0.25 : 1}
            >
              {/* leader line back to true longitude when the glyph was nudged */}
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

              {/* halo so aspect lines don't run through the glyph */}
              <circle cx={pt.x} cy={pt.y} r={glyphR + (isOn ? 4 : 1.5)} fill={T.halo} />
              {isOn && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={glyphR + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.1"
                  opacity="0.85"
                />
              )}

              <g filter={T.luminous && (luminary || isOn) ? `url(#${glowId})` : undefined}>
                <GlyphAt
                  name={b.id}
                  x={pt.x}
                  y={pt.y}
                  size={extra ? (compact ? 13 : 16) : compact ? 15 : 20}
                  color={color}
                />
              </g>

              {!compact && (
                <text
                  x={pt.x}
                  y={pt.y + 15}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fill={color}
                  stroke={T.paper}
                  strokeWidth="3.2"
                  paintOrder="stroke"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                >
                  {dms.d}°{String(dms.m).padStart(2, "0")}
                  {b.retrograde ? "℞" : ""}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {active && !compact && (
        <div className="panel mx-auto mt-3 w-fit px-3.5 py-2 text-xs text-fg">
          {(() => {
            const b = drawnBodies.find((x) => x.id === active);
            if (!b) return null;
            const dms = fmtDegMin(b.degree_in_sign, b.degree_minute);
            const here = aspects.filter((a) => a.planet1 === active || a.planet2 === active);
            return (
              <span className="inline-flex flex-wrap items-center gap-2">
                <Glyph name={b.id} size={15} color={T.planets[b.id] ?? T.ink} />
                <span className="font-mono tabular-nums">
                  {planetDisplayName(b)} {dms.label} {b.sign}
                  {b.house ? ` · H${b.house}` : ""}
                  {b.retrograde ? " ℞" : ""}
                </span>
                {here.length > 0 && <span className="h-3 w-px bg-border-strong" />}
                {here.slice(0, 5).map((a) => {
                  const other = a.planet1 === active ? a.planet2 : a.planet1;
                  return (
                    <span
                      key={`${a.planet1}-${a.planet2}`}
                      className="inline-flex items-center gap-0.5"
                    >
                      <Glyph
                        name={a.aspect_name}
                        size={11}
                        color={T.aspects[a.aspect_name] ?? T.ink}
                      />
                      <Glyph name={other} size={12} color={T.planets[other] ?? T.ink} />
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

/** Decorative tropical wheel with no natal data — twelve signs only. */
export function EmptyWheel({
  className,
  compact = true,
}: {
  className?: string;
  compact?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const T = wheelTheme("night");
  const size = compact ? 560 : 840;
  const cx = size / 2;
  const cy = size / 2;
  const asc = 0;
  const R = {
    rim: size * 0.478,
    degOuter: size * 0.452,
    degInner: size * 0.418,
    signInner: size * 0.352,
    hub: size * 0.034,
  };
  const pad = compact ? 20 : 40;
  const rimId = `empty-rim-${uid}`;

  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-visible",
        compact ? "max-w-[420px]" : "max-w-[840px]",
        className,
      )}
      dir="ltr"
    >
      <svg
        viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Empty tropical wheel"
        style={{ background: T.paper }}
      >
        <defs>
          <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.rim} />
            <stop offset="45%" stopColor={T.rim} stopOpacity="0.5" />
            <stop offset="100%" stopColor={T.rim} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect x={-pad} y={-pad} width={size + pad * 2} height={size + pad * 2} fill={T.paper} />
        <circle cx={cx} cy={cy} r={R.rim} fill="none" stroke={`url(#${rimId})`} strokeWidth="2.2" />
        <circle cx={cx} cy={cy} r={R.degOuter} fill="none" stroke={T.rim} strokeWidth="0.9" opacity="0.7" />
        <circle cx={cx} cy={cy} r={R.degInner} fill="none" stroke={T.rim} strokeWidth="0.9" opacity="0.7" />
        <circle cx={cx} cy={cy} r={R.signInner} fill="none" stroke={T.rim} strokeWidth="1.1" opacity="0.85" />
        {ZODIAC_SIGNS.map((sign, i) => {
          const start = i * 30;
          const end = start + 30;
          const el = SIGN_ELEMENT[sign] ?? "fire";
          const tint = T.element[el];
          const mid = polar(cx, cy, (R.degInner + R.signInner) / 2, chartToDrawingAngle(start + 15, asc));
          const a0 = chartToDrawingAngle(start, asc);
          const s0 = polar(cx, cy, R.degInner, a0);
          const s1 = polar(cx, cy, R.signInner, a0);
          return (
            <g key={sign}>
              <path
                d={sectorPath(asc, start, end, R.signInner, R.degInner, cx, cy)}
                fill={tint}
                opacity="0.11"
              />
              <line x1={s0.x} y1={s0.y} x2={s1.x} y2={s1.y} stroke={T.rim} strokeWidth="1" opacity="0.75" />
              <GlyphAt name={sign} x={mid.x} y={mid.y} size={compact ? 17 : 24} color={T.signs[sign] ?? T.ink} />
            </g>
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const a = chartToDrawingAngle(i * 30, asc);
          const p0 = polar(cx, cy, R.signInner, a);
          const p1 = polar(cx, cy, R.hub * 4, a);
          return (
            <line
              key={i}
              x1={p0.x}
              y1={p0.y}
              x2={p1.x}
              y2={p1.y}
              stroke={T.rim}
              strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
              opacity={i % 3 === 0 ? 0.55 : 0.28}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={R.hub} fill={T.rim} opacity="0.85" />
        {(() => {
          const p = polar(cx, cy, R.rim + size * 0.032, 180);
          return (
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={T.axis}
              fontSize={size * 0.026}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              letterSpacing="0.12em"
            >
              ASC
            </text>
          );
        })()}
      </svg>
    </div>
  );
}

export function downloadWheelSvg(
  svg: SVGSVGElement | null,
  filename: string,
  themeName: WheelThemeName = "night",
) {
  if (!svg) return;
  const T = wheelTheme(themeName);
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("style", `background:${T.paper}`);
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
