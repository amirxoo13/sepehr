/**
 * Chart modes matching astrology-platform/bot/bot.py::_build_mode_charts.
 * Natal / transit / synastry / composite / solar return / secondary progression.
 */
import { DateTime } from "luxon";
import type { ChartMode, HouseSystemId } from "./constants";
import { TROPICAL_YEAR_DAYS } from "./constants";
import {
  calcHouses,
  calcPositions,
  engineLabel,
  getSwe,
  julianDayUt,
  sunLongitude,
} from "./engine";
import {
  compositeMidpoints,
  crossAspects,
  eclipticLongitude,
  equalHousesFromAsc,
  findAspects,
  houseForLongitude,
  normalizeAngle,
  planetId,
  progressedInstant,
  shortestArcMidpoint,
  solarReturnAdjustDays,
  solarReturnGuess,
} from "./math";
import { resolveBirthUtc, utcHourDecimal } from "./time";
import type { BirthInput, ChartResult, HouseData, PlanetPosition } from "./types";

export interface ChartExtras {
  asOf?: Date;
  solarReturnYear?: number;
}

function instantOf(input: BirthInput) {
  const resolved = resolveBirthUtc(input.date, input.time, input.timezone, input.longitude);
  const utc = resolved.utcDateTime;
  return { resolved, utc };
}

async function natalSlice(input: BirthInput) {
  const swe = await getSwe();
  const { resolved, utc } = instantOf(input);
  const jd = julianDayUt(swe, utc.year, utc.month, utc.day, utcHourDecimal(utc));
  const system = (input.houseSystem ?? "P") as HouseSystemId;
  const { houses, ascendant, mc, cusps } = await calcHouses(
    swe,
    jd,
    input.latitude,
    input.longitude,
    system,
  );
  const positions = await calcPositions(swe, jd, cusps);
  const aspects = findAspects(positions);
  return {
    swe,
    jd,
    utc,
    resolved,
    houses,
    ascendant,
    mc,
    positions,
    aspects,
    system,
  };
}

function pack(args: {
  mode: ChartMode;
  subject: BirthInput;
  subject2?: BirthInput;
  jd: number;
  utc: DateTime;
  engine: string;
  houseSystem: HouseSystemId;
  ascendant: number;
  mediumCoeli: number;
  positions: PlanetPosition[];
  houses: HouseData[];
  aspects: ChartResult["aspects"];
  notes: string[];
}): ChartResult {
  return {
    mode: args.mode,
    title: args.subject.name,
    subject: args.subject,
    subject2: args.subject2,
    julianDay: args.jd,
    utcIso: args.utc.toUTC().toISO() ?? "",
    engine: args.engine,
    houseSystem: args.houseSystem,
    ayanamsa: "TROPICAL",
    ascendant: args.ascendant,
    mediumCoeli: args.mediumCoeli,
    positions: args.positions,
    houses: args.houses,
    aspects: args.aspects,
    notes: args.notes,
  };
}

export async function computeNatal(input: BirthInput): Promise<ChartResult> {
  const n = await natalSlice(input);
  const notes: string[] = [];
  if (n.resolved.isLmt) {
    notes.push(
      `Local Mean Time (LMT): longitude ${input.longitude.toFixed(4)}° → offset ${n.resolved.utcOffsetHours.toFixed(4)} hours from Greenwich.`,
    );
  }
  if (input.timeUnknown) {
    notes.push("Birth time unknown; noon was assumed and houses are approximate.");
  }
  return pack({
    mode: "natal",
    subject: input,
    jd: n.jd,
    utc: n.utc,
    engine: engineLabel(n.swe),
    houseSystem: n.system,
    ascendant: n.ascendant,
    mediumCoeli: n.mc,
    positions: n.positions,
    houses: n.houses,
    aspects: n.aspects,
    notes,
  });
}

export async function computeTransit(natal: BirthInput, when?: Date): Promise<ChartResult> {
  const n = await natalSlice(natal);
  const swe = n.swe;
  const now = DateTime.fromJSDate(when ?? new Date()).toUTC();
  const jd = julianDayUt(swe, now.year, now.month, now.day, utcHourDecimal(now));
  const transitPositions = await calcPositions(
    swe,
    jd,
    n.houses.map((h) => h.cusp),
  );
  const aspects = crossAspects(n.positions, transitPositions, 1.0);
  return pack({
    mode: "transit",
    subject: natal,
    jd,
    utc: now,
    engine: engineLabel(swe),
    houseSystem: n.system,
    ascendant: n.ascendant,
    mediumCoeli: n.mc,
    positions: transitPositions,
    houses: n.houses,
    aspects,
    notes: [
      "Transit: chosen-moment planets against the natal houses and angles.",
      `Natal: ${natal.date} ${natal.time} — ${natal.locationName}`,
    ],
  });
}

