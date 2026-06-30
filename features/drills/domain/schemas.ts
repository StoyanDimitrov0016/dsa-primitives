import { z } from "zod";

export const DrillComparisonSchema = z.enum([
  "deepEqual",
  "unorderedArray",
  "numberCloseTo",
  "custom",
]);

export const DrillKindSchema = z.enum(["function"]);

export const DrillAssertionSchema = z
  .object({
    comparison: DrillComparisonSchema,
    validatorName: z.string().trim().min(1).optional(),
  })
  .refine((assertion) => assertion.comparison !== "custom" || assertion.validatorName, {
    message: "custom assertions require a validatorName",
    path: ["validatorName"],
  });

export const DrillContractSchema = z.object({
  functionName: z.string().trim().min(1),
  parameters: z.array(z.string().trim().min(1)),
  returns: z.string().trim().min(1),
});

export const DrillCaseSchema = z.object({
  name: z.string().trim().min(1),
  args: z.array(z.unknown()),
  expected: z.unknown(),
});

export const DrillLessonBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: z.string().trim().min(1),
  }),
  z.object({
    type: z.literal("principle"),
    title: z.string().trim().min(1),
    text: z.string().trim().min(1),
  }),
  z.object({
    type: z.literal("steps"),
    title: z.string().trim().min(1),
    items: z.array(z.string().trim().min(1)).min(1),
  }),
]);

export const DrillSchema = z.object({
  id: z.string().trim().min(1),
  groupId: z.string().trim().min(1),
  kind: DrillKindSchema,
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  prompt: z.string().trim().min(1),
  lesson: z.array(DrillLessonBlockSchema).min(1),
  implementation: z.string().trim().min(1),
  contract: DrillContractSchema,
  assertion: DrillAssertionSchema.optional(),
  starterCode: z.string().trim().min(1),
  cases: z.object({
    visible: z.array(DrillCaseSchema).min(1),
    hidden: z.array(DrillCaseSchema).min(1),
  }),
});

export const DrillGroupSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export const RunResultSchema = z.object({
  name: z.string(),
  passed: z.boolean(),
  expected: z.unknown(),
  actual: z.unknown(),
  error: z.string().optional(),
  kind: z.enum(["visible", "hidden"]).optional(),
});

export const RunRequestSchema = z.object({
  code: z.string(),
  contract: DrillContractSchema,
  cases: z.array(DrillCaseSchema.extend({ kind: z.enum(["visible", "hidden"]) })),
  assertion: DrillAssertionSchema.optional(),
});

export const RunResponseSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), results: z.array(RunResultSchema) }),
  z.object({ ok: z.literal(false), error: z.string() }),
]);
