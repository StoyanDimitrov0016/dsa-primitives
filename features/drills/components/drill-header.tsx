import { Lightbulb, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Drill } from "../domain/types";
import { IconButton } from "./icon-button";

type DrillHeaderProps = {
  drill: Drill;
  isSidebarOpen: boolean;
  isHintsPanelOpen: boolean;
  onOpenMobileNavigation: () => void;
  onOpenMobileHints: () => void;
  onToggleHintsPanel: () => void;
  onToggleSidebar: () => void;
};

export function DrillHeader({
  drill,
  isSidebarOpen,
  isHintsPanelOpen,
  onOpenMobileNavigation,
  onOpenMobileHints,
  onToggleHintsPanel,
  onToggleSidebar,
}: DrillHeaderProps) {
  const ToggleIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-b px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <IconButton
            className="md:hidden"
            label="Open drill navigation"
            onClick={onOpenMobileNavigation}
          >
            <Menu className="size-4" />
          </IconButton>
          <IconButton
            className="hidden md:inline-flex"
            label={isSidebarOpen ? "Collapse drills sidebar" : "Expand drills sidebar"}
            onClick={onToggleSidebar}
          >
            <ToggleIcon className="size-4" />
          </IconButton>
          <h2 className="text-lg font-semibold">{drill.title}</h2>
          <Badge variant="secondary">{drill.category}</Badge>
        </div>

        <Button
          className="hidden shrink-0 gap-2 xl:inline-flex"
          onClick={onToggleHintsPanel}
          size="sm"
          variant={isHintsPanelOpen ? "secondary" : "outline"}
        >
          <Lightbulb className="size-4" />
          Hints
        </Button>
        <Button
          className="shrink-0 gap-2 xl:hidden"
          onClick={onOpenMobileHints}
          size="sm"
          variant="secondary"
        >
          <Lightbulb className="size-4" />
          Hints
        </Button>
      </div>
      <div className="space-y-2">
        <p className="max-w-5xl text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
      </div>
    </div>
  );
}
