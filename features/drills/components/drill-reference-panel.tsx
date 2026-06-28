"use client";

import { Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Drill, DrillLessonBlock } from "../types";

type DrillReferenceContentProps = {
  drill: Drill;
};

type DrillReferencePanelProps = DrillReferenceContentProps & {
  className?: string;
};

type LessonBlockProps = {
  block: DrillLessonBlock;
};

function LessonBlock({ block }: LessonBlockProps) {
  if (block.type === "principle") {
    return (
      <section>
        <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{block.text}</p>
      </section>
    );
  }

  if (block.type === "steps") {
    return (
      <section>
        <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    );
  }

  return <p className="text-sm leading-6 text-muted-foreground">{block.text}</p>;
}

export function DrillReferenceContent({ drill }: DrillReferenceContentProps) {
  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-5 p-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">{drill.title}</h2>
        </div>
        <div className="space-y-5">
          {drill.lesson.map((block, index) => (
            <LessonBlock block={block} key={index} />
          ))}
        </div>
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
