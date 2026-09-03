/**
 * Copyable chart dump — positions, houses, aspects, numerology.
 * Built only from already-computed ChartResult numbers.
 */
import { ASPECT_DEGREES, type AspectName, ZODIAC_SIGNS } from "./constants";
import { PLANET_NAME } from "./i18n";
import { isMainPlanet, planetId, trueAspectOrb } from "./math";
import { numerologyOf, type NumerologyReport } from "./numerology";
import type { AspectData, ChartResult, PlanetPosition } from "./types";

function signOf(lon: number): string {
  return ZODIAC_SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)]!;
}

function dms(degreeInSign: number, minute?: number): string {
  const d = Math.floor(degreeInSign);
  const m = minute != null ? minute : Math.floor((degreeInSign % 1) * 60);
  return `${d}°${String(m).padStart(2, "0")}′`;
}

function lonDms(lon: number): string {
  const n = ((lon % 360) + 360) % 360;
  return `${dms(n % 30)} ${signOf(n)}`;
}

export function formatSpeed(speed: number): string {
  const sign = speed < 0 ? "−" : "";
  return `${sign}${Math.abs(speed).toFixed(3)}°/d`;
}

export function lstFromJulianDay(jd: number, longitude: number): string {
  const T = (jd - 2451545.0) / 36525;
  let gmst =
    280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
  gmst = ((gmst % 360) + 360) % 360;
  let hours = gmst / 15 + longitude / 15;
  hours = ((hours % 24) + 24) % 24;
  const h = Math.floor(hours);
  const minFrac = (hours - h) * 60;
  const m = Math.floor(minFrac);
  const s = Math.floor((minFrac - m) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function motion(a: AspectData, chart: ChartResult): string {
  if (a.applying === true) return "applying";
  if (a.applying === false) return "separating";
  const p1 = chart.positions.find((p) => planetId(p) === a.planet1.toUpperCase());
  const p2 = chart.positions.find((p) => planetId(p) === a.planet2.toUpperCase());
  if (!p1 || !p2) return "";
  const name = a.aspect_name as AspectName;
  const ideal = ASPECT_DEGREES[name];
  if (ideal == null) return "";
  const now = Math.abs(angleDist(p1.longitude, p2.longitude) - ideal);
  const later = Math.abs(angleDist(p1.longitude + p1.speed, p2.longitude + p2.speed) - ideal);
  return later + 1e-9 < now ? "applying" : "separating";
}

function angleDist(a: number, b: number): number {
  const d = Math.abs((((a - b) % 360) + 360) % 360);
  return Math.min(d, 360 - d);
}

function planetLine(p: PlanetPosition): string {
  const id = planetId(p);
  const name = (PLANET_NAME[id] ?? p.name).padEnd(12);
  const house = p.house != null ? `H${String(p.house).padStart(2, " ")}` : "   ";
  const rx = p.retrograde ? " Rx" : "   ";
  return `${name} ${dms(p.degree_in_sign, p.degree_minute).padStart(7)} ${String(p.sign).padEnd(12)} ${house}  ${formatSpeed(p.speed)}${rx}`;
}

export function formatChartDump(chart: ChartResult, numbers?: NumerologyReport | null): string {
  const nums = numbers ?? (chart.subject.date ? numerologyOf(chart.subject.date, undefined, chart.subject.name) : null);
  const lat = chart.subject.latitude;
  const lon = chart.subject.longitude;
  const latAbs = Math.abs(lat);
  const lonAbs = Math.abs(lon);
  const latStr = `${Math.floor(latAbs)}°${String(Math.round((latAbs % 1) * 60)).padStart(2, "0")}′${lat >= 0 ? "N" : "S"}`;
  const lonStr = `${Math.floor(lonAbs)}°${String(Math.round((lonAbs % 1) * 60)).padStart(2, "0")}′${lon >= 0 ? "E" : "W"}`;
  const lst = lstFromJulianDay(chart.julianDay, lon);
  const lines: string[] = [
    `Sepehr — ${chart.mode} chart`,
    `${chart.subject.name}`,
    `${chart.subject.date} ${chart.subject.time} ${chart.subject.timezone}`,
    `${chart.subject.locationName}  ${latStr}  ${lonStr}`,
    `House system: ${chart.houseSystem === "P" ? "Placidus" : chart.houseSystem} · Tropical`,
    `${chart.engine}`,
    `Julian Day ${chart.julianDay.toFixed(5)} UT ${chart.utcIso}`,
    `Local sidereal time ${lst}`,
    "",
    `ASC  ${lonDms(chart.ascendant)}`,
    `MC   ${lonDms(chart.mediumCoeli)}`,
    "",
    "Planet        Lon              House  Speed",
    "----------------------------------------------",
  ];
  for (const p of chart.positions.filter(isMainPlanet)) lines.push(planetLine(p));
  const extra = chart.positions.filter((p) => !isMainPlanet(p));
  if (extra.length) {
    lines.push("");
    lines.push("Points");
    for (const p of extra) lines.push(planetLine(p));
  }
  lines.push("");
  lines.push("Houses (cusps)");
  for (const h of chart.houses) {
    lines.push(`H${String(h.house).padStart(2, " ")}  ${dms(h.degree_in_sign)} ${h.sign}`);
  }
  lines.push("");
  lines.push("Aspects (true orb from exact)");
  for (const a of chart.aspects) {
    const orb = trueAspectOrb(a);
    const d = Math.floor(orb);
    const m = String(Math.floor((orb % 1) * 60)).padStart(2, "0");
    const n1 = PLANET_NAME[a.planet1] ?? a.planet1;
    const n2 = PLANET_NAME[a.planet2] ?? a.planet2;
    const an = String(a.aspect_name).toLowerCase();
    const mot = motion(a, chart);
    lines.push(`${n1} ${an} ${n2}  ${d}°${m}′  ${mot}`.trimEnd());
  }
  if (nums) {
    lines.push("");
    lines.push("Pythagorean numerology (digit method, not astronomy)");
    lines.push(`Life path ${nums.lifePath.value}   ${nums.lifePath.formula}`);
    lines.push(`Birth number ${nums.birthNumber.value}  (calendar day ${nums.birthDay})  ${nums.birthNumber.formula}`);
    lines.push(
      `Personal year ${nums.personalYear.value}  ${nums.personalYear.startDate} → ${nums.personalYear.endDate}   ${nums.personalYear.formula}`,
    );
    lines.push(
      `Next personal year ${nums.nextPersonalYear.value}  from ${nums.nextPersonalYear.startDate}   ${nums.nextPersonalYear.formula}`,
    );
    if (nums.grid.complete.length) {
      lines.push(`Complete arrows: ${nums.grid.complete.map((a) => a.cells.join("-")).join(", ")}`);
    }
    if (nums.grid.missing.length) {
      lines.push(`Missing arrows: ${nums.grid.missing.map((a) => a.cells.join("-")).join(", ")}`);
    }
    if (nums.name) {
      lines.push(`Name expression ${nums.name.expression.value}   ${nums.name.expression.formula}`);
      lines.push(`Heart’s desire ${nums.name.soul.value}`);
      lines.push(`Personality ${nums.name.personality.value}`);
    }
  }
  lines.push("");
  lines.push("Orbs: conjunction/opposition 10°, trine/square 8°, sextile 6°.");
  lines.push("Swiss Ephemeris © Astrodienst AG — AGPL. Real ephemeris, not decorative math.");
  return lines.join("\n");
}
