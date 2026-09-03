import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import {
  ARROW_COPY,
  ARROW_ORDER,
  BIRTH_NUMBER_METHOD,
  GRID_METHOD,
  LIFE_PATH_METHOD,
  NAME_METHOD,
  NUMEROLOGY_DISCLAIMER,
  PERSONAL_YEAR_METHOD,
  birthCopy,
  lifePathCopy,
  nameCopy,
  personalYearCopy,
} from "@/lib/astro/numerology-copy";
import { GRID_ROWS, type ArrowId, type NumerologyReport } from "@/lib/astro/numerology";
import { t, tx, type Locale } from "@/lib/astro/i18n";
import { cn } from "@/lib/utils";

function collectStrings(r: NumerologyReport): string[] {
  const lp = lifePathCopy(r.lifePath.value);
  const bd = birthCopy(r.birthNumber.value);
  const py = personalYearCopy(r.personalYear.value);
  const ny = personalYearCopy(r.nextPersonalYear.value);
  const out = [
    NUMEROLOGY_DISCLAIMER,
    LIFE_PATH_METHOD,
    BIRTH_NUMBER_METHOD,
    PERSONAL_YEAR_METHOD,
    GRID_METHOD,
    NAME_METHOD,
    lp.title,
    lp.gifts,
    lp.watch,
    bd.title,
    bd.gifts,
    bd.watch,
    py.title,
    py.body,
    ny.title,
    ny.body,
  ];
  for (const id of ARROW_ORDER) {
    const c = ARROW_COPY[id];
    out.push(c.name, c.complete, c.missing);
  }
  if (r.name) {
    out.push(nameCopy(r.name.expression.value), nameCopy(r.name.soul.value), nameCopy(r.name.personality.value));
  }
  return out;
}

export function NumerologyReportView({
  report,
  locale,
  compact,
}: {
  report: NumerologyReport;
  locale: Locale;
  compact?: boolean;
}) {
  const { ensure } = useLocale();
  const strings = useMemo(() => collectStrings(report), [report]);
  useEffect(() => {
    void ensure(strings);
  }, [locale, ensure, strings]);

  const lp = lifePathCopy(report.lifePath.value);
  const bd = birthCopy(report.birthNumber.value);
  const py = personalYearCopy(report.personalYear.value);
  const ny = personalYearCopy(report.nextPersonalYear.value);

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-prose text-sm leading-relaxed text-muted">{tx(locale, NUMEROLOGY_DISCLAIMER)}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberTile
          kicker={t(locale, "lifePath")}
          value={report.lifePath.value}
          formula={report.lifePath.formula}
          title={tx(locale, lp.title)}
        />
        <NumberTile
          kicker={t(locale, "birthNumber")}
          value={report.birthNumber.value}
          formula={`day ${report.birthDay} · ${report.birthNumber.formula}`}
          title={tx(locale, bd.title)}
        />
        <NumberTile
          kicker={t(locale, "personalYear")}
          value={report.personalYear.value}
          formula={`${report.personalYear.startDate} → ${report.personalYear.endDate}`}
          title={tx(locale, py.title)}
        />
      </div>

      <section className="rounded-xl bg-surface p-5 shadow-border">
        <p className="text-xs tracking-wide text-subtle">{t(locale, "lifePath")}</p>
        <h3 className="mt-1 font-display text-2xl tracking-tight">{tx(locale, lp.title)}</h3>
        <p className="mt-1 font-mono text-xs text-muted">{report.lifePath.formula}</p>
        <p className="mt-4 max-w-prose text-[15px] leading-7 text-pretty">{tx(locale, lp.gifts)}</p>
        <p className="mt-3 max-w-prose text-[15px] leading-7 text-muted text-pretty">{tx(locale, lp.watch)}</p>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-border">
        <p className="text-xs tracking-wide text-subtle">{t(locale, "birthNumber")}</p>
        <h3 className="mt-1 font-display text-2xl tracking-tight">{tx(locale, bd.title)}</h3>
        <p className="mt-1 font-mono text-xs text-muted">
          {tx(locale, "Calendar day")} {report.birthDay}
          {report.birthDay !== report.birthNumber.value ? ` → ${report.birthNumber.formula}` : ""}
        </p>
        <p className="mt-4 max-w-prose text-[15px] leading-7 text-pretty">{tx(locale, bd.gifts)}</p>
        <p className="mt-3 max-w-prose text-[15px] leading-7 text-muted text-pretty">{tx(locale, bd.watch)}</p>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-border">
        <p className="text-xs tracking-wide text-subtle">{t(locale, "personalYear")}</p>
        <h3 className="mt-1 font-display text-2xl tracking-tight">{tx(locale, py.title)}</h3>
        <p className="mt-1 font-mono text-xs text-muted">
          {report.personalYear.formula} · {report.personalYear.startDate} → {report.personalYear.endDate}
        </p>
        <p className="mt-4 max-w-prose text-[15px] leading-7 text-pretty">{tx(locale, py.body)}</p>
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs tracking-wide text-subtle">{t(locale, "fromBirthday")}</p>
          <h4 className="mt-1 font-display text-xl tracking-tight">{tx(locale, ny.title)}</h4>
          <p className="mt-1 font-mono text-xs text-muted">
            {report.nextPersonalYear.formula} · {report.nextPersonalYear.startDate} → {report.nextPersonalYear.endDate}
          </p>
          {!compact ? (
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{tx(locale, ny.body)}</p>
          ) : null}
        </div>
      </section>

      <DigitGridView report={report} locale={locale} compact={compact} />

      {report.name ? (
        <section className="rounded-xl bg-surface p-5 shadow-border">
          <p className="text-xs tracking-wide text-subtle">{t(locale, "nameNumbers")}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NameTile
              label={t(locale, "expression")}
              value={report.name.expression.value}
              formula={report.name.expression.formula}
              body={tx(locale, nameCopy(report.name.expression.value))}
            />
            <NameTile
              label={t(locale, "soulUrge")}
              value={report.name.soul.value}
              formula={report.name.soul.formula}
              body={tx(locale, nameCopy(report.name.soul.value))}
            />
            <NameTile
              label={t(locale, "personalityNum")}
              value={report.name.personality.value}
              formula={report.name.personality.formula}
              body={tx(locale, nameCopy(report.name.personality.value))}
            />
          </div>
        </section>
      ) : null}

      {!compact ? (
        <section className="flex max-w-prose flex-col gap-3 text-sm leading-relaxed text-muted">
          <h3 className="font-display text-xl tracking-tight text-fg">{t(locale, "notes")}</h3>
          <p>{tx(locale, LIFE_PATH_METHOD)}</p>
          <p>{tx(locale, BIRTH_NUMBER_METHOD)}</p>
          <p>{tx(locale, PERSONAL_YEAR_METHOD)}</p>
          <p>{tx(locale, GRID_METHOD)}</p>
          <p>{tx(locale, NAME_METHOD)}</p>
        </section>
      ) : null}
    </div>
  );
}

