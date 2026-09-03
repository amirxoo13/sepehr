/**
 * Chart wheel themes.
 *
 * Two complete palettes, not one palette with a dark-mode hack:
 *
 *  - `night`   — the on-screen default. A deep indigo plate with gold
 *                engraving, luminous planet glyphs, and aspect lines in
 *                ember/azure. Reads as an instrument, and stops the wheel
 *                from punching a white hole through a dark page.
 *  - `paper`   — the Astro-Seek / Astrodienst printed radix. Kept intact
 *                because that is what people expect to *print* and what
 *                other astrologers can read at a glance.
 *
 * Both expose the identical key set, so the wheel just consumes a
 * `WheelTheme` and never branches on which one it got.
 */

export type WheelThemeName = "night" | "paper";

export type WheelTheme = {
  name: WheelThemeName;
  /** plate background */
  paper: string;
  /** primary engraving colour */
  ink: string;
  /** secondary text */
  muted: string;
  /** faintest ticks */
  faint: string;
  /** ring / rim colour */
  rim: string;
  /** angle lines (ASC/IC/DSC/MC) */
  axis: string;
  /** halo drawn behind a glyph so lines don't run through it */
  halo: string;
  /** element tints for the zodiac band */
  element: { fire: string; earth: string; air: string; water: string };
  planets: Record<string, string>;
  signs: Record<string, string>;
  aspects: Record<string, string>;
  /** whether glyphs get an SVG glow filter */
  luminous: boolean;
};

const PAPER_PLANETS: Record<string, string> = {
  SUN: "#d4760a",
  MOON: "#2f6db3",
  MERCURY: "#2f8a45",
  VENUS: "#2f8a45",
  MARS: "#c62828",
  JUPITER: "#1a3d8f",
  SATURN: "#161616",
  URANUS: "#d4760a",
  NEPTUNE: "#1a3d8f",
  PLUTO: "#2f8a45",
  TRUE_NODE: "#161616",
  MEAN_NODE: "#161616",
  SOUTH_NODE: "#161616",
  LILITH: "#161616",
  CHIRON: "#c62828",
  FORTUNE: "#161616",
  ASC: "#161616",
  MC: "#161616",
  DSC: "#161616",
  IC: "#161616",
};

/**
 * Night palette. Hues are pulled toward the luminance range that stays
 * legible on #0a0d1e — the printed reds and navies go muddy there, so
 * each one is lifted and desaturated rather than reused directly.
 */
const NIGHT_PLANETS: Record<string, string> = {
  SUN: "#f2c15f",
  MOON: "#cfe0f5",
  MERCURY: "#7fd4a8",
  VENUS: "#9ee0b6",
  MARS: "#ef7f6c",
  JUPITER: "#8aa8ef",
  SATURN: "#c8bfae",
  URANUS: "#7fd8e0",
  NEPTUNE: "#9d9bef",
  PLUTO: "#b98fd6",
  TRUE_NODE: "#d8cdb4",
  MEAN_NODE: "#d8cdb4",
  SOUTH_NODE: "#a89e88",
  LILITH: "#b9a3c9",
  CHIRON: "#e09a7e",
  FORTUNE: "#d8cdb4",
  ASC: "#f0e7d2",
  MC: "#f0e7d2",
  DSC: "#a89e88",
  IC: "#a89e88",
};

const PAPER_SIGNS: Record<string, string> = {
  Aries: "#c62828",
  Taurus: "#2e7d32",
  Gemini: "#d4760a",
  Cancer: "#2f6db3",
  Leo: "#c62828",
  Virgo: "#2e7d32",
  Libra: "#d4760a",
  Scorpio: "#1a3d8f",
  Sagittarius: "#c62828",
  Capricorn: "#1b5e20",
  Aquarius: "#d4760a",
  Pisces: "#2f6db3",
};

