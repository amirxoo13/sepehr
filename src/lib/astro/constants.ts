/**
 * Constants copied from the astrology-platform bot (astro.py) which itself
 * copies swiss-ephemeris-api commit 8a03d63:
 *   app/services/zodiac.py, app/schemas/aspects.py
 */

export const MAIN_PLANET_IDS = [
  "SUN",
  "MOON",
  "MERCURY",
  "VENUS",
  "MARS",
  "JUPITER",
  "SATURN",
  "URANUS",
  "NEPTUNE",
  "PLUTO",
] as const;

export type PlanetId =
  | (typeof MAIN_PLANET_IDS)[number]
  | "TRUE_NODE"
  | "MEAN_NODE"
  | "SOUTH_NODE"
  | "LILITH"
  | "CHIRON"
  | "FORTUNE"
  | "ASC"
  | "MC";

export const PLANET_ID_TO_NAME: Record<string, string> = {
  SUN: "Sun",
  MOON: "Moon",
  MERCURY: "Mercury",
  VENUS: "Venus",
  MARS: "Mars",
  JUPITER: "Jupiter",
  SATURN: "Saturn",
  URANUS: "Uranus",
  NEPTUNE: "Neptune",
  PLUTO: "Pluto",
  CHIRON: "Chiron",
  MEAN_NODE: "North Node",
  TRUE_NODE: "True Node",
  SOUTH_NODE: "South Node",
  LILITH: "Lilith",
  FORTUNE: "Part of Fortune",
  ASC: "Ascendant",
  MC: "Midheaven",
};

export const PLANET_NAME_TO_ID = Object.fromEntries(
  Object.entries(PLANET_ID_TO_NAME).map(([id, name]) => [name, id]),
);

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

/** sign_num -> element, from app/services/zodiac.py */
export const ELEMENT_MAP = {
  0: "FIRE",
  1: "EARTH",
  2: "AIR",
  3: "WATER",
  4: "FIRE",
  5: "EARTH",
  6: "AIR",
  7: "WATER",
  8: "FIRE",
  9: "EARTH",
  10: "AIR",
  11: "WATER",
} as const;

export const MODALITY_MAP = {
  0: "CARDINAL",
  1: "FIXED",
  2: "MUTABLE",
  3: "CARDINAL",
  4: "FIXED",
  5: "MUTABLE",
  6: "CARDINAL",
  7: "FIXED",
  8: "MUTABLE",
  9: "CARDINAL",
  10: "FIXED",
  11: "MUTABLE",
} as const;

export type ElementName = "FIRE" | "EARTH" | "AIR" | "WATER";
export type ModalityName = "CARDINAL" | "FIXED" | "MUTABLE";

/** app/schemas/aspects.py */
export const ASPECT_DEGREES = {
  CONJUNCTION: 0.0,
  OPPOSITION: 180.0,
  TRINE: 120.0,
  SQUARE: 90.0,
  SEXTILE: 60.0,
} as const;

export type AspectName = keyof typeof ASPECT_DEGREES;

/** Default natal orbs from app/schemas/aspects.py _DEFAULT_ORBS */
export const DEFAULT_ORBS: Record<AspectName, number> = {
  CONJUNCTION: 10.0,
  OPPOSITION: 10.0,
  TRINE: 8.0,
  SQUARE: 8.0,
  SEXTILE: 6.0,
};

/** IAU mean tropical year — astro.py */
export const TROPICAL_YEAR_DAYS = 365.24219;
export const MEAN_SOLAR_SPEED = 360.0 / TROPICAL_YEAR_DAYS;

export const LMT_YEAR_THRESHOLD = 1900;

export const ANGLE_HOUSES = [
  [1, "ASC"],
  [4, "IC"],
  [7, "DSC"],
  [10, "MC"],
] as const;

