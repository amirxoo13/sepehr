import assert from "node:assert/strict";
import { test } from "node:test";
import {
  birthNumberOf,
  buildGrid,
  digitsOfDate,
  lifePathOf,
  numerologyOf,
  personalYearOf,
} from "./numerology.ts";

test("Behnoush 5 Dec 1995: full-digit life path is 5, not 6", () => {
  assert.deepEqual(digitsOfDate(1995, 12, 5), [5, 1, 2, 1, 9, 9, 5]);
  const lp = lifePathOf(1995, 12, 5);
  assert.equal(lp.total, 32);
  assert.equal(lp.value, 5);
  assert.equal(lp.formula, "5 + 1 + 2 + 1 + 9 + 9 + 5 = 32 = 5");
  // The wrong method (5 + 12→3 + 1995→24→6) would yield 5+3+6=14=5 too
  // on this date; lock the digit list so we never switch to reduced parts.
  assert.notEqual(lp.digits.length, 3);
});

test("birth number is the calendar day", () => {
  const n = birthNumberOf(5);
  assert.equal(n.value, 5);
  assert.equal(birthNumberOf(23).value, 5);
  assert.equal(birthNumberOf(11).value, 11);
  assert.equal(birthNumberOf(22).value, 22);
});

test("personal year is birthday-to-birthday using the start year", () => {
  // On 3 Sep 2026 the last birthday was 5 Dec 2025 → year 8 until 5 Dec 2026.
  const cur = personalYearOf(1995, 12, 5, { year: 2026, month: 9, day: 3 });
  assert.equal(cur.startYear, 2025);
  assert.equal(cur.startDate, "2025-12-05");
  assert.equal(cur.endDate, "2026-12-05");
  assert.equal(cur.total, 17);
  assert.equal(cur.value, 8);
  assert.equal(cur.formula, "5 + 1 + 2 + 2 + 0 + 2 + 5 = 17 = 8");

  // On the birthday the new year begins.
  const onDay = personalYearOf(1995, 12, 5, { year: 2026, month: 12, day: 5 });
  assert.equal(onDay.startYear, 2026);
  assert.equal(onDay.value, 9);
  assert.equal(onDay.formula, "5 + 1 + 2 + 2 + 0 + 2 + 6 = 18 = 9");
});

test("1-5-9 determination arrow is complete for 5 Dec 1995", () => {
  const grid = buildGrid(digitsOfDate(1995, 12, 5));
  const det = grid.arrows.find((a) => a.id === "159");
  assert.equal(det?.kind, "complete");
  assert.deepEqual(
    grid.complete.map((a) => a.id),
    ["159"],
  );
});

test("Einstein 14 Mar 1879 life path is master 33", () => {
  const lp = lifePathOf(1879, 3, 14);
  assert.deepEqual(lp.digits, [1, 4, 3, 1, 8, 7, 9]);
  assert.equal(lp.total, 33);
  assert.equal(lp.value, 33);
  assert.equal(lp.master, true);
});

test("numerologyOf wires the Behnoush fixture", () => {
  const r = numerologyOf("1995-12-05", "2026-09-03", "Behnoush Kazemi");
  assert.equal(r.lifePath.value, 5);
  assert.equal(r.birthNumber.value, 5);
  assert.equal(r.personalYear.value, 8);
  assert.equal(r.nextPersonalYear.value, 9);
  assert.equal(r.grid.complete[0]?.id, "159");
  assert.ok(r.name);
  assert.ok(r.name!.lettersUsed > 0);
});
