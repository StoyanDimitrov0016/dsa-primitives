import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Theme } from "../types";
import { IconButton } from "./icon-button";

type AppHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-3">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger />

        <Separator className="hidden h-6 md:block" orientation="vertical" />

        <div className="flex min-w-0 items-center gap-4">
          <span className="truncate text-sm font-semibold">LeetCode Primitives</span>
          <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Button size="sm" variant="ghost">
              Library
            </Button>
            <Button size="sm" variant="ghost">
              Practice
            </Button>
            <Button size="sm" variant="ghost">
              Review
            </Button>
          </nav>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <IconButton
          label={theme === "dark" ? "Use light theme" : "Use dark theme"}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </IconButton>
      </div>
    </header>
  );
}
