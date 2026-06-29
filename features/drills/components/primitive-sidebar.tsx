import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Drill, DrillGroup } from "../domain/types";

type PrimitiveSidebarProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
  isOpen: boolean;
  openGroups: Record<string, boolean>;
  onGroupOpenChange: (id: string, open: boolean) => void;
};

type PrimitiveNavigationListProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
  openGroups: Record<string, boolean>;
  onDrillSelect?: () => void;
  onGroupOpenChange: (id: string, open: boolean) => void;
};

function PrimitiveNavigationList({
  drillGroups,
  drills,
  selectedDrill,
  openGroups,
  onDrillSelect,
  onGroupOpenChange,
}: PrimitiveNavigationListProps) {
  return (
    <div className="space-y-5 p-4">
      {drillGroups.map((group) => {
        const groupDrills = drills.filter((drill) => drill.groupId === group.id);
        const hasActiveDrill = groupDrills.some((drill) => drill.id === selectedDrill.id);

        return (
          <Collapsible
            className="group/collapsible"
            key={group.id}
            onOpenChange={(open) => onGroupOpenChange(group.id, open)}
            open={openGroups[group.id] ?? hasActiveDrill}
          >
            <CollapsibleTrigger
              render={
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  type="button"
                >
                  <span>{group.title}</span>
                  <ChevronDown className="ml-auto size-4 transition-transform group-data-[panel-open]/collapsible:rotate-180" />
                </button>
              }
            />
            <CollapsibleContent>
              <div className="ml-3 mt-2 space-y-1 border-l px-3">
                {groupDrills.length > 0 ? (
                  groupDrills.map((drill) => (
                    <Link
                      className={cn(
                        "flex h-9 items-center rounded-md px-3 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        selectedDrill.id === drill.id &&
                          "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      )}
                      href={`/practice/${drill.groupId}/${drill.id}`}
                      key={drill.id}
                      onClick={onDrillSelect}
                    >
                      <span className="truncate">{drill.title}</span>
                    </Link>
                  ))
                ) : (
                  <div
                    aria-disabled
                    className="flex h-9 items-center rounded-md px-3 text-sm text-muted-foreground"
                  >
                    <span>Planned</span>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export function PrimitiveSidebar({
  drillGroups,
  drills,
  isOpen,
  selectedDrill,
  openGroups,
  onGroupOpenChange,
}: PrimitiveSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
      <ScrollArea className="min-h-0 flex-1">
        <PrimitiveNavigationList
          drillGroups={drillGroups}
          drills={drills}
          onGroupOpenChange={onGroupOpenChange}
          openGroups={openGroups}
          selectedDrill={selectedDrill}
        />
      </ScrollArea>
    </aside>
  );
}

export function PrimitiveMobileNavigation({
  drillGroups,
  drills,
  selectedDrill,
  openGroups,
  onDrillSelect,
  onGroupOpenChange,
}: PrimitiveNavigationListProps) {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <PrimitiveNavigationList
        drillGroups={drillGroups}
        drills={drills}
        onDrillSelect={onDrillSelect}
        onGroupOpenChange={onGroupOpenChange}
        openGroups={openGroups}
        selectedDrill={selectedDrill}
      />
    </ScrollArea>
  );
}
