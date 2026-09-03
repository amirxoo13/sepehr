import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/components/layout/locale-provider";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  const { locale } = useLocale();
  const fa = locale === "fa";
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 text-sm leading-relaxed text-pretty">
      <h1 className="font-display text-3xl tracking-tight">{fa ? "دربارهٔ سپهر" : "About Sepehr"}</h1>
      <p className="text-muted">
        {fa
          ? "سپهر موتور محاسباتی همان پلتفرم استرولوژی است که بات تلگرام از آن استفاده می‌کند: Swiss Ephemeris، زودیاک استوایی، خانه‌های پلاسیدوس، ارب‌های API، LMT برای پیش از ۱۹۰۰، و الگوریتم‌های سیناستری / کامپوزیت / سولار ریترن / پروگرس ثانویه."
          : "Sepehr is the computational front of the same astrology platform as the Telegram bot: Swiss Ephemeris, tropical zodiac, Placidus houses, API orbs, LMT before 1900, and the synastry / composite / solar-return / secondary-progression algorithms."}
      </p>
      <ul className="flex list-disc flex-col gap-2 ps-5 text-muted">
        <li>Swiss Ephemeris (Moshier) via @swisseph/browser — AGPL-3.0</li>
        <li>house_for_longitude, aspects, midpoints: swiss-ephemeris-api commit 8a03d63</li>
        <li>LMT = longitude / 15 — bot/birthtime.py</li>
        <li>Wheel: ASC at 9 o’clock — bot/chartwheel.py</li>
        <li>Solar return first-order correction — bot/astro.py MEAN_SOLAR_SPEED</li>
        <li>Secondary progression: 1 day = 1 year, TROPICAL_YEAR_DAYS = 365.24219</li>
        <li>Dignities: Ptolemy, Tetrabiblos I.17–19</li>
        <li>Geocoding: Nominatim (OSM) + curated gazetteer + tz-lookup</li>
      </ul>
      <p className="text-muted">
        {fa
          ? "نمونهٔ اینشتین از فیکسچر مخزن است: اولم، ۱۴ مارس ۱۸۷۹، ۱۱:۳۰، Europe/Berlin، پلاسیدوس. برای تولدهای پیش از ۱۹۰۰، حالت پیش‌فرض LMT محل تولد است — مطابق بات."
          : "The Einstein demo uses the repository fixture: Ulm, 14 March 1879, 11:30, Europe/Berlin, Placidus. For other pre-1900 births the default is birthplace LMT — matching the bot."}
      </p>
      <p className="text-subtle">
        {fa
          ? "تفسیر سنتی فهرست کلیدواژه‌هاست، نه پیش‌بینی. خوانش عمیق اختیاری است و از روی همین اعداد چارت ساخته می‌شود."
          : "The traditional reading is a keyword list, not a prediction. The optional deep reading is generated from these computed positions only."}
      </p>
    </main>
  );
}
