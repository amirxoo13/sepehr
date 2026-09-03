import type { ChartMode } from "./constants";
import { PLANET_ID_TO_NAME, ZODIAC_SIGNS } from "./constants";
import { dirOf, isKnownLocale, LANGUAGES } from "./languages";

export type Locale = string;
export type CopyKey = keyof typeof COPY;

/** Authored UI copy — English is the only source. Other languages are
 *  filled at runtime by Google Translate (see translate.functions.ts). */
export const COPY = {
  app: "Sepehr",
  tagline: "Computational astrology observatory",
  subtitle: "Swiss Ephemeris · Tropical · Placidus",
  start: "Calculate chart",
  skyNow: "Sky now",
  about: "About",
  natal: "Natal",
  transit: "Transit",
  synastry: "Synastry chart",
  composite: "Composite chart",
  solar_return: "Solar return",
  progressed: "Progressed",
  now: "Now",
  name: "Name",
  date: "Birth date",
  jalali: "Jalali",
  gregorian: "Gregorian",
  time: "Birth time",
  timeUnknown: "Time unknown",
  city: "Birth place",
  cityHint: "Search a city or enter lat,lon",
  houseSystem: "House system",
  calculate: "Calculate",
  calculating: "Computing with Swiss Ephemeris…",
  person1: "Person 1",
  person2: "Person 2",
  planets: "Planets",
  houses: "Houses",
  aspects: "Aspects",
  elements: "Elements",
  notes: "Method",
  engine: "Engine",
  save: "Save on this device",
  saved: "Saved charts",
  interpret: "Traditional reading",
  grok: "Deep reading",
  grokHint: "From this chart, via Grok",
  dignity: "Dignity",
  domicile: "Domicile",
  exaltation: "Exaltation",
  detriment: "Detriment",
  fall: "Fall",
  peregrine: "Peregrine",
  retrograde: "Rx",
  house: "House",
  orb: "Orb",
  exact: "Exact",
  fire: "Fire",
  earth: "Earth",
  air: "Air",
  water: "Water",
  footer: "Swiss Ephemeris © Astrodienst AG — AGPL. Real ephemeris, not decorative math.",
  heroLead:
    "Natal, transits, synastry, composite, solar return and secondary progressions — the bot’s algorithms, with a real wheel.",
  featureNatal: "Natal chart",
  featureNatalD: "Ecliptic longitudes, Placidus houses, Ascendant and Midheaven.",
  featureWheel: "Standard wheel",
  featureWheelD: "ASC at 9 o’clock, houses counterclockwise, aspects and stellium spread.",
  featureTime: "Civil time",
  featureTimeD: "IANA after 1900; LMT via longitude/15 for earlier births.",
  emptySaved: "No saved charts.",
  error: "Calculation failed.",
  loadEngine: "Loading ephemeris…",
  timezone: "Timezone",
  tzAuto: "Auto (LMT before 1900)",
  tzLmt: "Local Mean Time (longitude ÷ 15)",
  tzIana: "Civil IANA zone",
  asOf: "As-of date",
  asOfTime: "As-of time (UTC)",
  srYear: "Solar return year",
  searchMap: "Search map",
  downloadSvg: "Download SVG wheel",
  wheelCaption: "Empty tropical wheel · twelve signs · ASC at 9 o’clock",
  proof: "Live computation",
  modesTitle: "Six calculation modes",
  natalD: "Planets, houses and aspects at the birth instant.",
  transitD: "Chosen-moment planets on the natal houses.",
  synastryD: "Cross-aspects of two charts, 0.7× natal orbs.",
  compositeD: "Shortest-arc midpoints and equal houses from composite ASC.",
  solarD: "Sun’s return to natal longitude, first-order correction.",
  progressedD: "One day after birth equals one year of life.",
  credibility: "Source of the numbers",
  cred1: "Swiss Ephemeris (Moshier), the Astrodienst library",
  cred2: "Orbs: conjunction/opposition 10°, trine/square 8°, sextile 6°",
  cred3: "LMT = longitude ÷ 15 for births before 1900",
  cred4: "AGPL-3.0 — network use requires publishing the source",
  openStudio: "Open the studio",
  language: "Language",
  translating: "Translating…",
  birthChart: "Birth chart",
  longitude: "Long.",
  ruler: "ruler",
  savedOk: "Saved",
  sun: "Sun",
  moon: "Moon",
  asc: "ASC",
  degreeStrip: "Degree-in-sign strip (0°–30°)",
  enterChart: "Enter date, time and place to draw the wheel.",
  enterTwo: "Enter two birth records.",
  enterDate: "Enter a birth date to see the numbers.",
  nowHint: "Placidus houses for the chosen coordinates, right now.",
  applying: "applying",
  separating: "separating",
  aspectGridNote: "Aspect grid — a applying, s separating. Red = square/opposition, blue = trine/sextile, green = conjunction.",
  cardinal: "Cardinal",
  fixed: "Fixed",
  mutable: "Mutable",
  mode: "Mode",
  pattern: "Pattern",
  portrait: "Portrait",
  bigThree: "The big three",
  furtherPoints: "Further points",
  cusp: "Cusp",
  lord: "Lord",
  lordSits: "Lord sits",
  quality: "Quality",
  numbers: "Numbers",
  numerology: "Numerology",
  lifePath: "Life path",
  birthNumber: "Birth number",
  personalYear: "Personal year",
  arrowGrid: "Digit grid",
  digitSquare: "Pythagorean square",
  copyData: "Copy data",
  dataExport: "Data",
  speed: "Speed",
  featureNumbers: "Pythagorean numbers",
  featureNumbersD: "Life path, birth number, personal year and the 1-5-9 determination arrow from the date digits.",
  copied: "Copied",
  copyFailed: "Could not copy",
  untilBirthday: "until next birthday",
  fromBirthday: "from next birthday",
  completeArrow: "Complete arrow",
  missingArrow: "Missing arrow",
  nameNumbers: "Name numbers",
  expression: "Expression",
  soulUrge: "Heart’s desire",
  personalityNum: "Personality",
  numerologyHint: "Date only. A Latin spelling of the name is optional for letter numbers.",
  lst: "Local sidereal time",
} as const;

