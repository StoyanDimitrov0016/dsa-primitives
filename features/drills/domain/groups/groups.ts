import { defineDrillGroup } from "../define-drill";

export const drillGroups = [
  defineDrillGroup({
    id: "searching",
    title: "Searching",
    description: "Find values and boundaries inside ordered data.",
  }),
  defineDrillGroup({
    id: "arrays",
    title: "Arrays",
    description: "Build fluency with indexed sequences and accumulated state.",
  }),
  defineDrillGroup({
    id: "sliding-window",
    title: "Sliding Window",
    description: "Maintain a moving range without rescanning the same values.",
  }),
  defineDrillGroup({
    id: "two-pointers",
    title: "Two Pointers",
    description: "Move paired indices through arrays and strings with purpose.",
  }),
  defineDrillGroup({
    id: "linked-lists",
    title: "Linked Lists",
    description: "Manipulate node chains by rewiring next pointers.",
  }),
  defineDrillGroup({
    id: "trees",
    title: "Trees",
    description: "Traverse and inspect recursive node structures.",
  }),
  defineDrillGroup({
    id: "graphs",
    title: "Graphs",
    description: "Move through adjacency lists with breadth-first and depth-first search.",
  }),
  defineDrillGroup({
    id: "sorting",
    title: "Sorting",
    description: "Ordering primitives planned for the next catalog expansion.",
  }),
];