export async function computeSynastry(a: BirthInput, b: BirthInput): Promise<ChartResult> {
  const c1 = await natalSlice(a);
  const c2 = await natalSlice(b);
  const aspects = crossAspects(c1.positions, c2.positions, 0.7);
  return pack({
    mode: "synastry",
    subject: a,
    subject2: b,
    jd: c1.jd,
    utc: c1.utc,
    engine: engineLabel(c1.swe),
    houseSystem: c1.system,
    ascendant: c1.ascendant,
    mediumCoeli: c1.mc,
    positions: c1.positions,
    houses: c1.houses,
    aspects,
    notes: [
      "Synastry: cross-aspects of two natal charts with 0.7× natal orbs (matching the bot).",
      `Wheel: natal ${a.name}. Aspect table: ${a.name} × ${b.name}.`,
    ],
  });
}

export async function computeComposite(a: BirthInput, b: BirthInput): Promise<ChartResult> {
  const c1 = await natalSlice(a);
  const c2 = await natalSlice(b);
  const midpoints = compositeMidpoints(c1.positions, c2.positions);
  const compositeAsc = shortestArcMidpoint(c1.ascendant, c2.ascendant);
  const houses = equalHousesFromAsc(compositeAsc);
  const cusps = houses.map((h) => h.cusp);
  for (const p of midpoints) {
    p.house = houseForLongitude(p.longitude, cusps);
  }
  const aspects = findAspects(midpoints);
  return pack({
    mode: "composite",
    subject: a,
    subject2: b,
    jd: c1.jd,
    utc: c1.utc,
    engine: engineLabel(c1.swe),
    houseSystem: "E",
    ascendant: compositeAsc,
    mediumCoeli: normalizeAngle(compositeAsc + 270),
    positions: midpoints,
    houses,
    aspects,
    notes: [
      "Composite: shortest-arc midpoints, midpoint Ascendant, equal houses from the Ascendant (system E).",
    ],
  });
}

export async function computeProgressed(natal: BirthInput, asOf?: Date): Promise<ChartResult> {
  const swe = await getSwe();
  const { resolved, utc } = instantOf(natal);
  const birth = DateTime.fromISO(`${natal.date}T00:00:00`, { zone: "utc" });
  const target = DateTime.fromJSDate(asOf ?? new Date()).toUTC();
  const years = target.diff(birth, "days").days / TROPICAL_YEAR_DAYS;
  const progDate = progressedInstant(natal.date, years);
  let progUtc: DateTime;
  if (resolved.timezone === "UTC" && resolved.datetime.includes("T")) {
    const t = resolved.datetime.split("T")[1];
    progUtc = DateTime.fromISO(`${progDate}T${t}`, { zone: "utc" });
  } else {
    progUtc = DateTime.fromISO(`${progDate}T${natal.time}:00`, {
      zone: natal.timezone === "LMT" ? "utc" : natal.timezone || "utc",
    }).toUTC();
  }
  const jd = julianDayUt(swe, progUtc.year, progUtc.month, progUtc.day, utcHourDecimal(progUtc));
  const system = (natal.houseSystem ?? "P") as HouseSystemId;
  const { houses, ascendant, mc, cusps } = await calcHouses(
    swe,
    jd,
    natal.latitude,
    natal.longitude,
    system,
  );
  const positions = await calcPositions(swe, jd, cusps);
  return pack({
    mode: "progressed",
    subject: natal,
    jd,
    utc: progUtc,
    engine: engineLabel(swe),
    houseSystem: system,
    ascendant,
    mediumCoeli: mc,
    positions,
    houses,
    aspects: findAspects(positions),
    notes: [
      `Secondary progression: one day after birth = one year of life (tropical year ${TROPICAL_YEAR_DAYS}).`,
      `${years.toFixed(2)} years → progressed date ${progDate}. Birth time is kept.`,
      `Natal UTC: ${utc.toISO()}`,
    ],
  });
}

