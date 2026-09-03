import { Link, useRouterState } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { t, type Locale } from "@/lib/astro/i18n";
import { Button } from "@/components/ui/button";
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
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl tracking-tight">{t(locale, "app")}</span>
            <span className="hidden text-xs text-muted sm:inline">{t(locale, "tagline")}</span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted transition-colors hover:text-fg",
                  pathname === item.to && "text-fg",
                )}
              >
                {t(locale, item.key)}
              </Link>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="language"
              onClick={() => onLocale(locale === "fa" ? "en" : "fa")}
            >
              <Globe className="size-4" />
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border px-4 py-6 text-center text-xs text-subtle">
        {t(locale, "footer")}
      </footer>
    </div>
  );
}
