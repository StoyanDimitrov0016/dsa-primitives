import type { z } from "zod";
import type {
  DrillAssertionSchema,
  DrillCaseSchema,
  DrillComparisonSchema,
  DrillContractSchema,
  DrillGroupSchema,
  DrillKindSchema,
  DrillLessonBlockSchema,
  DrillSchema,
  RunRequestSchema,
  RunResponseSchema,
  RunResultSchema,
} from "./schemas";

export type DrillComparison = z.infer<typeof DrillComparisonSchema>;
export type DrillKind = z.infer<typeof DrillKindSchema>;
export type DrillAssertion = z.infer<typeof DrillAssertionSchema>;
export type DrillContract = z.infer<typeof DrillContractSchema>;
export type DrillCase = z.infer<typeof DrillCaseSchema>;
export type DrillLessonBlock = z.infer<typeof DrillLessonBlockSchema>;
export type Drill = z.infer<typeof DrillSchema>;
export type DrillGroup = z.infer<typeof DrillGroupSchema>;
export type RunResult = z.infer<typeof RunResultSchema>;
export type RunRequest = z.infer<typeof RunRequestSchema>;
export type RunResponse = z.infer<typeof RunResponseSchema>;

export type RunState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "passed"; results: RunResult[]; durationMs: number }
  | { status: "failed"; results: RunResult[]; durationMs: number }
  | { status: "error"; message: string; durationMs?: number };

export type { Theme } from "@/lib/theme";
