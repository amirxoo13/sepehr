import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BirthForm, type ChartExtras } from "@/components/chart/birth-form";
import { ChartResults } from "@/components/chart/chart-results";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { computeChart } from "@/lib/astro/chart";
import { CHART_MODES, MODES_NEEDING_SECOND_PERSON, type ChartMode } from "@/lib/astro/constants";
import { modeLabel, t } from "@/lib/astro/i18n";
import { loadSaved, removeChart, type SavedChart } from "@/lib/astro/storage";
import type { BirthInput, ChartResult } from "@/lib/astro/types";
import { cn } from "@/lib/utils";

type Search = { mode?: ChartMode };

const MODE_BLURB: Record<Exclude<ChartMode, "now">, "natalD" | "transitD" | "synastryD" | "compositeD" | "solarD" | "progressedD"> = {
  natal: "natalD",
  transit: "transitD",
  synastry: "synastryD",
  composite: "compositeD",
  solar_return: "solarD",
  progressed: "progressedD",
};

export const Route = createFileRoute("/chart")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: CHART_MODES.includes(s.mode as ChartMode) ? (s.mode as ChartMode) : "natal",
  }),
  component: ChartPage,
});

function ChartPage() {
  const { locale } = useLocale();
  const { mode } = Route.useSearch();
  const navigate = useNavigate({ from: "/chart" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ChartResult | null>(null);
  const [saved, setSaved] = useState<SavedChart[]>([]);

  useEffect(() => {
    setSaved(loadSaved());
  }, []);

  const studioModes = useMemo(
    () => CHART_MODES.filter((m) => m !== "now") as Exclude<ChartMode, "now">[],
    [],
  );

  async function run(a: BirthInput, b?: BirthInput, extras?: ChartExtras) {
    setBusy(true);
    setError(null);
    try {
      const chart = await computeChart(mode ?? "natal", a, b, extras);
      setResult(chart);
    } catch (e) {
      setError(e instanceof Error ? e.message : t(locale, "error"));
    } finally {
      setBusy(false);
    }
  }

  const current = (mode ?? "natal") as Exclude<ChartMode, "now">;

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <aside className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-1 rounded-lg bg-surface-2 p-1">
          {studioModes.map((m) => (
            <button
              key={m}
              type="button"
              className={cn(
                "min-h-11 flex-1 rounded-md px-2 text-xs font-medium text-muted sm:text-sm",
                current === m && "bg-surface text-fg",
              )}
              onClick={() => {
                setResult(null);
                void navigate({ search: { mode: m } });
              }}
            >
              {modeLabel(locale, m)}
            </button>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted">{t(locale, MODE_BLURB[current])}</p>

        <Card className="p-5">
          <BirthForm
            locale={locale}
            mode={current}
            busy={busy}
            error={error}
            onSubmit={run}
          />
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-medium">{t(locale, "saved")}</h2>
          {saved.length === 0 ? (
            <p className="text-sm text-muted">{t(locale, "emptySaved")}</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {saved.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 flex-1 justify-start px-2 text-start"
                    onClick={() => {
                      void navigate({ search: { mode: s.mode as ChartMode } });
                      void run(s.input, s.input2);
                    }}
                  >
                    <span className="truncate text-sm">
                      {s.input.name} · {modeLabel(locale, s.mode as ChartMode)}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSaved(removeChart(s.id))}
                  >
                    ×
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </aside>

      <section>
        {busy && !result ? (
          <p className="py-24 text-center text-sm text-muted">{t(locale, "calculating")}</p>
        ) : result ? (
          <ChartResults chart={result} locale={locale} />
        ) : (
          <div className="flex min-h-80 items-center justify-center rounded-xl bg-surface p-8 text-center text-sm text-muted shadow-border">
            {MODES_NEEDING_SECOND_PERSON.has(current)
              ? locale === "fa"
                ? "دو تولد را وارد کنید."
                : "Enter two birth records."
              : locale === "fa"
                ? "تاریخ، ساعت و مکان را وارد کنید تا چرخ رسم شود."
                : "Enter date, time and place to draw the wheel."}
          </div>
        )}
      </section>
    </main>
  );
}
