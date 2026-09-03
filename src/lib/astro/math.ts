/**
 * Angle, house-occupancy, midpoint and aspect helpers.
 * Ported from astrology-platform/bot/astro.py (copied from swiss-ephemeris-api
 * app/utils/houses.py and app/schemas/aspects.py, commit 8a03d63).
 */
import {
  ASPECT_DEGREES,
  DEFAULT_ORBS,
  ELEMENT_MAP,
  MAIN_PLANET_IDS,
  MEAN_SOLAR_SPEED,
  PLANET_ID_TO_NAME,
  PLANET_NAME_TO_ID,
  ZODIAC_SIGNS,
  type AspectName,
  type ElementName,
} from "./constants";
import type { AspectData, HouseData, PlanetPosition } from "./types";

export function normalizeAngle(angle: number): number {
  const n = angle % 360;
  return n < 0 ? n + 360 : n;
}

export function angularDistance(a: number, b: number): number {
  const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return Math.min(diff, 360 - diff);
}

export function planetId(posOrName: PlanetPosition | string): string {
  if (typeof posOrName === "string") {
    return PLANET_NAME_TO_ID[posOrName] ?? posOrName.toUpperCase();
  }
  if (posOrName.planet) return posOrName.planet.toUpperCase();
  const name = posOrName.name ?? "";
  return PLANET_NAME_TO_ID[name] ?? name.toUpperCase();
}

export function planetDisplayName(posOrName: PlanetPosition | string): string {
  if (typeof posOrName === "string") {
    return PLANET_ID_TO_NAME[posOrName.toUpperCase()] ?? posOrName;
  }
  if (posOrName.name) return posOrName.name;
  return PLANET_ID_TO_NAME[String(posOrName.planet ?? "").toUpperCase()] ?? "";
}

export function isMainPlanet(posOrName: PlanetPosition | string): boolean {
  return (MAIN_PLANET_IDS as readonly string[]).includes(planetId(posOrName));
}

export function eclipticLongitude(pos: PlanetPosition | HouseData): number {
  if ("longitude" in pos && pos.longitude != null) return Number(pos.longitude);
  if ("cusp" in pos && pos.cusp != null) return Number(pos.cusp);
  throw new Error("position is missing longitude/cusp");
}

export function houseCusps(houses: HouseData[]): number[] {
  return houses.slice(0, 12).map((h) => {
    if (h.cusp != null) return Number(h.cusp);
    throw new Error("house is missing cusp");
  });
}

/**
 * House number (1-12) containing the given ecliptic longitude.
 * Copied from swiss-ephemeris-api app/utils/houses.py (commit 8a03d63).
 */
export function houseForLongitude(longitude: number, cusps: number[]): number | null {
  if (!cusps || cusps.length < 12) return null;
  const lon = normalizeAngle(longitude);
  for (let i = 0; i < 12; i++) {
    const lo = normalizeAngle(cusps[i]!);
    const hi = normalizeAngle(cusps[(i + 1) % 12]!);
    const inHouse = lo < hi ? lo <= lon && lon < hi : lon >= lo || lon < hi;
    if (inHouse) return i + 1;
  }
  return null;
}

export function elementForSignNum(signNum: number): ElementName | undefined {
  return ELEMENT_MAP[signNum as keyof typeof ELEMENT_MAP];
}

export function getSignFromLongitude(longitude: number): (typeof ZODIAC_SIGNS)[number] {
  const index = Math.floor(normalizeAngle(longitude) / 30) % 12;
  return ZODIAC_SIGNS[index]!;
}

export function signNumFromLongitude(longitude: number): number {
  return Math.floor(normalizeAngle(longitude) / 30) % 12;
}

export function dmsFromDegreeInSign(degreeInSign: number): {
  degree: number;
  minute: number;
  second: number;
} {
  const degree = Math.floor(degreeInSign);
  const minFrac = (degreeInSign - degree) * 60;
  const minute = Math.floor(minFrac);
  const second = Math.floor((minFrac - minute) * 60);
  return { degree, minute, second };
}

export function calculateAspectOrb(lon1: number, lon2: number, targetAngle: number): number {
  return Math.abs(angularDistance(lon1, lon2) - targetAngle);
}

/**
 * Degrees from exact. AspectData.orb from the API is remaining allowance
 * (orb_width - diff), not the astrologer's 'orb from exact'.
 */
export function trueAspectOrb(aspect: AspectData): number {
  const name = aspect.aspect_name as AspectName;
  if (
    name in ASPECT_DEGREES &&
    aspect.planet1_longitude != null &&
    aspect.planet2_longitude != null
  ) {
    return calculateAspectOrb(
      aspect.planet1_longitude,
      aspect.planet2_longitude,
      ASPECT_DEGREES[name],
    );
  }
  return Number(aspect.orb || 0);
}

