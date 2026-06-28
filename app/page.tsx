import { HomePage } from "@/features/drills/components/home-page";
import { drillGroups, drills } from "./drills";

export default function Home() {
  return <HomePage drillGroups={drillGroups} drills={drills} />;
}
