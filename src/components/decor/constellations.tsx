/**
 * Constellation line-art, drawn from real star positions.
 *
 * Each figure is a list of named stars with a normalised position in a
 * 0–100 box and a visual magnitude, plus the traditional stick-figure
 * segments. Magnitude drives the drawn radius, so Betelgeuse and Rigel
 * genuinely dominate Orion the way they do in the sky — which is what
 * makes this read as a star chart rather than as decoration.
 *
 * Names are given in both Arabic/Persian and Latin because most of these
 * star names *are* Arabic — الدبران، الطائر، رأس الجوزاء — which is worth
 * surfacing on a Persian astrology site.
 */
import { cn } from "@/lib/utils";

type Star = { id: string; x: number; y: number; mag: number; name?: string };
type Figure = { stars: Star[]; lines: [string, string][]; fa: string; en: string };

export const FIGURES = {
  ursaMajor: {
    fa: "دبّ اکبر",
    en: "Ursa Major",
    stars: [
      { id: "alkaid", x: 8, y: 20, mag: 1.86, name: "بنات‌النعش" },
      { id: "mizar", x: 25, y: 27, mag: 2.23, name: "مِئزَر" },
      { id: "alioth", x: 40, y: 33, mag: 1.77, name: "اَلیَه" },
      { id: "megrez", x: 55, y: 38, mag: 3.31, name: "مَغرِز" },
      { id: "phecda", x: 59, y: 60, mag: 2.44, name: "فَخذ" },
      { id: "merak", x: 85, y: 62, mag: 2.37, name: "مَراق" },
      { id: "dubhe", x: 80, y: 32, mag: 1.79, name: "دُبّ" },
    ],
    lines: [
      ["alkaid", "mizar"],
      ["mizar", "alioth"],
      ["alioth", "megrez"],
      ["megrez", "phecda"],
      ["phecda", "merak"],
      ["merak", "dubhe"],
      ["dubhe", "megrez"],
    ],
  },
  orion: {
    fa: "جَبّار",
    en: "Orion",
    stars: [
      { id: "meissa", x: 52, y: 6, mag: 3.39, name: "مِیسان" },
      { id: "betelgeuse", x: 28, y: 21, mag: 0.5, name: "اِبط‌الجوزاء" },
      { id: "bellatrix", x: 72, y: 17, mag: 1.64, name: "بلاتریکس" },
      { id: "alnitak", x: 46, y: 57, mag: 1.77, name: "نِطاق" },
      { id: "alnilam", x: 59, y: 53, mag: 1.69, name: "نِظام" },
      { id: "mintaka", x: 72, y: 49, mag: 2.23, name: "مِنطَقه" },
      { id: "saiph", x: 38, y: 88, mag: 2.06, name: "سَیف" },
      { id: "rigel", x: 80, y: 85, mag: 0.13, name: "رِجل" },
    ],
    lines: [
      ["meissa", "betelgeuse"],
      ["meissa", "bellatrix"],
      ["betelgeuse", "bellatrix"],
      ["betelgeuse", "alnitak"],
      ["bellatrix", "mintaka"],
      ["mintaka", "alnilam"],
      ["alnilam", "alnitak"],
      ["alnitak", "saiph"],
      ["mintaka", "rigel"],
      ["saiph", "rigel"],
    ],
  },
  cassiopeia: {
    fa: "ذات‌الکرسی",
    en: "Cassiopeia",
    stars: [
      { id: "caph", x: 8, y: 30, mag: 2.27 },
      { id: "schedar", x: 29, y: 63, mag: 2.24, name: "صَدر" },
      { id: "gamma", x: 51, y: 26, mag: 2.15 },
      { id: "ruchbah", x: 73, y: 59, mag: 2.68, name: "رُکبَه" },
      { id: "segin", x: 93, y: 22, mag: 3.35 },
    ],
    lines: [
      ["caph", "schedar"],
      ["schedar", "gamma"],
      ["gamma", "ruchbah"],
      ["ruchbah", "segin"],
    ],
  },
  lyra: {
    fa: "شَلیاق",
    en: "Lyra",
    stars: [
      { id: "vega", x: 50, y: 9, mag: 0.03, name: "نَسر واقع" },
      { id: "sheliak", x: 34, y: 36, mag: 3.52 },
      { id: "zeta", x: 65, y: 33, mag: 4.34 },
      { id: "sulafat", x: 37, y: 70, mag: 3.24 },
      { id: "delta", x: 63, y: 66, mag: 4.3 },
    ],
    lines: [
      ["vega", "sheliak"],
      ["vega", "zeta"],
      ["sheliak", "sulafat"],
      ["sulafat", "delta"],
      ["delta", "zeta"],
    ],
  },
  cygnus: {
    fa: "دَجاجه",
    en: "Cygnus",
    stars: [
      { id: "deneb", x: 50, y: 5, mag: 1.25, name: "ذَنَب" },
      { id: "sadr", x: 50, y: 47, mag: 2.23, name: "صَدر" },
      { id: "albireo", x: 50, y: 93, mag: 3.05 },
      { id: "gienah", x: 14, y: 44, mag: 2.46, name: "جَناح" },
      { id: "delta", x: 86, y: 40, mag: 2.86 },
    ],
    lines: [
      ["deneb", "sadr"],
      ["sadr", "albireo"],
      ["gienah", "sadr"],
      ["sadr", "delta"],
    ],
  },
  scorpius: {
    fa: "عَقرَب",
    en: "Scorpius",
    stars: [
      { id: "graffias", x: 14, y: 8, mag: 2.6 },
      { id: "dschubba", x: 20, y: 22, mag: 2.29, name: "جَبهَه" },
      { id: "pi", x: 16, y: 35, mag: 2.89 },
      { id: "antares", x: 34, y: 40, mag: 1.06, name: "قلب‌العقرب" },
      { id: "tau", x: 40, y: 53, mag: 2.82 },
      { id: "epsilon", x: 50, y: 68, mag: 2.29 },
      { id: "mu", x: 61, y: 80, mag: 3.0 },
      { id: "zeta", x: 73, y: 87, mag: 3.62 },
      { id: "shaula", x: 88, y: 74, mag: 1.62, name: "شَولَه" },
      { id: "lesath", x: 92, y: 62, mag: 2.69 },
    ],
    lines: [
      ["graffias", "dschubba"],
      ["dschubba", "pi"],
      ["dschubba", "antares"],
      ["antares", "tau"],
      ["tau", "epsilon"],
      ["epsilon", "mu"],
      ["mu", "zeta"],
      ["zeta", "shaula"],
      ["shaula", "lesath"],
    ],
  },
} satisfies Record<string, Figure>;

