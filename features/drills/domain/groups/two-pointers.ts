import { defineFunctionDrill } from "../define-drill";

export const twoPointerDrills = [
  defineFunctionDrill({
    id: "is-palindrome-string",
    groupId: "two-pointers",
    title: "Palindrome String",
    category: "Two Pointers",
    summary: "Check whether a string reads the same forward and backward.",
    prompt:
      "Return true if text is a palindrome. Compare characters from the left and right ends, moving both pointers toward the center.",
    lesson: [
      {
        type: "principle",
        title: "Mirror positions",
        text: "A palindrome has matching characters at symmetric positions.",
      },
      {
        type: "paragraph",
        text: "If any left and right characters differ, the string cannot be a palindrome. If the pointers meet or cross, every required pair matched.",
      },
      {
        type: "paragraph",
        text: "This primitive is the base shape for many string and array symmetry problems.",
      },
    ],
    contract: {
      functionName: "isPalindromeString",
      parameters: ["text"],
      returns: "boolean",
    },
    visible: [
      {
        name: "accepts an odd-length palindrome",
        args: ["racecar"],
        expected: true,
      },
      {
        name: "rejects a non-palindrome",
        args: ["hello"],
        expected: false,
      },
    ],
    hidden: [
      {
        name: "handles even length",
        args: ["abba"],
        expected: true,
      },
      {
        name: "handles empty strings",
        args: [""],
        expected: true,
      },
    ],
  }),
  defineFunctionDrill({
    id: "move-zeroes",
    groupId: "two-pointers",
    title: "Move Zeroes",
    category: "Two Pointers",
    summary: "Move zeroes to the end while preserving non-zero order.",
    prompt:
      "Return a new array where all non-zero values keep their relative order and all zeroes appear at the end. Use one pointer to place the next non-zero value.",
    lesson: [
      {
        type: "principle",
        title: "Write pointer",
        text: "A write pointer tracks where the next kept value should be placed.",
      },
      {
        type: "paragraph",
        text: "Scan the array once. Each time you see a non-zero value, write it to the next output position.",
      },
      {
        type: "paragraph",
        text: "After all non-zero values are placed, fill the remaining positions with zeroes.",
      },
    ],
    contract: {
      functionName: "moveZeroes",
      parameters: ["nums"],
      returns: "number[]",
    },
    visible: [
      {
        name: "moves mixed zeroes",
        args: [[0, 1, 0, 3, 12]],
        expected: [1, 3, 12, 0, 0],
      },
      {
        name: "keeps arrays without zeroes",
        args: [[1, 2, 3]],
        expected: [1, 2, 3],
      },
    ],
    hidden: [
      {
        name: "handles all zeroes",
        args: [[0, 0]],
        expected: [0, 0],
      },
      {
        name: "handles empty arrays",
        args: [[]],
        expected: [],
      },
    ],
  }),
  defineFunctionDrill({
    id: "remove-target",
    groupId: "two-pointers",
    title: "Remove Target",
    category: "Two Pointers",
    summary: "Return all values except a target value.",
    prompt:
      "Return a new array containing every value from nums except target. Preserve the order of the remaining values using a write-position style scan.",
    lesson: [
      {
        type: "principle",
        title: "Filter by writing kept values",
        text: "The read pointer inspects every value, while the write position advances only for values that should remain.",
      },
      {
        type: "paragraph",
        text: "This is the clean version of the in-place remove-element primitive used in many array problems.",
      },
      {
        type: "paragraph",
        text: "The important part is that skipped values do not create gaps in the returned result.",
      },
    ],
    contract: {
      functionName: "removeTarget",
      parameters: ["nums", "target"],
      returns: "number[]",
    },
    visible: [
      {
        name: "removes repeated target values",
        args: [[3, 2, 2, 3], 3],
        expected: [2, 2],
      },
      {
        name: "keeps values when target is missing",
        args: [[1, 2, 3], 9],
        expected: [1, 2, 3],
      },
    ],
    hidden: [
      {
        name: "handles all target values",
        args: [[4, 4], 4],
        expected: [],
      },
      {
        name: "handles empty arrays",
        args: [[], 1],
        expected: [],
      },
    ],
  }),
];
