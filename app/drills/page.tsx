import { DrillWorkspace } from "@/features/drills/components/drill-workspace";
import { defaultDrill, drillGroups, drills } from "@/features/drills";

export default function DrillsPage() {
  return <DrillWorkspace drillGroups={drillGroups} drills={drills} selectedDrill={defaultDrill} />;
}
