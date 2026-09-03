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
  PLANET_IN_SIGN,
  POLARITY,
  RETROGRADE_NOTE,
  RISING,
  SECT,
  STELLIUM_NOTE,
  aspectKey,
  pick,
} from "./cookbook";
import {
  EMPTY_HOUSE,
  HOUSE_KIND,
  HOUSE_LORD_INTRO,
  HOUSE_SECTION_INTRO,
  HOUSE_SHORT_EN,
  HOUSE_SHORT_FA,
  OCCUPIED_LEAD,
  PLANET_FA_NAME,
  SIGN_FA_NAME,
  SIGN_PLAIN,
  houseKindKey,
  locDignity,
  planetInHousePlain,
} from "./house-copy";
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
  houseIntro: string[];
  houseLords: HouseLord[];
  pattern: ReportBlock[];
  extra: ReportBlock[];
  analysis: ChartAnalysis;
}

function locSign(sign: string, locale?: Locale): string {
  if (locale === "fa") return SIGN_FA_NAME[sign] ?? sign;
  return sign;
}
function locPlanet(id: string, locale?: Locale): string {
  const key = id.toUpperCase();
  if (locale === "fa") return PLANET_FA_NAME[key] ?? PLANET_NAME[key] ?? id;
  return PLANET_NAME[key] ?? id[0] + id.slice(1).toLowerCase();
}
function locAspect(name: string, _locale?: Locale): string {
  return name.toLowerCase();
}

