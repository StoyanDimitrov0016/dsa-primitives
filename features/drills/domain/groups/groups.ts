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
    id: "linked-lists",
    title: "Linked Lists",
    description: "Pointer-based list primitives planned for a later pass.",
  }),
  defineDrillGroup({
    id: "trees",
    title: "Trees",
    description: "Traverse and inspect recursive node structures.",
  }),
  defineDrillGroup({
    id: "sorting",
    title: "Sorting",
    description: "Ordering primitives planned for the next catalog expansion.",
  }),
];
