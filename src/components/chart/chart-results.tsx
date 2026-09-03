import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NatalWheel, downloadWheelSvg } from "@/components/chart/natal-wheel";
import { AspectTriangle, ChartSheetHeader, DegreeStrip, ElementTable } from "@/components/chart/chart-tables";
import { ChartReportView } from "@/components/chart/chart-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ANGLE_HOUSES } from "@/lib/astro/constants";
import { analyzeChart } from "@/lib/astro/analyze";
import { ASPECT_COLOR, PLANET_COLOR } from "@/lib/astro/chart-theme";
import {
  ASPECT_FA,
  PLANET_FA,
  SIGN_FA,
  t,
  type Locale,
} from "@/lib/astro/i18n";
import { isMainPlanet, planetId, trueAspectOrb } from "@/lib/astro/math";
import { chartPrompt, dignityOf } from "@/lib/astro/meanings";
import { requestReading } from "@/lib/astro/reading.functions";
import { saveChart } from "@/lib/astro/storage";
import type { ChartResult } from "@/lib/astro/types";
import { wheelBodies } from "@/lib/astro/wheel-data";
import { cn } from "@/lib/utils";
import { DegreeSign, Glyph } from "@/components/chart/glyphs";

function signOf(longitude: number) {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  return signs[Math.floor((((longitude % 360) + 360) % 360) / 30)]!;
}