function say(locale: Locale, en: string, fa: string): string {
  return locale === "fa" ? fa : en;
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

function dignityWord(dig: Dignity, locale?: Locale): string {
  return locDignity(dig, locale ?? "en");
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
  const houseText = house ? planetInHousePlain(id, house, locale) : "";
  const digText = pick(DIGNITY_NOTE[dig], locale);
  const rx = p.retrograde ? pick(RETROGRADE_NOTE, locale) : "";
  const combust = solarCondition(p, analysis.sun, locale);
  const ruled = analysis.houseLords.filter((h) => h.ruler === id).map((h) => h.house);
  const isRuler = analysis.chartRuler === id;
  const isAngular = house === 1 || house === 4 || house === 7 || house === 10;
  const score = analysis.scores.find((s) => s.planet === id);

  const title = say(
    locale,
    `${name} in ${sign}${house ? ` · house ${house}` : ""}`,
    `${name} در ${signName}${house ? `، خانهٔ ${house}` : ""}`,
  );

  const meta = `${fmtDms(p)} · ${dignityWord(dig, locale)}${p.retrograde ? (locale === "fa" ? " · راجع" : " · Rx") : ""}`;

  const extra: string[] = [];
  if (isRuler) {
    extra.push(
      say(
        locale,
        "This planet is the chart ruler — the key of entry into the world. Weigh its placement through the whole reading.",
        "این سیاره حاکم طالع است؛ یعنی کلید ورود به جهان. جایش را در تمام خوانش وزن کنید.",
      ),
    );
  }
  if (isAngular) {
    extra.push(
      say(
        locale,
        `The planet sits in angular house ${house} and appears early in the life.`,
        `این سیاره در خانهٔ زاویه‌ای ${house} است و زودتر از بقیه در زندگی دیده می‌شود.`,
      ),
    );
  }
  if (ruled.length) {
    extra.push(
      say(
        locale,
        `As cusp lord it rules houses ${ruled.join(", ")}; those topics are administered from this placement.`,
        `این سیاره حاکم خانه‌های ${ruled.join("، ")} است؛ موضوع آن خانه‌ها از همین‌جا اداره می‌شود.`,
      ),
    );
  }
  if (score && analysis.scores[0]?.planet === id) {
    extra.push(
      say(
        locale,
        "On this map’s weighting (chart ruler, dignity, angles, aspects) this planet dominates.",
        "در وزن‌دهی این نقشه (حاکم طالع، شأن، زاویه، جنبه‌ها) این سیاره غالب است.",
      ),
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
    ? say(locale, `${n1} (person 1) ${an} ${n2} (person 2)`, `${n1} (نفر اول) ${an} ${n2} (نفر دوم)`)
    : `${n1} ${an} ${n2}`;
  const tightness =
    orb < 1
      ? say(
          locale,
          "A very tight aspect (under one degree) — it carries high weight in the reading.",
          "جنبه‌ای بسیار نزدیک (زیر یک درجه) — وزن آن در خوانش بالاست.",
        )
      : orb < 3
        ? say(
            locale,
            "A tight orb; the two planets’ conversation is audible in daily life.",
            "ارب تنگ است؛ گفتگوی دو سیاره در زندگی روزمره شنیده می‌شود.",
          )
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
    lines.push(
      say(
        locale,
        `${name}: Sun in ${sun.sign} ${fmtDms(sun)} (house ${sun.house ?? "?"}), Moon in ${moon.sign} ${fmtDms(moon)} (house ${moon.house ?? "?"}), ${a.ascSign} rising. These three — identity, need, manner — are the skeleton of the reading.`,
        `${name}: خورشید در ${locSign(String(sun.sign), locale)} ${fmtDms(sun)} (خانهٔ ${sun.house ?? "؟"})، ماه در ${locSign(String(moon.sign), locale)} ${fmtDms(moon)} (خانهٔ ${moon.house ?? "؟"})، طالع ${locSign(a.ascSign, locale)}. این سه نقطه — هویت، نیاز، نمود — اسکلت خوانش‌اند.`,
      ),
    );
  }
  lines.push(pick(MODE_FRAME[chart.mode], locale));
  lines.push(pick(SECT[a.sect], locale));
  lines.push(pick(LUNAR_PHASE[a.lunarPhase.name], locale));
  if (a.ruler) {
    const rName = locPlanet(a.chartRuler, locale);
    lines.push(
      say(
        locale,
        `The chart ruler is ${rName}, placed in ${a.ruler.sign}, house ${a.ruler.house ?? "?"} (${fmtDms(a.ruler)}). Entry into the world acts from that field.`,
        `حاکم طالع ${rName} است و در ${locSign(String(a.ruler.sign), locale)}، خانهٔ ${a.ruler.house ?? "؟"} (${fmtDms(a.ruler)}) جای دارد. ورود به جهان از این میدان عمل می‌کند.`,
      ),
    );
  }
  const top = a.scores.slice(0, 3);
  if (top.length) {
    const names = top.map((s) => `${locPlanet(s.planet, locale)} (${s.score.toFixed(1)})`).join(locale === "fa" ? "، " : ", ");
    lines.push(
      say(
        locale,
        `Dominant planets on this map (dignity, angles, ruler, aspects): ${names}.`,
        `سیارات غالب این نقشه (وزن شأن، زاویه، حاکم، جنبه): ${names}.`,
      ),
    );
  }
  lines.push(pick(ELEMENT_PREPONDERANCE[a.dominantElement], locale));
  if (a.counts.elements[a.weakElement] === 0) {
    const weakFa =
      a.weakElement === "FIRE" ? "آتش" : a.weakElement === "EARTH" ? "خاک" : a.weakElement === "AIR" ? "هوا" : "آب";
    lines.push(
      say(
        locale,
        `No classical planet occupies ${a.weakElement.toLowerCase()} — the lack is compensated in behaviour (seeking that quality in others or in work).`,
        `هیچ سیارهٔ کلاسیکی در عنصر ${weakFa} نیست — این کمبود در رفتار جبران می‌شود (جستجوی آن کیفیت در دیگری یا در کار).`,
      ),
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
          say(locale, `Sign stellium in ${s.key}: ${names}.`, `ستلیوم برجی در ${locSign(s.key, locale)}: ${names}.`),
        );
      } else {
        lines.push(
          say(locale, `House stellium in house ${s.house}: ${names}.`, `ستلیوم خانه‌ای در خانهٔ ${s.house}: ${names}.`),
        );
      }
    }
  }
  if (a.patterns.length) {
    for (const pat of a.patterns) {
      const names = pat.planets.map((p) => locPlanet(p, locale)).join(locale === "fa" ? "، " : ", ");
      if (pat.kind === "t-square") {
        lines.push(
          say(
            locale,
            `T-square among ${names}${pat.apex ? ` — apex ${locPlanet(pat.apex, locale)}` : ""}. Tension discharges at the apex.`,
            `T-مربع میان ${names}${pat.apex ? ` — رأس ${locPlanet(pat.apex, locale)}` : ""}. تنش در رأس تخلیه می‌شود.`,
          ),
        );
      } else {
        lines.push(say(locale, `Grand trine among ${names}.`, `تثلیث بزرگ میان ${names}.`));
      }
    }
  }
  if (a.angular.length) {
    lines.push(
      say(
        locale,
        `Angular planets (houses 1, 4, 7, 10) are visible and appear early in life: ${a.angular.map((p) => locPlanet(p, locale)).join(", ")}.`,
        `سیارات زاویه‌ای (خانه‌های ۱، ۴، ۷، ۱۰) دیده می‌شوند و زودتر از بقیه در زندگی ظاهر می‌شوند: ${a.angular.map((p) => locPlanet(p, locale)).join("، ")}.`,
      ),
    );
  }
  if (a.tightest[0]) {
    const t = a.tightest[0];
    const orb = trueAspectOrb(t);
    lines.push(
      say(
        locale,
        `Tightest aspect: ${locPlanet(t.planet1, locale)} ${locAspect(String(t.aspect_name), locale)} ${locPlanet(t.planet2, locale)} at ${orb.toFixed(2)}°. Hear this conversation through every section below.`,
        `نزدیک‌ترین جنبه: ${locPlanet(t.planet1, locale)} ${locAspect(String(t.aspect_name), locale)} ${locPlanet(t.planet2, locale)} با ارب ${orb.toFixed(2)}°. این گفتگو را در تمام بخش‌های زیر بشنوید.`,
      ),
    );
  }
  return lines.filter(Boolean);
}

