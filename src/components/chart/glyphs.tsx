/**
 * Drawn astrological glyphs (no Unicode / no symbol fonts).
 * Paths are traditional Western forms used by Astrodienst / Astro-Seek.
 */
import { cn } from "@/lib/utils";

type Op =
  | { t: "p"; d: string; fill?: boolean }
  | { t: "c"; cx: number; cy: number; r: number; fill?: boolean };

const S: Record<string, Op[]> = {
  Aries: [
    { t: "p", d: "M4.2 18.2C4.2 9.2 8.4 3.8 12 12" },
    { t: "p", d: "M19.8 18.2C19.8 9.2 15.6 3.8 12 12" },
  ],
  Taurus: [
    { t: "c", cx: 12, cy: 15.4, r: 5.15 },
    { t: "p", d: "M4.4 10.2C4.4 3.6 9.1 3.7 12 10.4" },
    { t: "p", d: "M19.6 10.2C19.6 3.6 14.9 3.7 12 10.4" },
  ],
  Gemini: [
    { t: "p", d: "M7.2 4.2Q12 2.6 16.8 4.2" },
    { t: "p", d: "M7.2 19.8Q12 21.4 16.8 19.8" },
    { t: "p", d: "M9.1 4.8V19.2" },
    { t: "p", d: "M14.9 4.8V19.2" },
  ],
  Cancer: [
    { t: "c", cx: 8.1, cy: 8.2, r: 3.15 },
    { t: "p", d: "M11.2 8.2C14.6 8.2 16.2 11.2 16.2 14.2" },
    { t: "c", cx: 15.9, cy: 15.8, r: 3.15 },
    { t: "p", d: "M12.8 15.8C9.4 15.8 7.8 12.8 7.8 9.8" },
  ],
  Leo: [
    { t: "c", cx: 8.6, cy: 9.4, r: 4.35 },
    { t: "p", d: "M13 9.6C18.8 9.4 20.2 14.8 16.4 17.2C13.2 19.4 14.8 21.8 18.8 20.2" },
  ],
  Virgo: [
    { t: "p", d: "M3.2 20V5.2L8.2 14.2L12.2 5.2V20" },
    { t: "p", d: "M12.2 5.2L16.4 14.2" },
    { t: "p", d: "M16.4 14.2C16.4 20.2 22.2 20.4 22.2 14.2V5.2" },
  ],
  Libra: [
    { t: "p", d: "M3.2 17.4H20.8" },
    { t: "p", d: "M5.6 11.8H18.4" },
    { t: "p", d: "M8.2 11.8A3.8 3.7 0 0 1 15.8 11.8" },
  ],
  Scorpio: [
    { t: "p", d: "M2.8 20V5.2L7.8 14.2L11.8 5.2V20" },
    { t: "p", d: "M11.8 5.2L16.2 14.6V8.2" },
    { t: "p", d: "M16.2 8.2L21.2 4.6" },
    { t: "p", d: "M21.2 4.6H16.6" },
    { t: "p", d: "M21.2 4.6V9.2" },
  ],
  Sagittarius: [
    { t: "p", d: "M5.2 19.2L19.2 5.2" },
    { t: "p", d: "M19.2 5.2H12.4" },
    { t: "p", d: "M19.2 5.2V12" },
    { t: "p", d: "M10.2 10.6L15.4 15.8" },
  ],
  Capricorn: [
    { t: "p", d: "M3.4 7.6L9.6 19.4L14.4 7.4" },
    { t: "p", d: "M14.4 7.4C14.6 3.2 21.2 3.4 21.2 8.6C21.2 13.4 17.4 14.6 15.6 12.2" },
    { t: "p", d: "M21.2 8.6C21.2 12.8 18.8 16.6 18.8 19.6" },
  ],
  Aquarius: [
    { t: "p", d: "M3 9.2L6.6 6L10.2 9.2L13.8 6L17.4 9.2L21 6" },
    { t: "p", d: "M3 16.8L6.6 13.6L10.2 16.8L13.8 13.6L17.4 16.8L21 13.6" },
  ],
  Pisces: [
    { t: "p", d: "M8.2 3.6C2.4 8 2.4 16 8.2 20.4" },
    { t: "p", d: "M15.8 3.6C21.6 8 21.6 16 15.8 20.4" },
    { t: "p", d: "M4.4 12H19.6" },
  ],
  SUN: [
    { t: "c", cx: 12, cy: 12, r: 6.5 },
    { t: "c", cx: 12, cy: 12, r: 1.65, fill: true },
  ],
  MOON: [{ t: "p", d: "M15.2 4.1A8.1 8.1 0 1 0 15.2 19.9 6.15 6.15 0 1 1 15.2 4.1Z", fill: true }],
  MERCURY: [
    { t: "c", cx: 12, cy: 8.9, r: 4.05 },
    { t: "p", d: "M12 12.95V20.6" },
    { t: "p", d: "M8.15 16.85H15.85" },
    { t: "p", d: "M8.2 5.35A3.9 3.2 0 0 1 15.8 5.35" },
  ],
  VENUS: [
    { t: "c", cx: 12, cy: 8.3, r: 4.55 },
    { t: "p", d: "M12 12.85V21" },
    { t: "p", d: "M8 17.45H16" },
  ],
  MARS: [
    { t: "c", cx: 10.15, cy: 13.9, r: 4.85 },
    { t: "p", d: "M13.7 10.35L19.35 4.7" },
    { t: "p", d: "M19.35 4.7H14.6" },
    { t: "p", d: "M19.35 4.7V9.45" },
  ],
  JUPITER: [
    { t: "p", d: "M6.2 8.6C6.2 4.6 10.6 3.7 14.2 6.2" },
    { t: "p", d: "M13.4 4.4V20.4" },
    { t: "p", d: "M7.2 16.3H19.6" },
  ],
  SATURN: [
    { t: "p", d: "M8.6 4.2V20.5" },
    { t: "p", d: "M8.6 12.2C8.6 6.4 18.2 6.4 18.2 12.6" },
    { t: "p", d: "M5.4 8.1H13.8" },
  ],
  URANUS: [
    { t: "p", d: "M6.1 7.4V16.6" },
    { t: "p", d: "M17.9 7.4V16.6" },
    { t: "p", d: "M6.1 12H17.9" },
    { t: "p", d: "M12 12V20.4" },
    { t: "c", cx: 12, cy: 5.7, r: 2.15 },
  ],
  NEPTUNE: [
    { t: "p", d: "M12 3.6V20.6" },
    { t: "p", d: "M12 4.1L5.4 11.2" },
    { t: "p", d: "M12 4.1L18.6 11.2" },
    { t: "p", d: "M6.4 16.6H17.6" },
  ],
  PLUTO: [
    { t: "c", cx: 12, cy: 16.7, r: 3.35 },
    { t: "p", d: "M12 13.35V3.8" },
    { t: "p", d: "M6.4 3.8H17.6" },
    { t: "p", d: "M6.4 3.8V8.1" },
    { t: "p", d: "M17.6 3.8V8.1" },
  ],
  TRUE_NODE: [
    { t: "p", d: "M4.6 7.6Q4.6 19.6 12 19.6Q19.4 19.6 19.4 7.6" },
    { t: "c", cx: 4.6, cy: 7.6, r: 1.55, fill: true },
    { t: "c", cx: 19.4, cy: 7.6, r: 1.55, fill: true },
  ],
  SOUTH_NODE: [
    { t: "p", d: "M4.6 16.4Q4.6 4.4 12 4.4Q19.4 4.4 19.4 16.4" },
    { t: "c", cx: 4.6, cy: 16.4, r: 1.55, fill: true },
    { t: "c", cx: 19.4, cy: 16.4, r: 1.55, fill: true },
  ],
  LILITH: [
    { t: "p", d: "M15.1 3.8A6.3 6.3 0 1 0 15.1 16.2 4.7 4.7 0 1 1 15.1 3.8Z", fill: true },
    { t: "p", d: "M12 16.4V21.2" },
    { t: "p", d: "M8.6 18.7H15.4" },
  ],
  CHIRON: [
    { t: "c", cx: 8.6, cy: 14.8, r: 4.4 },
    { t: "p", d: "M11.8 11.4L18.6 4.6" },
    { t: "p", d: "M18.6 4.6H13.8" },
    { t: "p", d: "M18.6 4.6V9.4" },
    { t: "p", d: "M14.6 8.6L19.2 12.4" },
  ],
  FORTUNE: [
    { t: "c", cx: 12, cy: 12, r: 7.6 },
    { t: "p", d: "M12 5.2V18.8" },
    { t: "p", d: "M5.2 12H18.8" },
  ],
  CONJUNCTION: [{ t: "c", cx: 12, cy: 12, r: 6.2 }],
  OPPOSITION: [
    { t: "c", cx: 5.6, cy: 12, r: 3.3 },
    { t: "c", cx: 18.4, cy: 12, r: 3.3 },
    { t: "p", d: "M8.9 12H15.1" },
  ],
  TRINE: [{ t: "p", d: "M12 4.2L20.4 19.2H3.6Z" }],
  SQUARE: [{ t: "p", d: "M5.2 5.2H18.8V18.8H5.2Z" }],
  SEXTILE: [
    { t: "p", d: "M12 3.6V20.4" },
    { t: "p", d: "M4.4 8.2L19.6 15.8" },
    { t: "p", d: "M19.6 8.2L4.4 15.8" },
  ],
};

