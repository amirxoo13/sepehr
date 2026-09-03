import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { t, tx } from "@/lib/astro/i18n";

export const Route = createFileRoute("/about")({ component: About });

const PARAS = [
  "Sepehr is the computational front of the same astrology platform as the Telegram bot: Swiss Ephemeris, tropical zodiac, Placidus houses, API orbs, LMT before 1900, and the synastry / composite / solar-return / secondary-progression algorithms. Pythagorean numerology (life path, birth number, personal year, Hungarian digit grid) is a separate digit method from the civil date — not astronomy.",
  "The Einstein demo uses the repository fixture: Ulm, 14 March 1879, 11:30, Europe/Berlin, Placidus. For other pre-1900 births the default is birthplace LMT — matching the bot.",
  "The traditional reading is a keyword list, not a prediction. The optional deep reading is generated from these computed positions only.",
];

const BULLETS = [
  "Swiss Ephemeris (Moshier) via @swisseph/browser — AGPL-3.0",
  "house_for_longitude, aspects, midpoints: swiss-ephemeris-api commit 8a03d63",
  "LMT = longitude / 15 — bot/birthtime.py",
  "Wheel: ASC at 9 o’clock — bot/chartwheel.py",
  "Solar return first-order correction — bot/astro.py MEAN_SOLAR_SPEED",
  "Secondary progression: 1 day = 1 year, TROPICAL_YEAR_DAYS = 365.24219",
  "Dignities: Ptolemy, Tetrabiblos I.17–19",
  "Pythagorean numerology: full digit sum of D.M.YYYY; personal year is birthday-to-birthday",
  "Geocoding: Nominatim (OSM) + curated gazetteer + tz-lookup",
];

function About() {
  const { locale, ensure } = useLocale();
  useEffect(() => {
    void ensure(["About Sepehr", ...PARAS, ...BULLETS]);
  }, [locale, ensure]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 text-sm leading-relaxed text-pretty">
      <h1 className="font-display text-3xl tracking-tight">{tx(locale, "About Sepehr")}</h1>
      <p className="text-muted">{tx(locale, PARAS[0]!)}</p>
      <ul className="flex list-disc flex-col gap-2 ps-5 text-muted">
        {BULLETS.map((b) => (
          <li key={b}>{tx(locale, b)}</li>
        ))}
      </ul>
      <p className="text-muted">{tx(locale, PARAS[1]!)}</p>
      <p className="text-subtle">{tx(locale, PARAS[2]!)}</p>
      <p className="text-subtle">{t(locale, "footer")}</p>
    </main>
  );
}
