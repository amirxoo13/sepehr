/**
 * Pythagorean numerology from the civil birth date.
 *
 * Life path = sum of EVERY digit in D.M.YYYY, then reduce.
 *   5 Dec 1995 → 5+1+2+1+9+9+5 = 32 = 5
 *   (Not the wrong shortcut day+month+year already reduced: 5+3+7=15=6.)
 *
 * Birth number = calendar day of the month, reduced the same way (11 and 22 kept).
 * Personal year = birthday-to-birthday; the year used is the year the period started.
 * Digit grid = Hungarian / Lo Shu 3×3 with the eight classical arrows.
 *
 * This is a digit method, not astronomy and not a prediction.
 */

export type Reduced = {
  value: number;
  total: number;
  steps: number[];
  master: boolean;
  digits: number[];
  formula: string;
};

export type ArrowId = "123" | "456" | "789" | "147" | "258" | "369" | "159" | "357";

export type ArrowKind = "complete" | "missing" | "partial";

export type Arrow = {
  id: ArrowId;
  cells: [number, number, number];
  kind: ArrowKind;
};

export type DigitGrid = {
  /** Counts of digits 1–9 (index 0 unused). */
  counts: number[];
  arrows: Arrow[];
  complete: Arrow[];
  missing: Arrow[];
};

export type PersonalYear = Reduced & {
  startYear: number;
  startDate: string;
  endDate: string;
};

export type NameNumbers = {
  expression: Reduced;
  soul: Reduced;
  personality: Reduced;
  lettersUsed: number;
};

export type NumerologyReport = {
  year: number;
  month: number;
  day: number;
  iso: string;
  lifePath: Reduced;
  birthDay: number;
  birthNumber: Reduced;
  personalYear: PersonalYear;
  nextPersonalYear: PersonalYear;
  grid: DigitGrid;
  name: NameNumbers | null;
};

export const MASTER = new Set([11, 22, 33]);

const ARROW_CELLS: { id: ArrowId; cells: [number, number, number] }[] = [
  { id: "159", cells: [1, 5, 9] },
  { id: "357", cells: [3, 5, 7] },
  { id: "123", cells: [1, 2, 3] },
  { id: "456", cells: [4, 5, 6] },
  { id: "789", cells: [7, 8, 9] },
  { id: "147", cells: [1, 4, 7] },
  { id: "258", cells: [2, 5, 8] },
  { id: "369", cells: [3, 6, 9] },
];

/** Visual order of the Hungarian / Lo Shu square (top row 3-6-9). */
export const GRID_ROWS: number[][] = [
  [3, 6, 9],
  [2, 5, 8],
  [1, 4, 7],
];

