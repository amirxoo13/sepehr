import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { dirOf } from "@/lib/astro/languages";
import { setTranslationTable, translationCatalog } from "@/lib/astro/i18n";
import { loadI18nCache, loadLocale, saveI18nCache, saveLocale } from "@/lib/astro/storage";
import { translateTexts } from "@/lib/astro/translate.functions";
import { Shell } from "./shell";

type CtxValue = {
  locale: string;
  setLocale: (l: string) => void;
  translating: boolean;
  ensure: (texts: string[]) => Promise<void>;
};

const Ctx = createContext<CtxValue>({
  locale: "en",
  setLocale: () => {},
  translating: false,
  ensure: async () => {},
});

export function useLocale() {
  return useContext(Ctx);
}

function applyDocument(locale: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "zh-CN" ? "zh-Hans" : locale === "zh-TW" ? "zh-Hant" : locale;
  document.documentElement.dir = dirOf(locale);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState("en");
  const [tick, setTick] = useState(0);
  const [translating, setTranslating] = useState(false);
  const tableRef = useRef<Record<string, string>>({});
  const localeRef = useRef(locale);
  localeRef.current = locale;

  const ensure = useCallback(async (texts: string[]) => {
    const lang = localeRef.current;
    if (lang === "en") return;
    const missing = [...new Set(texts.filter((s) => s && s.trim() && tableRef.current[s] === undefined))];
    if (!missing.length) return;
    setTranslating(true);
    try {
      const BATCH = 24;
      const next = { ...tableRef.current };
      for (let i = 0; i < missing.length; i += BATCH) {
        if (localeRef.current !== lang) return;
        const slice = missing.slice(i, i + BATCH);
        const res = await translateTexts({ data: { target: lang, texts: slice } });
        if (localeRef.current !== lang) return;
        slice.forEach((src, k) => {
          const hit = res.translations[k];
          if (typeof hit === "string" && hit.trim()) next[src] = hit;
        });
        tableRef.current = next;
        setTranslationTable(lang, next);
        setTick((n) => n + 1);
        if (!res.ok) break;
      }
      if (localeRef.current === lang) {
        tableRef.current = next;
        setTranslationTable(lang, next);
        saveI18nCache(lang, next);
        setTick((n) => n + 1);
      }
    } finally {
      if (localeRef.current === lang) setTranslating(false);
    }
  }, []);

  function setLocale(l: string) {
    localeRef.current = l;
    setLocaleState(l);
    saveLocale(l);
    applyDocument(l);
    const cached = l === "en" ? {} : loadI18nCache(l);
    tableRef.current = cached;
    setTranslationTable(l, cached);
    setTick((n) => n + 1);
    if (l !== "en") void ensure(translationCatalog());
  }

  useEffect(() => {
    const initial = loadLocale();
    localeRef.current = initial;
    const cached = initial === "en" ? {} : loadI18nCache(initial);
    tableRef.current = cached;
    setTranslationTable(initial, cached);
    setLocaleState(initial);
    applyDocument(initial);
    if (initial !== "en") void ensure(translationCatalog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, translating, ensure }),
    // tick forces consumers to re-render once a batch lands
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, translating, ensure, tick],
  );

  return (
    <Ctx.Provider value={value}>
      <Shell locale={locale} onLocale={setLocale} translating={translating}>
        {children}
      </Shell>
    </Ctx.Provider>
  );
}
