/**
 * Swiss Ephemeris (Moshier, WASM) adapter.
 * Same library as astrology-platform's pyswisseph backend.
 * Positions verified against the Einstein fixture (Ulm, 1879-03-14 11:30
 * Europe/Berlin) to <1 arcsecond for the ten classical planets.
 */
import type { SwissEphemeris } from "@swisseph/browser";
import type { HouseSystemId } from "./constants";
import {
  dmsFromDegreeInSign,
  elementForSignNum,
  getSignFromLongitude,
  houseForLongitude,
  signNumFromLongitude,
} from "./math";
import type { HouseData, PlanetPosition } from "./types";

let instance: SwissEphemeris | null = null;
let initPromise: Promise<SwissEphemeris> | null = null;

type SweModule = typeof import("@swisseph/browser");
let sweMod: SweModule | null = null;

async function loadMod(): Promise<SweModule> {
  if (sweMod) return sweMod;
  sweMod = await import("@swisseph/browser");
  return sweMod;
}

export async function getSwe(): Promise<SwissEphemeris> {
  if (typeof window === "undefined") {
    throw new Error("Swiss Ephemeris runs in the browser");
  }
  if (instance) return instance;
  if (!initPromise) {
    initPromise = (async () => {
      const { SwissEphemeris } = await loadMod();
      const swe = new SwissEphemeris();
      try {
        await swe.init("/swisseph.wasm");
      } catch {
        await swe.init();
      }
      instance = swe;
      return swe;
    })();
  }
  return initPromise;
}

export async function getSweEnums() {
  const m = await loadMod();
  return {
    Planet: m.Planet,
    LunarPoint: m.LunarPoint,
    Asteroid: m.Asteroid,
    HouseSystem: m.HouseSystem,
    CalculationFlag: m.CalculationFlag,
  };
}

function toPlanetPosition(
  id: string,
  name: string,
  longitude: number,
  latitude: number,
  distance: number,
  speed: number,
  cusps?: number[],
): PlanetPosition {
  const sign = getSignFromLongitude(longitude);
  const signNum = signNumFromLongitude(longitude);
  const degreeInSign = longitude - signNum * 30;
  const dms = dmsFromDegreeInSign(degreeInSign);
  const house = cusps ? houseForLongitude(longitude, cusps) : null;
  return {
    planet: id,
    name,
    longitude,
    latitude,
    distance,
    sign,
    sign_num: signNum,
    degree_in_sign: degreeInSign,
    degree_minute: dms.minute,
    degree_second: dms.second,
    speed,
    retrograde: speed < 0,
    house,
  };
}

export async function calcPositions(
  swe: SwissEphemeris,
  jd: number,
  cusps?: number[],
): Promise<PlanetPosition[]> {
  const { Planet, LunarPoint, Asteroid, CalculationFlag } = await getSweEnums();
  const flags = CalculationFlag.MoshierEphemeris | CalculationFlag.Speed;
  const bodies: { id: string; name: string; body: number; optional?: boolean }[] = [
    { id: "SUN", name: "Sun", body: Planet.Sun },
    { id: "MOON", name: "Moon", body: Planet.Moon },
    { id: "MERCURY", name: "Mercury", body: Planet.Mercury },
    { id: "VENUS", name: "Venus", body: Planet.Venus },
    { id: "MARS", name: "Mars", body: Planet.Mars },
    { id: "JUPITER", name: "Jupiter", body: Planet.Jupiter },
    { id: "SATURN", name: "Saturn", body: Planet.Saturn },
    { id: "URANUS", name: "Uranus", body: Planet.Uranus },
    { id: "NEPTUNE", name: "Neptune", body: Planet.Neptune },
    { id: "PLUTO", name: "Pluto", body: Planet.Pluto },
    { id: "TRUE_NODE", name: "True Node", body: LunarPoint.TrueNode },
    { id: "LILITH", name: "Lilith", body: LunarPoint.MeanApogee },
    { id: "CHIRON", name: "Chiron", body: Asteroid.Chiron, optional: true },
  ];
  const out: PlanetPosition[] = [];
  for (const body of bodies) {
    try {
      const pos = swe.calculatePosition(jd, body.body, flags);
      out.push(
        toPlanetPosition(
          body.id,
          body.name,
          pos.longitude,
          pos.latitude,
          pos.distance,
          pos.longitudeSpeed,
          cusps,
        ),
      );
    } catch {
      if (!body.optional) throw new Error(`Swiss Ephemeris failed for ${body.id}`);
    }
  }
  return out;
}

export async function calcHouses(
  swe: SwissEphemeris,
  jd: number,
  latitude: number,
  longitude: number,
  system: HouseSystemId = "P",
): Promise<{ houses: HouseData[]; ascendant: number; mc: number; cusps: number[] }> {
  const { HouseSystem } = await getSweEnums();
  const map: Record<HouseSystemId, (typeof HouseSystem)[keyof typeof HouseSystem]> = {
    P: HouseSystem.Placidus,
    K: HouseSystem.Koch,
    E: HouseSystem.Equal,
    W: HouseSystem.WholeSign,
    C: HouseSystem.Campanus,
    R: HouseSystem.Regiomontanus,
  };
  const raw = swe.calculateHouses(jd, latitude, longitude, map[system] ?? HouseSystem.Placidus);
  const cuspList: number[] = [];
  for (let i = 1; i <= 12; i++) cuspList.push(raw.cusps[i] ?? 0);
  const houses: HouseData[] = cuspList.map((cusp, idx) => {
    const sign = getSignFromLongitude(cusp);
    const signNum = signNumFromLongitude(cusp);
    return {
      house: idx + 1,
      cusp,
      sign,
      sign_num: signNum,
      degree_in_sign: cusp - signNum * 30,
      element: elementForSignNum(signNum) ?? "FIRE",
    };
  });
  return {
    houses,
    ascendant: raw.ascendant,
    mc: raw.mc,
    cusps: cuspList,
  };
}

export function julianDayUt(
  swe: SwissEphemeris,
  year: number,
  month: number,
  day: number,
  hour: number,
): number {
  return swe.julianDay(year, month, day, hour);
}

export async function sunLongitude(swe: SwissEphemeris, jd: number): Promise<number> {
  const { Planet, CalculationFlag } = await getSweEnums();
  const flags = CalculationFlag.MoshierEphemeris | CalculationFlag.Speed;
  return swe.calculatePosition(jd, Planet.Sun, flags).longitude;
}

export function engineLabel(swe: SwissEphemeris): string {
  return `Swiss Ephemeris ${swe.version()} (Moshier)`;
}
