function isEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

self.onmessage = (event) => {
  const { code, functionName, cases } = event.data;

  try {
    const solution = new Function(
      `"use strict";
${code}
return typeof ${functionName} === "function" ? ${functionName} : undefined;`,
    )();

    if (typeof solution !== "function") {
      self.postMessage({
        ok: false,
        error: `Expected a function named ${functionName}.`,
      });
      return;
    }

    const results = cases.map((testCase) => {
      try {
        const actual = solution(...testCase.args);

        return {
          name: testCase.name,
          kind: testCase.kind,
          passed: isEqual(actual, testCase.expected),
          expected: testCase.expected,
          actual,
        };
      } catch (error) {
        return {
          name: testCase.name,
          kind: testCase.kind,
          passed: false,
          expected: testCase.expected,
          actual: undefined,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });

    self.postMessage({ ok: true, results });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