export type FigureKey = keyof typeof FIGURES;

/** Visual magnitude → drawn radius. Brighter (lower mag) = larger. */
function radius(mag: number) {
  return Math.max(0.9, 3.4 - mag * 0.52);
}

export function Constellation({
  figure,
  className,
  color = "var(--color-gold)",
  lineOpacity = 0.34,
  labelled = false,
}: {
  figure: FigureKey;
  className?: string;
  color?: string;
  lineOpacity?: number;
  labelled?: boolean;
}) {
  const f = FIGURES[figure] as Figure;
  const byId = Object.fromEntries(f.stars.map((s) => [s.id, s]));

  return (
    <svg
      viewBox="-6 -6 112 112"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={f.en}
    >
      <title>{f.en}</title>
      <g stroke={color} strokeOpacity={lineOpacity} strokeWidth="0.6" strokeLinecap="round">
        {f.lines.map(([a, b], i) => {
          const p = byId[a]!;
          const q = byId[b]!;
          return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>
      <g fill={color}>
        {f.stars.map((s, i) => (
          <g key={s.id}>
            <circle
              cx={s.x}
              cy={s.y}
              r={radius(s.mag) * 3.2}
              fill={color}
              opacity={0.1}
              className="twinkle"
              style={{ animationDelay: `${(i * 0.47) % 4}s` }}
            />
            <circle cx={s.x} cy={s.y} r={radius(s.mag)} />
            {labelled && s.name ? (
              <text
                x={s.x}
                y={s.y - radius(s.mag) - 2.5}
                textAnchor="middle"
                fontSize="3.1"
                fill={color}
                opacity="0.6"
                fontFamily="var(--font-body)"
              >
                {s.name}
              </text>
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}
