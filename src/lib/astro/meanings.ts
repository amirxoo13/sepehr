/**
 * Traditional Western tropical keywords.
 * Dignities: Ptolemy, Tetrabiblos I.17–19.
 * Authored in English; the UI translates via Google at display time.
 */
import { DETRIMENT, DOMICILE, EXALTATION, FALL } from "./constants";
import { LANGUAGE_BY_CODE } from "./languages";
import type { Locale } from "./i18n";
import { ASPECT_NAME, PLANET_NAME, SIGN_NAME } from "./i18n";
import { isMainPlanet, planetId } from "./math";
import type { ChartResult, PlanetPosition } from "./types";

export type Dignity = "domicile" | "exaltation" | "detriment" | "fall" | "peregrine";

export function dignityOf(planet: string, sign: string): Dignity {
  const id = planet.toUpperCase();
  if (DOMICILE[id]?.includes(sign as never)) return "domicile";
  if (EXALTATION[id] === sign) return "exaltation";
  if (DETRIMENT[id]?.includes(sign as never)) return "detriment";
  if (FALL[id] === sign) return "fall";
  return "peregrine";
}

const SIGN_KEY: Record<string, string> = {
  Aries: "initiative, courage, pioneering",
  Taurus: "stability, senses, value",
  Gemini: "speech, duality, thought",
  Cancer: "protection, home, feeling",
  Leo: "display, creativity, heart",
  Virgo: "analysis, service, craft",
  Libra: "balance, relating, beauty",
  Scorpio: "depth, crisis, regeneration",
  Sagittarius: "meaning, travel, belief",
  Capricorn: "structure, duty, time",
  Aquarius: "collective, distance, invention",
  Pisces: "empathy, image, dissolution",
};

const PLANET_KEY: Record<string, string> = {
  SUN: "identity and vital will",
  MOON: "habits and emotional need",
  MERCURY: "perception and speech",
  VENUS: "attraction and valuation",
  MARS: "action and conflict",
  JUPITER: "growth and meaning",
  SATURN: "limit, time, and duty",
  URANUS: "rupture and awakening",
  NEPTUNE: "dissolution and vision",
  PLUTO: "power and transformation",
};

const HOUSE_KEY: Record<number, string> = {
  1: "body and appearance",
  2: "livelihood and personal value",
  3: "speech and siblings",
  4: "roots and home",
  5: "creation and pleasure",
  6: "work and health",
  7: "the other and contracts",
  8: "shared resources and crisis",
  9: "travel and belief",
  10: "status and vocation",
  11: "allies and hopes",
  12: "the hidden and withdrawal",
};

const ASPECT_KEY: Record<string, string> = {
  CONJUNCTION: "fusion of the two forces",
  OPPOSITION: "polarity and the other",
  TRINE: "easy elemental flow",
  SQUARE: "friction that demands work",
  SEXTILE: "opportunity with slight effort",
};

export function planetLine(p: PlanetPosition, _locale?: Locale): string {
  const id = planetId(p);
  const planet = PLANET_NAME[id] ?? p.name;
  const signKey = SIGN_KEY[p.sign];
  const planetKey = PLANET_KEY[id];
  const houseKey = p.house ? HOUSE_KEY[p.house] : null;
  if (!planetKey || !signKey) return "";
  const signName = SIGN_NAME[p.sign] ?? p.sign;
  return `${planet} in ${signName}${p.house ? `, house ${p.house}` : ""}: ${planetKey} through ${signKey}${houseKey ? ` — in ${houseKey}` : ""}.`;
}

export function traditionalReading(chart: ChartResult, _locale?: Locale): string[] {
  const lines: string[] = [];
  for (const p of chart.positions.filter(isMainPlanet)) {
    const line = planetLine(p);
    if (line) lines.push(line);
  }
  const top = [...chart.aspects].slice(0, 6);
  for (const a of top) {
    const key = ASPECT_KEY[a.aspect_name];
    if (!key) continue;
    const p1 = PLANET_NAME[a.planet1] ?? a.planet1;
    const p2 = PLANET_NAME[a.planet2] ?? a.planet2;
    const an = ASPECT_NAME[a.aspect_name] ?? a.aspect_name.toLowerCase();
    lines.push(`${p1} ${an} ${p2}: ${key}.`);
  }
  return lines;
}

export function chartPrompt(chart: ChartResult, locale: Locale): string {
  const rows = chart.positions
    .filter(isMainPlanet)
    .map((p) => {
      const dms = `${Math.floor(p.degree_in_sign)}°${String(p.degree_minute).padStart(2, "0")}'`;
      return `${p.name} ${dms} ${p.sign} H${p.house ?? "?"} ${p.retrograde ? "Rx" : ""}`.trim();
    })
    .join("\n");
  const aspects = chart.aspects
    .slice(0, 12)
    .map((a) => `${a.planet1} ${a.aspect_name} ${a.planet2}`)
    .join(", ");
  const language = locale === "en" ? "English" : (LANGUAGE_BY_CODE[locale]?.name ?? locale);
  return `You are writing a traditional Western tropical natal-style synthesis. Use only the calculated chart below. Do not invent positions, houses, or aspects. Language: ${language}. Tone: precise, non-theatrical, 6 short paragraphs. Do not give medical, legal or financial advice. Label this as traditional astrology, not science.

Subject: ${chart.subject.name}
Mode: ${chart.mode}
Birth: ${chart.subject.date} ${chart.subject.time} ${chart.subject.locationName}
JD(UT): ${chart.julianDay.toFixed(6)}
ASC ${chart.ascendant.toFixed(4)}  MC ${chart.mediumCoeli.toFixed(4)}
Planets:
${rows}
Major aspects: ${aspects}
`;
}
