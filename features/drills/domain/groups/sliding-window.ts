import { defineFunctionDrill } from "../define-drill";

export const slidingWindowDrills = [
  defineFunctionDrill({
    id: "max-fixed-window-sum",
    groupId: "sliding-window",
    title: "Max Fixed Window Sum",
    category: "Sliding Window",
    summary: "Return the largest sum of any contiguous window of size k.",
    prompt:
      "Return the maximum sum of any contiguous subarray with exactly k items. Build the first window once, then slide it by adding the next value and removing the value that left.",
    lesson: [
      {
        type: "principle",
        title: "Reuse the previous window",
        text: "Adjacent fixed-size windows differ by only one outgoing value and one incoming value.",
      },
      {
        type: "steps",
        title: "Window update",
        items: [
          "Sum the first k values.",
          "Slide right one index at a time.",
          "Add the new right value and subtract the old left value.",
          "Track the best sum seen.",
        ],
      },
      {
        type: "paragraph",
        text: "Return null when k is not a valid window size for the input.",
      },
    ],
    contract: {
      functionName: "maxFixedWindowSum",
      parameters: ["nums", "k"],
      returns: "number | null",
    },
    visible: [
      {
        name: "finds the best window",
        args: [[2, 1, 5, 1, 3, 2], 3],
        expected: 9,
      },
      {
        name: "handles one full window",
        args: [[4, -1, 2], 3],
        expected: 5,
      },
    ],
    hidden: [
      {
        name: "handles negative values",
        args: [[-5, -2, -8, -1], 2],
        expected: -7,
      },
      {
        name: "rejects invalid window size",
        args: [[1, 2], 3],
        expected: null,
      },
    ],
  }),
  defineFunctionDrill({
    id: "minimum-subarray-length",
    groupId: "sliding-window",
    title: "Minimum Subarray Length",
    category: "Sliding Window",
    summary: "Find the shortest contiguous range whose sum reaches target.",
    prompt:
      "Return the length of the shortest contiguous subarray whose sum is at least target. The input numbers are positive, so shrinking from the left is safe once the window reaches the target.",
    lesson: [
      {
        type: "principle",
        title: "Expand then shrink",
        text: "Positive numbers make the window sum increase when the right edge moves and decrease when the left edge moves.",
      },
      {
        type: "paragraph",
        text: "Move the right edge until the sum reaches the target. Then move the left edge while the sum is still large enough, recording each shorter valid length.",
      },
      {
        type: "paragraph",
        text: "Return 0 when no contiguous subarray can reach the target.",
      },
    ],
    contract: {
      functionName: "minSubarrayLen",
      parameters: ["target", "nums"],
      returns: "number",
    },
    visible: [
      {
        name: "finds a short middle range",
        args: [7, [2, 3, 1, 2, 4, 3]],
        expected: 2,
      },
      {
        name: "returns zero when impossible",
        args: [100, [1, 2, 3]],
        expected: 0,
      },
    ],
    hidden: [
      {
        name: "handles a single matching value",
        args: [4, [1, 4, 4]],
        expected: 1,
      },
      {
        name: "handles full array",
        args: [11, [1, 2, 3, 4, 5]],
        expected: 3,
      },
    ],
  }),
  defineFunctionDrill({
    id: "longest-unique-substring",
    groupId: "sliding-window",
    title: "Longest Unique Substring",
    category: "Sliding Window",
    summary: "Return the longest substring length without repeated characters.",
    prompt:
      "Return the length of the longest substring that contains no repeated characters. Keep a window of unique characters and move the left edge past duplicates.",
    lesson: [
      {
        type: "principle",
        title: "Window validity",
        text: "The active window is valid only while each character appears at most once.",
      },
      {
        type: "paragraph",
        text: "When a duplicate appears inside the current window, move the left edge until the duplicate is removed.",
      },
      {
        type: "paragraph",
        text: "A map from character to last seen index lets you jump the left edge instead of removing one character at a time.",
      },
    ],
    contract: {
      functionName: "longestUniqueSubstring",
      parameters: ["text"],
      returns: "number",
    },
    visible: [
      {
        name: "handles repeated middle characters",
        args: ["abcabcbb"],
        expected: 3,
      },
      {
        name: "handles all repeated characters",
        args: ["bbbbb"],
        expected: 1,
      },
    ],
    hidden: [
      {
        name: "handles empty strings",
        args: [""],
        expected: 0,
      },
      {
        name: "handles a late duplicate",
        args: ["pwwkew"],
        expected: 3,
      },
    ],
  }),
];
