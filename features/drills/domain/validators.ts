import { deepEqual } from "./comparisons";

export type CustomValidatorContext = {
  actual: unknown;
  expected: unknown;
  args: unknown[];
  caseName: string;
};

export type CustomValidatorResult = {
  passed: boolean;
  message?: string;
};

export type CustomValidator = (context: CustomValidatorContext) => CustomValidatorResult;

function pass(passed: boolean, message?: string): CustomValidatorResult {
  return { passed, message };
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNumberArrayArg(args: unknown[], index: number) {
  const value = args[index];
  return isNumberArray(value) ? value : null;
}

export const customValidators = {
  validPairSumIndices({ actual, args }: CustomValidatorContext) {
    if (actual === null) {
      return pass(true);
    }

    if (!Array.isArray(actual) || actual.length !== 2) {
      return pass(false, "Expected a pair of indices or null.");
    }

    const nums = getNumberArrayArg(args, 0);
    const target = args[1];
    const [leftIndex, rightIndex] = actual;

    if (
      !nums ||
      typeof target !== "number" ||
      typeof leftIndex !== "number" ||
      typeof rightIndex !== "number"
    ) {
      return pass(false, "Could not validate pair indices for this case.");
    }

    return pass(
      leftIndex !== rightIndex &&
        leftIndex >= 0 &&
        rightIndex >= 0 &&
        leftIndex < nums.length &&
        rightIndex < nums.length &&
        nums[leftIndex] + nums[rightIndex] === target,
      "Returned indices do not point to two values that sum to the target."
    );
  },
  validFrequencyMap({ actual, expected }: CustomValidatorContext) {
    return pass(
      isRecord(actual) && isRecord(expected) && deepEqual(actual, expected),
      "Frequency map does not match the expected counts."
    );
  },
  validSortedArray({ actual, expected }: CustomValidatorContext) {
    if (!Array.isArray(actual)) {
      return pass(false, "Expected an array.");
    }

    const isSorted = actual.every(
      (item, index, values) => index === 0 || String(values[index - 1]) <= String(item)
    );

    return pass(isSorted && deepEqual(actual, expected), "Array is not sorted as expected.");
  },
  validPermutation({ actual, expected }: CustomValidatorContext) {
    if (!Array.isArray(actual) || !Array.isArray(expected)) {
      return pass(false, "Expected arrays.");
    }

    const normalize = (items: unknown[]) =>
      [...items]
        .map((item) => JSON.stringify(item))
        .sort((left, right) => left.localeCompare(right));

    return pass(
      deepEqual(normalize(actual), normalize(expected)),
      "Array does not contain the expected values."
    );
  },
  validBinarySearchIndex({ actual, args }: CustomValidatorContext) {
    const nums = getNumberArrayArg(args, 0);
    const target = args[1];

    if (!nums || typeof target !== "number" || typeof actual !== "number") {
      return pass(false, "Expected a numeric index.");
    }

    return pass(
      actual === -1 ? !nums.includes(target) : nums[actual] === target,
      "Returned index is not a valid target position."
    );
  },
  validLowerBoundIndex({ actual, args }: CustomValidatorContext) {
    const nums = getNumberArrayArg(args, 0);
    const target = args[1];

    if (!nums || typeof target !== "number" || typeof actual !== "number") {
      return pass(false, "Expected a numeric index.");
    }

    return pass(
      actual >= 0 &&
        actual <= nums.length &&
        (actual === nums.length || nums[actual] >= target) &&
        (actual === 0 || nums[actual - 1] < target),
      "Returned index is not the first position greater than or equal to target."
    );
  },
  validUpperBoundIndex({ actual, args }: CustomValidatorContext) {
    const nums = getNumberArrayArg(args, 0);
    const target = args[1];

    if (!nums || typeof target !== "number" || typeof actual !== "number") {
      return pass(false, "Expected a numeric index.");
    }

    return pass(
      actual >= 0 &&
        actual <= nums.length &&
        (actual === nums.length || nums[actual] > target) &&
        (actual === 0 || nums[actual - 1] <= target),
      "Returned index is not the first position greater than target."
    );
  },
} satisfies Record<string, CustomValidator>;

export type CustomValidatorName = keyof typeof customValidators;

export function getCustomValidator(name: string) {
  return customValidators[name as CustomValidatorName];
}

export function hasCustomValidator(name: string) {
  return name in customValidators;
}
