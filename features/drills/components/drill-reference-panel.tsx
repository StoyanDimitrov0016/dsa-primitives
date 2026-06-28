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
      <div className="p-4">
        <section className="rounded-md border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-medium">{drill.title}</h2>
          </div>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            {drill.lesson.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
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
