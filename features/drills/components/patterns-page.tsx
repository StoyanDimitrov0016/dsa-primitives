import Link from "next/link";
import { Route } from "lucide-react";
import type { Drill, DrillGroup } from "../types";

type PatternsPageProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
};

function getDrillCountForGroup(drills: Drill[], groupId: string) {
  return drills.filter((drill) => drill.groupId === groupId).length;
}

export function PatternsPage({ drillGroups, drills }: PatternsPageProps) {
  const activeGroupCount = drillGroups.filter(
    (group) => getDrillCountForGroup(drills, group.id) > 0
  ).length;

  return (
    <div className="min-h-full">
      <section className="px-6 py-14 md:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Primitive patterns
            </p>
            <h1 className="mt-3 text-4xl font-semibold">Choose the next reflex.</h1>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            {activeGroupCount} active groups / {drills.length} drills
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {drillGroups.map((group) => {
            const count = getDrillCountForGroup(drills, group.id);
            const firstDrill = drills.find((drill) => drill.groupId === group.id);

            return (
              <Link
                aria-disabled={!firstDrill}
                className="group rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
                href={firstDrill ? `/practice/${group.id}/${firstDrill.id}` : "/patterns"}
                key={group.id}
              >
                <div className="mb-8 flex items-center justify-between">
                  <Route className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {count > 0 ? `${count} drills` : "planned"}
                  </span>
                </div>
                <h2 className="text-lg font-semibold">{group.title}</h2>
                <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
                  {group.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
