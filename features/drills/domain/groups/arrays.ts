import { defineFunctionDrill } from "../define-drill";

export const arrayDrills = [
  defineFunctionDrill({
    id: "two-sum-sorted",
    groupId: "arrays",
    title: "Two Sum Sorted",
    category: "Two Pointers",
    summary: "Find two indices in a sorted array whose values add to target.",
    prompt:
      "Use two pointers over an ascending sorted array. Return a zero-based pair of indices, or null if no pair exists. The same element cannot be used twice.",
    lesson: [
      {
        type: "principle",
        title: "Directional movement",
        text: "Sorted order lets each pointer move for a reason instead of guessing.",
      },
      {
        type: "steps",
        title: "Pointer rule",
        items: [
          "Start one pointer at the smallest value and one at the largest value.",
          "If the sum is too small, move the left pointer right.",
          "If the sum is too large, move the right pointer left.",
          "Stop when the pointers meet or cross.",
        ],
      },
      {
        type: "paragraph",
        text: "The pointers must never cross. Once they do, every valid pair has already been considered.",
      },
    ],
    contract: {
      functionName: "twoSumSorted",
      parameters: ["nums", "target"],
      returns: "[number, number] | null",
    },
    visible: [
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
    hidden: [
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
  }),
  defineFunctionDrill({
    id: "prefix-sums",
    groupId: "arrays",
    title: "Prefix Sums",
    category: "Arrays",
    summary: "Build cumulative sums with an initial zero.",
    prompt:
      "Return a prefix sum array with length nums.length + 1, where prefix[0] is 0 and prefix[i + 1] is the sum of nums[0..i]. Each next prefix value should reuse the previous accumulated sum.",
    lesson: [
      {
        type: "principle",
        title: "Accumulated state",
        text: "A prefix sum stores the total of everything before a position.",
      },
      {
        type: "paragraph",
        text: "The initial zero represents the sum before the array starts. Each next entry is built from the previous prefix plus the current number.",
      },
      {
        type: "paragraph",
        text: "The extra leading zero makes range sums convenient: the sum from left to right can be expressed as the difference between two prefix values.",
      },
      {
        type: "paragraph",
        text: "This primitive is useful whenever repeated range totals would otherwise make a solution too slow.",
      },
    ],
    contract: {
      functionName: "buildPrefixSums",
      parameters: ["nums"],
      returns: "number[]",
    },
    visible: [
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
    hidden: [
      {
        name: "handles all negative values",
        args: [[-2, -3, -5]],
        expected: [0, -2, -5, -10],
      },
    ],
  }),
  defineFunctionDrill({
    id: "reverse-array",
    groupId: "arrays",
    title: "Reverse Array",
    category: "Arrays",
    summary: "Return the values in reverse order.",
    prompt:
      "Return an array with the input values in reverse order. Use two pointers so you practice swapping from both ends instead of relying on a built-in reverse method.",
    lesson: [
      {
        type: "principle",
        title: "Symmetric swaps",
        text: "Reversal pairs the first item with the last item, the second item with the second-last item, and so on.",
      },
      {
        type: "steps",
        title: "Pointer movement",
        items: [
          "Start left at index 0 and right at the final index.",
          "Swap the two values while left is before right.",
          "Move left forward and right backward after each swap.",
        ],
      },
      {
        type: "paragraph",
        text: "The middle item in an odd-length array stays where it is because it pairs with itself.",
      },
    ],
    contract: {
      functionName: "reverseArray",
      parameters: ["nums"],
      returns: "number[]",
    },
    visible: [
      {
        name: "reverses several values",
        args: [[1, 2, 3, 4]],
        expected: [4, 3, 2, 1],
      },
      {
        name: "handles odd length",
        args: [[5, 6, 7]],
        expected: [7, 6, 5],
      },
    ],
    hidden: [
      {
        name: "handles one value",
        args: [[9]],
        expected: [9],
      },
      {
        name: "handles empty arrays",
        args: [[]],
        expected: [],
      },
    ],
  }),
  defineFunctionDrill({
    id: "frequency-map",
    groupId: "arrays",
    title: "Frequency Map",
    category: "Hashing",
    summary: "Count how many times each item appears.",
    prompt:
      "Build and return an object whose keys are the input items and whose values are occurrence counts. Each item should increase exactly one counter.",
    lesson: [
      {
        type: "principle",
        title: "Count by key",
        text: "A frequency map turns repeated scanning into direct lookup by value.",
      },
      {
        type: "paragraph",
        text: "For each item, read its current count. If the key is not present yet, treat the count as zero before adding one.",
      },
      {
        type: "paragraph",
        text: "In JavaScript object keys are strings, so numeric keys are stored as their string representation.",
      },
    ],
    contract: {
      functionName: "buildFrequencyMap",
      parameters: ["items"],
      returns: "Record<string, number>",
    },
    assertion: {
      comparison: "custom",
      validatorName: "validFrequencyMap",
    },
    visible: [
      {
        name: "counts repeated strings",
        args: [["a", "b", "a", "c", "b", "a"]],
        expected: { a: 3, b: 2, c: 1 },
      },
      {
        name: "handles an empty input",
        args: [[]],
        expected: {},
      },
    ],
    hidden: [
      {
        name: "counts number keys",
        args: [[1, 2, 1, 3, 2, 1]],
        expected: { "1": 3, "2": 2, "3": 1 },
      },
    ],
  }),
  defineFunctionDrill({
    id: "running-max",
    groupId: "arrays",
    title: "Running Max",
    category: "Arrays",
    summary: "Return the maximum value seen at each index.",
    prompt:
      "Return an array where each position contains the largest value seen from the start of nums through that position. Keep one current maximum and update it as you scan.",
    lesson: [
      {
        type: "principle",
        title: "State while scanning",
        text: "A running maximum keeps the best value seen so far without rescanning earlier items.",
      },
      {
        type: "paragraph",
        text: "At each index, compare the current value with the saved maximum, update the saved value if needed, then append it to the result.",
      },
      {
        type: "paragraph",
        text: "This pattern appears inside range, prefix, and dynamic programming problems where each step depends on the best previous state.",
      },
    ],
    contract: {
      functionName: "runningMax",
      parameters: ["nums"],
      returns: "number[]",
    },
    visible: [
      {
        name: "tracks increasing peaks",
        args: [[2, 1, 5, 3, 8]],
        expected: [2, 2, 5, 5, 8],
      },
      {
        name: "handles negative values",
        args: [[-5, -2, -8]],
        expected: [-5, -2, -2],
      },
    ],
    hidden: [
      {
        name: "handles one value",
        args: [[4]],
        expected: [4],
      },
      {
        name: "handles empty arrays",
        args: [[]],
        expected: [],
      },
    ],
  }),
  defineFunctionDrill({
    id: "rotate-right",
    groupId: "arrays",
    title: "Rotate Right",
    category: "Arrays",
    summary: "Move values to the right by k positions.",
    prompt:
      "Return a new array rotated to the right by k positions. Values that move beyond the end should wrap around to the front, and k may be larger than the array length.",
    lesson: [
      {
        type: "principle",
        title: "Modulo distance",
        text: "A rotation by k has the same effect as a rotation by k modulo the array length.",
      },
      {
        type: "paragraph",
        text: "After normalizing k, the final k values become the front segment and the earlier values shift after them.",
      },
      {
        type: "paragraph",
        text: "Always handle the empty array before taking a modulo by length.",
      },
    ],
    contract: {
      functionName: "rotateRight",
      parameters: ["nums", "k"],
      returns: "number[]",
    },
    visible: [
      {
        name: "rotates by two",
        args: [[1, 2, 3, 4, 5], 2],
        expected: [4, 5, 1, 2, 3],
      },
      {
        name: "normalizes large k",
        args: [[1, 2, 3], 4],
        expected: [3, 1, 2],
      },
    ],
    hidden: [
      {
        name: "handles zero rotation",
        args: [[7, 8], 0],
        expected: [7, 8],
      },
      {
        name: "handles empty arrays",
        args: [[], 3],
        expected: [],
      },
    ],
  }),
];
