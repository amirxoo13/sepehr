import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  target: z.string().min(2).max(12),
  texts: z.array(z.string().max(1800)).min(1).max(80),
});

const SEP = "\n@@\n"; // ASCII token — Persian/Arabic Google output keeps it; U+2063 was rewritten as ZWNJ
const UA =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36";

function decodeHtml(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;|'/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

/** Fix leftover English / wrong Google words into traditional Persian astrology names. */
const FA_GLOSS: Array<[RegExp, string]> = [
  [/\bAries\b/g, "حمل"],
  [/\bTaurus\b/g, "ثور"],
  [/\bGemini\b/g, "جوزا"],
  [/\bCancer\b/g, "سرطان"],
  [/\bLeo\b/g, "اسد"],
  [/\bVirgo\b/g, "سنبله"],
  [/\bLibra\b/g, "میزان"],
  [/\bScorpio\b/g, "عقرب"],
  [/\bSagittarius\b/g, "قوس"],
  [/\bCapricorn\b/g, "جدی"],
  [/\bAquarius\b/g, "دلو"],
  [/\bPisces\b/g, "حوت"],
  [/\bSun\b/g, "خورشید"],
  [/\bMoon\b/g, "ماه"],
  [/\bMercury\b/g, "عطارد"],
  [/\bVenus\b/g, "زهره"],
  [/\bMars\b/g, "مریخ"],
  [/\bJupiter\b/g, "مشتری"],
  [/\bSaturn\b/g, "زحل"],
  [/\bUranus\b/g, "اورانوس"],
  [/\bNeptune\b/g, "نپتون"],
  [/\bPluto\b/g, "پلوتو"],
  [/\bAscendant\b/g, "طالع"],
  [/\bMidheaven\b/g, "وسط‌السماء"],
  [/\bconjunction\b/gi, "قرآن"],
  [/\bopposition\b/gi, "مقابله"],
  [/\btrine\b/gi, "تثلیث"],
  [/\bsquare\b/gi, "تربیع"],
  [/\bsextile\b/gi, "تسدیس"],
  [/\bdomicile\b/gi, "منزل"],
  [/\bexaltation\b/gi, "شرف"],
  [/\bdetriment\b/gi, "وبال"],
  [/\bperegrine\b/gi, "آواره"],
  [/\bretrograde\b/gi, "راجع"],
  [/\bباکره\b/g, "سنبله"],
  [/\bترازو\b/g, "میزان"],
  [/\bکماندار\b/g, "قوس"],
  [/\bبزغاله\b/g, "جدی"],
  [/\bونوس\b/g, "زهره"],
  [/\bژوپیتر\b/g, "مشتری"],
  [/\bساتورن\b/g, "زحل"],
  [/\bمرکوری\b/g, "عطارد"],
  [/\bجیوه\b/g, "عطارد"],
];

function applyFaGlossary(text: string): string {
  let out = text;
  for (const [re, to] of FA_GLOSS) out = out.replace(re, to);
  return out;
}

async function read(url: string, headers: Record<string, string>, timeoutMs = 10000): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers, signal: ctrl.signal });
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/** Unofficial Google Translate JSON (client=gtx). Often blocked from datacenter IPs. */
async function gtx(text: string, target: string): Promise<string> {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);
  const raw = await read(url.toString(), { Accept: "application/json", "User-Agent": UA });
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("<")) throw new Error("gtx blocked");
  const json = JSON.parse(trimmed) as unknown;
  const parts = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : [];
  const out = parts
    .map((row) => (Array.isArray(row) && typeof row[0] === "string" ? row[0] : ""))
    .join("");
  if (!out) throw new Error("gtx empty");
  return out;
}

/** Google Translate mobile HTML — free, no API key. */
async function googleMobile(text: string, target: string): Promise<string> {
  const url = new URL("https://translate.google.com/m");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("hl", "en");
  url.searchParams.set("q", text);
  const html = await read(url.toString(), { Accept: "text/html,application/xhtml+xml", "User-Agent": UA });
  const m = html.match(/class="result-container"[^>]*>([\s\S]*?)<\/div>/i);
  if (!m?.[1]) throw new Error("google-m parse");
  const out = decodeHtml(m[1].replace(/<[^>]+>/g, "")).trim();
  if (!out) throw new Error("google-m empty");
  return out;
}

/** Public MyMemory memory — last-resort fallback, 500-byte queries. */
async function myMemory(text: string, target: string): Promise<string> {
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text.slice(0, 480));
  url.searchParams.set("langpair", `en|${target}`);
  const raw = await read(url.toString(), { Accept: "application/json", "User-Agent": "SepehrAstrology/1.0" });
  const json = JSON.parse(raw) as { responseData?: { translatedText?: string }; responseStatus?: number };
  const out = json.responseData?.translatedText;
  if (!out || json.responseStatus === 403) throw new Error("mymemory empty");
  return decodeHtml(out);
}

async function translateBlob(text: string, target: string): Promise<string> {
  let out: string;
  try {
    out = await gtx(text, target);
  } catch {
    try {
      out = await googleMobile(text, target);
    } catch {
      if (text.length <= 480) out = await myMemory(text, target);
      else throw new Error("translate failed");
    }
  }
  return target === "fa" ? applyFaGlossary(out) : out;
}

export const translateTexts = createServerFn({ method: "POST" })
  .validator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const target = data.target;
    if (target === "en") return { ok: true as const, translations: data.texts };

    const out: string[] = new Array(data.texts.length);
    const pending: { i: number; text: string }[] = [];
    data.texts.forEach((text, i) => {
      const trimmed = text.trim();
      if (!trimmed) out[i] = text;
      else pending.push({ i, text });
    });

    const chunks: { i: number; text: string }[][] = [];
    let buf: { i: number; text: string }[] = [];
    let size = 0;
    for (const item of pending) {
      const add = item.text.length + SEP.length;
      if (buf.length && size + add > 800) {
        chunks.push(buf);
        buf = [];
        size = 0;
      }
      buf.push(item);
      size += add;
    }
    if (buf.length) chunks.push(buf);

    try {
      for (const chunk of chunks) {
        if (chunk.length === 1) {
          out[chunk[0]!.i] = await translateBlob(chunk[0]!.text, target);
          continue;
        }
        const joined = chunk.map((c) => c.text).join(SEP);
        try {
          const translated = await translateBlob(joined, target);
          const parts = translated.split(SEP);
          if (parts.length === chunk.length) {
            chunk.forEach((c, k) => {
              out[c.i] = (parts[k] ?? c.text).trim() || c.text;
            });
            continue;
          }
        } catch {
          /* split failed — translate one by one */
        }
        for (const c of chunk) {
          try {
            out[c.i] = await translateBlob(c.text, target);
          } catch {
            out[c.i] = c.text;
          }
        }
      }
      return { ok: true as const, translations: out as string[] };
    } catch (e) {
      for (const item of pending) {
        if (out[item.i] == null || out[item.i] === "") {
          try {
            out[item.i] = await translateBlob(item.text, target);
          } catch {
            out[item.i] = item.text;
          }
        }
      }
      const filled = out.map((v, i) => v ?? data.texts[i]!);
      const any = filled.some((v, i) => v !== data.texts[i]);
      return {
        ok: any,
        translations: filled,
        error: any ? undefined : e instanceof Error ? e.message : "translate failed",
      };
    }
  });
