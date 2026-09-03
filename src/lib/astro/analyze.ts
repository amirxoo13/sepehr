/**
 * Chart analysis derived only from computed positions.
 * Techniques: Ptolemaic dignity, Hellenistic sect, lunar phase from
 * Sun–Moon elongation, chart ruler = domicile lord of ASC, house lords
 * (Lilly), hemispheres, stellium (≥3), angularity (1/4/7/10),
 * T-square / grand trine from the major-aspect set.
 */
import {
  DECAN_RULERS,
  ELEMENT_MAP,
  MODALITY_MAP,
  SIGN_RULER,
  ZODIAC_SIGNS,
  type ElementName,
  type ModalityName,
  type ZodiacSign,
} from "./constants";
import { dignityOf, type Dignity } from "./meanings";
import {
  angularDistance,
  isMainPlanet,
  normalizeAngle,
  planetId,
  trueAspectOrb,
} from "./math";
import type { AspectData, ChartResult, PlanetPosition } from "./types";

export interface PatternCounts {
  elements: Record<ElementName, number>;
  modalities: Record<ModalityName, number>;
  polarity: { masculine: number; feminine: number };
  hemisphere: { north: number; south: number; east: number; west: number };
}

export interface Stellium {
  kind: "sign" | "house";
  key: string;
  house?: number;
  planets: string[];
}

export interface HouseLord {
  house: number;
  cuspSign: ZodiacSign;
  ruler: string;
  rulerSign: string;
  rulerHouse: number | null;
  dignity: Dignity;
}

export interface ChartPattern {
  kind: "t-square" | "grand-trine";
  planets: string[];
  apex?: string;
}

export interface PlanetScore {
  planet: string;
  score: number;
}

export interface ChartAnalysis {
  sun: PlanetPosition | undefined;
  moon: PlanetPosition | undefined;
  node: PlanetPosition | undefined;
  lilith: PlanetPosition | undefined;
  chiron: PlanetPosition | undefined;
  ascSign: ZodiacSign;
  mcSign: ZodiacSign;
  chartRuler: string;
  ruler: PlanetPosition | undefined;
  sect: "day" | "night";
  lunarPhase: {
    name: "new" | "crescent" | "first_quarter" | "gibbous" | "full" | "disseminating" | "last_quarter" | "balsamic";
    elongation: number;
  };
  decan: { sign: ZodiacSign; face: 1 | 2 | 3; ruler: string };
  counts: PatternCounts;
  dominantElement: ElementName;
  weakElement: ElementName;
  dominantModality: ModalityName;
  stelliums: Stellium[];
  angular: string[];
  retrogrades: string[];
  tightest: AspectData[];
  occupiedHouses: number[];
  emptyHouses: number[];
  houseLords: HouseLord[];
  patterns: ChartPattern[];
  scores: PlanetScore[];
}

function signOf(lon: number): ZodiacSign {
  return ZODIAC_SIGNS[Math.floor(normalizeAngle(lon) / 30) % 12]!;
}

function lunarPhaseName(elong: number): ChartAnalysis["lunarPhase"]["name"] {
  if (elong < 45) return "new";
  if (elong < 90) return "crescent";
  if (elong < 135) return "first_quarter";
  if (elong < 180) return "gibbous";
  if (elong < 225) return "full";
  if (elong < 270) return "disseminating";
  if (elong < 315) return "last_quarter";
  return "balsamic";
}

function eastHouse(h: number) {
  return h === 10 || h === 11 || h === 12 || h === 1 || h === 2 || h === 3;
}

function pairKey(a: string, b: string) {
  return [a, b].sort().join("|");
}

