/**
 * Bodies, aspects and layout helpers for an Astro-Seek-style radix.
 * Numbers come only from the already-computed ChartResult.
 */
import { ASPECT_DEGREES, DEFAULT_ORBS, ELEMENT_MAP, MAIN_PLANET_IDS, MODALITY_MAP, ZODIAC_SIGNS, type AspectName, type ElementName, type ModalityName } from "./constants";
import {
  angularDistance,
  calculateAspectOrb,
  dmsFromDegreeInSign,
  eclipticLongitude,
  getSignFromLongitude,
  houseForLongitude,
  isMainPlanet,
  normalizeAngle,
  planetId,
  signNumFromLongitude,
} from "./math";
import type { AspectData, ChartResult, PlanetPosition } from "./types";

export const WHEEL_POINT_IDS = [
  ...MAIN_PLANET_IDS,
  "TRUE_NODE",
  "SOUTH_NODE",
  "LILITH",
  "CHIRON",
] as const;

/** Order of the Astro-Seek triangular grid (planets + node/lilith/chiron + angles). */
export const GRID_IDS = [
  ...MAIN_PLANET_IDS,
  "TRUE_NODE",
  "LILITH",
  "CHIRON",
  "ASC",
  "MC",
] as const;

export type WheelBody = PlanetPosition & { id: string; synthetic?: boolean };

export interface WheelAspect {
  planet1: string;
  planet2: string;
  aspect_name: AspectName;
  orb: number;
  applying: boolean;
  planet1_longitude: number;
  planet2_longitude: number;
}

export function fmtDegMin(degreeInSign: number, minute?: number) {
  const d = Math.floor(((degreeInSign % 30) + 30) % 30);
  const m = minute != null ? minute : Math.floor((((degreeInSign % 30) + 30) % 30) % 1 * 60);
  return { d, m, label: `${d}°${String(m).padStart(2, "0")}` };
}

export function lonToDms(lon: number) {
  const n = normalizeAngle(lon);
  const sign = getSignFromLongitude(n);
  const degIn = n - signNumFromLongitude(n) * 30;
  const dms = dmsFromDegreeInSign(degIn);
  return { sign, ...dms, degreeInSign: degIn, longitude: n };
}

function syntheticPoint(id: string, name: string, longitude: number, speed: number, cusps?: number[]): WheelBody {
  const sign = getSignFromLongitude(longitude);
  const signNum = signNumFromLongitude(longitude);
  const degreeInSign = longitude - signNum * 30;
  const dms = dmsFromDegreeInSign(degreeInSign);
  return {
    id,
    planet: id,
    name,
    longitude,
    latitude: 0,
    distance: 0,
    sign,
    sign_num: signNum,
    degree_in_sign: degreeInSign,
    degree_minute: dms.minute,
    degree_second: dms.second,
    speed,
    retrograde: speed < 0,
    house: cusps ? houseForLongitude(longitude, cusps) : null,
    synthetic: true,
  };
}

export function wheelBodies(chart: ChartResult): WheelBody[] {
  const cusps = chart.houses.map((h) => h.cusp);
  const out: WheelBody[] = [];
  for (const p of chart.positions) {
    const id = planetId(p);
    if (id === "MEAN_NODE") continue;
    if (
      !(MAIN_PLANET_IDS as readonly string[]).includes(id) &&
      id !== "TRUE_NODE" &&
      id !== "LILITH" &&
      id !== "CHIRON"
    ) {
      continue;
    }
    out.push({ ...p, id });
  }
  const node = out.find((p) => p.id === "TRUE_NODE");
  if (node) {
    out.push(syntheticPoint("SOUTH_NODE", "South Node", normalizeAngle(node.longitude + 180), -node.speed, cusps));
  }
  const sun = out.find((p) => p.id === "SUN");
  const moon = out.find((p) => p.id === "MOON");
  if (sun && moon) {
    const day = (sun.house ?? 0) >= 7;
    const lon = day
      ? normalizeAngle(chart.ascendant + moon.longitude - sun.longitude)
      : normalizeAngle(chart.ascendant + sun.longitude - moon.longitude);
    const spd = day ? moon.speed - sun.speed : sun.speed - moon.speed;
    out.push(syntheticPoint("FORTUNE", "Part of Fortune", lon, spd, cusps));
  }
  return out;
}

export function angleBodies(chart: ChartResult): WheelBody[] {
  const cusps = chart.houses.map((h) => h.cusp);
  return [
    syntheticPoint("ASC", "Ascendant", chart.ascendant, 0, cusps),
    syntheticPoint("MC", "Midheaven", chart.mediumCoeli, 0, cusps),
    syntheticPoint("DSC", "Descendant", normalizeAngle(chart.ascendant + 180), 0, cusps),
    syntheticPoint("IC", "Imum Coeli", normalizeAngle(chart.mediumCoeli + 180), 0, cusps),
  ];
}

function applying(lon1: number, spd1: number, lon2: number, spd2: number, ideal: number) {
  const now = Math.abs(angularDistance(lon1, lon2) - ideal);
  const later = Math.abs(angularDistance(lon1 + spd1, lon2 + spd2) - ideal);
  return later + 1e-9 < now;
}

