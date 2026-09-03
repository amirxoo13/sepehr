/**
 * Birth-time validation and Local Mean Time handling.
 * Ported from astrology-platform/bot/birthtime.py.
 *
 * Swiss Ephemeris only accepts IANA zones. LMT is converted:
 *   UTC offset (hours) = longitude_east / 15
 *
 * Explicit IANA names (containing '/') are honoured even before 1900 so the
 * Einstein fixture (Europe/Berlin) matches tests/fixtures/einstein_birth_chart.json.
 * Auto/LMT still uses longitude/15 for pre-1900 births, matching the bot.
 */
import { DateTime } from "luxon";
import { LMT_YEAR_THRESHOLD } from "./constants";
import type { BirthInstant } from "./types";

export class BirthTimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BirthTimeError";
  }
}

export function validateDate(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new BirthTimeError("فرمت تاریخ باید YYYY-MM-DD باشد. مثال: 1879-03-14");
  }
  const dt = DateTime.fromISO(dateStr, { zone: "utc" });
  if (!dt.isValid) {
    throw new BirthTimeError("تاریخ نامعتبر است. از فرمت YYYY-MM-DD استفاده کنید.");
  }
  return dateStr;
}

export function validateTime(timeStr: string): string {
  if (!/^\d{2}:\d{2}$/.test(timeStr)) {
    throw new BirthTimeError("فرمت زمان باید HH:MM باشد. مثال: 11:30");
  }
  const [h, m] = timeStr.split(":").map(Number);
  if (h! < 0 || h! > 23 || m! < 0 || m! > 59) {
    throw new BirthTimeError("ساعت باید بین 00:00 و 23:59 باشد.");
  }
  return timeStr;
}

export function calculateLmtOffset(longitude: number): number {
  return Number(longitude) / 15.0;
}

export function shouldUseLmt(dateStr: string, timezoneName?: string): boolean {
  if (timezoneName && timezoneName.toUpperCase() === "LMT") return true;
  if (timezoneName && timezoneName.includes("/")) return false;
  const year = Number(dateStr.slice(0, 4));
  if (!Number.isFinite(year)) return false;
  return year < LMT_YEAR_THRESHOLD;
}

export function formatDatetimeForApi(dateStr: string, timeStr: string): string {
  return `${dateStr}T${timeStr}:00`;
}

/**
 * Build the datetime/timezone pair Swiss Ephemeris accepts.
 * Pre-1900 (or explicit LMT): convert local clock via longitude/15 to UTC.
 * Explicit IANA zones are used as-is (Einstein fixture).
 */
export function resolveBirthUtc(
  dateStr: string,
  timeStr: string,
  timezoneName: string,
  longitude: number,
): Omit<BirthInstant, "julianDay" | "utcIso"> & { utcDateTime: DateTime } {
  if (shouldUseLmt(dateStr, timezoneName)) {
    const offsetHours = calculateLmtOffset(longitude);
    const local = DateTime.fromISO(`${dateStr}T${timeStr}:00`, { zone: "utc" });
    const utc = local.minus({ hours: offsetHours });
    return {
      datetime: utc.toFormat("yyyy-MM-dd'T'HH:mm:ss"),
      timezone: "UTC",
      utcOffsetHours: offsetHours,
      isLmt: true,
      utcDateTime: utc,
    };
  }

  const zone = timezoneName || "UTC";
  const local = DateTime.fromISO(`${dateStr}T${timeStr}:00`, { zone });
  if (!local.isValid) {
    throw new BirthTimeError(`منطقه زمانی نامعتبر: ${zone}`);
  }
  const utc = local.toUTC();
  return {
    datetime: formatDatetimeForApi(dateStr, timeStr),
    timezone: zone,
    utcOffsetHours: local.offset / 60,
    isLmt: false,
    utcDateTime: utc,
  };
}

export function utcHourDecimal(utc: DateTime): number {
  return utc.hour + utc.minute / 60 + utc.second / 3600 + utc.millisecond / 3_600_000;
}
