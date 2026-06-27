import { ScrollArea } from "@/components/ui/scroll-area";
import { formatValue } from "../lib/format-value";
import type { Drill } from "../types";

type VisibleTestsPanelProps = {
  drill: Drill;
};

export function VisibleTestsPanel({ drill }: VisibleTestsPanelProps) {
  return (
    <aside className="hidden min-h-0 border-l xl:block">
      <ScrollArea className="h-full">
        <div className="space-y-4 p-4">
          <div>
            <h2 className="text-sm font-semibold">Visible Tests</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              These cases are shown before you run.
            </p>
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
        </div>
      </ScrollArea>
    </aside>
  );
}
