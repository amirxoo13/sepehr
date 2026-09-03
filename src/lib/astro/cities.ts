import type { City } from "./types";

/** Curated gazetteer with IANA zones. Coordinates from GeoNames / OSM. */
export const CITIES: City[] = [
  { name: "Tehran", nameFa: "تهران", country: "Iran", countryFa: "ایران", lat: 35.6892, lon: 51.389, tz: "Asia/Tehran" },
  { name: "Mashhad", nameFa: "مشهد", country: "Iran", countryFa: "ایران", lat: 36.2605, lon: 59.6168, tz: "Asia/Tehran" },
  { name: "Isfahan", nameFa: "اصفهان", country: "Iran", countryFa: "ایران", lat: 32.6546, lon: 51.668, tz: "Asia/Tehran" },
  { name: "Shiraz", nameFa: "شیراز", country: "Iran", countryFa: "ایران", lat: 29.5918, lon: 52.5837, tz: "Asia/Tehran" },
  { name: "Tabriz", nameFa: "تبریز", country: "Iran", countryFa: "ایران", lat: 38.0962, lon: 46.273, tz: "Asia/Tehran" },
  { name: "Karaj", nameFa: "کرج", country: "Iran", countryFa: "ایران", lat: 35.8406, lon: 50.9391, tz: "Asia/Tehran" },
  { name: "Qom", nameFa: "قم", country: "Iran", countryFa: "ایران", lat: 34.6401, lon: 50.8764, tz: "Asia/Tehran" },
  { name: "Ahvaz", nameFa: "اهواز", country: "Iran", countryFa: "ایران", lat: 31.3183, lon: 48.6706, tz: "Asia/Tehran" },
  { name: "Kermanshah", nameFa: "کرمانشاه", country: "Iran", countryFa: "ایران", lat: 34.3142, lon: 47.065, tz: "Asia/Tehran" },
  { name: "Urmia", nameFa: "ارومیه", country: "Iran", countryFa: "ایران", lat: 37.5527, lon: 45.0761, tz: "Asia/Tehran" },
  { name: "Rasht", nameFa: "رشت", country: "Iran", countryFa: "ایران", lat: 37.2808, lon: 49.5832, tz: "Asia/Tehran" },
  { name: "Zahedan", nameFa: "زاهدان", country: "Iran", countryFa: "ایران", lat: 29.4963, lon: 60.8629, tz: "Asia/Tehran" },
  { name: "Hamadan", nameFa: "همدان", country: "Iran", countryFa: "ایران", lat: 34.7992, lon: 48.5146, tz: "Asia/Tehran" },
  { name: "Kerman", nameFa: "کرمان", country: "Iran", countryFa: "ایران", lat: 30.2832, lon: 57.0788, tz: "Asia/Tehran" },
  { name: "Yazd", nameFa: "یزد", country: "Iran", countryFa: "ایران", lat: 31.8974, lon: 54.3678, tz: "Asia/Tehran" },
  { name: "Ardabil", nameFa: "اردبیل", country: "Iran", countryFa: "ایران", lat: 38.2498, lon: 48.2933, tz: "Asia/Tehran" },
  { name: "Bandar Abbas", nameFa: "بندرعباس", country: "Iran", countryFa: "ایران", lat: 27.1865, lon: 56.2808, tz: "Asia/Tehran" },
  { name: "Arak", nameFa: "اراک", country: "Iran", countryFa: "ایران", lat: 34.0917, lon: 49.6892, tz: "Asia/Tehran" },
  { name: "Qazvin", nameFa: "قزوین", country: "Iran", countryFa: "ایران", lat: 36.2688, lon: 50.0041, tz: "Asia/Tehran" },
  { name: "Sari", nameFa: "ساری", country: "Iran", countryFa: "ایران", lat: 36.5633, lon: 53.0601, tz: "Asia/Tehran" },
  { name: "Gorgan", nameFa: "گرگان", country: "Iran", countryFa: "ایران", lat: 36.8427, lon: 54.4439, tz: "Asia/Tehran" },
  { name: "Kashan", nameFa: "کاشان", country: "Iran", countryFa: "ایران", lat: 33.985, lon: 51.41, tz: "Asia/Tehran" },
  { name: "Bushehr", nameFa: "بوشهر", country: "Iran", countryFa: "ایران", lat: 28.9234, lon: 50.8203, tz: "Asia/Tehran" },
  { name: "Sanandaj", nameFa: "سنندج", country: "Iran", countryFa: "ایران", lat: 35.3219, lon: 46.9862, tz: "Asia/Tehran" },
  { name: "Zanjan", nameFa: "زنجان", country: "Iran", countryFa: "ایران", lat: 36.6736, lon: 48.4787, tz: "Asia/Tehran" },
  { name: "Khorramabad", nameFa: "خرم‌آباد", country: "Iran", countryFa: "ایران", lat: 33.4878, lon: 48.3558, tz: "Asia/Tehran" },
  { name: "Ulm", nameFa: "اولم", country: "Germany", countryFa: "آلمان", lat: 48.4011, lon: 9.9876, tz: "Europe/Berlin" },
  { name: "Berlin", nameFa: "برلین", country: "Germany", countryFa: "آلمان", lat: 52.52, lon: 13.405, tz: "Europe/Berlin" },
  { name: "Frankfurt", nameFa: "فرانکفورت", country: "Germany", countryFa: "آلمان", lat: 50.1109, lon: 8.6821, tz: "Europe/Berlin" },
  { name: "Paris", nameFa: "پاریس", country: "France", countryFa: "فرانسه", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { name: "London", nameFa: "لندن", country: "United Kingdom", countryFa: "بریتانیا", lat: 51.5074, lon: -0.1278, tz: "Europe/London" },
  { name: "Rome", nameFa: "رم", country: "Italy", countryFa: "ایتالیا", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome" },
  { name: "Madrid", nameFa: "مادرید", country: "Spain", countryFa: "اسپانیا", lat: 40.4168, lon: -3.7038, tz: "Europe/Madrid" },
  { name: "Vienna", nameFa: "وین", country: "Austria", countryFa: "اتریش", lat: 48.2082, lon: 16.3738, tz: "Europe/Vienna" },
  { name: "Zurich", nameFa: "زوریخ", country: "Switzerland", countryFa: "سوئیس", lat: 47.3769, lon: 8.5417, tz: "Europe/Zurich" },
  { name: "Amsterdam", nameFa: "آمستردام", country: "Netherlands", countryFa: "هلند", lat: 52.3676, lon: 4.9041, tz: "Europe/Amsterdam" },
  { name: "Istanbul", nameFa: "استانبول", country: "Turkey", countryFa: "ترکیه", lat: 41.0082, lon: 28.9784, tz: "Europe/Istanbul" },
  { name: "Ankara", nameFa: "آنکارا", country: "Turkey", countryFa: "ترکیه", lat: 39.9334, lon: 32.8597, tz: "Europe/Istanbul" },
  { name: "Cairo", nameFa: "قاهره", country: "Egypt", countryFa: "مصر", lat: 30.0444, lon: 31.2357, tz: "Africa/Cairo" },
  { name: "Dubai", nameFa: "دبی", country: "UAE", countryFa: "امارات", lat: 25.2048, lon: 55.2708, tz: "Asia/Dubai" },
  { name: "Riyadh", nameFa: "ریاض", country: "Saudi Arabia", countryFa: "عربستان", lat: 24.7136, lon: 46.6753, tz: "Asia/Riyadh" },
  { name: "Baghdad", nameFa: "بغداد", country: "Iraq", countryFa: "عراق", lat: 33.3152, lon: 44.3661, tz: "Asia/Baghdad" },
  { name: "Beirut", nameFa: "بیروت", country: "Lebanon", countryFa: "لبنان", lat: 33.8938, lon: 35.5018, tz: "Asia/Beirut" },
  { name: "Damascus", nameFa: "دمشق", country: "Syria", countryFa: "سوریه", lat: 33.5138, lon: 36.2765, tz: "Asia/Damascus" },
  { name: "Jerusalem", nameFa: "اورشلیم", country: "Israel", countryFa: "اسرائیل", lat: 31.7683, lon: 35.2137, tz: "Asia/Jerusalem" },
  { name: "Baku", nameFa: "باکو", country: "Azerbaijan", countryFa: "جمهوری آذربایجان", lat: 40.4093, lon: 49.8671, tz: "Asia/Baku" },
  { name: "Yerevan", nameFa: "ایروان", country: "Armenia", countryFa: "ارمنستان", lat: 40.1792, lon: 44.4991, tz: "Asia/Yerevan" },
  { name: "Tbilisi", nameFa: "تفلیس", country: "Georgia", countryFa: "گرجستان", lat: 41.7151, lon: 44.8271, tz: "Asia/Tbilisi" },
  { name: "Kabul", nameFa: "کابل", country: "Afghanistan", countryFa: "افغانستان", lat: 34.5553, lon: 69.2075, tz: "Asia/Kabul" },
  { name: "Islamabad", nameFa: "اسلام‌آباد", country: "Pakistan", countryFa: "پاکستان", lat: 33.6844, lon: 73.0479, tz: "Asia/Karachi" },
  { name: "Mumbai", nameFa: "بمبئی", country: "India", countryFa: "هند", lat: 19.076, lon: 72.8777, tz: "Asia/Kolkata" },
  { name: "New Delhi", nameFa: "دهلی نو", country: "India", countryFa: "هند", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  { name: "Beijing", nameFa: "پکن", country: "China", countryFa: "چین", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" },
  { name: "Tokyo", nameFa: "توکیو", country: "Japan", countryFa: "ژاپن", lat: 35.6762, lon: 139.6503, tz: "Asia/Tokyo" },
  { name: "Seoul", nameFa: "سئول", country: "South Korea", countryFa: "کره جنوبی", lat: 37.5665, lon: 126.978, tz: "Asia/Seoul" },
  { name: "Singapore", nameFa: "سنگاپور", country: "Singapore", countryFa: "سنگاپور", lat: 1.3521, lon: 103.8198, tz: "Asia/Singapore" },
  { name: "Hong Kong", nameFa: "هنگ‌کنگ", country: "Hong Kong", countryFa: "هنگ‌کنگ", lat: 22.3193, lon: 114.1694, tz: "Asia/Hong_Kong" },
  { name: "Sydney", nameFa: "سیدنی", country: "Australia", countryFa: "استرالیا", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
  { name: "Melbourne", nameFa: "ملبورن", country: "Australia", countryFa: "استرالیا", lat: -37.8136, lon: 144.9631, tz: "Australia/Melbourne" },
  { name: "New York", nameFa: "نیویورک", country: "United States", countryFa: "آمریکا", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
  { name: "Los Angeles", nameFa: "لس‌آنجلس", country: "United States", countryFa: "آمریکا", lat: 34.0522, lon: -118.2437, tz: "America/Los_Angeles" },
  { name: "Chicago", nameFa: "شیکاگو", country: "United States", countryFa: "آمریکا", lat: 41.8781, lon: -87.6298, tz: "America/Chicago" },
  { name: "Toronto", nameFa: "تورنتو", country: "Canada", countryFa: "کانادا", lat: 43.6532, lon: -79.3832, tz: "America/Toronto" },
  { name: "Mexico City", nameFa: "مکزیکوسیتی", country: "Mexico", countryFa: "مکزیک", lat: 19.4326, lon: -99.1332, tz: "America/Mexico_City" },
  { name: "São Paulo", nameFa: "سائو پائولو", country: "Brazil", countryFa: "برزیل", lat: -23.5505, lon: -46.6333, tz: "America/Sao_Paulo" },
  { name: "Buenos Aires", nameFa: "بوئنوس آیرس", country: "Argentina", countryFa: "آرژانتین", lat: -34.6037, lon: -58.3816, tz: "America/Argentina/Buenos_Aires" },
  { name: "Moscow", nameFa: "مسکو", country: "Russia", countryFa: "روسیه", lat: 55.7558, lon: 37.6173, tz: "Europe/Moscow" },
  { name: "Cape Town", nameFa: "کیپ‌تاون", country: "South Africa", countryFa: "آفریقای جنوبی", lat: -33.9249, lon: 18.4241, tz: "Africa/Johannesburg" },
  { name: "Nairobi", nameFa: "نایروبی", country: "Kenya", countryFa: "کنیا", lat: -1.2921, lon: 36.8219, tz: "Africa/Nairobi" },
];

export function searchCities(query: string, limit = 8): City[] {
  const q = query.trim().toLowerCase();
  if (!q) return CITIES.slice(0, limit);
  const scored = CITIES.map((c) => {
    const hay = `${c.name} ${c.nameFa} ${c.country} ${c.countryFa}`.toLowerCase();
    let score = 0;
    if (c.name.toLowerCase().startsWith(q) || c.nameFa.startsWith(query.trim())) score += 3;
    if (hay.includes(q)) score += 1;
    return { c, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.c);
}

export function looksLikeCoordinates(text: string): boolean {
  const stripped = text.trim();
  if (!stripped) return false;
  const hasLetter = /[A-Za-z\u0600-\u06FF]/.test(stripped);
  const hasDigit = /\d/.test(stripped);
  return hasDigit && !hasLetter;
}

export function parseCoordinates(text: string): { lat: number; lon: number } {
  const parts = text.split(",").map((p) => p.trim());
  if (parts.length !== 2) throw new Error("Coordinates format: lat,lon — example 35.69,51.39");
  const lat = Number(parts[0]);
  const lon = Number(parts[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("Coordinates must be numbers.");
  if (lat < -90 || lat > 90) throw new Error("Latitude must be between -90 and 90.");
  if (lon < -180 || lon > 180) throw new Error("Longitude must be between -180 and 180.");
  return { lat, lon };
}
