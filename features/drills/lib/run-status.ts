import type { RunResult, RunState, Theme } from "../types";

export function getStatusLabel(runState: RunState) {
  if (runState.status === "passed") {
    return "Passed";
  }
  if (runState.status === "failed") {
    return "Failed";
  }
  if (runState.status === "error") {
    return "Error";
  }
  if (runState.status === "running") {
    return "Running";
  }
  return "Idle";
}

export function getStatusClassName(runState: RunState) {
  if (runState.status === "passed") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }
  if (runState.status === "failed" || runState.status === "error") {
    return "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300";
  }
  if (runState.status === "running") {
    return "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300";
  }
  return "border-border bg-muted text-muted-foreground";
}

export function getResultTextClassName(result: RunResult, theme: Theme) {
  if (result.passed) {
    return theme === "dark" ? "text-emerald-300" : "text-emerald-700";
  }

  return theme === "dark" ? "text-red-200" : "text-red-700";
}
