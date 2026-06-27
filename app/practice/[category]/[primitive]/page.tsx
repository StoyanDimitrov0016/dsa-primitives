import { redirect } from "next/navigation";
import { DrillWorkspace } from "@/app/drill-workspace";
import { defaultDrill, drillGroups, drills, getDrillByRoute } from "@/app/drills";

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
    redirect(`/practice/${defaultDrill.groupId}/${defaultDrill.id}`);
  }

  return (
    <DrillWorkspace
      drillGroups={drillGroups}
      drills={drills}
      key={selectedDrill.id}
      selectedDrill={selectedDrill}
    />
  );
}
