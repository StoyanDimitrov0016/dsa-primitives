import { defineFunctionDrill } from "../define-drill";

export const sortingDrills = [
  defineFunctionDrill({
    id: "merge-sorted-arrays",
    groupId: "sorting",
    title: "Merge Sorted Arrays",
    category: "Sorting",
    summary: "Combine two sorted arrays into one sorted array.",
    prompt:
      "Return a new sorted array containing all values from left and right. Both inputs are already sorted in ascending order, so compare the current front value from each side.",
    lesson: [
      {
        type: "principle",
        title: "Smallest front wins",
        text: "When two arrays are sorted, the next output value must be at one of the two current front positions.",
      },
      {
        type: "steps",
        title: "Merge loop",
        items: [
          "Start one pointer in each array.",
          "Append the smaller pointed value.",
          "Advance the pointer that provided the value.",
          "Append any remaining suffix after one side is empty.",
        ],
      },
      {
        type: "paragraph",
        text: "This is the central primitive used by merge sort.",
      },
    ],
    contract: {
      functionName: "mergeSortedArrays",
      parameters: ["left", "right"],
      returns: "number[]",
    },
    visible: [
      {
        name: "merges interleaved values",
        args: [
          [1, 4, 7],
          [2, 3, 8],
        ],
        expected: [1, 2, 3, 4, 7, 8],
      },
      {
        name: "handles one empty side",
        args: [[], [1, 2]],
        expected: [1, 2],
      },
    ],
    hidden: [
      {
        name: "keeps duplicates",
        args: [
          [1, 2, 2],
          [2, 3],
        ],
        expected: [1, 2, 2, 2, 3],
      },
      {
        name: "handles negative values",
        args: [
          [-5, 0],
          [-3, 2],
        ],
        expected: [-5, -3, 0, 2],
      },
    ],
  }),
  defineFunctionDrill({
    id: "merge-ranges",
    groupId: "sorting",
    title: "Merge Ranges",
    category: "Sorting",
    summary: "Merge sorted overlapping intervals.",
    prompt:
      "Return a new array of merged intervals. The intervals are sorted by start value, and overlapping or touching intervals should become one interval.",
    lesson: [
      {
        type: "principle",
        title: "Carry the active range",
        text: "When intervals are sorted by start, only the current merged range can overlap the next interval.",
      },
      {
        type: "paragraph",
        text: "If the next start is within the active range, extend the active end. Otherwise, save the active range and start a new one.",
      },
      {
        type: "paragraph",
        text: "Copy interval values instead of mutating the test input, so the function returns a clean result.",
      },
    ],
    contract: {
      functionName: "mergeRanges",
      parameters: ["intervals"],
      returns: "[number, number][]",
    },
    visible: [
      {
        name: "merges overlapping ranges",
        args: [
          [
            [1, 3],
            [2, 6],
            [8, 10],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
        ],
      },
      {
        name: "keeps separated ranges",
        args: [
          [
            [1, 2],
            [4, 5],
          ],
        ],
        expected: [
          [1, 2],
          [4, 5],
        ],
      },
    ],
    hidden: [
      {
        name: "merges touching ranges",
        args: [
          [
            [1, 2],
            [2, 4],
          ],
        ],
        expected: [[1, 4]],
      },
      {
        name: "handles empty input",
        args: [[]],
        expected: [],
      },
    ],
  }),
  defineFunctionDrill({
    id: "partition-by-pivot",
    groupId: "sorting",
    title: "Partition By Pivot",
    category: "Sorting",
    summary: "Place values below pivot before values greater than or equal to pivot.",
    prompt:
      "Return a new array where values smaller than pivot come first and values greater than or equal to pivot come after them. Preserve the original relative order inside each side.",
    lesson: [
      {
        type: "principle",
        title: "Partition without full sorting",
        text: "Partitioning separates values by a predicate without needing to order each side.",
      },
      {
        type: "paragraph",
        text: "Scan once, append smaller values to one bucket and the remaining values to another bucket, then join the buckets.",
      },
      {
        type: "paragraph",
        text: "This primitive is related to quicksort, selection, and two-way filtering problems.",
      },
    ],
    contract: {
      functionName: "partitionByPivot",
      parameters: ["nums", "pivot"],
      returns: "number[]",
    },
    visible: [
      {
        name: "partitions mixed values",
        args: [[5, 1, 4, 2, 3], 3],
        expected: [1, 2, 5, 4, 3],
      },
      {
        name: "keeps equal values on the right side",
        args: [[3, 1, 3, 2], 3],
        expected: [1, 2, 3, 3],
      },
    ],
    hidden: [
      {
        name: "handles all smaller values",
        args: [[1, 2], 5],
        expected: [1, 2],
      },
      {
        name: "handles all larger values",
        args: [[7, 8], 5],
        expected: [7, 8],
      },
    ],
  }),
];
