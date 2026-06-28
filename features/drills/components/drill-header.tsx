import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Drill } from "../types";
import { IconButton } from "./icon-button";

type DrillHeaderProps = {
  drill: Drill;
  isSidebarOpen: boolean;
  onOpenMobileNavigation: () => void;
  onToggleSidebar: () => void;
};

export function DrillHeader({
  drill,
  isSidebarOpen,
  onOpenMobileNavigation,
  onToggleSidebar,
}: DrillHeaderProps) {
  const ToggleIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-b px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
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
      <div className="space-y-2">
        <p className="max-w-5xl text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
      </div>
    </div>
  );
}
