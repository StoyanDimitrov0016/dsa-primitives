import type { Drill } from "../types";

export const searchingDrills: Drill[] = [
  {
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
    starterCode: `function binarySearch(nums, target) {
  // implement me
}`,
    cases: {
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
    },
  },
];
