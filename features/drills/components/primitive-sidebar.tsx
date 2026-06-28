import Link from "next/link";
import { Braces, ChevronDown, FileCode2, Terminal } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="DSA Primitives">
              <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Braces className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">DSA Primitives</p>
                <p className="truncate text-xs text-muted-foreground">Pattern catalog</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <Terminal className="size-4" />
              <span>Browser runner</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
