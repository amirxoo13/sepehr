/**
 * Assemble a per-chart interpretive report from computed positions + cookbook.
 * Every sentence is keyed off THIS chart's signs, houses, aspects, sect, phase.
 */
import type { ChartAnalysis, HouseLord } from "./analyze";
import { analyzeChart } from "./analyze";
import {
  ASPECT_NATURE,
  ASPECT_SPECIFIC,
  CAZIMI_NOTE,
  CHART_RULER_INTRO,
  COMBUST_NOTE,
  DIGNITY_NOTE,
  ELEMENT_PREPONDERANCE,
  HEMISPHERE,
  HOUSE_LORD_FRAME,
  HOUSE_THEME,
  LUNAR_PHASE,
  MC_SIGN,
  MODE_FRAME,
  MODALITY_PREPONDERANCE,
  NODE_SIGN,
  PATTERN_NOTE,
  PLANET_CORE,
  PLANET_IN_HOUSE,
  PLANET_IN_SIGN,
  POLARITY,
  RETROGRADE_NOTE,
  RISING,
  SECT,
  STELLIUM_NOTE,
  aspectKey,
  pick,
} from "./cookbook";
import { PLANET_NAME, type Locale } from "./i18n";
import { angularDistance, isMainPlanet, planetId, trueAspectOrb } from "./math";
import { dignityOf, type Dignity } from "./meanings";
import type { AspectData, ChartResult, PlanetPosition } from "./types";

export interface AspectLine {
  id: string;
  title: string;
  body: string;
  meta: string;
  other: string;
  aspect: string;
}

export interface ReportBlock {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  meta?: string;
  planetId?: string;
  aspects?: AspectLine[];
}

export interface ChartReport {
  frame: string;
  portrait: string[];
  bigThree: ReportBlock[];
  ruler: ReportBlock;
  planets: ReportBlock[];
  aspects: ReportBlock[];
  houses: ReportBlock[];
  houseLordIntro: string;
  houseLords: HouseLord[];
  pattern: ReportBlock[];
  extra: ReportBlock[];
  analysis: ChartAnalysis;
}

function locSign(sign: string, _locale?: Locale): string {
  return sign;
}
function locPlanet(id: string, _locale?: Locale): string {
  return PLANET_NAME[id] ?? id[0] + id.slice(1).toLowerCase();
}
function locAspect(name: string, _locale?: Locale): string {
  return name.toLowerCase();
}

function fmtDms(p: PlanetPosition): string {
  const d = Math.floor(p.degree_in_sign);
  const m = String(p.degree_minute).padStart(2, "0");
  return `${d}°${m}′`;
}

function fmtOrb(orb: number): string {
  const d = Math.floor(orb);
  const m = String(Math.floor((orb % 1) * 60)).padStart(2, "0");
  return `${d}°${m}′`;
}

function fmtLon(degInSign: number): string {
  const d = Math.floor(degInSign);
  const m = String(Math.floor((degInSign % 1) * 60)).padStart(2, "0");
  return `${d}°${m}′`;
}

function dignityWord(dig: Dignity, _locale?: Locale): string {
  return dig;
}

function aspectLinesFor(id: string, chart: ChartResult, locale: Locale, synastry: boolean): AspectLine[] {
  return chart.aspects
    .filter((a) => a.planet1.toUpperCase() === id || a.planet2.toUpperCase() === id)
    .map((a) => {
      const p1 = a.planet1.toUpperCase();
      const p2 = a.planet2.toUpperCase();
      const other = p1 === id ? p2 : p1;
      const aspect = String(a.aspect_name).toUpperCase();
      const orb = trueAspectOrb(a);
      const specific = pick(ASPECT_SPECIFIC[aspectKey(p1, p2, aspect)], locale);
      const nature = pick(ASPECT_NATURE[aspect], locale);
      const n1 = locPlanet(p1, locale);
      const n2 = locPlanet(p2, locale);
      const an = locAspect(aspect, locale);
      const title = synastry
        ? `${n1} ${an} ${n2}`
        : `${an} ${locPlanet(other, locale)}`;
      return {
        id: `${p1}-${aspect}-${p2}`,
        title,
        body: specific || nature,
        meta: fmtOrb(orb),
        other,
        aspect,
      };
    });
}

