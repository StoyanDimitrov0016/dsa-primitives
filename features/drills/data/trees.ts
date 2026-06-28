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
      {
        type: "principle",
        title: "Visit before children",
        text: "Preorder traversal records a node before exploring its children.",
      },
      {
        type: "steps",
        title: "Traversal order",
        items: ["Visit the root", "Traverse the left subtree", "Traverse the right subtree"],
      },
      {
        type: "paragraph",
        text: "A null node contributes nothing and stops that branch of recursion.",
      },
      {
        type: "paragraph",
        text: "Preorder is useful when the parent must be processed before the structure beneath it.",
      },
    ],
    contract: {
      functionName: "preorderTraversal",
      parameters: ["root"],
      returns: "number[]",
    },
    starterCode: `function preorderTraversal(root) {
  // implement me
}`,
    cases: {
      visible: [
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
      hidden: [
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
      {
        type: "principle",
        title: "Visit between subtrees",
        text: "Inorder traversal delays visiting the current node until after its left subtree.",
      },
      {
        type: "steps",
        title: "Traversal order",
        items: ["Traverse the left subtree", "Visit the root", "Traverse the right subtree"],
      },
      {
        type: "paragraph",
        text: "A null child is an empty subtree, so it simply returns without adding a value.",
      },
      {
        type: "paragraph",
        text: "For binary search trees, inorder traversal produces values in sorted order.",
      },
    ],
    contract: {
      functionName: "inorderTraversal",
      parameters: ["root"],
      returns: "number[]",
    },
    starterCode: `function inorderTraversal(root) {
  // implement me
}`,
    cases: {
      visible: [
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
      hidden: [
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
      {
        type: "principle",
        title: "Visit after children",
        text: "Postorder traversal visits a node only after both of its subtrees are finished.",
      },
      {
        type: "steps",
        title: "Traversal order",
        items: ["Traverse the left subtree", "Traverse the right subtree", "Visit the root"],
      },
      {
        type: "paragraph",
        text: "This is the traversal for situations where children must be solved before the parent can be handled.",
      },
      {
        type: "paragraph",
        text: "A null node is the base case and represents an already-finished empty subtree.",
      },
    ],
    contract: {
      functionName: "postorderTraversal",
      parameters: ["root"],
      returns: "number[]",
    },
    starterCode: `function postorderTraversal(root) {
  // implement me
}`,
    cases: {
      visible: [
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
      hidden: [
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
      {
        type: "principle",
        title: "Breadth before depth",
        text: "Level order traversal visits nodes by distance from the root.",
      },
      {
        type: "steps",
        title: "Queue rule",
        items: [
          "Remove the oldest node from the queue",
          "Record its value",
          "Add its children to the back of the queue",
        ],
      },
      {
        type: "paragraph",
        text: "Because children are added after all earlier nodes, the queue naturally finishes the current level before moving deeper.",
      },
      {
        type: "paragraph",
        text: "This is breadth-first search specialized to a binary tree.",
      },
    ],
    contract: {
      functionName: "levelOrderTraversal",
      parameters: ["root"],
      returns: "number[]",
    },
    starterCode: `function levelOrderTraversal(root) {
  // implement me
}`,
    cases: {
      visible: [
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
      hidden: [
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
  },
];
