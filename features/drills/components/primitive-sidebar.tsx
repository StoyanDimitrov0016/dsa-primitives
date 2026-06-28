import Link from "next/link";
import { ChevronDown, FileCode2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { Drill, DrillGroup } from "../types";

type PrimitiveSidebarProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
  openGroups: Record<string, boolean>;
  onGroupOpenChange: (id: string, open: boolean) => void;
};

export function PrimitiveSidebar({
  drillGroups,
  drills,
  selectedDrill,
  openGroups,
  onGroupOpenChange,
}: PrimitiveSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-3">
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
              <SidebarGroup>
                <CollapsibleTrigger
                  nativeButton={false}
                  render={
                    <SidebarGroupLabel className="cursor-pointer">
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[panel-open]/collapsible:rotate-180" />
                    </SidebarGroupLabel>
                  }
                />
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      {groupDrills.length > 0 ? (
                        groupDrills.map((drill) => (
                          <SidebarMenuSubItem key={drill.id}>
                            <SidebarMenuSubButton
                              isActive={selectedDrill.id === drill.id}
                              render={<Link href={`/practice/${drill.groupId}/${drill.id}`} />}
                            >
                              <FileCode2 className="size-4" />
                              <span>{drill.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            aria-disabled
                            render={<button disabled type="button" />}
                          >
                            <FileCode2 className="size-4" />
                            <span>Planned</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