function solarCondition(p: PlanetPosition, sun: PlanetPosition | undefined, locale: Locale): string {
  const id = planetId(p);
  if (!sun || (id !== "MERCURY" && id !== "VENUS")) return "";
  const dist = angularDistance(p.longitude, sun.longitude);
  if (dist < 0.28) return pick(CAZIMI_NOTE, locale);
  if (dist < 8.5) return pick(COMBUST_NOTE, locale);
  return "";
}

function planetBlock(
  p: PlanetPosition,
  locale: Locale,
  chart: ChartResult,
  analysis: ChartAnalysis,
  synastry: boolean,
): ReportBlock {
  const id = planetId(p);
  const sign = String(p.sign);
  const dig = dignityOf(id, sign);
  const name = locPlanet(id, locale);
  const signName = locSign(sign, locale);
  const house = p.house;
  const core = pick(PLANET_CORE[id], locale);
  const signText = pick(PLANET_IN_SIGN[id]?.[sign], locale);
  const houseText = house ? pick(PLANET_IN_HOUSE[id]?.[house], locale) : "";
  const digText = pick(DIGNITY_NOTE[dig], locale);
  const rx = p.retrograde ? pick(RETROGRADE_NOTE, locale) : "";
  const combust = solarCondition(p, analysis.sun, locale);
  const ruled = analysis.houseLords.filter((h) => h.ruler === id).map((h) => h.house);
  const isRuler = analysis.chartRuler === id;
  const isAngular = house === 1 || house === 4 || house === 7 || house === 10;
  const score = analysis.scores.find((s) => s.planet === id);

  const title =
    locale === "fa"
      ? `${name} در ${signName}${house ? `، خانهٔ ${house}` : ""}`
      : `${name} in ${sign}${house ? ` · house ${house}` : ""}`;

  const meta = `${fmtDms(p)} · ${dignityWord(dig, locale)}${p.retrograde ? (locale === "fa" ? " · راجع" : " · Rx") : ""}`;

  const extra: string[] = [];
  if (isRuler) {
    extra.push(
      locale === "fa"
        ? "این سیاره حاکم طالع است — کلید ورود به جهان. جای آن را در تمام خوانش وزن کنید."
        : "This planet is the chart ruler — the key of entry into the world. Weigh its placement through the whole reading.",
    );
  }
  if (isAngular) {
    extra.push(
      locale === "fa"
        ? `سیاره در خانهٔ زاویه‌ای ${house} است و زودتر از بقیه در زندگی ظاهر می‌شود.`
        : `The planet sits in angular house ${house} and appears early in the life.`,
    );
  }
  if (ruled.length) {
    extra.push(
      locale === "fa"
        ? `به‌عنوان خداوندگار کاسپ، این سیاره حاکم خانه‌های ${ruled.join("، ")} است؛ موضوع آن خانه‌ها از اینجا اداره می‌شود.`
        : `As cusp lord it rules houses ${ruled.join(", ")}; those topics are administered from this placement.`,
    );
  }
  if (score && analysis.scores[0]?.planet === id) {
    extra.push(
      locale === "fa"
        ? "در وزن‌دهی این نقشه (حاکم طالع، شأن، زاویه، جنبه‌ها) این سیاره غالب است."
        : "On this map’s weighting (chart ruler, dignity, angles, aspects) this planet dominates.",
    );
  }

  const body = [core, signText, houseText, digText, combust, rx, ...extra].filter(Boolean);
  return {
    id,
    kicker: locale === "fa" ? "سیاره" : "Planet",
    title,
    body,
    meta,
    planetId: id,
    aspects: aspectLinesFor(id, chart, locale, synastry),
  };
}

