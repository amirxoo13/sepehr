import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadLocale, saveLocale } from "@/lib/astro/storage";
import type { Locale } from "@/lib/astro/i18n";
import { Shell } from "./shell";

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: "fa",
  setLocale: () => {},
});

export function useLocale() {
  return useContext(Ctx);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    setLocaleState(loadLocale());
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    saveLocale(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "fa" ? "rtl" : "ltr";
  }

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <Ctx.Provider value={value}>
      <Shell locale={locale} onLocale={setLocale}>
        {children}
      </Shell>
    </Ctx.Provider>
  );
}