export const HOUSE_SYSTEMS = [
  { id: "P", labelFa: "پلاسیدوس", labelEn: "Placidus" },
  { id: "K", labelFa: "کوخ", labelEn: "Koch" },
  { id: "E", labelFa: "متساوی از طالع", labelEn: "Equal" },
  { id: "W", labelFa: "کل‌برج", labelEn: "Whole Sign" },
  { id: "C", labelFa: "کامپانوس", labelEn: "Campanus" },
  { id: "R", labelFa: "رجیومونتانوس", labelEn: "Regiomontanus" },
] as const;

export type HouseSystemId = (typeof HOUSE_SYSTEMS)[number]["id"];

export const CHART_MODES = [
  "natal",
  "transit",
  "synastry",
  "composite",
  "solar_return",
  "progressed",
  "now",
] as const;

export type ChartMode = (typeof CHART_MODES)[number];

export const MODES_NEEDING_SECOND_PERSON = new Set(["synastry", "composite"]);

/**
 * Traditional essential dignities (Ptolemy, Tetrabiblos I.17–19).
 * Modern co-rulers noted separately in UI, not mixed into domicile.
 */
export const DOMICILE: Record<string, ZodiacSign[]> = {
  SUN: ["Leo"],
  MOON: ["Cancer"],
  MERCURY: ["Gemini", "Virgo"],
  VENUS: ["Taurus", "Libra"],
  MARS: ["Aries", "Scorpio"],
  JUPITER: ["Sagittarius", "Pisces"],
  SATURN: ["Capricorn", "Aquarius"],
};

export const EXALTATION: Record<string, ZodiacSign> = {
  SUN: "Aries",
  MOON: "Taurus",
  MERCURY: "Virgo",
  VENUS: "Pisces",
  MARS: "Capricorn",
  JUPITER: "Cancer",
  SATURN: "Libra",
};

export const DETRIMENT: Record<string, ZodiacSign[]> = {
  SUN: ["Aquarius"],
  MOON: ["Capricorn"],
  MERCURY: ["Sagittarius", "Pisces"],
  VENUS: ["Aries", "Scorpio"],
  MARS: ["Libra", "Taurus"],
  JUPITER: ["Gemini", "Virgo"],
  SATURN: ["Cancer", "Leo"],
};

export const FALL: Record<string, ZodiacSign> = {
  SUN: "Libra",
  MOON: "Scorpio",
  MERCURY: "Pisces",
  VENUS: "Virgo",
  MARS: "Cancer",
  JUPITER: "Capricorn",
  SATURN: "Aries",
};

/** Traditional domicile lord of each sign (Ptolemy). Used as chart ruler. */
export const SIGN_RULER: Record<ZodiacSign, string> = {
  Aries: "MARS",
  Taurus: "VENUS",
  Gemini: "MERCURY",
  Cancer: "MOON",
  Leo: "SUN",
  Virgo: "MERCURY",
  Libra: "VENUS",
  Scorpio: "MARS",
  Sagittarius: "JUPITER",
  Capricorn: "SATURN",
  Aquarius: "SATURN",
  Pisces: "JUPITER",
};

/** Chaldean faces / decans — Tetrabiblos I.18, 10° each. */
export const DECAN_RULERS: Record<ZodiacSign, [string, string, string]> = {
  Aries: ["MARS", "SUN", "VENUS"],
  Taurus: ["MERCURY", "MOON", "SATURN"],
  Gemini: ["JUPITER", "MARS", "SUN"],
  Cancer: ["VENUS", "MERCURY", "MOON"],
  Leo: ["SATURN", "JUPITER", "MARS"],
  Virgo: ["SUN", "VENUS", "MERCURY"],
  Libra: ["MOON", "SATURN", "JUPITER"],
  Scorpio: ["MARS", "SUN", "VENUS"],
  Sagittarius: ["MERCURY", "MOON", "SATURN"],
  Capricorn: ["JUPITER", "MARS", "SUN"],
  Aquarius: ["VENUS", "MERCURY", "MOON"],
  Pisces: ["SATURN", "JUPITER", "MARS"],
};