function shortTopic(house: number, locale: Locale): string {
  return locale === "fa" ? (HOUSE_SHORT_FA[house] ?? "") : (HOUSE_SHORT_EN[house] ?? "");
}

function houseBlock(
  h: ChartResult["houses"][number],
  chart: ChartResult,
  a: ChartAnalysis,
  locale: Locale,
): ReportBlock {
  const occupants = chart.positions.filter(isMainPlanet).filter((p) => p.house === h.house);
  const names = occupants.map((p) => locPlanet(planetId(p), locale)).join(locale === "fa" ? "، " : ", ");
  const angle = h.house === 1 ? "ASC" : h.house === 4 ? "IC" : h.house === 7 ? "DSC" : h.house === 10 ? "MC" : "";
  const lord = a.houseLords.find((x) => x.house === h.house);
  const kind = houseKindKey(h.house);
  const sign = String(h.sign);
  const dms = fmtLon(h.degree_in_sign);
  const topic = shortTopic(h.house, locale);
  const signName = locSign(sign, locale);

  const cuspLine = say(
    locale,
    `In this chart, house ${h.house} starts at ${dms} of ${sign}. This number is calculated from the birth date, time and place. It is not a guess.`,
    `در این نقشه خانهٔ ${h.house} از ${dms} برج ${signName} شروع می‌شود. این عدد از تاریخ، ساعت و محل تولد حساب شده است. حدس نیست.`,
  );
  const styleLine = say(
    locale,
    `The topics of house ${h.house} (${topic}) show up in the style of ${sign}.`,
    `موضوع خانهٔ ${h.house} (${topic}) با سبک برج ${signName} دیده می‌شود.`,
  );

  const lordPos = lord ? chart.positions.find((p) => planetId(p) === lord.ruler && isMainPlanet(p)) : undefined;
  let lordLine = "";
  if (lord) {
    const rName = locPlanet(lord.ruler, locale);
    const rSign = locSign(lord.rulerSign, locale);
    const dig = dignityWord(lord.dignity, locale);
    const lordHouse = lord.rulerHouse;
    const lordTopic = lordHouse ? shortTopic(lordHouse, locale) : "";
    const lordDms = lordPos ? fmtDms(lordPos) : "";
    if (locale === "fa") {
      lordLine = `برج ${signName} را سیارهٔ ${rName} اداره می‌کند. پس مدیر خانهٔ ${h.house} سیارهٔ ${rName} است.`;
      if (lordHouse) {
        lordLine += ` در این نقشه ${rName} در ${lordDms} برج ${rSign} در خانهٔ ${lordHouse} نشسته است. شأن سنتی: ${dig}. پس موضوع خانهٔ ${h.house} (${topic}) از راه خانهٔ ${lordHouse} (${lordTopic}) اداره می‌شود.`;
      }
      if (lordHouse === h.house) {
        lordLine += " مدیر این خانه هم داخل همین خانه نشسته است؛ پس موضوع اینجا متمرکز است.";
      }
    } else {
      lordLine = `${sign} is ruled by ${rName}. So the manager of house ${h.house} is ${rName}.`;
      if (lordHouse) {
        lordLine += ` In this chart ${rName} sits at ${lordDms} of ${lord.rulerSign} in house ${lordHouse}. Traditional dignity: ${dig}. So the topics of house ${h.house} (${topic}) are handled through house ${lordHouse} (${lordTopic}).`;
      }
      if (lordHouse === h.house) {
        lordLine += " The manager of this house also sits in this house, so the topic is concentrated here.";
      }
    }
  }

  const occIntro = occupants.length ? OCCUPIED_LEAD : EMPTY_HOUSE;
  const occParas = occupants.map((p) => {
    const id = planetId(p);
    const fact = say(
      locale,
      `${locPlanet(id, locale)} sits in this house at ${fmtDms(p)} of ${p.sign}. That is the calculated longitude.`,
      `${locPlanet(id, locale)} در این خانه روی ${fmtDms(p)} برج ${locSign(String(p.sign), locale)} نشسته است. این طول دایرةالبروج حساب‌شده است.`,
    );
    return `${fact} ${planetInHousePlain(id, h.house, locale)}`;
  });

  const emptyAngle = angle
    ? say(
        locale,
        `House ${h.house} is also an angle of the chart (${angle}). Even when empty of planets, the angle itself is a calculated point and stays important.`,
        `خانهٔ ${h.house} یکی از زاویه‌های نقشه هم هست (${angle}). حتی اگر سیاره‌ای داخلش نباشد، خود زاویه یک نقطه حساب‌شده است و مهم می‌ماند.`,
      )
    : "";

  return {
    id: `H${h.house}`,
    kicker: locale === "fa" ? "خانه" : "House",
    title: say(
      locale,
      `House ${h.house}${angle ? ` · ${angle}` : ""} — ${sign}`,
      `خانهٔ ${h.house}${angle ? ` · ${angle}` : ""} — ${signName}`,
    ),
    meta: `${dms}${occupants.length ? ` · ${names}` : locale === "fa" ? " · خالی از سیارهٔ کلاسیک" : " · no classical planet"}`,
    body: [
      HOUSE_THEME[h.house] ?? "",
      HOUSE_KIND[kind],
      cuspLine,
      styleLine,
      SIGN_PLAIN[sign] ?? "",
      lordLine,
      occIntro,
      emptyAngle,
      ...occParas,
    ].filter(Boolean),
  };
}

