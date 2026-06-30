"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/learn", label: "Learn" },
  { href: "/drills", label: "Drills" },
  { href: "/patterns", label: "Patterns" },
] as const;

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
      <Link className="font-semibold" href="/">
        DSA Primitives
      </Link>

      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-3 text-sm text-muted-foreground md:gap-4">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/learn" && pathname.startsWith("/learn/")) ||
              (item.href === "/drills" && pathname.startsWith("/practice"));

            return (
              <Link
                className={cn(
                  "transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          size="icon"
          variant="ghost"
        >
          <ThemeIcon className="size-4" />
        </Button>
      </div>
    </header>
  );
}