export function findAspects(positions: PlanetPosition[], maxOrbScale = 1.0): AspectData[] {
  const bodies = positions.filter(isMainPlanet);
  const results: AspectData[] = [];
  for (let i = 0; i < bodies.length; i++) {
    const p1 = bodies[i]!;
    for (let j = i + 1; j < bodies.length; j++) {
      const p2 = bodies[j]!;
      const lon1 = eclipticLongitude(p1);
      const lon2 = eclipticLongitude(p2);
      const dist = angularDistance(lon1, lon2);
      (Object.keys(ASPECT_DEGREES) as AspectName[]).forEach((aspectName) => {
        const ideal = ASPECT_DEGREES[aspectName];
        const maxOrb = DEFAULT_ORBS[aspectName] * maxOrbScale;
        const diff = Math.abs(dist - ideal);
        if (diff <= maxOrb) {
          results.push({
            planet1: planetId(p1),
            planet2: planetId(p2),
            aspect_name: aspectName,
            orb: round4(maxOrb - diff),
            exactness: round4(maxOrb - diff),
            planet1_longitude: round6(lon1),
            planet2_longitude: round6(lon2),
          });
        }
      });
    }
  }
  results.sort((a, b) => trueAspectOrb(a) - trueAspectOrb(b));
  return results;
}

export function crossAspects(
  positions1: PlanetPosition[],
  positions2: PlanetPosition[],
  maxOrb = 0.7,
): AspectData[] {
  const aspects: AspectData[] = [];
  const bodies1 = positions1.filter(isMainPlanet);
  const bodies2 = positions2.filter(isMainPlanet);
  for (const p1 of bodies1) {
    const lon1 = eclipticLongitude(p1);
    for (const p2 of bodies2) {
      const lon2 = eclipticLongitude(p2);
      const dist = angularDistance(lon1, lon2);
      (Object.keys(ASPECT_DEGREES) as AspectName[]).forEach((aspectName) => {
        const ideal = ASPECT_DEGREES[aspectName];
        const maxOrbDegrees = DEFAULT_ORBS[aspectName] * maxOrb;
        const diff = Math.abs(dist - ideal);
        if (diff <= maxOrbDegrees) {
          aspects.push({
            planet1: planetId(p1),
            planet2: planetId(p2),
            aspect_name: aspectName,
            orb: round4(maxOrbDegrees - diff),
            exactness: round4(maxOrbDegrees - diff),
            planet1_longitude: round6(lon1),
            planet2_longitude: round6(lon2),
          });
        }
      });
    }
  }
  aspects.sort((a, b) => trueAspectOrb(a) - trueAspectOrb(b));
  return aspects;
}

/** Shortest-arc midpoint between two longitudes. */
export function shortestArcMidpoint(lon1: number, lon2: number): number {
  const diff = normalizeAngle(lon2 - lon1);
  if (diff > 180) return normalizeAngle(lon1 - (360 - diff) / 2);
  return normalizeAngle(lon1 + diff / 2);
}

export function compositeMidpoints(
  positions1: PlanetPosition[],
  positions2: PlanetPosition[],
): PlanetPosition[] {
  const index2 = new Map(positions2.map((p) => [planetId(p), p]));
  const composite: PlanetPosition[] = [];
  for (const p1 of positions1) {
    if (!isMainPlanet(p1)) continue;
    const p2 = index2.get(planetId(p1));
    if (!p2) continue;
    const lon1 = eclipticLongitude(p1);
    const lon2 = eclipticLongitude(p2);
    const midpoint = shortestArcMidpoint(lon1, lon2);
    const sign = getSignFromLongitude(midpoint);
    const signNum = ZODIAC_SIGNS.indexOf(sign);
    const degreeInSign = midpoint % 30;
    const dms = dmsFromDegreeInSign(degreeInSign);
    composite.push({
      planet: planetId(p1),
      name: planetDisplayName(p1),
      longitude: midpoint,
      latitude: 0,
      distance: 0,
      sign,
      sign_num: signNum,
      degree_in_sign: degreeInSign,
      degree_minute: dms.minute,
      degree_second: dms.second,
      speed: 0,
      retrograde: false,
    });
  }
  return composite;
}

/** Equal houses from ASC — Swiss Ephemeris house system 'E'. */
export function equalHousesFromAsc(ascLongitude: number): HouseData[] {
  const houses: HouseData[] = [];
  for (let i = 0; i < 12; i++) {
    const cuspLon = normalizeAngle(ascLongitude + i * 30);
    const sign = getSignFromLongitude(cuspLon);
    const signNum = ZODIAC_SIGNS.indexOf(sign);
    houses.push({
      house: i + 1,
      cusp: cuspLon,
      sign,
      sign_num: signNum,
      degree_in_sign: cuspLon % 30,
      element: elementForSignNum(signNum) ?? "FIRE",
    });
  }
  return houses;
}

export function progressedInstant(birthDateStr: string, progressYears: number): string {
  const birth = new Date(`${birthDateStr}T00:00:00Z`);
  const progressed = new Date(birth.getTime() + progressYears * 86400000);
  const y = progressed.getUTCFullYear();
  const m = String(progressed.getUTCMonth() + 1).padStart(2, "0");
  const d = String(progressed.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function solarReturnGuess(birthDateStr: string, targetYear: number): string {
  const [, month, day] = birthDateStr.split("-");
  return `${targetYear}-${month}-${day}`;
}

/**
 * First-order solar-return correction in days.
 * Signed shortest arc (natalSun - guessSun) / mean solar speed.
 * bot/astro.py :: solar_return_adjust_days
 */
export function solarReturnAdjustDays(natalSunLon: number, sunLonOnGuess: number): number {
  const diff = ((natalSunLon - sunLonOnGuess + 180) % 360) - 180;
  return diff / MEAN_SOLAR_SPEED;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}