function scrollToPlanet(id: string) {
  const el = document.getElementById(`planet-${id}`);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ChartResults({
  chart,
  locale,
}: {
  chart: ChartResult;
  locale: Locale;
}) {
  const [ai, setAi] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const analysis = analyzeChart(chart);
  const sun = analysis.sun;
  const moon = analysis.moon;
  const extras = wheelBodies(chart).filter((b) => !isMainPlanet(b) && b.id !== "SOUTH_NODE" && b.id !== "FORTUNE");

  function selectPlanet(id: string) {
    setSelected(id);
    scrollToPlanet(id);
  }

  function highlightPlanet(id: string) {
    setSelected(id);
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs tracking-wide text-muted">
          {chart.engine} · JD {chart.julianDay.toFixed(5)} · {chart.utcIso}
        </p>
        <h2 className="font-display text-3xl tracking-tight text-balance">{chart.title}</h2>
        <p className="text-sm text-muted">
          {chart.subject.date} {chart.subject.time} · {chart.subject.locationName}
          {chart.subject2 ? ` × ${chart.subject2.name}` : ""}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Meta
            label={locale === "fa" ? "طالع" : "ASC"}
            value={<DegreeSign degree={chart.ascendant % 30} sign={signOf(chart.ascendant)} signName={locale === "fa" ? SIGN_FA[signOf(chart.ascendant)] : signOf(chart.ascendant)} />}
            note={locale === "fa" ? `حاکم ${PLANET_FA[analysis.chartRuler] ?? analysis.chartRuler}` : `ruler ${analysis.chartRuler}`}
          />
          <Meta
            label="MC"
            value={<DegreeSign degree={chart.mediumCoeli % 30} sign={signOf(chart.mediumCoeli)} signName={locale === "fa" ? SIGN_FA[signOf(chart.mediumCoeli)] : signOf(chart.mediumCoeli)} />}
          />
          {sun && (
            <Meta
              label={locale === "fa" ? "خورشید" : "Sun"}
              value={<DegreeSign degree={sun.degree_in_sign} minute={sun.degree_minute} sign={String(sun.sign)} signName={locale === "fa" ? SIGN_FA[String(sun.sign)] : String(sun.sign)} />}
              note={sun.house ? (locale === "fa" ? `خانه ${sun.house}` : `house ${sun.house}`) : undefined}
            />
          )}
          {moon && (
            <Meta
              label={locale === "fa" ? "ماه" : "Moon"}
              value={<DegreeSign degree={moon.degree_in_sign} minute={moon.degree_minute} sign={String(moon.sign)} signName={locale === "fa" ? SIGN_FA[String(moon.sign)] : String(moon.sign)} />}
              note={moon.house ? (locale === "fa" ? `خانه ${moon.house}` : `house ${moon.house}`) : undefined}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              saveChart({
                id: `${chart.mode}-${chart.subject.name}-${chart.julianDay}`,
                savedAt: new Date().toISOString(),
                input: chart.subject,
                input2: chart.subject2,
                mode: chart.mode,
              });
              setSaved(true);
            }}
          >
            {saved ? (locale === "fa" ? "ذخیره شد" : "Saved") : t(locale, "save")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const svg = document.getElementById("natal-wheel") as SVGSVGElement | null;
              downloadWheelSvg(svg, `${chart.subject.name}-${chart.mode}.svg`);
            }}
          >
            {t(locale, "downloadSvg")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={aiBusy}
            onClick={async () => {
              setAiBusy(true);
              const res = await requestReading({ data: { prompt: chartPrompt(chart, locale) } });
              setAi(res.ok ? res.text : res.error);
              setAiBusy(false);
            }}
          >
            {aiBusy ? "…" : t(locale, "grok")}
          </Button>
        </div>
      </header>

      <section className="overflow-hidden rounded-xl bg-chart-paper p-4 text-chart-ink shadow-border sm:p-6">
        <ChartSheetHeader chart={chart} locale={locale} />
        <div className="mt-4">
          <NatalWheel chart={chart} locale={locale} selected={selected} onSelect={highlightPlanet} />
        </div>
        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <AspectTriangle chart={chart} locale={locale} onSelect={highlightPlanet} />
          <ElementTable chart={chart} locale={locale} />
        </div>
        <div className="mt-8 border-t border-chart-ink/15 pt-5">
          <p className="mb-3 text-xs text-chart-ink/60">
            {locale === "fa" ? "نوار درجه داخل برج (۰°–۳۰°)" : "Degree-in-sign strip (0°–30°)"}
          </p>
          <DegreeStrip chart={chart} />
        </div>
      </section>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="overflow-x-auto rounded-xl bg-surface p-3 shadow-border">
          <table className="w-full min-w-[280px] text-sm">
            <thead className="text-xs text-muted">
              <tr className="border-b border-border text-start">
                <th className="py-1.5 font-medium">{t(locale, "planets")}</th>
                <th className="py-1.5 font-medium">{locale === "fa" ? "درجه" : "Long."}</th>
                <th className="py-1.5 text-end font-medium">{t(locale, "house")}</th>
                <th className="hidden py-1.5 ps-2 text-end font-medium sm:table-cell">{t(locale, "dignity")}</th>
              </tr>
            </thead>
            <tbody>
              {chart.positions.filter(isMainPlanet).map((p) => {
                const id = planetId(p);
                const name = locale === "fa" ? (PLANET_FA[id] ?? p.name) : p.name;
                const dig = dignityOf(id, String(p.sign));
                const on = selected === id;
                return (
                  <tr
                    key={id}
                    className={cn(
                      "cursor-pointer border-b border-border/50 last:border-0",
                      on && "bg-surface-2",
                    )}
                    onClick={() => selectPlanet(id)}
                  >
                    <td className="py-1.5 pe-2">
                      <span className="me-1.5 inline-flex align-middle">
                        <Glyph name={id} size={15} color={PLANET_COLOR[id]} />
                      </span>
                      {name}
                      {p.retrograde ? <Badge className="ms-1">Rx</Badge> : null}
                    </td>
                    <td className="py-1.5 font-mono text-xs text-muted">
                      <DegreeSign
                        degree={p.degree_in_sign}
                        minute={p.degree_minute}
                        sign={String(p.sign)}
                        signName={locale === "fa" ? SIGN_FA[String(p.sign)] : String(p.sign)}
                      />
                    </td>
                    <td className="py-1.5 text-end text-xs tabular-nums text-subtle">
                      {p.house ?? "—"}
                    </td>
                    <td className="hidden py-1.5 ps-2 text-end text-xs text-subtle sm:table-cell">
                      {t(locale, dig)}
                    </td>
                  </tr>
                );
              })}
              {extras.map((p) => {
                const on = selected === p.id;
                const name = locale === "fa" ? (PLANET_FA[p.id] ?? p.name) : p.name;
                return (
                  <tr
                    key={p.id}
                    className={cn("cursor-pointer border-b border-border/50 last:border-0", on && "bg-surface-2")}
                    onClick={() => highlightPlanet(p.id)}
                  >
                    <td className="py-1.5 pe-2">
                      <span className="me-1.5 inline-flex align-middle">
                        <Glyph name={p.id} size={15} color={PLANET_COLOR[p.id]} />
                      </span>
                      {name}
                      {p.retrograde ? <Badge className="ms-1">Rx</Badge> : null}
                    </td>
                    <td className="py-1.5 font-mono text-xs text-muted">
                      <DegreeSign
                        degree={p.degree_in_sign}
                        minute={p.degree_minute}
                        sign={String(p.sign)}
                        signName={locale === "fa" ? SIGN_FA[String(p.sign)] : String(p.sign)}
                      />
                    </td>
                    <td className="py-1.5 text-end text-xs tabular-nums text-subtle">{p.house ?? "—"}</td>
                    <td className="hidden py-1.5 sm:table-cell" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-relaxed text-muted">
          {locale === "fa"
            ? "روی سیاره در چرخ یا جدول بزنید تا پروندهٔ تفسیری همان سیاره باز شود. چرخ سفید همان استاندارد Astrodienst/Astro-Seek است: طالع ساعت ۹، خانه‌ها پادساعت‌گرد، تیک هر درجه، جنبه‌های قرمز/آبی."
            : "Click a planet on the wheel or table to open that planet’s reading. The white wheel follows Astrodienst/Astro-Seek: ASC at 9 o’clock, houses counterclockwise, 1° ticks, red/blue aspects."}
        </p>
      </div>

      <ChartReportView
        chart={chart}
        locale={locale}
        selectedPlanet={selected}
        onSelectPlanet={selectPlanet}
      />

      <Tabs defaultValue="aspects">
        <TabsList>
          <TabsTrigger value="aspects">{t(locale, "aspects")}</TabsTrigger>
          <TabsTrigger value="houses">{t(locale, "houses")}</TabsTrigger>
          <TabsTrigger value="method">{t(locale, "notes")}</TabsTrigger>
        </TabsList>
        <TabsContent value="houses" className="mt-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {chart.houses.map((h) => {
              const angle = ANGLE_HOUSES.find(([n]) => n === h.house);
              const lord = analysis.houseLords.find((x) => x.house === h.house);
              return (
                <div
                  key={h.house}
                  className={cn(
                    "flex items-center justify-between rounded-lg bg-surface-2 px-3 py-3 text-sm",
                    angle && "shadow-border",
                  )}
                >
                  <span className="text-muted">
                    {angle ? `${angle[1]} · ` : ""}
                    {locale === "fa" ? `خانه ${h.house}` : `House ${h.house}`}
                    {lord ? (
                      <span className="ms-2 inline-flex items-center gap-1 text-xs text-subtle">
                        <Glyph name={lord.ruler} size={13} color={PLANET_COLOR[lord.ruler]} />
                        {locale === "fa" ? (PLANET_FA[lord.ruler] ?? lord.ruler) : lord.ruler}
                      </span>
                    ) : null}
                  </span>
                  <DegreeSign degree={h.degree_in_sign} sign={String(h.sign)} signName={locale === "fa" ? SIGN_FA[String(h.sign)] : String(h.sign)} />
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="aspects" className="mt-4">
          <ul className="flex flex-col divide-y divide-border">
            {chart.aspects.map((a, i) => {
              const orb = trueAspectOrb(a);
              const p1 = locale === "fa" ? (PLANET_FA[a.planet1] ?? a.planet1) : a.planet1;
              const p2 = locale === "fa" ? (PLANET_FA[a.planet2] ?? a.planet2) : a.planet2;
              const an = locale === "fa" ? (ASPECT_FA[a.aspect_name] ?? a.aspect_name) : a.aspect_name;
              return (
                <li key={i} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Glyph name={a.aspect_name} size={14} color={ASPECT_COLOR[a.aspect_name]} />
                    <Glyph name={a.planet1} size={14} color={PLANET_COLOR[a.planet1]} />
                    {p1} {an} {p2}
                    <Glyph name={a.planet2} size={14} color={PLANET_COLOR[a.planet2]} />
                  </span>
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {Math.floor(orb)}°{String(Math.floor((orb % 1) * 60)).padStart(2, "0")}′
                  </span>
                </li>
              );
            })}
          </ul>
        </TabsContent>
        <TabsContent value="method" className="mt-4">
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {chart.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li>
              {locale === "fa"
                ? "زودیاک استوایی. ارب‌ها از swiss-ephemeris-api (قرآن/مقابله ۱۰°، تثلیث/تربیع ۸°، تسدیس ۶°)."
                : "Tropical zodiac. Orbs from swiss-ephemeris-api (conj/opp 10°, tri/sqr 8°, sex 6°)."}
            </li>
          </ul>
        </TabsContent>
      </Tabs>

      {ai && (
        <section className="flex max-w-prose flex-col gap-3">
          <h2 className="font-display text-xl tracking-tight">{t(locale, "grok")}</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-pretty">{ai}</p>
        </section>
      )}
    </div>
  );
}

function Meta({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="rounded-lg bg-surface-2 px-3 py-2">
      <p className="text-xs text-subtle">{label}</p>
      <div className="mt-0.5 font-mono text-xs">{value}</div>
      {note ? <p className="mt-0.5 text-xs text-subtle">{note}</p> : null}
    </div>
  );
}
