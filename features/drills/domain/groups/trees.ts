import { defineFunctionDrill } from "../define-drill";

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

const validBst = {
  value: 8,
  left: {
    value: 3,
    left: { value: 1, left: null, right: null },
    right: { value: 6, left: null, right: null },
  },
  right: {
    value: 10,
    left: null,
    right: { value: 14, left: null, right: null },
  },
};

const invalidBst = {
  value: 8,
  left: {
    value: 3,
    left: { value: 1, left: null, right: null },
    right: { value: 9, left: null, right: null },
  },
  right: {
    value: 10,
    left: null,
    right: { value: 14, left: null, right: null },
  },
};

export const treeDrills = [
  defineFunctionDrill({
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
  }),
  defineFunctionDrill({
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
  }),
  defineFunctionDrill({
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
  }),
  defineFunctionDrill({
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
  }),
  defineFunctionDrill({
    id: "tree-height",
    groupId: "trees",
    title: "Tree Height",
    category: "Trees",
    summary: "Return the number of nodes on the longest root-to-leaf path.",
    prompt:
      "Return the height of a binary tree. An empty tree has height 0, and a single node has height 1. The input node shape is { value, left, right }.",
    lesson: [
      {
        type: "principle",
        title: "Solve by subtree",
        text: "A tree's height is one plus the larger height of its left and right subtrees.",
      },
      {
        type: "paragraph",
        text: "The null base case returns 0 because an empty branch contributes no nodes to a path.",
      },
      {
        type: "paragraph",
        text: "This pattern is the basic shape of many recursive tree measurements.",
      },
    ],
    contract: {
      functionName: "treeHeight",
      parameters: ["root"],
      returns: "number",
    },
    visible: [
      {
        name: "measures a balanced tree",
        args: [balancedTree],
        expected: 3,
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: 0,
      },
    ],
    hidden: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: 1,
      },
      {
        name: "measures a skewed tree",
        args: [skewedTree],
        expected: 3,
      },
    ],
  }),
  defineFunctionDrill({
    id: "count-nodes",
    groupId: "trees",
    title: "Count Nodes",
    category: "Trees",
    summary: "Return how many nodes exist in a binary tree.",
    prompt:
      "Return the total number of nodes in a binary tree. Count the current node, then add the counts from the left and right subtrees.",
    lesson: [
      {
        type: "principle",
        title: "Current plus children",
        text: "A non-empty tree count is one for the root plus every node below it.",
      },
      {
        type: "paragraph",
        text: "The null base case returns 0, which makes leaf nodes naturally return 1.",
      },
      {
        type: "paragraph",
        text: "This same decomposition appears in size, sum, and aggregate tree problems.",
      },
    ],
    contract: {
      functionName: "countNodes",
      parameters: ["root"],
      returns: "number",
    },
    visible: [
      {
        name: "counts a balanced tree",
        args: [balancedTree],
        expected: 7,
      },
      {
        name: "handles an empty tree",
        args: [null],
        expected: 0,
      },
    ],
    hidden: [
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: 1,
      },
      {
        name: "counts a skewed tree",
        args: [skewedTree],
        expected: 3,
      },
    ],
  }),
  defineFunctionDrill({
    id: "tree-contains",
    groupId: "trees",
    title: "Tree Contains",
    category: "Trees",
    summary: "Return whether a binary tree contains target.",
    prompt:
      "Return true if any node in the binary tree has value equal to target. This is a general binary tree, so both branches may need to be searched.",
    lesson: [
      {
        type: "principle",
        title: "Short-circuit search",
        text: "Once the target is found, the remaining branches no longer matter.",
      },
      {
        type: "paragraph",
        text: "Check the current node first, then recursively search the left and right subtrees.",
      },
      {
        type: "paragraph",
        text: "Because this is not necessarily a search tree, values do not tell you which branch can be discarded.",
      },
    ],
    contract: {
      functionName: "treeContains",
      parameters: ["root", "target"],
      returns: "boolean",
    },
    visible: [
      {
        name: "finds an existing value",
        args: [balancedTree, 6],
        expected: true,
      },
      {
        name: "returns false when missing",
        args: [balancedTree, 99],
        expected: false,
      },
    ],
    hidden: [
      {
        name: "handles an empty tree",
        args: [null, 1],
        expected: false,
      },
      {
        name: "finds the root",
        args: [balancedTree, 1],
        expected: true,
      },
    ],
  }),
  defineFunctionDrill({
    id: "bst-search",
    groupId: "trees",
    title: "BST Search",
    category: "Trees",
    summary: "Return whether a binary search tree contains target.",
    prompt:
      "Return true if target exists in a binary search tree. Use the ordering rule: smaller values are in the left subtree and larger values are in the right subtree.",
    lesson: [
      {
        type: "principle",
        title: "Discard one side",
        text: "A binary search tree lets you choose one branch at each node, similar to binary search over an array.",
      },
      {
        type: "paragraph",
        text: "If target is smaller than the current value, search left. If it is larger, search right. If it matches, return true.",
      },
      {
        type: "paragraph",
        text: "Reaching null means the target would have been in that position, but it is absent.",
      },
    ],
    contract: {
      functionName: "bstSearch",
      parameters: ["root", "target"],
      returns: "boolean",
    },
    visible: [
      {
        name: "finds a left subtree value",
        args: [validBst, 6],
        expected: true,
      },
      {
        name: "returns false when missing",
        args: [validBst, 7],
        expected: false,
      },
    ],
    hidden: [
      {
        name: "finds a right subtree value",
        args: [validBst, 14],
        expected: true,
      },
      {
        name: "handles an empty tree",
        args: [null, 1],
        expected: false,
      },
    ],
  }),
  defineFunctionDrill({
    id: "validate-bst",
    groupId: "trees",
    title: "Validate BST",
    category: "Trees",
    summary: "Return whether a binary tree obeys BST ordering.",
    prompt:
      "Return true if the tree is a valid binary search tree. Every node must be greater than all values in its left subtree and smaller than all values in its right subtree.",
    lesson: [
      {
        type: "principle",
        title: "Carry allowed bounds",
        text: "Each recursive call has a minimum and maximum value that the current node must fit between.",
      },
      {
        type: "paragraph",
        text: "A node in the left subtree must be below its parent, but it may also need to respect an ancestor's lower bound.",
      },
      {
        type: "paragraph",
        text: "Checking only direct children is not enough because invalid values can appear deeper in the tree.",
      },
    ],
    contract: {
      functionName: "isValidBST",
      parameters: ["root"],
      returns: "boolean",
    },
    visible: [
      {
        name: "accepts a valid BST",
        args: [validBst],
        expected: true,
      },
      {
        name: "rejects a deep ordering violation",
        args: [invalidBst],
        expected: false,
      },
    ],
    hidden: [
      {
        name: "handles an empty tree",
        args: [null],
        expected: true,
      },
      {
        name: "handles a single node",
        args: [{ value: 9, left: null, right: null }],
        expected: true,
      },
    ],
  }),
];