export function findWheelAspects(bodies: WheelBody[], orbScale = 1): WheelAspect[] {
  const results: WheelAspect[] = [];
  for (let i = 0; i < bodies.length; i++) {
    const p1 = bodies[i]!;
    for (let j = i + 1; j < bodies.length; j++) {
      const p2 = bodies[j]!;
      const lon1 = eclipticLongitude(p1);
      const lon2 = eclipticLongitude(p2);
      const dist = angularDistance(lon1, lon2);
      (Object.keys(ASPECT_DEGREES) as AspectName[]).forEach((name) => {
        const ideal = ASPECT_DEGREES[name];
        let maxOrb = DEFAULT_ORBS[name] * orbScale;
        const extra = p1.synthetic || p2.synthetic || !isMainPlanet(p1) || !isMainPlanet(p2);
        if (extra) maxOrb *= 0.8;
        if (p1.id === "ASC" || p1.id === "MC" || p2.id === "ASC" || p2.id === "MC") maxOrb = Math.min(maxOrb, 5);
        const diff = Math.abs(dist - ideal);
        if (diff <= maxOrb) {
          results.push({
            planet1: p1.id,
            planet2: p2.id,
            aspect_name: name,
            orb: calculateAspectOrb(lon1, lon2, ideal),
            applying: applying(lon1, p1.speed, lon2, p2.speed, ideal),
            planet1_longitude: lon1,
            planet2_longitude: lon2,
          });
        }
      });
    }
  }
  results.sort((a, b) => a.orb - b.orb);
  return results;
}

export function toAspectData(a: WheelAspect): AspectData {
  return {
    planet1: a.planet1,
    planet2: a.planet2,
    aspect_name: a.aspect_name,
    orb: a.orb,
    exactness: a.orb,
    planet1_longitude: a.planet1_longitude,
    planet2_longitude: a.planet2_longitude,
  };
}

export function spreadLongitudes(longitudes: number[], minSep = 9) {
  const adjusted = [...longitudes];
  const n = adjusted.length;
  if (n < 2) return adjusted;
  const idx = adjusted.map((_, i) => i).sort((a, b) => adjusted[a]! - adjusted[b]!);
  for (let pass = 0; pass < 12; pass++) {
    for (let k = 0; k < n; k++) {
      const i = idx[k]!;
      const j = idx[(k + 1) % n]!;
      let gap = adjusted[j]! - adjusted[i]!;
      if (gap < 0) gap += 360;
      if (gap < minSep) {
        const push = (minSep - gap) / 2;
        adjusted[i] = normalizeAngle(adjusted[i]! - push);
        adjusted[j] = normalizeAngle(adjusted[j]! + push);
      }
    }
  }
  return adjusted;
}

export function assignTracks(spread: number[], minSep = 11): number[] {
  const n = spread.length;
  const track = Array(n).fill(0);
  const idx = spread.map((_, i) => i).sort((a, b) => spread[a]! - spread[b]!);
  for (let k = 0; k < n; k++) {
    const prev = idx[(k - 1 + n) % n]!;
    const i = idx[k]!;
    let gapPrev = spread[i]! - spread[prev]!;
    if (gapPrev < 0) gapPrev += 360;
    if (gapPrev < minSep) {
      track[i] = (track[prev] + 1) % 3;
    }
  }
  return track;
}

export interface ElementCell {
  element: ElementName;
  modality: ModalityName;
  ids: string[];
}

export function elementModalityGrid(bodies: WheelBody[]): {
  cells: ElementCell[];
  colTotals: Record<ModalityName, number>;
  rowTotals: Record<ElementName, number>;
} {
  const cells: ElementCell[] = [];
  const elements: ElementName[] = ["FIRE", "EARTH", "AIR", "WATER"];
  const modalities: ModalityName[] = ["CARDINAL", "FIXED", "MUTABLE"];
  const colTotals: Record<ModalityName, number> = { CARDINAL: 0, FIXED: 0, MUTABLE: 0 };
  const rowTotals: Record<ElementName, number> = { FIRE: 0, EARTH: 0, AIR: 0, WATER: 0 };
  for (const el of elements) {
    for (const md of modalities) {
      const ids = bodies
        .filter((b) => {
          const e = ELEMENT_MAP[b.sign_num as keyof typeof ELEMENT_MAP];
          const m = MODALITY_MAP[b.sign_num as keyof typeof MODALITY_MAP];
          return e === el && m === md;
        })
        .map((b) => b.id);
      cells.push({ element: el, modality: md, ids });
      colTotals[md] += ids.length;
      rowTotals[el] += ids.length;
    }
  }
  return { cells, colTotals, rowTotals };
}

export function degreeStripItems(bodies: WheelBody[]) {
  return bodies
    .map((b) => ({
      id: b.id,
      degree: ((b.degree_in_sign % 30) + 30) % 30,
      sign: String(b.sign),
    }))
    .sort((a, b) => a.degree - b.degree);
}

export function signIndex(name: string) {
  const i = (ZODIAC_SIGNS as readonly string[]).indexOf(name);
  return i < 0 ? 0 : i;
}
