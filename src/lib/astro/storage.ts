import type { BirthInput } from "./types";

const KEY = "sepehr.saved-charts.v1";
const LOCALE_KEY = "sepehr.locale";

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

export function loadLocale(): "fa" | "en" {
  if (typeof window === "undefined") return "fa";
  const v = localStorage.getItem(LOCALE_KEY);
  return v === "en" ? "en" : "fa";
}

export function saveLocale(locale: "fa" | "en") {
  localStorage.setItem(LOCALE_KEY, locale);
}
