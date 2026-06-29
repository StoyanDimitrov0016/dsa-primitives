import { compareValues } from "../domain/comparisons";
import { RunRequestSchema, RunResponseSchema } from "../domain/schemas";
import type { RunRequest, RunResponse, RunResult } from "../domain/types";
import { getCustomValidator } from "../domain/validators";

function getSubmittedFunction(code: string, functionName: string) {
  return new Function(
    `"use strict";
${code}
return typeof ${functionName} === "function" ? ${functionName} : undefined;`
  )();
}

function evaluateCase(
  solution: (...args: unknown[]) => unknown,
  testCase: RunRequest["cases"][number],
  request: RunRequest
): RunResult {
  try {
    const actual = solution(...testCase.args);
    const comparison = request.assertion?.comparison ?? "deepEqual";

    if (comparison === "custom") {
      const validatorName = request.assertion?.validatorName;
      const validator = validatorName ? getCustomValidator(validatorName) : undefined;

      if (!validator) {
        return {
          actual,
          error: `Unknown custom validator: ${validatorName ?? "missing"}.`,
          expected: testCase.expected,
          kind: testCase.kind,
          name: testCase.name,
          passed: false,
        };
      }

      const result = validator({
        actual,
        args: testCase.args,
        caseName: testCase.name,
        expected: testCase.expected,
      });

      return {
        actual,
        error: result.message,
        expected: testCase.expected,
        kind: testCase.kind,
        name: testCase.name,
        passed: result.passed,
      };
    }

    return {
      actual,
      expected: testCase.expected,
      kind: testCase.kind,
      name: testCase.name,
      passed: compareValues({
        actual,
        comparison,
        expected: testCase.expected,
      }),
    };
  } catch (error) {
    return {
      actual: undefined,
      error: error instanceof Error ? error.message : String(error),
      expected: testCase.expected,
      kind: testCase.kind,
      name: testCase.name,
      passed: false,
    };
  }
}

self.onmessage = (event: MessageEvent) => {
  const parsedRequest = RunRequestSchema.safeParse(event.data);

  if (!parsedRequest.success) {
    postRunResponse({
      ok: false,
      error: parsedRequest.error.issues.map((issue) => issue.message).join("; "),
    });
    return;
  }

  const request = parsedRequest.data;

  try {
    const solution = getSubmittedFunction(request.code, request.contract.functionName);

    if (typeof solution !== "function") {
      postRunResponse({
        ok: false,
        error: `Expected a function named ${request.contract.functionName}.`,
      });
      return;
    }

    const results = request.cases.map((testCase) => evaluateCase(solution, testCase, request));
    postRunResponse({ ok: true, results });
  } catch (error) {
    postRunResponse({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

function postRunResponse(response: RunResponse) {
  self.postMessage(RunResponseSchema.parse(response));
}