S.MEAN_NODE = S.TRUE_NODE;
S.ASC = [{ t: "p", d: "M4 17V7H8.2C10.6 7 10.6 12 8.2 12H4M8.4 12L11.6 17M14.2 17V9.6C14.2 7.6 15.6 7 17.2 7C18.8 7 20.2 7.6 20.2 9.6V17M14.2 12H20.2" }];
S.MC = [{ t: "p", d: "M4.2 17V7L8.6 14.2L13 7V17M16.2 17V9.6C16.2 7.6 17.6 7 19.2 7C20.8 7 22.2 7.6 22.2 9.6V17" }];
S.DSC = S.ASC;
S.IC = S.MC;
S.AC = S.ASC;

const ALIAS: Record<string, string> = {
  Node: "TRUE_NODE",
  NODE: "TRUE_NODE",
  "True Node": "TRUE_NODE",
  "North Node": "TRUE_NODE",
  "South Node": "SOUTH_NODE",
  "Mean Node": "MEAN_NODE",
  Lilith: "LILITH",
  Chiron: "CHIRON",
  Fortune: "FORTUNE",
  "Part of Fortune": "FORTUNE",
  Sun: "SUN",
  Moon: "MOON",
  Mercury: "MERCURY",
  Venus: "VENUS",
  Mars: "MARS",
  Jupiter: "JUPITER",
  Saturn: "SATURN",
  Uranus: "URANUS",
  Neptune: "NEPTUNE",
  Pluto: "PLUTO",
  Ascendant: "ASC",
  Midheaven: "MC",
};

