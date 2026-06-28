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
    lesson: [
      "Preorder traversal records a node before exploring its children. The visit order is root, left subtree, then right subtree.",
      "Think of the current node as the decision point. Its value is handled immediately, then the same rule is applied recursively to each child.",
      "A null node contributes nothing and stops that branch of recursion.",
      "Preorder is useful when the parent must be processed before the structure beneath it.",
    ],
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
    lesson: [
      "Inorder traversal delays visiting the current node until after its left subtree. The visit order is left subtree, root, then right subtree.",
      "The same rule applies at every node: finish everything smaller or earlier on the left, then record the node, then move right.",
      "A null child is an empty subtree, so it simply returns without adding a value.",
      "For binary search trees, inorder traversal produces values in sorted order.",
    ],
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
    lesson: [
      "Postorder traversal visits a node only after both of its subtrees are finished. The visit order is left subtree, right subtree, then root.",
      "This is the traversal for situations where children must be solved before the parent can be handled.",
      "Each recursive call returns after completing an entire branch, so the current node is added last for that local subtree.",
      "A null node is the base case and represents an already-finished empty subtree.",
    ],
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
    lesson: [
      "Level order traversal visits nodes by distance from the root. All nodes at depth zero are processed before depth one, and so on.",
      "A queue preserves this order. Remove the oldest node, record it, then add its children to the back of the queue.",
      "Because children are added after all earlier nodes, the queue naturally finishes the current level before moving deeper.",
      "This is breadth-first search specialized to a binary tree.",
    ],
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
