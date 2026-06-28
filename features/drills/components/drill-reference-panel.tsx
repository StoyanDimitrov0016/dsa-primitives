"use client";

import { useState } from "react";
import { Lightbulb, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatValue } from "../lib/format-value";
import type { Drill } from "../types";

type ReferenceView = "pattern" | "tests";

type DrillReferenceContentProps = {
  drill: Drill;
};

type DrillReferencePanelProps = DrillReferenceContentProps & {
  className?: string;
};

const referenceViews: Array<{ id: ReferenceView; label: string }> = [
  { id: "pattern", label: "Pattern" },
  { id: "tests", label: "Tests" },
];

export function DrillReferenceContent({ drill }: DrillReferenceContentProps) {
  const [activeView, setActiveView] = useState<ReferenceView>("pattern");

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-5 p-4">
        <div>
          <h2 className="text-sm font-semibold">Reference</h2>
          <div className="mt-3 grid grid-cols-2 gap-1 rounded-md bg-muted p-1">
            {referenceViews.map((view) => (
              <Button
                className={cn(
                  "h-8 justify-center px-2 text-xs",
                  activeView === view.id && "bg-background shadow-xs"
                )}
                key={view.id}
                onClick={() => setActiveView(view.id)}
                size="sm"
                variant="ghost"
              >
                {view.label}
              </Button>
            ))}
          </div>
        </div>

        {activeView === "pattern" ? (
          <section className="rounded-md border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">{drill.category}</h3>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{drill.summary}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
          </section>
        ) : (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Visible Tests</h3>
            </div>
            {drill.visibleCases.map((testCase) => (
              <div className="rounded-md border bg-card p-3" key={testCase.name}>
                <p className="text-sm font-medium">{testCase.name}</p>
                <div className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
                  <p>args: {formatValue(testCase.args)}</p>
                  <p>expected: {formatValue(testCase.expected)}</p>
                </div>
              </div>
            ))}
          </section>
        )}
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
