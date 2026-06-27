export type DrillCase = {
  name: string;
  args: unknown[];
  expected: unknown;
};

export type Drill = {
  id: string;
  groupId: string;
  title: string;
  category: string;
  summary: string;
  prompt: string;
  functionName: string;
  starterCode: string;
  visibleCases: DrillCase[];
  hiddenCases: DrillCase[];
};

export type DrillGroup = {
  id: string;
  title: string;
  description: string;
};

export const drillGroups: DrillGroup[] = [
  {
    id: "searching",
    title: "Searching",
    description: "Sorted lookup and boundary primitives",
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "Indexing, windows, prefixes, and scans",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Pointer rewiring and traversal",
  },
  {
    id: "trees",
    title: "Trees",
    description: "DFS, BFS, and traversal shapes",
  },
  {
    id: "sorting",
    title: "Sorting",
    description: "Partitioning, merging, and ordering",
  },
];

export const drills: Drill[] = [
  {
    id: "binary-search",
    groupId: "searching",
    title: "Binary Search",
    category: "Search",
    summary: "Return the index of a target in a sorted array, or -1.",
    prompt:
      "Implement binary search over an ascending sorted array. Return any matching index if the target exists, otherwise return -1.",
    functionName: "binarySearch",
    starterCode: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // implement me
  }

  return -1;
}`,
    visibleCases: [
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
    hiddenCases: [
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
  {
    id: "two-sum-sorted",
    groupId: "arrays",
    title: "Two Sum Sorted",
    category: "Two Pointers",
    summary: "Find two indices in a sorted array whose values add to target.",
    prompt:
      "Use two pointers over an ascending sorted array. Return a zero-based pair of indices, or null if no pair exists.",
    functionName: "twoSumSorted",
    starterCode: `function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // implement me
  }

  return null;
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
      "Return a prefix sum array with length nums.length + 1, where prefix[0] is 0 and prefix[i + 1] is the sum of nums[0..i].",
    functionName: "buildPrefixSums",
    starterCode: `function buildPrefixSums(nums) {
  const prefix = [0];

  for (const value of nums) {
    // implement me
  }

  return prefix;
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

export const defaultDrill = drills[0];

export function getDrillByRoute(groupId: string, drillId: string) {
  return drills.find((drill) => drill.groupId === groupId && drill.id === drillId);
}