function aspectBlock(a: AspectData, locale: Locale, synastry: boolean): ReportBlock {
  const p1 = a.planet1.toUpperCase();
  const p2 = a.planet2.toUpperCase();
  const aspect = String(a.aspect_name).toUpperCase();
  const orb = trueAspectOrb(a);
  const specific = pick(ASPECT_SPECIFIC[aspectKey(p1, p2, aspect)], locale);
  const nature = pick(ASPECT_NATURE[aspect], locale);
  const n1 = locPlanet(p1, locale);
  const n2 = locPlanet(p2, locale);
  const an = locAspect(aspect, locale);
  const title = synastry
    ? locale === "fa"
      ? `${n1} (نفر اول) ${an} ${n2} (نفر دوم)`
      : `${n1} (person 1) ${an} ${n2} (person 2)`
    : `${n1} ${an} ${n2}`;
  const tightness =
    orb < 1
      ? locale === "fa"
        ? "جنبه‌ای بسیار نزدیک (زیر یک درجه) — وزن آن در خوانش بالاست."
        : "A very tight aspect (under one degree) — it carries high weight in the reading."
      : orb < 3
        ? locale === "fa"
          ? "ارب تنگ؛ گفتگوی دو سیاره در عملِ روزانه شنیده می‌شود."
          : "A tight orb; the two planets’ conversation is audible in daily life."
        : "";
  const body = [specific || nature, tightness].filter(Boolean);
  return {
    id: `${p1}-${aspect}-${p2}`,
    kicker: locale === "fa" ? "جنبه" : "Aspect",
    title,
    body,
    meta: fmtOrb(orb),
  };
}

function portrait(chart: ChartResult, a: ChartAnalysis, locale: Locale): string[] {
  const lines: string[] = [];
  const sun = a.sun;
  const moon = a.moon;
  const name = chart.subject.name;
  if (sun && moon) {
    if (locale === "fa") {
      lines.push(
        `${name}: خورشید در ${locSign(String(sun.sign), locale)} ${fmtDms(sun)} (خانهٔ ${sun.house ?? "؟"})، ماه در ${locSign(String(moon.sign), locale)} ${fmtDms(moon)} (خانهٔ ${moon.house ?? "؟"})، طالع ${locSign(a.ascSign, locale)}. این سه نقطه — هویت، نیاز، نمود — اسکلت خوانش‌اند.`,
      );
    } else {
      lines.push(
        `${name}: Sun in ${sun.sign} ${fmtDms(sun)} (house ${sun.house ?? "?"}), Moon in ${moon.sign} ${fmtDms(moon)} (house ${moon.house ?? "?"}), ${a.ascSign} rising. These three — identity, need, manner — are the skeleton of the reading.`,
      );
    }
  }
  lines.push(pick(MODE_FRAME[chart.mode], locale));
  lines.push(pick(SECT[a.sect], locale));
  lines.push(pick(LUNAR_PHASE[a.lunarPhase.name], locale));
  if (a.ruler) {
    const rName = locPlanet(a.chartRuler, locale);
    if (locale === "fa") {
      lines.push(
        `حاکم طالع ${rName} است و در ${locSign(String(a.ruler.sign), locale)}، خانهٔ ${a.ruler.house ?? "؟"} (${fmtDms(a.ruler)}) جای دارد. ورود به جهان از این میدان عمل می‌کند.`,
      );
    } else {
      lines.push(
        `The chart ruler is ${rName}, placed in ${a.ruler.sign}, house ${a.ruler.house ?? "?"} (${fmtDms(a.ruler)}). Entry into the world acts from that field.`,
      );
    }
  }
  const top = a.scores.slice(0, 3);
  if (top.length) {
    const names = top
      .map((s) =>
        locale === "fa"
          ? `${locPlanet(s.planet, locale)} (${s.score.toFixed(1)})`
          : `${locPlanet(s.planet, locale)} (${s.score.toFixed(1)})`,
      )
      .join(locale === "fa" ? "، " : ", ");
    lines.push(
      locale === "fa"
        ? `سیارات غالب این نقشه (وزن شأن، زاویه، حاکم، جنبه): ${names}.`
        : `Dominant planets on this map (dignity, angles, ruler, aspects): ${names}.`,
    );
  }
  lines.push(pick(ELEMENT_PREPONDERANCE[a.dominantElement], locale));
  if (a.counts.elements[a.weakElement] === 0) {
    lines.push(
      locale === "fa"
        ? `هیچ سیارهٔ کلاسیکی در عنصر ${a.weakElement === "FIRE" ? "آتش" : a.weakElement === "EARTH" ? "خاک" : a.weakElement === "AIR" ? "هوا" : "آب"} نیست — این کمبود در رفتار جبران می‌شود (جستجوی آن کیفیت در دیگری یا در کار).`
        : `No classical planet occupies ${a.weakElement.toLowerCase()} — the lack is compensated in behaviour (seeking that quality in others or in work).`,
    );
  }
  lines.push(pick(MODALITY_PREPONDERANCE[a.dominantModality], locale));
  const pol = a.counts.polarity.masculine >= a.counts.polarity.feminine ? "masculine" : "feminine";
  lines.push(pick(POLARITY[pol], locale));
  const hem = a.counts.hemisphere.south >= a.counts.hemisphere.north ? "south" : "north";
  lines.push(pick(HEMISPHERE[hem], locale));
  const ew = a.counts.hemisphere.east >= a.counts.hemisphere.west ? "east" : "west";
  lines.push(pick(HEMISPHERE[ew], locale));
  if (a.stelliums.length) {
    lines.push(pick(STELLIUM_NOTE, locale));
    for (const s of a.stelliums) {
      const names = s.planets.map((p) => locPlanet(p, locale)).join(locale === "fa" ? "، " : ", ");
      if (s.kind === "sign") {
        lines.push(
          locale === "fa"
            ? `ستلیوم برجی در ${locSign(s.key, locale)}: ${names}.`
            : `Sign stellium in ${s.key}: ${names}.`,
        );
      } else {
        lines.push(
          locale === "fa"
            ? `ستلیوم خانه‌ای در خانهٔ ${s.house}: ${names}.`
            : `House stellium in house ${s.house}: ${names}.`,
        );
      }
    }
  }
  if (a.patterns.length) {
    for (const pat of a.patterns) {
      const names = pat.planets.map((p) => locPlanet(p, locale)).join(locale === "fa" ? "، " : ", ");
      if (pat.kind === "t-square") {
        lines.push(
          locale === "fa"
            ? `T-مربع میان ${names}${pat.apex ? ` — رأس ${locPlanet(pat.apex, locale)}` : ""}. تنش در رأس تخلیه می‌شود.`
            : `T-square among ${names}${pat.apex ? ` — apex ${locPlanet(pat.apex, locale)}` : ""}. Tension discharges at the apex.`,
        );
      } else {
        lines.push(
          locale === "fa" ? `تثلیث بزرگ میان ${names}.` : `Grand trine among ${names}.`,
        );
      }
    }
  }
  if (a.angular.length) {
    lines.push(
      locale === "fa"
        ? `سیارات زاویه‌ای (خانه‌های ۱، ۴، ۷، ۱۰) دیده می‌شوند و زودتر از بقیه در زندگی ظاهر می‌شوند: ${a.angular.map((p) => locPlanet(p, locale)).join("، ")}.`
        : `Angular planets (houses 1, 4, 7, 10) are visible and appear early in life: ${a.angular.map((p) => locPlanet(p, locale)).join(", ")}.`,
    );
  }
  if (a.tightest[0]) {
    const t = a.tightest[0];
    const orb = trueAspectOrb(t);
    lines.push(
      locale === "fa"
        ? `نزدیک‌ترین جنبه: ${locPlanet(t.planet1, locale)} ${locAspect(String(t.aspect_name), locale)} ${locPlanet(t.planet2, locale)} با ارب ${orb.toFixed(2)}°. این گفتگو را در تمام بخش‌های زیر بشنوید.`
        : `Tightest aspect: ${locPlanet(t.planet1, locale)} ${locAspect(String(t.aspect_name), locale)} ${locPlanet(t.planet2, locale)} at ${orb.toFixed(2)}°. Hear this conversation through every section below.`,
    );
  }
  return lines.filter(Boolean);
}

