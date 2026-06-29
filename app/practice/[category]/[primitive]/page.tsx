import { notFound } from "next/navigation";
import { DrillWorkspace } from "@/features/drills/components/drill-workspace";
import { drillGroups, drills, getDrillByRoute } from "@/features/drills";

type PracticePageProps = {
  params: Promise<{
    category: string;
    primitive: string;
  }>;
};

export default async function PracticePage({ params }: PracticePageProps) {
  const { category, primitive } = await params;
  const selectedDrill = getDrillByRoute(category, primitive);

  if (!selectedDrill) {
    notFound();
  }

  return <DrillWorkspace drillGroups={drillGroups} drills={drills} selectedDrill={selectedDrill} />;
}
