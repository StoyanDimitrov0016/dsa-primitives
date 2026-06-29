import { CheckCircle2, Terminal, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatValue } from "../lib/format-value";
import { getResultTextClassName, getStatusClassName, getStatusLabel } from "../lib/run-status";
import type { Drill, RunState, Theme } from "../domain/types";

type ConsolePanelProps = {
  drill: Drill;
  runState: RunState;
  theme: Theme;
};

export function ConsolePanel({ drill, runState, theme }: ConsolePanelProps) {
  const results =
    runState.status === "passed" || runState.status === "failed" ? runState.results : [];
  const failedResults = results.filter((result) => !result.passed);
  const passedCount = results.filter((result) => result.passed).length;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--console)] text-[var(--console-foreground)]">
      <div className="flex h-10 items-center justify-between border-b border-[var(--console-border)] px-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Terminal className="size-4 text-muted-foreground" />
          Console
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {"durationMs" in runState && runState.durationMs ? (
            <span>{runState.durationMs}ms</span>
          ) : null}
          <Badge className={cn("h-6", getStatusClassName(runState))} variant="outline">
            {getStatusLabel(runState)}
          </Badge>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 p-3 font-mono text-xs">
          {runState.status === "idle" ? (
            <>
              <p className="text-muted-foreground">Run tests to inspect output.</p>
              <div className="space-y-2">
                <p className="text-muted-foreground">Visible tests:</p>
                {drill.cases.visible.map((testCase) => (
                  <div
                    className="rounded-md border border-[var(--console-border)] bg-[var(--console-card)] p-3"
                    key={testCase.name}
                  >
                    <p className="font-semibold text-[var(--console-foreground)]">
                      {testCase.name}
                    </p>
                    <div className="mt-2 space-y-1 text-muted-foreground">
                      <p>args: {formatValue(testCase.args)}</p>
                      <p>expected: {formatValue(testCase.expected)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {runState.status === "running" ? (
            <p className="text-blue-300">Executing in a disposable worker...</p>
          ) : null}
          {runState.status === "error" ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-red-200">
              {runState.message}
            </p>
          ) : null}
          {results.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                {failedResults.length === 0 ? (
                  <CheckCircle2 className="size-4 text-emerald-400" />
                ) : (
                  <XCircle className="size-4 text-red-400" />
                )}
                <span>
                  {passedCount}/{results.length} tests passed
                </span>
              </div>
              {[...failedResults, ...results.filter((result) => result.passed)].map((result) => (
                <div
                  className={cn(
                    "rounded-md border p-3",
                    result.passed
                      ? "border-[var(--console-border)] bg-[var(--console-card)]"
                      : "border-red-500/30 bg-red-500/10"
                  )}
                  key={`${result.kind}-${result.name}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("font-semibold", getResultTextClassName(result, theme))}>
                      {result.passed ? "PASS" : "FAIL"} {result.name}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] uppercase",
                        theme === "dark" ? "bg-zinc-800 text-zinc-400" : "bg-zinc-200 text-zinc-600"
                      )}
                    >
                      {result.kind ?? "case"}
                    </span>
                  </div>
                  {!result.passed ? (
                    <div className="mt-2 space-y-1 text-muted-foreground">
                      <p>expected: {formatValue(result.expected)}</p>
                      <p>actual: {formatValue(result.actual)}</p>
                      {result.error ? <p>error: {result.error}</p> : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
}
