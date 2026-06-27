function stringify(value) {
  return JSON.stringify(value);
}

function normalizeUnorderedArray(value) {
  if (!Array.isArray(value)) {
    return value;
  }

  return [...value].sort((left, right) => stringify(left).localeCompare(stringify(right)));
}

function isEqual(actual, expected, comparison) {
  if (comparison === "unorderedArray") {
    return stringify(normalizeUnorderedArray(actual)) === stringify(normalizeUnorderedArray(expected));
  }

  return stringify(actual) === stringify(expected);
}

self.onmessage = (event) => {
  const { code, comparison = "deepEqual", functionName, cases } = event.data;

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
          passed: isEqual(actual, testCase.expected, comparison),
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
