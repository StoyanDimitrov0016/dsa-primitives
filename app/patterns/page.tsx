import { PatternsPage } from "@/features/drills/components/patterns-page";
import { drillGroups, drills } from "@/features/drills";

export default function Patterns() {
  return <PatternsPage drillGroups={drillGroups} drills={drills} />;
}
