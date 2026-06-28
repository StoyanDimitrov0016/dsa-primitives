import { DrillWorkspace } from "@/app/drill-workspace";
import { defaultDrill, drillGroups, drills } from "../drills";

export default function DrillsPage() {
  return (
    <DrillWorkspace
      drillGroups={drillGroups}
      drills={drills}
      key={defaultDrill.id}
      selectedDrill={defaultDrill}
    />
  );
}
