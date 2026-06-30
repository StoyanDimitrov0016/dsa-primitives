import { describe, expect, it } from "vitest";
import { compareValues, deepEqual, numberCloseTo, unorderedArrayEqual } from "./comparisons";
import { defineFunctionDrill } from "./define-drill";
import { drillGroups, drills, validateCatalog } from "./registry";
import { DrillSchema } from "./schemas";
import { customValidators } from "./validators";

const validDrillInput = {
  id: "sample",
  groupId: "searching",
  kind: "function",
  title: "Sample",
  category: "Search",
  summary: "Sample summary.",
  prompt: "Implement the sample function.",
  lesson: [{ type: "paragraph", text: "Sample lesson." }],
  implementation: `function sample(nums) {
  return nums.length;
}`,
  contract: {
    functionName: "sample",
    parameters: ["nums"],
    returns: "number",
  },
  starterCode: `function sample(nums) {
  // implement me
}`,
  cases: {
    visible: [{ name: "visible", args: [[1]], expected: 1 }],
    hidden: [{ name: "hidden", args: [[]], expected: -1 }],
  },
} as const;

describe("DrillSchema", () => {
  it("accepts a valid drill", () => {
    expect(() => DrillSchema.parse(validDrillInput)).not.toThrow();
  });

  it("rejects a custom assertion without a validator", () => {
    expect(() =>
      DrillSchema.parse({
        ...validDrillInput,
        assertion: { comparison: "custom" },
      })
    ).toThrow();
  });
});

describe("defineFunctionDrill", () => {
  it("returns canonical grouped cases and generated starter code", () => {
    const drill = defineFunctionDrill({
      id: "sample",
      groupId: "searching",
      title: "Sample",
      category: "Search",
      summary: "Sample summary.",
      prompt: "Implement the sample function.",
      lesson: [{ type: "paragraph", text: "Sample lesson." }],
      contract: {
        functionName: "sample",
        parameters: ["nums"],
        returns: "number",
      },
      visible: [{ name: "visible", args: [[1]], expected: 1 }],
      hidden: [{ name: "hidden", args: [[]], expected: -1 }],
    });

    expect(drill.kind).toBe("function");
    expect(drill.starterCode).toContain("function sample(nums)");
    expect(drill.implementation).toContain("function sample(nums)");
    expect(drill.cases.visible).toHaveLength(1);
    expect(drill.cases.hidden).toHaveLength(1);
  });
});

describe("catalog validation", () => {
  it("validates the authored catalog", () => {
    expect(drills.length).toBeGreaterThan(0);
    expect(drillGroups.length).toBeGreaterThan(0);
  });

  it("catches duplicate drill IDs", () => {
    expect(() =>
      validateCatalog({
        drillGroups,
        drills: [drills[0], { ...drills[0], groupId: "arrays" }],
      })
    ).toThrow(/duplicate drill id/);
  });

  it("catches missing groups", () => {
    expect(() =>
      validateCatalog({
        drillGroups,
        drills: [{ ...drills[0], groupId: "missing" }],
      })
    ).toThrow(/missing group/);
  });

  it("catches unknown custom validators", () => {
    expect(() =>
      validateCatalog({
        drillGroups,
        drills: [
          {
            ...drills[0],
            assertion: { comparison: "custom", validatorName: "missingValidator" },
          },
        ],
      })
    ).toThrow(/custom validator/);
  });
});

describe("comparisons", () => {
  it("deepEqual compares nested objects", () => {
    expect(deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
  });

  it("unorderedArray ignores order", () => {
    expect(unorderedArrayEqual([3, 1, 2], [1, 2, 3])).toBe(true);
  });

  it("numberCloseTo respects tolerance", () => {
    expect(numberCloseTo(0.1 + 0.2, 0.3)).toBe(true);
    expect(compareValues({ actual: 1, comparison: "numberCloseTo", expected: 2 })).toBe(false);
  });
});

describe("custom validators", () => {
  it("validLowerBoundIndex accepts correct insertion points", () => {
    expect(
      customValidators.validLowerBoundIndex({
        actual: 2,
        args: [[1, 3, 5], 4],
        caseName: "lower bound",
        expected: 2,
      }).passed
    ).toBe(true);
  });

  it("validUpperBoundIndex accepts correct insertion points", () => {
    expect(
      customValidators.validUpperBoundIndex({
        actual: 2,
        args: [[1, 3, 5], 4],
        caseName: "upper bound",
        expected: 2,
      }).passed
    ).toBe(true);
  });

  it("validFrequencyMap accepts expected object maps", () => {
    expect(
      customValidators.validFrequencyMap({
        actual: { a: 2, b: 1 },
        args: [["a", "b", "a"]],
        caseName: "frequency",
        expected: { a: 2, b: 1 },
      }).passed
    ).toBe(true);
  });
});
