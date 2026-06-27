import { DRILL_RUNNER_WORKER_PATH, RUN_TIMEOUT_MS } from "../constants";
import type { Drill, DrillCase, RunResult, RunState } from "../types";

export function runInWorker(
  drill: Drill,
  code: string,
  cases: Array<DrillCase & { kind: "visible" | "hidden" }>
): Promise<RunState> {
  const startedAt = performance.now();
  const worker = new Worker(DRILL_RUNNER_WORKER_PATH);

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => {
      worker.terminate();
      resolve({
        status: "error",
        message: `Timed out after ${RUN_TIMEOUT_MS}ms. Check for an infinite loop or an unexpectedly slow implementation.`,
        durationMs: Math.round(performance.now() - startedAt),
      });
    }, RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent) => {
      window.clearTimeout(timeoutId);
      worker.terminate();

      const durationMs = Math.round(performance.now() - startedAt);
      const payload = event.data as
        { ok: true; results: RunResult[] } | { ok: false; error: string };

      if (!payload.ok) {
        resolve({ status: "error", message: payload.error, durationMs });
        return;
      }

      const passed = payload.results.every((result) => result.passed);
      resolve({
        status: passed ? "passed" : "failed",
        results: payload.results,
        durationMs,
      });
    };

    worker.onerror = (error) => {
      window.clearTimeout(timeoutId);
      worker.terminate();
      resolve({
        status: "error",
        message: error.message,
        durationMs: Math.round(performance.now() - startedAt),
      });
    };

    worker.postMessage({
      code,
      comparison: drill.comparison ?? "deepEqual",
      functionName: drill.functionName,
      cases,
    });
  });
}
