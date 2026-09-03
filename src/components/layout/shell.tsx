import { Link, useRouterState } from "@tanstack/react-router";
import { LANGUAGES, t } from "@/lib/astro/i18n";
import { Cosmos } from "@/components/layout/cosmos";
import { IconArmillary } from "@/components/icons/astro-icons";
import { cn } from "@/lib/utils";

const NAV: { to: string; key: "start" | "skyNow" | "numbers" | "about" }[] = [
  { to: "/chart", key: "start" },
  { to: "/now", key: "skyNow" },
  { to: "/numerology", key: "numbers" },
  { to: "/about", key: "about" },
];

export function Shell({
  locale,
  onLocale,
  translating,
  children,
}: {
  locale: string;
  onLocale: (l: string) => void;
  translating?: boolean;
  children: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative flex min-h-dvh flex-col text-fg">
      <Cosmos />

      <header className="sticky top-0 z-30 border-b border-border bg-bg/92">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="group flex items-center gap-2.5">
            <IconArmillary
              size={26}
              className="text-gold transition-transform duration-700 group-hover:rotate-180"
            />
            <span className="flex items-baseline gap-2">
              <span className="foil font-display text-2xl leading-none tracking-tight">
                {t(locale, "app")}
              </span>
              <span className="hidden text-xs text-muted sm:inline">{t(locale, "tagline")}</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            {NAV.map((item) => {
              const on = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-md px-2 text-sm transition-colors sm:px-3",
                    on ? "text-gold" : "text-muted hover:text-fg",
                  )}
                >
                  {t(locale, item.key)}
                  {on && (
                    <span className="absolute inset-x-2.5 -bottom-px h-px bg-gold shadow-[0_0_8px_var(--color-gold)]" />
                  )}
                </Link>
              );
            })}
            <label className="sr-only" htmlFor="lang-select">
              {t(locale, "language")}
            </label>
            <select
              id="lang-select"
              value={locale}
              onChange={(e) => onLocale(e.target.value)}
              aria-label={t(locale, "language")}
              className="h-11 max-w-[10.5rem] rounded-md bg-surface-2 px-2 text-sm text-fg shadow-border"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                </option>
              ))}
            </select>
            {translating ? (
              <span className="hidden text-[0.65rem] text-subtle sm:inline">{t(locale, "translating")}</span>
            ) : null}
          </nav>
        </div>
        <div className="rule-fade absolute inset-x-0 -bottom-px" />
      </header>

      <div className="relative flex-1">{children}</div>

      <footer className="relative border-t border-border px-4 py-8 text-center">
        <div className="mx-auto max-w-6xl">
          <div className="rule-fade mb-5 opacity-60" />
          <p className="text-xs leading-relaxed text-subtle">{t(locale, "footer")}</p>
        </div>
      </footer>
    </div>
  );
}
