import type { BirthInput } from "./types";
import { isKnownLocale } from "./languages";

const KEY = "sepehr.saved-charts.v1";
const LOCALE_KEY = "sepehr.locale.v2";
const I18N_CACHE = "sepehr.i18n.v1.";

export interface SavedChart {
  id: string;
  savedAt: string;
  input: BirthInput;
  input2?: BirthInput;
  mode: string;
}

export function loadSaved(): SavedChart[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedChart[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChart(entry: SavedChart): SavedChart[] {
  const all = loadSaved().filter((c) => c.id !== entry.id);
  all.unshift(entry);
  const next = all.slice(0, 24);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function removeChart(id: string): SavedChart[] {
  const next = loadSaved().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function loadLocale(): string {
  if (typeof window === "undefined") return "en";
  const v = localStorage.getItem(LOCALE_KEY);
  if (v && isKnownLocale(v)) return v;
  return "en";
}

export function saveLocale(locale: string) {
  localStorage.setItem(LOCALE_KEY, locale);
}

export function loadI18nCache(locale: string): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(I18N_CACHE + locale);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveI18nCache(locale: string, table: Record<string, string>) {
  try {
    localStorage.setItem(I18N_CACHE + locale, JSON.stringify(table));
  } catch {
    /* quota */
  }
}
