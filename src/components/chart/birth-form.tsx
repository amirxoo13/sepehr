import { toGregorian, toJalaali } from "jalaali-js";
import { useMemo, useState } from "react";
import { EINSTEIN, SHIRAZ_1970 } from "@/lib/astro/chart";
import { CITIES, looksLikeCoordinates, parseCoordinates, searchCities } from "@/lib/astro/cities";
import { HOUSE_SYSTEMS, type ChartMode, type HouseSystemId } from "@/lib/astro/constants";
import { geocodePlace } from "@/lib/astro/geocode.functions";
import { t, tx, type Locale } from "@/lib/astro/i18n";
import type { BirthInput, City, GeocodeHit } from "@/lib/astro/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ChartExtras {
  asOf?: Date;
  solarReturnYear?: number;
}

export interface BirthDraft {
  name: string;
  gy: string;
  gm: string;
  gd: string;
  hour: string;
  minute: string;
  timeUnknown: boolean;
  cityQuery: string;
  houseSystem: HouseSystemId;
  tzMode: "auto" | "lmt" | "iana";
  place: { name: string; lat: number; lon: number; tz: string } | null;
}

function emptyDraft(): BirthDraft {
  const tehran = CITIES.find((c) => c.name === "Tehran");
  return {
    name: "",
    gy: "1990",
    gm: "03",
    gd: "21",
    hour: "12",
    minute: "00",
    timeUnknown: false,
    cityQuery: "",
    houseSystem: "P",
    tzMode: "auto",
    place: tehran
      ? { name: `${tehran.name}, ${tehran.country}`, lat: tehran.lat, lon: tehran.lon, tz: tehran.tz }
      : null,
  };
}

function fromInput(input: BirthInput): BirthDraft {
  const [gy, gm, gd] = input.date.split("-");
  const [hour, minute] = input.time.split(":");
  return {
    name: input.name,
    gy: gy ?? "1990",
    gm: gm ?? "01",
    gd: gd ?? "01",
    hour: hour ?? "12",
    minute: minute ?? "00",
    timeUnknown: Boolean(input.timeUnknown),
    cityQuery: input.locationName,
    houseSystem: input.houseSystem ?? "P",
    tzMode: input.timezone === "LMT" ? "lmt" : "iana",
    place: {
      name: input.locationName,
      lat: input.latitude,
      lon: input.longitude,
      tz: input.timezone === "LMT" ? "UTC" : input.timezone,
    },
  };
}

function resolveTimezone(d: BirthDraft): string {
  if (!d.place) throw new Error("Place is not selected");
  if (d.tzMode === "lmt") return "LMT";
  if (d.tzMode === "iana") return d.place.tz;
  return Number(d.gy) < 1900 ? "LMT" : d.place.tz;
}

function toInput(d: BirthDraft): BirthInput {
  const date = `${d.gy.padStart(4, "0")}-${d.gm.padStart(2, "0")}-${d.gd.padStart(2, "0")}`;
  const time = d.timeUnknown ? "12:00" : `${d.hour.padStart(2, "0")}:${d.minute.padStart(2, "0")}`;
  if (!d.place) throw new Error("Place is not selected");
  return {
    name: d.name.trim() || "—",
    date,
    time,
    latitude: d.place.lat,
    longitude: d.place.lon,
    timezone: resolveTimezone(d),
    locationName: d.place.name,
    houseSystem: d.houseSystem,
    timeUnknown: d.timeUnknown,
  };
}

