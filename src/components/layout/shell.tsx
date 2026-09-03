import { Link, useRouterState } from "@tanstack/react-router";
import { t, type Locale } from "@/lib/astro/i18n";
import { Button } from "@/components/ui/button";
import { Cosmos } from "@/components/layout/cosmos";
import { IconGlobeGrid, IconArmillary } from "@/components/icons/astro-icons";
import { cn } from "@/lib/utils";

const NAV: { to: string; key: "start" | "skyNow" | "about" }[] = [
  { to: "/chart", key: "start" },
  { to: "/now", key: "skyNow" },
  { to: "/about", key: "about" },
];

export function Shell({
  locale,
  onLocale,
  children,
}: {
  locale: Locale;
  onLocale: (l: Locale) => void;
  children: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative flex min-h-dvh flex-col text-fg">
      <Cosmos />

      <header className="sticky top-0 z-30 border-b border-border bg-bg/92">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
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

          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const on = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-md px-3 text-sm transition-colors",
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
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={locale === "fa" ? "تغییر زبان" : "Switch language"}
              onClick={() => onLocale(locale === "fa" ? "en" : "fa")}
            >
              <IconGlobeGrid size={18} />
            </Button>
          </nav>
        </div>
        {/* gold hairline that fades at the edges, like a sightline */}
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
