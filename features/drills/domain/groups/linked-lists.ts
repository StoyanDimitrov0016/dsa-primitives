import { defineFunctionDrill } from "../define-drill";

const list123 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null,
    },
  },
};

const list1223 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 2,
      next: {
        value: 3,
        next: null,
      },
    },
  },
};

export const linkedListDrills = [
  defineFunctionDrill({
    id: "linked-list-to-array",
    groupId: "linked-lists",
    title: "Linked List To Array",
    category: "Linked Lists",
    summary: "Collect linked-list values from head to tail.",
    prompt:
      "Return an array of values from a singly linked list. The node shape is { value, next }, and the final node points to null.",
    lesson: [
      {
        type: "principle",
        title: "Walk one node at a time",
        text: "A linked list does not support index access, so traversal follows next pointers from the head.",
      },
      {
        type: "paragraph",
        text: "Start at head, record the current value, then move to current.next until the current node is null.",
      },
      {
        type: "paragraph",
        text: "The null pointer is the end marker and should not produce a value.",
      },
    ],
    contract: {
      functionName: "linkedListToArray",
      parameters: ["head"],
      returns: "number[]",
    },
    visible: [
      {
        name: "collects several nodes",
        args: [list123],
        expected: [1, 2, 3],
      },
      {
        name: "handles an empty list",
        args: [null],
        expected: [],
      },
    ],
    hidden: [
      {
        name: "handles one node",
        args: [{ value: 9, next: null }],
        expected: [9],
      },
    ],
  }),
  defineFunctionDrill({
    id: "linked-list-length",
    groupId: "linked-lists",
    title: "Linked List Length",
    category: "Linked Lists",
    summary: "Count how many nodes are in a singly linked list.",
    prompt:
      "Return the number of nodes in a singly linked list. Move from node to node with next pointers and count each real node.",
    lesson: [
      {
        type: "principle",
        title: "Count during traversal",
        text: "A linked-list count is built by visiting each node once.",
      },
      {
        type: "paragraph",
        text: "Increment the count before moving to the next node, then stop when the pointer becomes null.",
      },
      {
        type: "paragraph",
        text: "This primitive is often the first step for middle-node and kth-from-end problems.",
      },
    ],
    contract: {
      functionName: "linkedListLength",
      parameters: ["head"],
      returns: "number",
    },
    visible: [
      {
        name: "counts several nodes",
        args: [list123],
        expected: 3,
      },
      {
        name: "handles an empty list",
        args: [null],
        expected: 0,
      },
    ],
    hidden: [
      {
        name: "handles one node",
        args: [{ value: 9, next: null }],
        expected: 1,
      },
    ],
  }),
  defineFunctionDrill({
    id: "find-middle-node",
    groupId: "linked-lists",
    title: "Find Middle Node",
    category: "Linked Lists",
    summary: "Return the middle value using slow and fast pointers.",
    prompt:
      "Return the middle node value of a singly linked list. Use a slow pointer that moves one step and a fast pointer that moves two steps. For even length, return the second middle value.",
    lesson: [
      {
        type: "principle",
        title: "Fast pointer measures progress",
        text: "When fast reaches the end, slow has moved half as many steps and lands at the middle.",
      },
      {
        type: "paragraph",
        text: "Move slow by one node and fast by two nodes while fast and fast.next both exist.",
      },
      {
        type: "paragraph",
        text: "This technique avoids making a first pass just to know the list length.",
      },
    ],
    contract: {
      functionName: "findMiddleNode",
      parameters: ["head"],
      returns: "number | null",
    },
    visible: [
      {
        name: "finds an odd-length middle",
        args: [list123],
        expected: 2,
      },
      {
        name: "handles an empty list",
        args: [null],
        expected: null,
      },
    ],
    hidden: [
      {
        name: "returns the second middle for even length",
        args: [
          {
            value: 1,
            next: {
              value: 2,
              next: {
                value: 3,
                next: {
                  value: 4,
                  next: null,
                },
              },
            },
          },
        ],
        expected: 3,
      },
    ],
  }),
  defineFunctionDrill({
    id: "remove-duplicates-sorted-list",
    groupId: "linked-lists",
    title: "Remove Duplicates From Sorted List",
    category: "Linked Lists",
    summary: "Return sorted linked-list values with adjacent duplicates removed.",
    prompt:
      "Return an array of values from a sorted singly linked list after removing duplicate values. Because the list is sorted, equal values appear next to each other.",
    lesson: [
      {
        type: "principle",
        title: "Compare with previous kept value",
        text: "In a sorted list, duplicates are adjacent, so only the last kept value matters.",
      },
      {
        type: "paragraph",
        text: "Walk the list from left to right. Append a value only when it differs from the value most recently appended.",
      },
      {
        type: "paragraph",
        text: "Returning an array keeps this drill focused on traversal logic before introducing pointer rewiring.",
      },
    ],
    contract: {
      functionName: "removeDuplicatesSortedList",
      parameters: ["head"],
      returns: "number[]",
    },
    visible: [
      {
        name: "removes adjacent duplicates",
        args: [list1223],
        expected: [1, 2, 3],
      },
      {
        name: "handles an empty list",
        args: [null],
        expected: [],
      },
    ],
    hidden: [
      {
        name: "handles all duplicates",
        args: [
          {
            value: 4,
            next: {
              value: 4,
              next: {
                value: 4,
                next: null,
              },
            },
          },
        ],
        expected: [4],
      },
    ],
  }),
];