const tables = new Map<string, Record<string, string>>();

export function setTranslationTable(locale: string, table: Record<string, string>) {
  tables.set(locale, table);
}

export function getTranslationTable(locale: string): Record<string, string> {
  return tables.get(locale) ?? {};
}

export function t(locale: string, key: CopyKey): string {
  const en = COPY[key];
  if (!en || locale === "en") return en;
  return tables.get(locale)?.[en] ?? en;
}

export function tx(locale: string, english: string): string {
  if (!english || locale === "en") return english;
  return tables.get(locale)?.[english] ?? english;
}

export function modeLabel(locale: string, mode: ChartMode): string {
  return t(locale, mode as CopyKey);
}

export function isRtl(locale: string): boolean {
  return dirOf(locale) === "rtl";
}

export { LANGUAGES, dirOf, isKnownLocale };

export const SIGN_NAME: Record<string, string> = Object.fromEntries(ZODIAC_SIGNS.map((s) => [s, s]));

export const PLANET_NAME = PLANET_ID_TO_NAME;

export const ASPECT_NAME: Record<string, string> = {
  CONJUNCTION: "conjunction",
  OPPOSITION: "opposition",
  TRINE: "trine",
  SQUARE: "square",
  SEXTILE: "sextile",
};

/** Prefetch list: UI chrome + names Google should learn once per language. */
export function translationCatalog(): string[] {
  const extra = [
    ...Object.values(COPY),
    ...Object.values(PLANET_NAME),
    ...Object.values(SIGN_NAME),
    ...Object.values(ASPECT_NAME),
    "Placidus",
    "Koch",
    "Equal",
    "Whole Sign",
    "Campanus",
    "Regiomontanus",
    "Birth chart",
    "house",
    "House",
    "Angle",
    "Planet",
    "Aspect",
    "Points",
    "Chart key",
    "Configuration",
    "Retrogrades",
    "Portrait of this map",
    "Aspects of this planet",
    "Tightest aspects — higher weight in the reading.",
    "Overall pattern",
    "Traditional reading is a keyword list, not a prediction.",
    "Pythagorean numerology",
    "Life path",
    "Birth number",
    "Personal year",
    "Complete arrow",
    "Missing arrow",
    "partial line",
    "Calendar day",
    "A natal chart still needs time and place. Numbers need only the date.",
    "Copyable dump of this chart’s calculated positions, houses, aspects and numbers.",
    "Planet speed is ecliptic longitude per day. Negative speed is retrograde.",
  ];
  return [...new Set(extra.filter(Boolean))];
}

export const ASPECT_GLYPH: Record<string, string> = {
  CONJUNCTION: "☌",
  OPPOSITION: "☍",
  TRINE: "△",
  SQUARE: "□",
  SEXTILE: "⚹",
};

export const SIGN_GLYPH: Record<string, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

export const PLANET_GLYPH: Record<string, string> = {
  SUN: "☉",
  MOON: "☽",
  MERCURY: "☿",
  VENUS: "♀",
  MARS: "♂",
  JUPITER: "♃",
  SATURN: "♄",
  URANUS: "♅",
  NEPTUNE: "♆",
  PLUTO: "♇",
  CHIRON: "⚷",
  TRUE_NODE: "☊",
  MEAN_NODE: "☊",
  SOUTH_NODE: "☋",
  LILITH: "⚸",
  FORTUNE: "⊗",
  ASC: "AC",
  MC: "MC",
};

/** @deprecated — English names; translations happen via tx() */
export const SIGN_FA = SIGN_NAME;
export const PLANET_FA = PLANET_NAME;
export const ASPECT_FA = ASPECT_NAME;
