export type DrillCase = {
  name: string;
  args: unknown[];
  expected: unknown;
};

export type Drill = {
  id: string;
  groupId: string;
  title: string;
  category: string;
  summary: string;
  prompt: string;
  functionName: string;
  starterCode: string;
  visibleCases: DrillCase[];
  hiddenCases: DrillCase[];
};

export type DrillGroup = {
  id: string;
  title: string;
  description: string;
};

export type RunResult = {
  name: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  error?: string;
  kind?: "visible" | "hidden";
};

export type RunState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "passed"; results: RunResult[]; durationMs: number }
  | { status: "failed"; results: RunResult[]; durationMs: number }
  | { status: "error"; message: string; durationMs?: number };

export type Theme = "light" | "dark";