const NIGHT_SIGNS: Record<string, string> = {
  Aries: "#ef8a6a",
  Taurus: "#9fb87a",
  Gemini: "#e3c07a",
  Cancer: "#79b3d9",
  Leo: "#ef8a6a",
  Virgo: "#9fb87a",
  Libra: "#e3c07a",
  Scorpio: "#79b3d9",
  Sagittarius: "#ef8a6a",
  Capricorn: "#9fb87a",
  Aquarius: "#e3c07a",
  Pisces: "#79b3d9",
};

/** Element band tints — the zodiac ring is washed by element, not by sign. */
const ELEMENT_PAPER = {
  fire: "#c62828",
  earth: "#2e7d32",
  air: "#d4760a",
  water: "#2f6db3",
};

const ELEMENT_NIGHT = {
  fire: "#ef8a6a",
  earth: "#9fb87a",
  air: "#e3c07a",
  water: "#79b3d9",
};

export const SIGN_ELEMENT: Record<string, keyof typeof ELEMENT_NIGHT> = {
  Aries: "fire",
  Taurus: "earth",
  Gemini: "air",
  Cancer: "water",
  Leo: "fire",
  Virgo: "earth",
  Libra: "air",
  Scorpio: "water",
  Sagittarius: "fire",
  Capricorn: "earth",
  Aquarius: "air",
  Pisces: "water",
};

export const THEMES: Record<WheelThemeName, WheelTheme> = {
  night: {
    name: "night",
    paper: "#0a0d1e",
    ink: "#efe8d6",
    muted: "#9d9ab8",
    faint: "#4a4a68",
    rim: "#e3b96b",
    axis: "#f6d999",
    halo: "#0a0d1e",
    element: ELEMENT_NIGHT,
    planets: NIGHT_PLANETS,
    signs: NIGHT_SIGNS,
    aspects: {
      CONJUNCTION: "#8fd6a8",
      OPPOSITION: "#ef7f6c",
      SQUARE: "#ef7f6c",
      TRINE: "#7fa8e0",
      SEXTILE: "#7fa8e0",
    },
    luminous: true,
  },
  paper: {
    name: "paper",
    paper: "#f4efe2",
    ink: "#191410",
    muted: "#5a5a5a",
    faint: "#b0aaa2",
    rim: "#191410",
    axis: "#111111",
    halo: "#f4efe2",
    element: ELEMENT_PAPER,
    planets: PAPER_PLANETS,
    signs: PAPER_SIGNS,
    aspects: {
      CONJUNCTION: "#2e7d32",
      OPPOSITION: "#c62828",
      SQUARE: "#c62828",
      TRINE: "#1565c0",
      SEXTILE: "#1565c0",
    },
    luminous: false,
  },
};

export function wheelTheme(name: WheelThemeName = "night"): WheelTheme {
  return THEMES[name] ?? THEMES.night;
}

/* ── Screen palette exports ────────────────────────────────────────
   chart-report, chart-tables and chart-results import these names to
   colour inline glyphs. They now resolve to the *night* palette,
   because that is the plate those components actually render on.
   Under the old paper palette, Saturn / the nodes / Lilith were drawn
   at #161616 on a near-black surface — invisible. The printed palette
   is still reachable as `wheelTheme("paper")` and via @media print. */

export const CHART = {
  paper: THEMES.night.paper,
  ink: THEMES.night.ink,
  muted: THEMES.night.muted,
  faint: THEMES.night.faint,
  hard: THEMES.night.aspects.SQUARE,
  soft: THEMES.night.aspects.TRINE,
  conj: THEMES.night.aspects.CONJUNCTION,
  axis: THEMES.night.axis,
} as const;

export const PLANET_COLOR = NIGHT_PLANETS;
export const SIGN_COLOR = NIGHT_SIGNS;
export const ASPECT_COLOR = THEMES.night.aspects;

/** The printed radix palette, for anything that targets paper. */
export const PRINT = {
  planets: PAPER_PLANETS,
  signs: PAPER_SIGNS,
  aspects: THEMES.paper.aspects,
} as const;
