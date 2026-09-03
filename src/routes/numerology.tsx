import { createFileRoute, Link } from "@tanstack/react-router";
import { toGregorian, toJalaali } from "jalaali-js";
import { useMemo, useState } from "react";
import { NumerologyReportView } from "@/components/chart/numerology-report";
import { IconGrid } from "@/components/icons/astro-icons";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BEHNOUSH } from "@/lib/astro/chart";
import { isoOf, numerologyOf, pad2 } from "@/lib/astro/numerology";
import { t, tx } from "@/lib/astro/i18n";

export const Route = createFileRoute("/numerology")({ component: NumerologyPage });

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function NumerologyPage() {
  const { locale } = useLocale();
  const [name, setName] = useState("Behnoush Kazemi");
  const [date, setDate] = useState(BEHNOUSH.date);
  const [asOf, setAsOf] = useState(todayIso);
  const [cal, setCal] = useState<"g" | "j">("g");

  const jalali = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return null;
    try {
      return toJalaali(y, m, d);
    } catch {
      return null;
    }
  }, [date]);

  const report = useMemo(() => {
    try {
      return numerologyOf(date, asOf, name);
    } catch {
      return null;
    }
  }, [date, asOf, name]);

  function applyBehnoush() {
    setName(BEHNOUSH.name);
    setDate(BEHNOUSH.date);
  }

  function setJalali(jy: number, jm: number, jd: number) {
    try {
      const g = toGregorian(jy, jm, jd);
      setDate(isoOf(g.gy, g.gm, g.gd));
    } catch {
      /* ignore incomplete */
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-gold uppercase">
        <IconGrid size={14} />
        {t(locale, "subtitle")}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">{t(locale, "numerology")}</h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t(locale, "numerologyHint")}</p>
      <p className="mt-2 text-sm text-subtle">
        <Link to="/chart" className="text-gold hover:underline">
          {t(locale, "start")}
        </Link>
        <span className="mx-2">·</span>
        {tx(locale, "A natal chart still needs time and place. Numbers need only the date.")}
      </p>

      <form
        className="mt-8 grid gap-4 rounded-xl bg-surface p-4 shadow-border sm:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-col gap-2 sm:col-span-2">
          <Label>{t(locale, "name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="flex flex-col gap-2">
          <Label>{t(locale, "date")}</Label>
          {cal === "g" ? (
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          ) : jalali ? (
            <div className="flex gap-2">
              <Input
                inputMode="numeric"
                value={jalali.jy}
                onChange={(e) => setJalali(Number(e.target.value), jalali.jm, jalali.jd)}
                aria-label="Jalali year"
              />
              <Input
                inputMode="numeric"
                value={jalali.jm}
                onChange={(e) => setJalali(jalali.jy, Number(e.target.value), jalali.jd)}
                aria-label="Jalali month"
              />
              <Input
                inputMode="numeric"
                value={jalali.jd}
                onChange={(e) => setJalali(jalali.jy, jalali.jm, Number(e.target.value))}
                aria-label="Jalali day"
              />
            </div>
          ) : (
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          )}
          <button
            type="button"
            className="self-start text-xs text-muted hover:text-gold"
            onClick={() => setCal(cal === "g" ? "j" : "g")}
          >
            {cal === "g" ? t(locale, "jalali") : t(locale, "gregorian")}
            {jalali ? ` · ${jalali.jy}/${pad2(jalali.jm)}/${pad2(jalali.jd)}` : ""}
          </button>
        </label>
        <label className="flex flex-col gap-2">
          <Label>{t(locale, "asOf")}</Label>
          <Input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <Button type="button" variant="secondary" onClick={applyBehnoush}>
            {t(locale, "behnoushDemo")}
          </Button>
        </div>
      </form>

      {report ? (
        <div className="mt-10">
          <NumerologyReportView report={report} locale={locale} />
        </div>
      ) : (
        <p className="mt-8 text-sm text-danger">{t(locale, "error")}</p>
      )}
    </main>
  );
}