export function glyphId(name: string | null | undefined): string {
  if (!name) return "";
  if (S[name]) return name;
  if (ALIAS[name]) return ALIAS[name];
  const up = name.toUpperCase();
  if (S[up]) return up;
  const titled = name[0]!.toUpperCase() + name.slice(1).toLowerCase();
  if (S[titled]) return titled;
  return name;
}

function GlyphContent({ id, color, sw = 1.7 }: { id: string; color: string; sw?: number }) {
  const ops = S[glyphId(id)];
  if (!ops) {
    return (
      <text x="12" y="16" textAnchor="middle" fontSize="9" fill={color} stroke="none">
        {id.slice(0, 2)}
      </text>
    );
  }
  return (
    <>
      {ops.map((op, i) =>
        op.t === "c" ? (
          <circle
            key={i}
            cx={op.cx}
            cy={op.cy}
            r={op.r}
            fill={op.fill ? color : "none"}
            stroke={op.fill ? "none" : color}
            strokeWidth={op.fill ? 0 : sw}
          />
        ) : (
          <path
            key={i}
            d={op.d}
            fill={op.fill ? color : "none"}
            stroke={op.fill ? "none" : color}
            strokeWidth={op.fill ? 0 : sw}
            fillRule="evenodd"
          />
        ),
      )}
    </>
  );
}

export function Glyph({
  name,
  size = 16,
  color = "currentColor",
  className,
  title,
}: {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("inline-block shrink-0 align-[-0.2em]", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <g strokeLinecap="round" strokeLinejoin="round">
        <GlyphContent id={name} color={color} />
      </g>
    </svg>
  );
}

export function GlyphAt({
  name,
  x,
  y,
  size,
  color,
}: {
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
}) {
  const s = size / 24;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s}) translate(-12 -12)`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GlyphContent id={name} color={color} sw={1.65} />
    </g>
  );
}

export function DegreeSign({
  degree,
  minute,
  sign,
  locale,
  signName,
  className,
}: {
  degree: number;
  minute?: number;
  sign: string;
  locale?: string;
  signName?: string;
  className?: string;
}) {
  const m = minute ?? Math.floor((((degree % 30) + 30) % 30) % 1 * 60);
  const d = Math.floor(((degree % 30) + 30) % 30);
  return (
    <span className={cn("inline-flex items-center gap-1 font-mono tabular-nums", className)}>
      <span>
        {d}°{String(m).padStart(2, "0")}′
      </span>
      <Glyph name={sign} size={13} />
      {signName ? <span>{signName}</span> : null}
    </span>
  );
}
