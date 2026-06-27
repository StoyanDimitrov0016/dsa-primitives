import type { Drill } from "../types";

const balancedTree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: { value: 6, left: null, right: null },
    right: { value: 7, left: null, right: null },
  },
};

const skewedTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: null,
  },
  right: null,
};

export const treeDrills: Drill[] = [
  {
    id: "preorder-traversal",
    groupId: "trees",
    title: "Preorder Traversal",
    category: "Trees",
    summary: "Visit root, then left subtree, then right subtree.",
    prompt:
      "Implement preorder traversal over a binary tree. Return an array of values in root-left-right order. The input node shape is { value, left, right }, and children may be null.",
    functionName: "preorderTraversal",
    starterCode: `function preorderTraversal(root) {
  // implement me
}`,
    visibleCases: [
      {
        name: "traverses a balanced tree",
        args: [balancedTree],
        expected: [1, 2, 4, 5, 3, 6, 7],
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: [],
      },
    ],
    hiddenCases: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: [9],
      },
      {
        name: "handles a left-skewed tree",
        args: [skewedTree],
        expected: [1, 2, 3],
      },
    ],
  },
  {
    id: "inorder-traversal",
    groupId: "trees",
    title: "Inorder Traversal",
    category: "Trees",
    summary: "Visit left subtree, then root, then right subtree.",
    prompt:
      "Implement inorder traversal over a binary tree. Return an array of values in left-root-right order. The input node shape is { value, left, right }, and children may be null.",
    functionName: "inorderTraversal",
    starterCode: `function inorderTraversal(root) {
  // implement me
}`,
    visibleCases: [
      {
        name: "traverses a balanced tree",
        args: [balancedTree],
        expected: [4, 2, 5, 1, 6, 3, 7],
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: [],
      },
    ],
    hiddenCases: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: [9],
      },
      {
        name: "handles a left-skewed tree",
        args: [skewedTree],
        expected: [3, 2, 1],
      },
    ],
  },
  {
    id: "postorder-traversal",
    groupId: "trees",
    title: "Postorder Traversal",
    category: "Trees",
    summary: "Visit left subtree, then right subtree, then root.",
    prompt:
      "Implement postorder traversal over a binary tree. Return an array of values in left-right-root order. The input node shape is { value, left, right }, and children may be null.",
    functionName: "postorderTraversal",
    starterCode: `function postorderTraversal(root) {
  // implement me
}`,
    visibleCases: [
      {
        name: "traverses a balanced tree",
        args: [balancedTree],
        expected: [4, 5, 2, 6, 7, 3, 1],
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: [],
      },
    ],
    hiddenCases: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: [9],
      },
      {
        name: "handles a left-skewed tree",
        args: [skewedTree],
        expected: [3, 2, 1],
      },
    ],
  },
  {
    id: "level-order-traversal",
    groupId: "trees",
    title: "Level Order Traversal",
    category: "Trees",
    summary: "Visit tree nodes breadth-first from top to bottom.",
    prompt:
      "Implement breadth-first traversal over a binary tree. Return an array of values in level-order. Process nodes by distance from the root before moving to the next depth.",
    functionName: "levelOrderTraversal",
    starterCode: `function levelOrderTraversal(root) {
  // implement me
}`,
    visibleCases: [
      {
        name: "traverses a balanced tree",
        args: [balancedTree],
        expected: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: [],
      },
    ],
    hiddenCases: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: [9],
      },
      {
        name: "handles a left-skewed tree",
        args: [skewedTree],
        expected: [1, 2, 3],
      },
    ],
  },
];
