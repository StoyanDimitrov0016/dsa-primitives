"use client";

import { Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Drill } from "../types";

type DrillReferenceContentProps = {
  drill: Drill;
};

type DrillReferencePanelProps = DrillReferenceContentProps & {
  className?: string;
};

export function DrillReferenceContent({ drill }: DrillReferenceContentProps) {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-5 p-4">
        <div>
          <h2 className="text-sm font-semibold">Lesson</h2>
          <p className="mt-1 text-xs text-muted-foreground">Pattern notes for this primitive.</p>
        </div>

        <section className="rounded-md border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">{drill.category}</h3>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{drill.summary}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
        </section>
      </div>
    </ScrollArea>
  );
}

export function DrillReferencePanel({ className, drill }: DrillReferencePanelProps) {
  return (
    <aside className={cn("hidden min-h-0 border-l xl:block", className)}>
      <DrillReferenceContent drill={drill} />
    </aside>
  );
}