export function buildReport(chart: ChartResult, _locale?: Locale): ChartReport {
  const locale: Locale = "en";
  const a = analyzeChart(chart);
  const synastry = chart.mode === "synastry" || chart.mode === "transit";

  const bigThree: ReportBlock[] = [];
  if (a.sun) bigThree.push(planetBlock(a.sun, locale, chart, a, synastry));
  if (a.moon) bigThree.push(planetBlock(a.moon, locale, chart, a, synastry));
  const ascDeg = ((chart.ascendant % 30) + 30) % 30;
  bigThree.push({
    id: "ASC",
    kicker: locale === "fa" ? "زاویه" : "Angle",
    title: locale === "fa" ? `طالع ${locSign(a.ascSign, locale)}` : `${a.ascSign} rising`,
    meta: `${fmtLon(ascDeg)} · ${locale === "fa" ? `دهک ${a.decan.face}، وجه ${locPlanet(a.decan.ruler, locale)}` : `decan ${a.decan.face}, face ${locPlanet(a.decan.ruler, locale)}`}`,
    body: [
      pick(RISING[a.ascSign], locale),
      locale === "fa"
        ? `دهک ${a.decan.face} از ${locSign(a.ascSign, locale)} (وجوه کلدانی، بطلمیوس I.18) تحت وجه ${locPlanet(a.decan.ruler, locale)} است.`
        : `Decan ${a.decan.face} of ${a.ascSign} (Chaldean faces, Tetrabiblos I.18) is faced by ${a.decan.ruler}.`,
      a.ruler
        ? locale === "fa"
          ? `حاکم این طالع ${locPlanet(a.chartRuler, locale)} است در ${locSign(String(a.ruler.sign), locale)}، خانهٔ ${a.ruler.house ?? "؟"}.`
          : `This rising’s lord is ${locPlanet(a.chartRuler, locale)} in ${a.ruler.sign}, house ${a.ruler.house ?? "?"}.`
        : "",
    ].filter(Boolean),
  });
  const mcDeg = ((chart.mediumCoeli % 30) + 30) % 30;
  const mcLord = a.houseLords.find((h) => h.house === 10);
  bigThree.push({
    id: "MC",
    kicker: locale === "fa" ? "زاویه" : "Angle",
    title: locale === "fa" ? `وسط‌السماء ${locSign(a.mcSign, locale)}` : `MC in ${a.mcSign}`,
    meta: fmtLon(mcDeg),
    body: [
      pick(MC_SIGN[a.mcSign], locale),
      mcLord
        ? locale === "fa"
          ? `حاکم خانهٔ دهم ${locPlanet(mcLord.ruler, locale)} است در ${locSign(mcLord.rulerSign, locale)}${mcLord.rulerHouse ? `، خانهٔ ${mcLord.rulerHouse}` : ""} (${dignityWord(mcLord.dignity, locale)}). مسیر عمومی از این سیاره خوانده می‌شود.`
          : `The 10th-house lord is ${locPlanet(mcLord.ruler, locale)} in ${mcLord.rulerSign}${mcLord.rulerHouse ? `, house ${mcLord.rulerHouse}` : ""} (${dignityWord(mcLord.dignity, locale)}). The public path is read from this planet.`
        : "",
    ].filter(Boolean),
  });

  const ruler: ReportBlock = {
    id: "ruler",
    kicker: locale === "fa" ? "کلید نقشه" : "Chart key",
    title:
      locale === "fa"
        ? `حاکم طالع: ${locPlanet(a.chartRuler, locale)}`
        : `Chart ruler: ${locPlanet(a.chartRuler, locale)}`,
    meta: a.ruler
      ? `${fmtDms(a.ruler)} ${locSign(String(a.ruler.sign), locale)}${a.ruler.house ? ` · H${a.ruler.house}` : ""}`
      : undefined,
    planetId: a.chartRuler,
    body: [
      pick(CHART_RULER_INTRO, locale),
      a.ruler ? planetBlock(a.ruler, locale, chart, a, synastry).body.slice(1, 3).join(" ") : "",
    ].filter(Boolean),
    aspects: a.ruler ? aspectLinesFor(a.chartRuler, chart, locale, synastry) : [],
  };

  const planets = chart.positions
    .filter((p) => isMainPlanet(p) && planetId(p) !== "SUN" && planetId(p) !== "MOON")
    .map((p) => planetBlock(p, locale, chart, a, synastry));

  const aspects = a.tightest.map((x) => aspectBlock(x, locale, synastry));

  const houses: ReportBlock[] = chart.houses.map((h) => {
    const occupants = chart.positions.filter(isMainPlanet).filter((p) => p.house === h.house);
    const names = occupants.map((p) => locPlanet(planetId(p), locale)).join(locale === "fa" ? "، " : ", ");
    const angle = h.house === 1 ? "ASC" : h.house === 4 ? "IC" : h.house === 7 ? "DSC" : h.house === 10 ? "MC" : "";
    const lord = a.houseLords.find((x) => x.house === h.house);
    const occLines = occupants.map((p) => {
      const id = planetId(p);
      return locale === "fa"
        ? `${locPlanet(id, locale)} ${fmtDms(p)} ${locSign(String(p.sign), locale)}`
        : `${locPlanet(id, locale)} ${fmtDms(p)} ${p.sign}`;
    });
    const lordLine = lord
      ? locale === "fa"
        ? `حاکم کاسپ: ${locPlanet(lord.ruler, locale)} در ${locSign(lord.rulerSign, locale)}${lord.rulerHouse ? `، خانهٔ ${lord.rulerHouse}` : ""} — شأن ${dignityWord(lord.dignity, locale)}.`
        : `Cusp lord: ${locPlanet(lord.ruler, locale)} in ${lord.rulerSign}${lord.rulerHouse ? `, house ${lord.rulerHouse}` : ""} — ${dignityWord(lord.dignity, locale)}.`
      : "";
    return {
      id: `H${h.house}`,
      kicker: locale === "fa" ? "خانه" : "House",
      title:
        locale === "fa"
          ? `خانهٔ ${h.house}${angle ? ` · ${angle}` : ""} — ${locSign(String(h.sign), locale)}`
          : `House ${h.house}${angle ? ` · ${angle}` : ""} — ${h.sign}`,
      meta: `${Math.floor(h.degree_in_sign)}°${String(Math.floor((h.degree_in_sign % 1) * 60)).padStart(2, "0")}′${occupants.length ? ` · ${names}` : locale === "fa" ? " · خالی از سیارهٔ کلاسیک" : " · no classical planet"}`,
      body: [
        pick(HOUSE_THEME[h.house], locale),
        lordLine,
        occupants.length
          ? locale === "fa"
            ? `ساکنان: ${occLines.join("؛ ")}. میدان این خانه در زندگی پررنگ است.`
            : `Occupants: ${occLines.join("; ")}. This field is loud in the life.`
          : locale === "fa"
            ? "خالی از سیارهٔ کلاسیک به معنای بی‌اهمیتی نیست؛ موضوع از راه حاکم برجِ کاسپ و عبورها فعال می‌شود."
            : "An empty house is not unimportant; the topic is activated by the cusp’s lord and by transits.",
      ].filter(Boolean),
    };
  });

  const pattern: ReportBlock[] = [
    {
      id: "elements",
      kicker: locale === "fa" ? "الگو" : "Pattern",
      title: locale === "fa" ? "عناصر و مزاج" : "Elements and temperament",
      body: [
        locale === "fa"
          ? `آتش ${a.counts.elements.FIRE} · خاک ${a.counts.elements.EARTH} · هوا ${a.counts.elements.AIR} · آب ${a.counts.elements.WATER} — اصلی ${a.counts.modalities.CARDINAL} · ثابت ${a.counts.modalities.FIXED} · متغیر ${a.counts.modalities.MUTABLE}`
          : `Fire ${a.counts.elements.FIRE} · Earth ${a.counts.elements.EARTH} · Air ${a.counts.elements.AIR} · Water ${a.counts.elements.WATER} — Cardinal ${a.counts.modalities.CARDINAL} · Fixed ${a.counts.modalities.FIXED} · Mutable ${a.counts.modalities.MUTABLE}`,
        pick(ELEMENT_PREPONDERANCE[a.dominantElement], locale),
        pick(MODALITY_PREPONDERANCE[a.dominantModality], locale),
      ],
    },
  ];

  for (const pat of a.patterns) {
    const names = pat.planets.map((p) => locPlanet(p, locale)).join(locale === "fa" ? "، " : ", ");
    pattern.push({
      id: `${pat.kind}-${pat.planets.join("-")}`,
      kicker: locale === "fa" ? "پیکربندی" : "Configuration",
      title:
        pat.kind === "t-square"
          ? locale === "fa"
            ? `T-مربع${pat.apex ? ` — رأس ${locPlanet(pat.apex, locale)}` : ""}`
            : `T-square${pat.apex ? ` — apex ${locPlanet(pat.apex, locale)}` : ""}`
          : locale === "fa"
            ? "تثلیث بزرگ"
            : "Grand trine",
      meta: names,
      body: [
        pick(PATTERN_NOTE[pat.kind], locale),
        locale === "fa" ? `سیارات درگیر: ${names}.` : `Planets involved: ${names}.`,
      ].filter(Boolean),
    });
  }

  if (a.scores.length) {
    pattern.push({
      id: "scores",
      kicker: locale === "fa" ? "الگو" : "Pattern",
      title: locale === "fa" ? "وزن سیارات" : "Planet weighting",
      body: [
        locale === "fa"
          ? "امتیاز از حاکم طالع، خورشید/ماه، شأن بطلمیوسی، زاویه‌ای بودن و تعداد جنبه‌ها ساخته می‌شود — نه از شهرت عام."
          : "Scores are built from chart ruler, Sun/Moon, Ptolemaic dignity, angularity and aspect count — not from popular reputation.",
        a.scores
          .map((s) => `${locPlanet(s.planet, locale)} ${s.score.toFixed(1)}`)
          .join(locale === "fa" ? " · " : " · "),
      ],
    });
  }

  if (a.retrogrades.length) {
    pattern.push({
      id: "rx",
      kicker: locale === "fa" ? "الگو" : "Pattern",
      title: locale === "fa" ? "رجوع" : "Retrogrades",
      body: [
        pick(RETROGRADE_NOTE, locale),
        locale === "fa"
          ? `راجع در این نقشه: ${a.retrogrades.map((p) => locPlanet(p, locale)).join("، ")}.`
          : `Retrograde in this map: ${a.retrogrades.map((p) => locPlanet(p, locale)).join(", ")}.`,
      ],
    });
  }

  const extra: ReportBlock[] = [];
  if (a.node) {
    extra.push({
      id: "node",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: locale === "fa" ? `رأس (گره شمالی) در ${locSign(String(a.node.sign), locale)}` : `North Node in ${a.node.sign}`,
      meta: `${fmtDms(a.node)}${a.node.house ? ` · H${a.node.house}` : ""}`,
      body: [pick(NODE_SIGN[String(a.node.sign)], locale)].filter(Boolean),
    });
  }
  if (a.lilith) {
    extra.push({
      id: "lilith",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: locale === "fa" ? `لیلیث (اوج میانگین ماه) در ${locSign(String(a.lilith.sign), locale)}` : `Lilith (mean apogee) in ${a.lilith.sign}`,
      meta: `${fmtDms(a.lilith)}${a.lilith.house ? ` · H${a.lilith.house}` : ""}`,
      body: [
        locale === "fa"
          ? "لیلیث نقطهٔ اوج میانگین مدار ماه است، نه سیاره. در سنت مدرن، جایی است که نیاز از هنجار خارج می‌شود و انکار یا شیفتگی می‌سازد."
          : "Lilith is the Moon’s mean apogee, not a planet. In the modern tradition it marks where need leaves the norm and becomes fascination or denial.",
        a.lilith.house ? pick(HOUSE_THEME[a.lilith.house], locale) : "",
      ].filter(Boolean),
    });
  }
  if (a.chiron) {
    extra.push({
      id: "chiron",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: locale === "fa" ? `کیرون در ${locSign(String(a.chiron.sign), locale)}` : `Chiron in ${a.chiron.sign}`,
      meta: `${fmtDms(a.chiron)}${a.chiron.house ? ` · H${a.chiron.house}` : ""}`,
      body: [
        locale === "fa"
          ? "کیرون سیارک «زخم شفادهنده» است. برج، سبک زخم را می‌گوید؛ خانه، میدان زندگی را."
          : "Chiron is the asteroid of the healing wound. The sign is the wound’s style; the house is the field of life.",
        a.chiron.house ? pick(HOUSE_THEME[a.chiron.house], locale) : "",
      ].filter(Boolean),
    });
  }

  return {
    frame: pick(MODE_FRAME[chart.mode], locale),
    portrait: portrait(chart, a, locale),
    bigThree,
    ruler,
    planets,
    aspects,
    houses,
    houseLordIntro: pick(HOUSE_LORD_FRAME, locale),
    houseLords: a.houseLords,
    pattern,
    extra,
    analysis: a,
  };
}

export function reportStrings(r: ChartReport): string[] {
  const out: string[] = [r.frame, r.houseLordIntro, ...r.portrait];
  const eat = (b: ReportBlock) => {
    out.push(b.kicker, b.title, b.meta ?? "", ...b.body);
    for (const a of b.aspects ?? []) out.push(a.title, a.body);
  };
  r.bigThree.forEach(eat);
  eat(r.ruler);
  r.planets.forEach(eat);
  r.aspects.forEach(eat);
  r.houses.forEach(eat);
  r.pattern.forEach(eat);
  r.extra.forEach(eat);
  return [...new Set(out.filter((s) => Boolean(s && s.trim())))];
}

export { analyzeChart };
export type { ChartAnalysis };
