export type DrillCase = {
  name: string;
  args: unknown[];
  expected: unknown;
};

export type DrillComparison = "deepEqual" | "unorderedArray";

export type DrillLessonBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "principle";
      title: string;
      text: string;
    }
  | {
      type: "steps";
      title: string;
      items: string[];
    };

export type Drill = {
  id: string;
  groupId: string;
  title: string;
  category: string;
  summary: string;
  prompt: string;
  lesson: DrillLessonBlock[];
  contract: {
    functionName: string;
    parameters: string[];
    returns: string;
  };
  assertion?: {
    comparison: DrillComparison;
  };
  starterCode: string;
  cases: {
    visible: DrillCase[];
    hidden: DrillCase[];
  };
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

export type { Theme } from "@/lib/theme";
