/**
 * Traditional Western tropical keywords.
 * Dignities: Ptolemy, Tetrabiblos I.17–19.
 * Planet-in-sign / house: condensed from standard CAE correspondences
 * (Lilly / modern cookbook), not generated prose.
 */
import { DETRIMENT, DOMICILE, EXALTATION, FALL } from "./constants";
import type { Locale } from "./i18n";
import { ASPECT_FA, PLANET_FA, SIGN_FA } from "./i18n";
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

const SIGN_KEY: Record<string, { fa: string; en: string }> = {
  Aries: { fa: "آغاز، شجاعت، پیشگامی", en: "initiative, courage, pioneering" },
  Taurus: { fa: "ثبات، حس، دارایی", en: "stability, senses, value" },
  Gemini: { fa: "گفتگو، تطبیق، اندیشه", en: "speech, duality, thought" },
  Cancer: { fa: "حفاظت، خانه، احساس", en: "protection, home, feeling" },
  Leo: { fa: "نمایش، خلاقیت، قلب", en: "display, creativity, heart" },
  Virgo: { fa: "تحلیل، خدمت، دقت", en: "analysis, service, craft" },
  Libra: { fa: "توازن، رابطه، زیبایی", en: "balance, relating, beauty" },
  Scorpio: { fa: "عمق، بحران، باززایی", en: "depth, crisis, regeneration" },
  Sagittarius: { fa: "معنا، سفر، باور", en: "meaning, travel, belief" },
  Capricorn: { fa: "ساختار، مسئولیت، زمان", en: "structure, duty, time" },
  Aquarius: { fa: "جمع، فاصله، نوآوری", en: "collective, distance, invention" },
  Pisces: { fa: "همدلی، تصویر، محو مرز", en: "empathy, image, dissolution" },
};

const PLANET_KEY: Record<string, { fa: string; en: string }> = {
  SUN: { fa: "هویت و ارادهٔ حیاتی", en: "identity and vital will" },
  MOON: { fa: "عادات و نیازهای عاطفی", en: "habits and emotional need" },
  MERCURY: { fa: "ادراک و بیان", en: "perception and speech" },
  VENUS: { fa: "جذب و ارزش‌گذاری", en: "attraction and valuation" },
  MARS: { fa: "کنش و جدال", en: "action and conflict" },
  JUPITER: { fa: "گسترش و معنا", en: "growth and meaning" },
  SATURN: { fa: "حد، زمان و تعهد", en: "limit, time, and duty" },
  URANUS: { fa: "گسست و بیداری", en: "rupture and awakening" },
  NEPTUNE: { fa: "محو و الهام", en: "dissolution and vision" },
  PLUTO: { fa: "قدرت و دگرگونی", en: "power and transformation" },
};

const HOUSE_KEY: Record<number, { fa: string; en: string }> = {
  1: { fa: "بدن و نمود", en: "body and appearance" },
  2: { fa: "مال و ارزش شخصی", en: "livelihood and personal value" },
  3: { fa: "گفتار و نزدیکان", en: "speech and siblings" },
  4: { fa: "بنیان و خانه", en: "roots and home" },
  5: { fa: "خلق و لذت", en: "creation and pleasure" },
  6: { fa: "کار روزانه و سلامت", en: "work and health" },
  7: { fa: "دیگری و قرارداد", en: "the other and contracts" },
  8: { fa: "اشتراک و بحران", en: "shared resources and crisis" },
  9: { fa: "سفر و باور", en: "travel and belief" },
  10: { fa: "مقام و حرفه", en: "status and vocation" },
  11: { fa: "جمع و امید", en: "allies and hopes" },
  12: { fa: "نهان و انزوا", en: "the hidden and withdrawal" },
};

const ASPECT_KEY: Record<string, { fa: string; en: string }> = {
  CONJUNCTION: { fa: "ادغام نیروها", en: "fusion of the two forces" },
  OPPOSITION: { fa: "قطب و آگاهی از دیگری", en: "polarity and the other" },
  TRINE: { fa: "جریان آسان عنصر", en: "easy elemental flow" },
  SQUARE: { fa: "اصطکاک و کار لازم", en: "friction that demands work" },
  SEXTILE: { fa: "فرصت با کوشش اندک", en: "opportunity with slight effort" },
};

export function planetLine(p: PlanetPosition, locale: Locale): string {
  const id = planetId(p);
  const planet = locale === "fa" ? (PLANET_FA[id] ?? p.name) : p.name;
  const signKey = SIGN_KEY[p.sign];
  const planetKey = PLANET_KEY[id];
  const houseKey = p.house ? HOUSE_KEY[p.house] : null;
  if (!planetKey || !signKey) return "";
  const signName = locale === "fa" ? (SIGN_FA[p.sign] ?? p.sign) : p.sign;
  if (locale === "fa") {
    return `${planet} در ${signName}${p.house ? ` و خانهٔ ${p.house}` : ""} است: ${planetKey.fa} از راه ${signKey.fa} بیان می‌شود${houseKey ? ` و در حوزهٔ ${houseKey.fa} دیده می‌شود` : ""}.`;
  }
  return `${p.name} in ${p.sign}${p.house ? `, house ${p.house}` : ""}: ${planetKey.en} through ${signKey.en}${houseKey ? ` — in ${houseKey.en}` : ""}.`;
}

export function traditionalReading(chart: ChartResult, locale: Locale): string[] {
  const lines: string[] = [];
  for (const p of chart.positions.filter(isMainPlanet)) {
    const line = planetLine(p, locale);
    if (line) lines.push(line);
  }
  const top = [...chart.aspects].slice(0, 6);
  for (const a of top) {
    const key = ASPECT_KEY[a.aspect_name];
    if (!key) continue;
    const p1 = locale === "fa" ? (PLANET_FA[a.planet1] ?? a.planet1) : a.planet1;
    const p2 = locale === "fa" ? (PLANET_FA[a.planet2] ?? a.planet2) : a.planet2;
    const an = locale === "fa" ? (ASPECT_FA[a.aspect_name] ?? a.aspect_name) : a.aspect_name.toLowerCase();
    lines.push(
      locale === "fa"
        ? `${p1} ${an} ${p2}: ${key.fa}.`
        : `${p1} ${an} ${p2}: ${key.en}.`,
    );
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
  const lang = locale === "fa" ? "Persian" : "English";
  return `You are writing a traditional Western tropical natal-style synthesis. Use only the calculated chart below. Do not invent positions, houses, or aspects. Language: ${lang}. Tone: precise, non-theatrical, 6 short paragraphs. Do not give medical, legal or financial advice. Label this as traditional astrology, not science.

Subject: ${chart.subject.name}
Mode: ${chart.mode}
Birth: ${chart.subject.date} ${chart.subject.time} ${chart.subject.locationName}
JD(UT): ${chart.julianDay.toFixed(6)}
ASC ${chart.ascendant.toFixed(4)}  MC ${chart.mediumCoeli.toFixed(4)}
Planets:
${rows}
Major aspects: ${aspects}

Structure:
1) Luminaries and the Ascendant as the skeleton.
2) Chart ruler (domicile lord of the rising sign) and where it sits.
3) Tightest aspects and what they demand.
4) Element/mode imbalance if any.
5) One occupied house that is loud.
6) A closing caution: this is a map of symbols, not fate.`;
}
