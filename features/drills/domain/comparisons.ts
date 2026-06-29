import type { DrillComparison } from "./types";

type CompareValuesInput = {
  actual: unknown;
  comparison?: DrillComparison;
  expected: unknown;
};

const NUMBER_CLOSE_TO_TOLERANCE = 1e-6;

function stringify(value: unknown) {
  return JSON.stringify(value);
}

function normalizeUnorderedArray(value: unknown) {
  if (!Array.isArray(value)) {
    return value;
  }

  return [...value].sort((left, right) => stringify(left).localeCompare(stringify(right)));
}

export function deepEqual(actual: unknown, expected: unknown) {
  return stringify(actual) === stringify(expected);
}

export function unorderedArrayEqual(actual: unknown, expected: unknown) {
  return deepEqual(normalizeUnorderedArray(actual), normalizeUnorderedArray(expected));
}

export function numberCloseTo(actual: unknown, expected: unknown) {
  return (
    typeof actual === "number" &&
    typeof expected === "number" &&
    Math.abs(actual - expected) <= NUMBER_CLOSE_TO_TOLERANCE
  );
}

export function compareValues({ actual, comparison = "deepEqual", expected }: CompareValuesInput) {
  if (comparison === "unorderedArray") {
    return unorderedArrayEqual(actual, expected);
  }

  if (comparison === "numberCloseTo") {
    return numberCloseTo(actual, expected);
  }

  return deepEqual(actual, expected);
}