export function parseIsoDate(iso: string): { year: number; month: number; day: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso.trim());
  if (!m) throw new Error("Date must be YYYY-MM-DD");
  return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function isoOf(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/** Every decimal digit of day, month, year — no zero-padding of day/month. */
export function digitsOfDate(year: number, month: number, day: number): number[] {
  return `${day}${month}${year}`.split("").map((c) => Number(c));
}

export function sumDigits(n: number): number {
  let s = 0;
  const t = Math.abs(Math.trunc(n));
  const str = String(t);
  for (let i = 0; i < str.length; i++) s += Number(str[i]);
  return s;
}

export function reduceNumber(total: number, keepMaster = true): { value: number; steps: number[]; master: boolean } {
  const steps = [total];
  let n = total;
  while (n > 9) {
    if (keepMaster && MASTER.has(n)) break;
    n = sumDigits(n);
    steps.push(n);
  }
  return { value: n, steps, master: MASTER.has(n) };
}

export function formatFormula(digits: number[], steps: number[]): string {
  const sum = digits.join(" + ");
  if (digits.length === 1 && steps.length === 1) return String(steps[0]);
  if (steps.length === 1) return `${sum} = ${steps[0]}`;
  return `${sum} = ${steps.join(" = ")}`;
}

function pack(year: number, month: number, day: number, keepMaster = true): Reduced {
  const digits = digitsOfDate(year, month, day);
  const total = digits.reduce((a, b) => a + b, 0);
  const red = reduceNumber(total, keepMaster);
  return {
    value: red.value,
    total,
    steps: red.steps,
    master: red.master,
    digits,
    formula: formatFormula(digits, red.steps),
  };
}

export function lifePathOf(year: number, month: number, day: number): Reduced {
  return pack(year, month, day, true);
}

export function birthNumberOf(day: number): Reduced {
  const digits = String(day).split("").map(Number);
  const red = reduceNumber(day, true);
  return {
    value: red.value,
    total: day,
    steps: red.steps,
    master: red.master,
    digits,
    formula: formatFormula(day > 9 ? digits : [day], red.steps),
  };
}

function civilBefore(a: { y: number; m: number; d: number }, b: { y: number; m: number; d: number }): boolean {
  if (a.y !== b.y) return a.y < b.y;
  if (a.m !== b.m) return a.m < b.m;
  return a.d < b.d;
}

/**
 * Personal year runs birthday → next birthday.
 * The year in the sum is the year that period started.
 * On the birthday itself the new year begins.
 */
export function personalYearOf(
  _birthYear: number,
  birthMonth: number,
  birthDay: number,
  asOf: { year: number; month: number; day: number },
): PersonalYear {
  const thisBday = { y: asOf.year, m: birthMonth, d: birthDay };
  const startYear = civilBefore({ y: asOf.year, m: asOf.month, d: asOf.day }, thisBday)
    ? asOf.year - 1
    : asOf.year;
  const reduced = pack(startYear, birthMonth, birthDay, true);
  return {
    ...reduced,
    startYear,
    startDate: isoOf(startYear, birthMonth, birthDay),
    endDate: isoOf(startYear + 1, birthMonth, birthDay),
  };
}

export function buildGrid(digits: number[]): DigitGrid {
  const counts = Array.from({ length: 10 }, () => 0);
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d]! += 1;
  }
  const arrows: Arrow[] = ARROW_CELLS.map((a) => {
    const present = a.cells.map((c) => counts[c]! > 0);
    const n = present.filter(Boolean).length;
    const kind: ArrowKind = n === 3 ? "complete" : n === 0 ? "missing" : "partial";
    return { id: a.id, cells: a.cells, kind };
  });
  return {
    counts,
    arrows,
    complete: arrows.filter((a) => a.kind === "complete"),
    missing: arrows.filter((a) => a.kind === "missing"),
  };
}

const PYTH: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};
const VOWELS = new Set(["A", "E", "I", "O", "U", "Y"]);

function reduceLetters(values: number[]): Reduced | null {
  if (!values.length) return null;
  const total = values.reduce((a, b) => a + b, 0);
  const red = reduceNumber(total, true);
  return {
    value: red.value,
    total,
    steps: red.steps,
    master: red.master,
    digits: values,
    formula: formatFormula(values, red.steps),
  };
}

export function nameNumbersOf(name: string): NameNumbers | null {
  const letters: { ch: string; n: number; vowel: boolean }[] = [];
  for (const raw of name.toUpperCase()) {
    const n = PYTH[raw];
    if (n == null) continue;
    letters.push({ ch: raw, n, vowel: VOWELS.has(raw) });
  }
  if (!letters.length) return null;
  const expression = reduceLetters(letters.map((l) => l.n));
  const soul = reduceLetters(letters.filter((l) => l.vowel).map((l) => l.n));
  const personality = reduceLetters(letters.filter((l) => !l.vowel).map((l) => l.n));
  if (!expression) return null;
  return {
    expression,
    soul: soul ?? expression,
    personality: personality ?? expression,
    lettersUsed: letters.length,
  };
}

export function numerologyOf(
  iso: string,
  asOfIso?: string,
  name?: string,
): NumerologyReport {
  const birth = parseIsoDate(iso);
  const asOf = parseIsoDate(asOfIso ?? new Date().toISOString().slice(0, 10));
  const lifePath = lifePathOf(birth.year, birth.month, birth.day);
  const birthNumber = birthNumberOf(birth.day);
  const personalYear = personalYearOf(birth.year, birth.month, birth.day, asOf);
  const nextAsOf = parseIsoDate(personalYear.endDate);
  const nextPersonalYear = personalYearOf(birth.year, birth.month, birth.day, nextAsOf);
  return {
    year: birth.year,
    month: birth.month,
    day: birth.day,
    iso: isoOf(birth.year, birth.month, birth.day),
    lifePath,
    birthDay: birth.day,
    birthNumber,
    personalYear,
    nextPersonalYear,
    grid: buildGrid(lifePath.digits),
    name: name ? nameNumbersOf(name) : null,
  };
}