export async function computeSolarReturn(natal: BirthInput, year?: number): Promise<ChartResult> {
  const swe = await getSwe();
  const n = await natalSlice(natal);
  const natalSun = n.positions.find((p) => planetId(p) === "SUN");
  if (!natalSun) throw new Error("Natal Sun missing");
  const natalSunLon = eclipticLongitude(natalSun);
  const targetYear = year ?? DateTime.utc().year;
  const guessDate = solarReturnGuess(natal.date, targetYear);
  let srUtc: DateTime;
  if (n.resolved.timezone === "UTC" && n.resolved.datetime.includes("T")) {
    const t = n.resolved.datetime.split("T")[1];
    srUtc = DateTime.fromISO(`${guessDate}T${t}`, { zone: "utc" });
  } else {
    srUtc = DateTime.fromISO(`${guessDate}T${natal.time}:00`, {
      zone: natal.timezone === "LMT" ? "utc" : natal.timezone || "utc",
    }).toUTC();
  }

  // bot.py applies the first-order correction once.
  const gJd = julianDayUt(swe, srUtc.year, srUtc.month, srUtc.day, utcHourDecimal(srUtc));
  const sunOnGuess = await sunLongitude(swe, gJd);
  const deltaDays = solarReturnAdjustDays(natalSunLon, sunOnGuess);
  srUtc = srUtc.plus({ milliseconds: deltaDays * 86400000 });

  const jd = julianDayUt(swe, srUtc.year, srUtc.month, srUtc.day, utcHourDecimal(srUtc));
  const system = (natal.houseSystem ?? "P") as HouseSystemId;
  const { houses, ascendant, mc, cusps } = await calcHouses(
    swe,
    jd,
    natal.latitude,
    natal.longitude,
    system,
  );
  const positions = await calcPositions(swe, jd, cusps);
  return pack({
    mode: "solar_return",
    subject: natal,
    jd,
    utc: srUtc,
    engine: engineLabel(swe),
    houseSystem: system,
    ascendant,
    mediumCoeli: mc,
    positions,
    houses,
    aspects: findAspects(positions),
    notes: [
      `Solar return ${targetYear}: the instant the Sun returns to natal longitude (${natalSunLon.toFixed(4)}°).`,
      "First-order correction: short arc ÷ mean solar speed (IAU) — matching bot/astro.py.",
      `Return time: ${srUtc.toUTC().toFormat("yyyy-MM-dd HH:mm:ss")} UTC`,
    ],
  });
}

export async function computeNow(
  lat: number,
  lon: number,
  houseSystem: HouseSystemId = "P",
): Promise<ChartResult> {
  const swe = await getSwe();
  const now = DateTime.utc();
  const jd = julianDayUt(swe, now.year, now.month, now.day, utcHourDecimal(now));
  const { houses, ascendant, mc, cusps } = await calcHouses(swe, jd, lat, lon, houseSystem);
  const positions = await calcPositions(swe, jd, cusps);
  const subject: BirthInput = {
    name: "Now",
    date: now.toFormat("yyyy-MM-dd"),
    time: now.toFormat("HH:mm"),
    latitude: lat,
    longitude: lon,
    timezone: "UTC",
    locationName: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
    houseSystem,
  };
  return pack({
    mode: "now",
    subject,
    jd,
    utc: now,
    engine: engineLabel(swe),
    houseSystem,
    ascendant,
    mediumCoeli: mc,
    positions,
    houses,
    aspects: findAspects(positions),
    notes: ["Current sky (UTC) at the chosen coordinates."],
  });
}

export async function computeChart(
  mode: ChartMode,
  a: BirthInput,
  b?: BirthInput,
  extras?: ChartExtras,
): Promise<ChartResult> {
  switch (mode) {
    case "natal":
      return computeNatal(a);
    case "transit":
      return computeTransit(a, extras?.asOf);
    case "synastry":
      if (!b) throw new Error("Person 2 is required for synastry");
      return computeSynastry(a, b);
    case "composite":
      if (!b) throw new Error("Person 2 is required for composite");
      return computeComposite(a, b);
    case "solar_return":
      return computeSolarReturn(a, extras?.solarReturnYear);
    case "progressed":
      return computeProgressed(a, extras?.asOf);
    case "now":
      return computeNow(a.latitude, a.longitude, a.houseSystem ?? "P");
    default:
      return computeNatal(a);
  }
}

/** Gold-standard fixture from tests/fixtures/einstein_birth_chart.json */
export const EINSTEIN: BirthInput = {
  name: "Albert Einstein",
  date: "1879-03-14",
  time: "11:30",
  latitude: 48.4011,
  longitude: 9.9876,
  timezone: "Europe/Berlin",
  locationName: "Ulm, Germany",
  houseSystem: "P",
};

/** Astro-Seek comparison fixture (the public radix screenshot). */
export const SHIRAZ_1970: BirthInput = {
  name: "Shiraz 1970",
  date: "1970-01-01",
  time: "14:00",
  latitude: 29.6,
  longitude: 52.583333,
  timezone: "Asia/Tehran",
  locationName: "Shiraz, Iran",
  houseSystem: "P",
};

