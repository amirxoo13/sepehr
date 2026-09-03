import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChartResults } from "@/components/chart/chart-results";
import { useLocale } from "@/components/layout/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { computeNow } from "@/lib/astro/chart";
import { CITIES } from "@/lib/astro/cities";
import { t } from "@/lib/astro/i18n";
import type { ChartResult } from "@/lib/astro/types";

export const Route = createFileRoute("/now")({ component: NowPage });

const TEHRAN = CITIES.find((c) => c.name === "Tehran")!;

function NowPage() {
  const { locale } = useLocale();
  const [lat, setLat] = useState(String(TEHRAN.lat));
  const [lon, setLon] = useState(String(TEHRAN.lon));
  const [result, setResult] = useState<ChartResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run(nextLat = Number(lat), nextLon = Number(lon)) {
    setBusy(true);
    setError(null);
    try {
      const chart = await computeNow(nextLat, nextLon, "P");
      setResult(chart);
    } catch (e) {
      setError(e instanceof Error ? e.message : t(locale, "error"));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void run();
    // initial sky for Tehran
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl tracking-tight">{t(locale, "skyNow")}</h1>
        <p className="text-sm text-muted">
          {t(locale, "nowHint")}
        </p>
      </header>

      <form
        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run();
        }}
      >
        <label className="flex flex-col gap-2">
          <Label>Lat</Label>
          <Input value={lat} onChange={(e) => setLat(e.target.value)} />
        </label>
        <label className="flex flex-col gap-2">
          <Label>Lon</Label>
          <Input value={lon} onChange={(e) => setLon(e.target.value)} />
        </label>
        <div className="flex gap-2">
          <Button type="submit" disabled={busy}>
            {t(locale, "calculate")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!navigator.geolocation) return;
              navigator.geolocation.getCurrentPosition((pos) => {
                setLat(pos.coords.latitude.toFixed(4));
                setLon(pos.coords.longitude.toFixed(4));
                void run(pos.coords.latitude, pos.coords.longitude);
              });
            }}
          >
            GPS
          </Button>
        </div>
      </form>
      {error && <p className="text-sm text-danger">{error}</p>}
      {result && <ChartResults chart={result} locale={locale} />}
    </main>
  );
}