export function buildReport(chart: ChartResult, locale: Locale = "en"): ChartReport {
  const a = analyzeChart(chart);
  const synastry = chart.mode === "synastry" || chart.mode === "transit";

  const bigThree: ReportBlock[] = [];
  if (a.sun) bigThree.push(planetBlock(a.sun, locale, chart, a, synastry));
  if (a.moon) bigThree.push(planetBlock(a.moon, locale, chart, a, synastry));
  const ascDeg = ((chart.ascendant % 30) + 30) % 30;
  bigThree.push({
    id: "ASC",
    kicker: locale === "fa" ? "زاویه" : "Angle",
    title: say(locale, `${a.ascSign} rising`, `طالع ${locSign(a.ascSign, locale)}`),
    meta: `${fmtLon(ascDeg)} · ${say(locale, `decan ${a.decan.face}, face ${locPlanet(a.decan.ruler, locale)}`, `دهک ${a.decan.face}، وجه ${locPlanet(a.decan.ruler, locale)}`)}`,
    body: [
      pick(RISING[a.ascSign], locale),
      say(
        locale,
        `Decan ${a.decan.face} of ${a.ascSign} (Chaldean faces, Tetrabiblos I.18) is faced by ${a.decan.ruler}.`,
        `دهک ${a.decan.face} از ${locSign(a.ascSign, locale)} (وجوه کلدانی، بطلمیوس I.18) تحت وجه ${locPlanet(a.decan.ruler, locale)} است.`,
      ),
      a.ruler
        ? say(
            locale,
            `This rising’s lord is ${locPlanet(a.chartRuler, locale)} in ${a.ruler.sign}, house ${a.ruler.house ?? "?"}.`,
            `حاکم این طالع ${locPlanet(a.chartRuler, locale)} است در ${locSign(String(a.ruler.sign), locale)}، خانهٔ ${a.ruler.house ?? "؟"}.`,
          )
        : "",
    ].filter(Boolean),
  });
  const mcDeg = ((chart.mediumCoeli % 30) + 30) % 30;
  const mcLord = a.houseLords.find((h) => h.house === 10);
  bigThree.push({
    id: "MC",
    kicker: locale === "fa" ? "زاویه" : "Angle",
    title: say(locale, `MC in ${a.mcSign}`, `وسط‌السماء ${locSign(a.mcSign, locale)}`),
    meta: fmtLon(mcDeg),
    body: [
      pick(MC_SIGN[a.mcSign], locale),
      mcLord
        ? say(
            locale,
            `The 10th-house lord is ${locPlanet(mcLord.ruler, locale)} in ${mcLord.rulerSign}${mcLord.rulerHouse ? `, house ${mcLord.rulerHouse}` : ""} (${dignityWord(mcLord.dignity, locale)}). The public path is read from this planet.`,
            `حاکم خانهٔ دهم ${locPlanet(mcLord.ruler, locale)} است در ${locSign(mcLord.rulerSign, locale)}${mcLord.rulerHouse ? `، خانهٔ ${mcLord.rulerHouse}` : ""} (${dignityWord(mcLord.dignity, locale)}). مسیر عمومی از این سیاره خوانده می‌شود.`,
          )
        : "",
    ].filter(Boolean),
  });

  const ruler: ReportBlock = {
    id: "ruler",
    kicker: locale === "fa" ? "کلید نقشه" : "Chart key",
    title: say(
      locale,
      `Chart ruler: ${locPlanet(a.chartRuler, locale)}`,
      `حاکم طالع: ${locPlanet(a.chartRuler, locale)}`,
    ),
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

  const houses: ReportBlock[] = chart.houses.map((h) => houseBlock(h, chart, a, locale));

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
          ? say(
              locale,
              `T-square${pat.apex ? ` — apex ${locPlanet(pat.apex, locale)}` : ""}`,
              `T-مربع${pat.apex ? ` — رأس ${locPlanet(pat.apex, locale)}` : ""}`,
            )
          : say(locale, "Grand trine", "تثلیث بزرگ"),
      meta: names,
      body: [
        pick(PATTERN_NOTE[pat.kind], locale),
        say(locale, `Planets involved: ${names}.`, `سیارات درگیر: ${names}.`),
      ].filter(Boolean),
    });
  }

  if (a.scores.length) {
    pattern.push({
      id: "scores",
      kicker: locale === "fa" ? "الگو" : "Pattern",
      title: locale === "fa" ? "وزن سیارات" : "Planet weighting",
      body: [
        say(
          locale,
          "Scores are built from chart ruler, Sun/Moon, Ptolemaic dignity, angularity and aspect count — not from popular reputation.",
          "امتیاز از حاکم طالع، خورشید/ماه، شأن بطلمیوسی، زاویه‌ای بودن و تعداد جنبه‌ها ساخته می‌شود — نه از شهرت عام.",
        ),
        a.scores.map((s) => `${locPlanet(s.planet, locale)} ${s.score.toFixed(1)}`).join(" · "),
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
        say(
          locale,
          `Retrograde in this map: ${a.retrogrades.map((p) => locPlanet(p, locale)).join(", ")}.`,
          `راجع در این نقشه: ${a.retrogrades.map((p) => locPlanet(p, locale)).join("، ")}.`,
        ),
      ],
    });
  }

  const extra: ReportBlock[] = [];
  if (a.node) {
    extra.push({
      id: "node",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: say(
        locale,
        `North Node in ${a.node.sign}`,
        `رأس (گره شمالی) در ${locSign(String(a.node.sign), locale)}`,
      ),
      meta: `${fmtDms(a.node)}${a.node.house ? ` · H${a.node.house}` : ""}`,
      body: [pick(NODE_SIGN[String(a.node.sign)], locale)].filter(Boolean),
    });
  }
  if (a.lilith) {
    extra.push({
      id: "lilith",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: say(
        locale,
        `Lilith (mean apogee) in ${a.lilith.sign}`,
        `لیلیث (اوج میانگین ماه) در ${locSign(String(a.lilith.sign), locale)}`,
      ),
      meta: `${fmtDms(a.lilith)}${a.lilith.house ? ` · H${a.lilith.house}` : ""}`,
      body: [
        say(
          locale,
          "Lilith is the Moon’s mean apogee, not a planet. In the modern tradition it marks where need leaves the norm and becomes fascination or denial.",
          "لیلیث نقطهٔ اوج میانگین مدار ماه است، نه سیاره. در سنت مدرن جایی است که نیاز از هنجار خارج می‌شود و انکار یا شیفتگی می‌سازد.",
        ),
        a.lilith.house ? (HOUSE_THEME[a.lilith.house] ?? "") : "",
      ].filter(Boolean),
    });
  }
  if (a.chiron) {
    extra.push({
      id: "chiron",
      kicker: locale === "fa" ? "نقاط" : "Points",
      title: say(locale, `Chiron in ${a.chiron.sign}`, `کیرون در ${locSign(String(a.chiron.sign), locale)}`),
      meta: `${fmtDms(a.chiron)}${a.chiron.house ? ` · H${a.chiron.house}` : ""}`,
      body: [
        say(
          locale,
          "Chiron is the asteroid of the healing wound. The sign is the wound’s style; the house is the field of life.",
          "کیرون سیارک «زخم شفادهنده» است. برج، سبک زخم را می‌گوید؛ خانه، میدان زندگی را.",
        ),
        a.chiron.house ? (HOUSE_THEME[a.chiron.house] ?? "") : "",
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
    houseLordIntro: HOUSE_LORD_FRAME,
    houseIntro: [HOUSE_SECTION_INTRO, HOUSE_LORD_INTRO],
    houseLords: a.houseLords,
    pattern,
    extra,
    analysis: a,
  };
}

export function reportStrings(r: ChartReport): string[] {
  const out: string[] = [r.frame, r.houseLordIntro, ...r.houseIntro, ...r.portrait];
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
