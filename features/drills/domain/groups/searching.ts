import { defineFunctionDrill } from "../define-drill";

export const searchingDrills = [
  defineFunctionDrill({
    id: "binary-search",
    groupId: "searching",
    title: "Binary Search",
    category: "Search",
    summary: "Return the index of a target in a sorted array, or -1.",
    prompt:
      "Implement binary search over an ascending sorted array. Return any matching index if the target exists, otherwise return -1. Keep the search bounded by left and right indices so the range shrinks each step.",
    lesson: [
      {
        type: "principle",
        title: "Invariant",
        text: "The target, if it exists, is always inside the current inclusive range from left to right.",
      },
      {
        type: "paragraph",
        text: "Binary search works because the array is sorted. At every step, the middle value tells you which half cannot contain the target.",
      },
      {
        type: "paragraph",
        text: "When the middle value is too small, every index up to the middle can be discarded. When it is too large, every index from the middle onward can be discarded.",
      },
      {
        type: "paragraph",
        text: "The loop ends when the boundaries cross. At that point the search space is empty, so the target is not present.",
      },
    ],
    contract: {
      functionName: "binarySearch",
      parameters: ["nums", "target"],
      returns: "number",
    },
    visible: [
      {
        name: "finds the middle item",
        args: [[1, 3, 5, 7, 9], 5],
        expected: 2,
      },
      {
        name: "returns -1 when missing",
        args: [[1, 3, 5, 7, 9], 4],
        expected: -1,
      },
      {
        name: "handles a single matching item",
        args: [[8], 8],
        expected: 0,
      },
    ],
    hidden: [
      {
        name: "handles an empty array",
        args: [[], 10],
        expected: -1,
      },
      {
        name: "finds the first item",
        args: [[2, 4, 6, 8, 10], 2],
        expected: 0,
      },
      {
        name: "finds the last item",
        args: [[2, 4, 6, 8, 10], 10],
        expected: 4,
      },
    ],
  }),
  defineFunctionDrill({
    id: "lower-bound",
    groupId: "searching",
    title: "Lower Bound",
    category: "Search",
    summary: "Return the first index whose value is greater than or equal to target.",
    prompt:
      "Implement lower bound over an ascending sorted array. Return the first index where nums[index] is greater than or equal to target. If every value is smaller than target, return nums.length.",
    lesson: [
      {
        type: "principle",
        title: "Boundary search",
        text: "Lower bound searches for a position, not necessarily an existing value.",
      },
      {
        type: "paragraph",
        text: "The answer is the first index that could legally hold the target while keeping the array sorted.",
      },
      {
        type: "paragraph",
        text: "When the middle value is greater than or equal to the target, keep it as a possible answer and continue left.",
      },
    ],
    contract: {
      functionName: "lowerBound",
      parameters: ["nums", "target"],
      returns: "number",
    },
    assertion: {
      comparison: "custom",
      validatorName: "validLowerBoundIndex",
    },
    visible: [
      {
        name: "finds an existing value",
        args: [[1, 3, 5, 7], 5],
        expected: 2,
      },
      {
        name: "finds an insertion point",
        args: [[1, 3, 5, 7], 4],
        expected: 2,
      },
    ],
    hidden: [
      {
        name: "returns zero before all values",
        args: [[2, 4, 6], 1],
        expected: 0,
      },
      {
        name: "returns length after all values",
        args: [[2, 4, 6], 9],
        expected: 3,
      },
      {
        name: "handles duplicates",
        args: [[1, 2, 2, 2, 5], 2],
        expected: 1,
      },
    ],
  }),
  defineFunctionDrill({
    id: "upper-bound",
    groupId: "searching",
    title: "Upper Bound",
    category: "Search",
    summary: "Return the first index whose value is greater than target.",
    prompt:
      "Implement upper bound over an ascending sorted array. Return the first index where nums[index] is greater than target. If no value is greater than target, return nums.length.",
    lesson: [
      {
        type: "principle",
        title: "Strict boundary",
        text: "Upper bound skips every value equal to the target and lands after the equal range.",
      },
      {
        type: "paragraph",
        text: "When the middle value is less than or equal to target, the answer must be to the right.",
      },
      {
        type: "paragraph",
        text: "When the middle value is greater than target, it may be the answer, but there may be an earlier valid index.",
      },
    ],
    contract: {
      functionName: "upperBound",
      parameters: ["nums", "target"],
      returns: "number",
    },
    assertion: {
      comparison: "custom",
      validatorName: "validUpperBoundIndex",
    },
    visible: [
      {
        name: "finds after an existing value",
        args: [[1, 3, 5, 7], 5],
        expected: 3,
      },
      {
        name: "finds an insertion point",
        args: [[1, 3, 5, 7], 4],
        expected: 2,
      },
    ],
    hidden: [
      {
        name: "returns zero before all values",
        args: [[2, 4, 6], 1],
        expected: 0,
      },
      {
        name: "returns length after all values",
        args: [[2, 4, 6], 9],
        expected: 3,
      },
      {
        name: "handles duplicates",
        args: [[1, 2, 2, 2, 5], 2],
        expected: 4,
      },
    ],
  }),
  defineFunctionDrill({
    id: "first-occurrence",
    groupId: "searching",
    title: "First Occurrence",
    category: "Search",
    summary: "Return the first index of target in a sorted array, or -1.",
    prompt:
      "Implement a binary-search variant that returns the first occurrence of target in an ascending sorted array. Return -1 when target is missing.",
    lesson: [
      {
        type: "principle",
        title: "Keep searching left",
        text: "Finding target once is not enough when duplicates can exist.",
      },
      {
        type: "paragraph",
        text: "When the middle value equals target, record it as a candidate answer and continue searching the left half.",
      },
      {
        type: "paragraph",
        text: "At the end, the saved candidate is the first occurrence if one was found.",
      },
    ],
    contract: {
      functionName: "firstOccurrence",
      parameters: ["nums", "target"],
      returns: "number",
    },
    visible: [
      {
        name: "finds the first duplicate",
        args: [[1, 2, 2, 2, 5], 2],
        expected: 1,
      },
      {
        name: "returns -1 when missing",
        args: [[1, 2, 4], 3],
        expected: -1,
      },
    ],
    hidden: [
      {
        name: "finds the first item",
        args: [[7, 7, 7], 7],
        expected: 0,
      },
      {
        name: "handles empty arrays",
        args: [[], 1],
        expected: -1,
      },
    ],
  }),
  defineFunctionDrill({
    id: "last-occurrence",
    groupId: "searching",
    title: "Last Occurrence",
    category: "Search",
    summary: "Return the last index of target in a sorted array, or -1.",
    prompt:
      "Implement a binary-search variant that returns the last occurrence of target in an ascending sorted array. Return -1 when target is missing.",
    lesson: [
      {
        type: "principle",
        title: "Keep searching right",
        text: "The last occurrence is found by saving matches and continuing to the right.",
      },
      {
        type: "paragraph",
        text: "When the middle value equals target, record it as a candidate answer and move the left boundary after the middle.",
      },
      {
        type: "paragraph",
        text: "The final saved candidate is the rightmost target position.",
      },
    ],
    contract: {
      functionName: "lastOccurrence",
      parameters: ["nums", "target"],
      returns: "number",
    },
    visible: [
      {
        name: "finds the last duplicate",
        args: [[1, 2, 2, 2, 5], 2],
        expected: 3,
      },
      {
        name: "returns -1 when missing",
        args: [[1, 2, 4], 3],
        expected: -1,
      },
    ],
    hidden: [
      {
        name: "finds the last item",
        args: [[7, 7, 7], 7],
        expected: 2,
      },
      {
        name: "handles empty arrays",
        args: [[], 1],
        expected: -1,
      },
    ],
  }),
];