function NumberTile({
  kicker,
  value,
  formula,
  title,
}: {
  kicker: string;
  value: number;
  formula: string;
  title: string;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-border">
      <p className="text-xs tracking-wide text-subtle">{kicker}</p>
      <p className="foil mt-1 font-display text-5xl leading-none tracking-tight">{value}</p>
      <p className="mt-3 text-sm text-fg">{title}</p>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">{formula}</p>
    </div>
  );
}

function NameTile({
  label,
  value,
  formula,
  body,
}: {
  label: string;
  value: number;
  formula: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs text-subtle">{label}</p>
      <p className="font-display text-3xl text-gold">{value}</p>
      <p className="mt-1 font-mono text-[11px] text-muted">{formula}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function DigitGridView({
  report,
  locale,
  compact,
}: {
  report: NumerologyReport;
  locale: Locale;
  compact?: boolean;
}) {
  const complete = new Set(report.grid.complete.map((a) => a.id));
  const missing = new Set(report.grid.missing.map((a) => a.id));
  return (
    <section className="rounded-xl bg-surface p-5 shadow-border">
      <p className="text-xs tracking-wide text-subtle">{t(locale, "arrowGrid")}</p>
      <h3 className="mt-1 font-display text-2xl tracking-tight">{t(locale, "digitSquare")}</h3>
      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[16rem]" dir="ltr">
          <div className="grid grid-cols-3 gap-1.5">
            {GRID_ROWS.flat().map((n) => {
              const count = report.grid.counts[n] ?? 0;
              const onDet = complete.has("159") && (n === 1 || n === 5 || n === 9);
              return (
                <div
                  key={n}
                  className={cn(
                    "flex min-h-20 flex-col items-center justify-center rounded-lg bg-surface-2 px-1 py-2 text-center",
                    onDet && "ring-1 ring-gold/70",
                    count === 0 && "opacity-40",
                  )}
                >
                  <span className="font-mono text-[10px] text-subtle">{n}</span>
                  <span className={cn("font-display text-2xl leading-none", count ? "text-gold" : "text-subtle")}>
                    {count ? String(n).repeat(Math.min(count, 4)) : "·"}
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-muted">×{count}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center font-mono text-[11px] text-subtle">3-6-9 · 2-5-8 · 1-4-7</p>
        </div>
        <ul className="flex flex-col gap-3">
          {ARROW_ORDER.filter((id) => complete.has(id) || missing.has(id) || !compact).map((id) => (
            <ArrowRow key={id} id={id} locale={locale} kind={complete.has(id) ? "complete" : missing.has(id) ? "missing" : "partial"} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowRow({
  id,
  locale,
  kind,
}: {
  id: ArrowId;
  locale: Locale;
  kind: "complete" | "missing" | "partial";
}) {
  const copy = ARROW_COPY[id];
  if (kind === "partial") {
    return (
      <li className="text-sm text-subtle">
        <span className="font-mono text-xs">{copy.line}</span>
        <span className="ms-2">{tx(locale, copy.name)}</span>
        <span className="ms-2 text-xs">{tx(locale, "partial line")}</span>
      </li>
    );
  }
  const body = kind === "complete" ? copy.complete : copy.missing;
  return (
    <li className="rounded-lg bg-surface-2 px-3 py-3">
      <p className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-sm text-gold">{copy.line}</span>
        <span className="font-medium">{tx(locale, copy.name)}</span>
        <span className="text-xs text-subtle">
          {kind === "complete" ? t(locale, "completeArrow") : t(locale, "missingArrow")}
        </span>
      </p>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted text-pretty">{tx(locale, body)}</p>
    </li>
  );
}

export function CopyDataButton({ text, locale }: { text: string; locale: Locale }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("ok");
          window.setTimeout(() => setState("idle"), 1800);
        } catch {
          setState("fail");
        }
      }}
    >
      {state === "ok" ? t(locale, "copied") : state === "fail" ? t(locale, "copyFailed") : t(locale, "copyData")}
    </Button>
  );
}
