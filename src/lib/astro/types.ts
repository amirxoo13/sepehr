import type { AspectName, ChartMode, ElementName, HouseSystemId, ZodiacSign } from "./constants";

export interface PlanetPosition {
  planet: string;
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  sign: ZodiacSign | string;
  sign_num: number;
  degree_in_sign: number;
  degree_minute: number;
  degree_second: number;
  speed: number;
  retrograde: boolean;
  house?: number | null;
}

export interface HouseData {
  house: number;
  cusp: number;
  sign: ZodiacSign | string;
  sign_num: number;
  degree_in_sign: number;
  element: ElementName;
}

export interface AspectData {
  planet1: string;
  planet2: string;
  aspect_name: AspectName | string;
  orb: number;
  exactness: number;
  planet1_longitude: number;
  planet2_longitude: number;
}

export interface BirthInput {
  name: string;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  timezone: string;
  locationName: string;
  houseSystem?: HouseSystemId;
  timeUnknown?: boolean;
}

export interface BirthInstant {
  datetime: string;
  timezone: string;
  utcIso: string;
  julianDay: number;
  utcOffsetHours: number;
  isLmt: boolean;
}

export interface ChartResult {
  mode: ChartMode;
  title: string;
  subject: BirthInput;
  subject2?: BirthInput;
  julianDay: number;
  utcIso: string;
  engine: string;
  houseSystem: HouseSystemId;
  ayanamsa: "TROPICAL";
  ascendant: number;
  mediumCoeli: number;
  positions: PlanetPosition[];
  houses: HouseData[];
  aspects: AspectData[];
  notes: string[];
}

export interface City {
  name: string;
  nameFa: string;
  country: string;
  countryFa: string;
  admin1?: string;
  lat: number;
  lon: number;
  tz: string;
}

export interface GeocodeHit {
  name: string;
  country: string;
  admin1: string;
  lat: number;
  lon: number;
  tz: string;
}
