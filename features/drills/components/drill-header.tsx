import { Badge } from "@/components/ui/badge";
import type { Drill } from "../types";

type DrillHeaderProps = {
  drill: Drill;
};

export function DrillHeader({ drill }: DrillHeaderProps) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-b px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">{drill.title}</h2>
        <Badge variant="secondary">{drill.category}</Badge>
      </div>
      <div className="space-y-2">
        <p className="max-w-5xl text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
      </div>
    </div>
  );
}
