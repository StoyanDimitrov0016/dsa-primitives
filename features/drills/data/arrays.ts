import type { Drill } from "../types";

export const arrayDrills: Drill[] = [
  {
    id: "two-sum-sorted",
    groupId: "arrays",
    title: "Two Sum Sorted",
    category: "Two Pointers",
    summary: "Find two indices in a sorted array whose values add to target.",
    prompt:
      "Use two pointers over an ascending sorted array. Return a zero-based pair of indices, or null if no pair exists. The same element cannot be used twice.",
    lesson: [
      "The sorted order lets two pointers make directed progress. Start one pointer at the smallest value and one at the largest value.",
      "If the current sum is too small, moving the left pointer right is the only useful move because it increases the sum.",
      "If the current sum is too large, moving the right pointer left is the only useful move because it decreases the sum.",
      "The pointers must never cross. Once they do, every valid pair has already been considered.",
    ],
    functionName: "twoSumSorted",
    starterCode: `function twoSumSorted(nums, target) {
  // implement me
}`,
    visibleCases: [
      {
        name: "finds a pair in the middle",
        args: [[1, 2, 4, 6, 10], 8],
        expected: [1, 3],
      },
      {
        name: "returns null when no pair exists",
        args: [[1, 2, 4, 6, 10], 99],
        expected: null,
      },
    ],
    hiddenCases: [
      {
        name: "uses both edges",
        args: [[1, 3, 4, 7, 11], 12],
        expected: [0, 4],
      },
      {
        name: "does not reuse the same element",
        args: [[2], 4],
        expected: null,
      },
    ],
  },
  {
    id: "prefix-sums",
    groupId: "arrays",
    title: "Prefix Sums",
    category: "Arrays",
    summary: "Build cumulative sums with an initial zero.",
    prompt:
      "Return a prefix sum array with length nums.length + 1, where prefix[0] is 0 and prefix[i + 1] is the sum of nums[0..i]. Each next prefix value should reuse the previous accumulated sum.",
    lesson: [
      "A prefix sum stores the total of everything before a position. The initial zero represents the sum before the array starts.",
      "Each next entry is built from the previous prefix plus the current number, so no range needs to be recomputed from scratch.",
      "The extra leading zero makes range sums convenient: the sum from left to right can be expressed as the difference between two prefix values.",
      "This primitive is useful whenever repeated range totals would otherwise make a solution too slow.",
    ],
    functionName: "buildPrefixSums",
    starterCode: `function buildPrefixSums(nums) {
  // implement me
}`,
    visibleCases: [
      {
        name: "builds cumulative values",
        args: [[3, -1, 4, 2]],
        expected: [0, 3, 2, 6, 8],
      },
      {
        name: "handles an empty input",
        args: [[]],
        expected: [0],
      },
    ],
    hiddenCases: [
      {
        name: "handles all negative values",
        args: [[-2, -3, -5]],
        expected: [0, -2, -5, -10],
      },
    ],
  },
];