function findPatterns(aspects: AspectData[]): ChartPattern[] {
  const trine = new Set<string>();
  const square = new Set<string>();
  const opposition = new Map<string, string>();
  const bodies = new Set<string>();
  for (const a of aspects) {
    const p1 = a.planet1.toUpperCase();
    const p2 = a.planet2.toUpperCase();
    bodies.add(p1);
    bodies.add(p2);
    const k = pairKey(p1, p2);
    if (a.aspect_name === "TRINE") trine.add(k);
    if (a.aspect_name === "SQUARE") square.add(k);
    if (a.aspect_name === "OPPOSITION") {
      opposition.set(p1, p2);
      opposition.set(p2, p1);
    }
  }
  const list = [...bodies];
  const patterns: ChartPattern[] = [];
  const seenTri = new Set<string>();
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      for (let k = j + 1; k < list.length; k++) {
        const a = list[i]!;
        const b = list[j]!;
        const c = list[k]!;
        const id = [a, b, c].sort().join("-");
        if (trine.has(pairKey(a, b)) && trine.has(pairKey(b, c)) && trine.has(pairKey(a, c))) {
          if (!seenTri.has(id)) {
            seenTri.add(id);
            patterns.push({ kind: "grand-trine", planets: [a, b, c] });
          }
        }
      }
    }
  }
  const seenT = new Set<string>();
  for (const [p1, p2] of opposition) {
    if (p1 > p2) continue;
    for (const apex of list) {
      if (apex === p1 || apex === p2) continue;
      if (square.has(pairKey(apex, p1)) && square.has(pairKey(apex, p2))) {
        const id = [p1, p2, apex].sort().join("-");
        if (!seenT.has(id)) {
          seenT.add(id);
          patterns.push({ kind: "t-square", planets: [p1, p2, apex], apex });
        }
      }
    }
  }
  return patterns;
}