function PersonFields({
  draft,
  setDraft,
  locale,
  heading,
}: {
  draft: BirthDraft;
  setDraft: (d: BirthDraft) => void;
  locale: Locale;
  heading: string;
}) {
  const jalali = useMemo(() => {
    const y = Number(draft.gy);
    const m = Number(draft.gm);
    const d = Number(draft.gd);
    if (!y || !m || !d) return null;
    try {
      return toJalaali(y, m, d);
    } catch {
      return null;
    }
  }, [draft.gy, draft.gm, draft.gd]);

  const cityHits = searchCities(draft.cityQuery, 6);
  const [remote, setRemote] = useState<GeocodeHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  async function runRemote() {
    const q = draft.cityQuery.trim();
    if (q.length < 2) return;
    if (looksLikeCoordinates(q)) {
      try {
        const { lat, lon } = parseCoordinates(q);
        setDraft({
          ...draft,
          place: { name: `${lat}, ${lon}`, lat, lon, tz: "UTC" },
        });
        setCityOpen(false);
      } catch {
        /* keep */
      }
      return;
    }
    setSearching(true);
    try {
      const res = await geocodePlace({ data: { q } });
      if (res.ok) setRemote(res.results);
    } finally {
      setSearching(false);
    }
  }

  function pickCity(c: City) {
    setDraft({
      ...draft,
      cityQuery: `${c.name}, ${c.country}`,
      place: {
        name: `${c.name}, ${c.country}`,
        lat: c.lat,
        lon: c.lon,
        tz: c.tz,
      },
    });
    setRemote([]);
    setCityOpen(false);
  }

  function setJalali(jy: number, jm: number, jd: number) {
    try {
      const g = toGregorian(jy, jm, jd);
      setDraft({
        ...draft,
        gy: String(g.gy),
        gm: String(g.gm).padStart(2, "0"),
        gd: String(g.gd).padStart(2, "0"),
      });
    } catch {
      /* ignore invalid jalali */
    }
  }

  const tzPreview = draft.place ? resolveTimezone(draft) : "—";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium tracking-wide text-muted">{heading}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t(locale, "name")}>
          <Input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            autoComplete="name"
          />
        </Field>
        <Field label={t(locale, "houseSystem")}>
          <select
            className="h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-border"
            value={draft.houseSystem}
            onChange={(e) => setDraft({ ...draft, houseSystem: e.target.value as HouseSystemId })}
          >
            {HOUSE_SYSTEMS.map((h) => (
              <option key={h.id} value={h.id}>
                {tx(locale, h.labelEn)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <Label className="mb-2 block">{t(locale, "gregorian")}</Label>
        <div className="grid grid-cols-3 gap-2">
          <Input inputMode="numeric" value={draft.gy} onChange={(e) => setDraft({ ...draft, gy: e.target.value })} aria-label="year" />
          <Input inputMode="numeric" value={draft.gm} onChange={(e) => setDraft({ ...draft, gm: e.target.value })} aria-label="month" />
          <Input inputMode="numeric" value={draft.gd} onChange={(e) => setDraft({ ...draft, gd: e.target.value })} aria-label="day" />
        </div>
      </div>

      {jalali && (
        <div>
          <Label className="mb-2 block">{t(locale, "jalali")}</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              inputMode="numeric"
              defaultValue={jalali.jy}
              key={`jy-${jalali.jy}-${jalali.jm}-${jalali.jd}`}
              onBlur={(e) => setJalali(Number(e.target.value), jalali.jm, jalali.jd)}
            />
            <Input
              inputMode="numeric"
              defaultValue={jalali.jm}
              key={`jm-${jalali.jy}-${jalali.jm}-${jalali.jd}`}
              onBlur={(e) => setJalali(jalali.jy, Number(e.target.value), jalali.jd)}
            />
            <Input
              inputMode="numeric"
              defaultValue={jalali.jd}
              key={`jd-${jalali.jy}-${jalali.jm}-${jalali.jd}`}
              onBlur={(e) => setJalali(jalali.jy, jalali.jm, Number(e.target.value))}
            />
          </div>
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <Label>{t(locale, "time")}</Label>
          <label className="flex min-h-11 items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={draft.timeUnknown}
              onChange={(e) => setDraft({ ...draft, timeUnknown: e.target.checked })}
              className="size-4 accent-accent"
            />
            {t(locale, "timeUnknown")}
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            inputMode="numeric"
            disabled={draft.timeUnknown}
            value={draft.hour}
            onChange={(e) => setDraft({ ...draft, hour: e.target.value })}
            aria-label="hour"
          />
          <Input
            inputMode="numeric"
            disabled={draft.timeUnknown}
            value={draft.minute}
            onChange={(e) => setDraft({ ...draft, minute: e.target.value })}
            aria-label="minute"
          />
        </div>
      </div>

      <div className="relative">
        <Field label={t(locale, "city")}>
          <Input
            value={draft.cityQuery}
            placeholder={t(locale, "cityHint")}
            onChange={(e) => {
              setDraft({ ...draft, cityQuery: e.target.value });
              setCityOpen(true);
            }}
            onFocus={() => setCityOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void runRemote();
              }
            }}
          />
        </Field>
        {cityOpen && (
          <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg bg-bg-elevated p-1 shadow-border">
            {cityHits.map((c) => (
              <li key={`${c.name}-${c.lat}`}>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-start text-sm hover:bg-surface-2"
                  onClick={() => pickCity(c)}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-muted">{c.country}</span>
                </button>
              </li>
            ))}
            {remote.map((r, i) => (
              <li key={`r-${i}`}>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-start text-sm hover:bg-surface-2"
                  onClick={() => {
                    setDraft({
                      ...draft,
                      cityQuery: `${r.name}, ${r.country}`,
                      place: { name: `${r.name}, ${r.country}`, lat: r.lat, lon: r.lon, tz: r.tz || "UTC" },
                    });
                    setCityOpen(false);
                  }}
                >
                  <span>{r.name}</span>
                  <span className="text-xs text-muted">{r.country}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="min-h-11 w-full px-3 text-start text-xs text-muted"
                onClick={() => void runRemote()}
                disabled={searching}
              >
                {searching ? "…" : t(locale, "searchMap")}
              </button>
            </li>
          </ul>
        )}
        {draft.place && (
          <p className="mt-2 font-mono text-xs text-subtle">
            {draft.place.lat.toFixed(4)}, {draft.place.lon.toFixed(4)} · {tzPreview}
          </p>
        )}
      </div>

      <Field label={t(locale, "timezone")}>
        <select
          className="h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-border"
          value={draft.tzMode}
          onChange={(e) => setDraft({ ...draft, tzMode: e.target.value as BirthDraft["tzMode"] })}
        >
          <option value="auto">{t(locale, "tzAuto")}</option>
          <option value="lmt">{t(locale, "tzLmt")}</option>
          <option value="iana">{t(locale, "tzIana")}</option>
        </select>
      </Field>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </label>
  );
}

export function BirthForm({
  locale,
  mode,
  busy,
  error,
  onSubmit,
}: {
  locale: Locale;
  mode: ChartMode;
  busy: boolean;
  error: string | null;
  onSubmit: (a: BirthInput, b: BirthInput | undefined, extras: ChartExtras) => void;
}) {
  const two = mode === "synastry" || mode === "composite";
  const [a, setA] = useState<BirthDraft>(emptyDraft);
  const [b, setB] = useState<BirthDraft>(emptyDraft);
  const today = new Date();
  const [asOfDate, setAsOfDate] = useState(() => today.toISOString().slice(0, 10));
  const [asOfTime, setAsOfTime] = useState("12:00");
  const [srYear, setSrYear] = useState(() => String(today.getUTCFullYear()));

  function applyEinstein() {
    setA(fromInput(EINSTEIN));
  }
  function applyShiraz() {
    setA(fromInput(SHIRAZ_1970));
  }

  const needsAsOf = mode === "transit" || mode === "progressed";
  const needsYear = mode === "solar_return";

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          const first = toInput(a);
          const extras: ChartExtras = {};
          if (needsAsOf) {
            extras.asOf = new Date(`${asOfDate}T${asOfTime}:00Z`);
          }
          if (needsYear) extras.solarReturnYear = Number(srYear);
          onSubmit(first, two ? toInput(b) : undefined, extras);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <PersonFields draft={a} setDraft={setA} locale={locale} heading={two ? t(locale, "person1") : t(locale, "natal")} />
      {two && <PersonFields draft={b} setDraft={setB} locale={locale} heading={t(locale, "person2")} />}

      {needsAsOf && (
        <div className="grid grid-cols-2 gap-3">
          <Field label={t(locale, "asOf")}>
            <Input type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} />
          </Field>
          {mode === "transit" ? (
            <Field label={t(locale, "asOfTime")}>
              <Input type="time" value={asOfTime} onChange={(e) => setAsOfTime(e.target.value)} />
            </Field>
          ) : (
            <div />
          )}
        </div>
      )}

      {needsYear && (
        <Field label={t(locale, "srYear")}>
          <Input inputMode="numeric" value={srYear} onChange={(e) => setSrYear(e.target.value)} />
        </Field>
      )}

      {error && <p className="text-sm text-danger">{tx(locale, error)}</p>}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? t(locale, "calculating") : t(locale, "calculate")}
        </Button>
        <Button type="button" variant="secondary" onClick={applyEinstein}>
          {t(locale, "einstein")}
        </Button>
        <Button type="button" variant="secondary" onClick={applyShiraz}>
          {t(locale, "shirazDemo")}
        </Button>
      </div>
    </form>
  );
}

export { emptyDraft, fromInput, toInput };
