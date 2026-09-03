/** Print-chart ink (Astro-Seek / Astrodienst paper wheel). */
export const CHART = {
  paper: "#f7f4ee",
  ink: "#161616",
  muted: "#5a5a5a",
  faint: "#b0aaa2",
  hard: "#c62828",
  soft: "#1565c0",
  conj: "#2e7d32",
  axis: "#111111",
} as const;

/** Traditional glyph colours used by Astro-Seek. */
export const PLANET_COLOR: Record<string, string> = {
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

export const SIGN_COLOR: Record<string, string> = {
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

export const ASPECT_COLOR: Record<string, string> = {
  CONJUNCTION: CHART.conj,
  OPPOSITION: CHART.hard,
  SQUARE: CHART.hard,
  TRINE: CHART.soft,
  SEXTILE: CHART.soft,
};