export function analyzeChart(chart: ChartResult): ChartAnalysis {
  const main = chart.positions.filter(isMainPlanet);
  const sun = chart.positions.find((p) => planetId(p) === "SUN");
  const moon = chart.positions.find((p) => planetId(p) === "MOON");
  const node = chart.positions.find((p) => planetId(p) === "TRUE_NODE" || planetId(p) === "MEAN_NODE");
  const lilith = chart.positions.find((p) => planetId(p) === "LILITH");
  const chiron = chart.positions.find((p) => planetId(p) === "CHIRON");

  const ascSign = signOf(chart.ascendant);
  const mcSign = signOf(chart.mediumCoeli);
  const chartRuler = SIGN_RULER[ascSign];
  const ruler = chart.positions.find((p) => planetId(p) === chartRuler);

  const sunHouse = sun?.house ?? 0;
  const sect: "day" | "night" = sunHouse >= 7 ? "day" : "night";

  const elong = sun && moon ? angularDistance(sun.longitude, moon.longitude) : 0;
  let signed = 0;
  if (sun && moon) {
    signed = normalizeAngle(moon.longitude - sun.longitude);
  }
  const lunarPhase = { name: lunarPhaseName(signed), elongation: elong };

  const ascDeg = chart.ascendant % 30;
  const face = (Math.floor(ascDeg / 10) + 1) as 1 | 2 | 3;
  const decan = { sign: ascSign, face, ruler: DECAN_RULERS[ascSign][face - 1]! };

  const elements: Record<ElementName, number> = { FIRE: 0, EARTH: 0, AIR: 0, WATER: 0 };
  const modalities: Record<ModalityName, number> = { CARDINAL: 0, FIXED: 0, MUTABLE: 0 };
  const polarity = { masculine: 0, feminine: 0 };
  const hemisphere = { north: 0, south: 0, east: 0, west: 0 };

  for (const p of main) {
    const el = ELEMENT_MAP[p.sign_num as keyof typeof ELEMENT_MAP];
    const md = MODALITY_MAP[p.sign_num as keyof typeof MODALITY_MAP];
    if (el) elements[el] += 1;
    if (md) modalities[md] += 1;
    if (p.sign_num % 2 === 0) polarity.masculine += 1;
    else polarity.feminine += 1;
    const h = p.house ?? 0;
    if (h >= 1 && h <= 6) hemisphere.north += 1;
    if (h >= 7 && h <= 12) hemisphere.south += 1;
    if (eastHouse(h)) hemisphere.east += 1;
    else if (h) hemisphere.west += 1;
  }

  const dominantElement = (Object.keys(elements) as ElementName[]).sort(
    (a, b) => elements[b] - elements[a],
  )[0]!;
  const weakElement = (Object.keys(elements) as ElementName[]).sort(
    (a, b) => elements[a] - elements[b],
  )[0]!;
  const dominantModality = (Object.keys(modalities) as ModalityName[]).sort(
    (a, b) => modalities[b] - modalities[a],
  )[0]!;

  const bySign = new Map<string, string[]>();
  const byHouse = new Map<number, string[]>();
  for (const p of main) {
    const id = planetId(p);
    const list = bySign.get(String(p.sign)) ?? [];
    list.push(id);
    bySign.set(String(p.sign), list);
    if (p.house) {
      const hl = byHouse.get(p.house) ?? [];
      hl.push(id);
      byHouse.set(p.house, hl);
    }
  }
  const stelliums: Stellium[] = [];
  for (const [sign, planets] of bySign) {
    if (planets.length >= 3) stelliums.push({ kind: "sign", key: sign, planets });
  }
  for (const [house, planets] of byHouse) {
    if (planets.length >= 3) stelliums.push({ kind: "house", key: String(house), house, planets });
  }

  const angular = main.filter((p) => p.house === 1 || p.house === 4 || p.house === 7 || p.house === 10).map(planetId);
  const retrogrades = chart.positions.filter((p) => p.retrograde).map(planetId);
  const tightest = [...chart.aspects].sort((a, b) => trueAspectOrb(a) - trueAspectOrb(b)).slice(0, 8);
  const occupiedHouses = [...byHouse.keys()].sort((a, b) => a - b);
  const emptyHouses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((h) => !byHouse.has(h));

  const byId = new Map(chart.positions.map((p) => [planetId(p), p]));
  const houseLords: HouseLord[] = chart.houses.map((h) => {
    const cuspSign = signOf(h.cusp);
    const lord = SIGN_RULER[cuspSign];
    const pos = byId.get(lord);
    return {
      house: h.house,
      cuspSign,
      ruler: lord,
      rulerSign: pos ? String(pos.sign) : cuspSign,
      rulerHouse: pos?.house ?? null,
      dignity: pos ? dignityOf(lord, String(pos.sign)) : "peregrine",
    };
  });

  const patterns = findPatterns(chart.aspects);

  const scores: PlanetScore[] = main.map((p) => {
    const id = planetId(p);
    let score = 0;
    if (id === chartRuler) score += 5;
    if (id === "SUN" || id === "MOON") score += 2;
    const dig = dignityOf(id, String(p.sign));
    if (dig === "domicile") score += 3;
    if (dig === "exaltation") score += 2;
    if (dig === "detriment" || dig === "fall") score -= 1;
    if (p.house === 1 || p.house === 4 || p.house === 7 || p.house === 10) score += 2;
    else if (p.house === 2 || p.house === 5 || p.house === 8 || p.house === 11) score += 1;
    if (p.retrograde) score -= 0.5;
    const nAsp = chart.aspects.filter(
      (a) => a.planet1.toUpperCase() === id || a.planet2.toUpperCase() === id,
    ).length;
    score += nAsp * 0.4;
    return { planet: id, score };
  });
  scores.sort((a, b) => b.score - a.score);

  return {
    sun,
    moon,
    node,
    lilith,
    chiron,
    ascSign,
    mcSign,
    chartRuler,
    ruler,
    sect,
    lunarPhase,
    decan,
    counts: { elements, modalities, polarity, hemisphere },
    dominantElement,
    weakElement,
    dominantModality,
    stelliums,
    angular,
    retrogrades,
    tightest,
    occupiedHouses,
    emptyHouses,
    houseLords,
    patterns,
    scores,
  };
}

export function dignityLabel(planet: string, sign: string): Dignity {
  return dignityOf(planet, sign);
}
