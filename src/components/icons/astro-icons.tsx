/**
 * Astro icons — drawn for this app, not borrowed from a generic set.
 *
 * Every icon here is an *instrument* or a *chart construct*, not a
 * metaphor: an armillary sphere, an astrolabe rete, a sextant arc, a
 * house wheel, a synastry bi-wheel, a solar return ring, a progressed
 * spiral. That vocabulary is what makes the UI read as an observatory
 * rather than as a generic dashboard, and it is why lucide's Orbit /
 * Compass / Timer had to go.
 *
 * All icons share one grid (24×24), one stroke weight (1.4 at 24px,
 * scaling with size), round caps, and no fills except deliberate
 * luminaries — so they sit together as a family.
 */
import { cn } from "@/lib/utils";

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
};

function Frame({
  size = 24,
  className,
  strokeWidth = 1.4,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Armillary sphere — the app's mark for "natal chart". */
export function IconArmillary(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <ellipse cx="12" cy="12" rx="3.4" ry="9" />
      <path d="M3.6 8.4h16.8M3.6 15.6h16.8" opacity="0.55" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** House wheel — twelve divisions with a marked ascendant. */
export function IconWheel(p: IconProps) {
  // Pre-rounded so SSR and the browser emit identical attribute strings
  // (raw cos/sin produced a 1e-15 hydration mismatch on y2).
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const r = (n: number) => Number(n.toFixed(3));
    return {
      x1: r(12 + Math.cos(a) * 5.4),
      y1: r(12 - Math.sin(a) * 5.4),
      x2: r(12 + Math.cos(a) * 9),
      y2: r(12 - Math.sin(a) * 9),
    };
  });
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.4" opacity="0.75" />
      {spokes.map((s, i) => (
        <line key={i} {...s} opacity={i % 3 === 0 ? 1 : 0.45} />
      ))}
      <path d="M3 12h3.6" strokeWidth={(p.strokeWidth ?? 1.4) * 1.9} />
    </Frame>
  );
}

/** Sextant — the arc-and-index instrument; used for "sky now". */
export function IconSextant(p: IconProps) {
  return (
    <Frame {...p}>
      <path d="M4 19.4A15.4 15.4 0 0 1 19.4 4" />
      <path d="M4 19.4 19.4 4" opacity="0.4" />
      <path d="M4 19.4 14.2 14.2" />
      <path d="M4 19.4v-4.4M4 19.4h4.4" opacity="0.6" />
      <circle cx="14.2" cy="14.2" r="1.5" />
      <path d="M11.4 6.6a7.4 7.4 0 0 1 6 6" opacity="0.5" />
    </Frame>
  );
}

/** Bi-wheel — two rings sharing a centre: synastry. */
export function IconBiWheel(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="9.2" cy="12" r="7" />
      <circle cx="14.8" cy="12" r="7" />
      <circle cx="9.2" cy="12" r="2.6" opacity="0.5" />
      <circle cx="14.8" cy="12" r="2.6" opacity="0.5" />
    </Frame>
  );
}

/** Midpoint — two nodes and the arc-midpoint between them: composite. */
export function IconMidpoint(p: IconProps) {
  return (
    <Frame {...p}>
      <path d="M3.4 16.6A10.2 10.2 0 0 1 20.6 16.6" />
      <circle cx="3.4" cy="16.6" r="1.8" />
      <circle cx="20.6" cy="16.6" r="1.8" />
      <circle cx="12" cy="6.4" r="2.4" fill="currentColor" stroke="none" />
      <path d="M12 8.8v9.6" strokeDasharray="1.6 1.8" opacity="0.65" />
    </Frame>
  );
}

/** Solar return — the sun closing a full circuit back to its own degree. */
export function IconSolarReturn(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 2.6a9.4 9.4 0 1 1-6.6 2.7" />
      <path d="M5.4 1.6v3.7h3.7" />
    </Frame>
  );
}

/** Progressed spiral — one day per year, unwinding. */
export function IconSpiral(p: IconProps) {
  return (
    <Frame {...p}>
      <path d="M12 12a2.4 2.4 0 1 1 2.4 2.4A4.8 4.8 0 1 1 9.6 9.6 7.2 7.2 0 1 1 16.8 16.8 9.6 9.6 0 1 1 7.2 7.2" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Transit — a body crossing an established ring. */
export function IconTransit(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="8.4" opacity="0.55" strokeDasharray="2 2.6" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="19.2" cy="6.8" r="2.1" fill="currentColor" stroke="none" />
      <path d="M2.8 18.6 17.6 8.4" opacity="0.7" />
    </Frame>
  );
}

/** Clepsydra — the timezone / LMT question, as an instrument. */
export function IconTimeGlass(p: IconProps) {
  return (
    <Frame {...p}>
      <path d="M6.6 3h10.8M6.6 21h10.8" />
      <path d="M8 3c0 4.2 4 5.8 4 9s-4 4.8-4 9" />
      <path d="M16 3c0 4.2-4 5.8-4 9s4 4.8 4 9" />
      <path d="M9.6 18.4h4.8" opacity="0.6" />
    </Frame>
  );
}

/** Ecliptic band — the tilted path of the sun across the equator. */
export function IconEcliptic(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" opacity="0.45" />
      <path d="M4.2 16.4C7.6 8.8 16.4 8.8 19.8 7.6" />
      <circle cx="8.6" cy="13.4" r="1.5" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Language toggle drawn as a celestial globe with a graticule. */
export function IconGlobeGrid(p: IconProps) {
  return (
    <Frame {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3.4c2.6 2.4 4 5.3 4 8.6s-1.4 6.2-4 8.6c-2.6-2.4-4-5.3-4-8.6s1.4-6.2 4-8.6Z" />
      <path d="M5.2 7.2h13.6M5.2 16.8h13.6" opacity="0.45" />
    </Frame>
  );
}

/** Small caret used for RTL/LTR-aware "continue" affordances. */
export function IconArrowLead({ rtl, ...p }: IconProps & { rtl?: boolean }) {
  return (
    <Frame {...p}>
      <g transform={rtl ? "scale(-1 1) translate(-24 0)" : undefined}>
        <path d="M4.4 12h15.2" />
        <path d="M13.8 6.2 19.6 12l-5.8 5.8" />
      </g>
    </Frame>
  );
}

/** Pythagorean / Lo Shu 3×3 — used for the numbers studio. */
export function IconGrid(p: IconProps) {
  return (
    <Frame {...p}>
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="1.4" />
      <path d="M4.2 9.4h15.6M4.2 14.6h15.6M9.4 4.2v15.6M14.6 4.2v15.6" />
      <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
    </Frame>
  );
}

