# §2. Tree Traversals

## 1. Introduction

A tree traversal is a method for visiting every node in a tree in a specific order. A tree is not naturally linear like an array. It branches. A traversal gives us a rule for turning that branching structure into a sequence of visited nodes.

The important idea is not only that we “visit all nodes”. All basic traversals visit the same nodes. The difference is **when a node is processed relative to its children**.

For depth-first traversals, the main question is:

> Do we process the node before, between, or after its children?

For breadth-first traversal, the main question is different:

> Do we process nodes by their distance from the root?

These two questions create the main traversal families.

---

## 2. What the Pattern Does

Tree traversal gives an order to a hierarchical structure. Once the order is defined, the algorithm can collect values, search for a target, compute a result, validate a tree, serialize a tree, or process nodes level by level.

Depth-first traversal follows one branch as far as needed before returning to another branch. It is naturally connected to recursion and stacks. Breadth-first traversal processes nodes level by level. It is naturally connected to queues.

The traversal order is not a small implementation detail. It decides what information is available when a node is processed. For example, preorder sees the parent before the children. Postorder sees the children before the parent. Inorder sees the left side before the node and the right side after the node.

---

## 3. Why the Pattern Works

Tree traversal works because the algorithm maintains a frontier of discovered but unfinished work.

In recursive DFS, this frontier is stored in the call stack. In iterative DFS, it is stored in an explicit stack. In BFS, it is stored in a queue.

The invariant is always about unfinished work. At every moment, the algorithm knows which nodes still need to be processed or expanded. The traversal is complete when there is no unfinished work left.

This is the central idea:

> A traversal is correct when its frontier always contains exactly the work that has been discovered but not yet completed.

The data structure used for the frontier decides the order. A stack gives depth-first behavior. A queue gives breadth-first behavior.

---

## 4. Basic Tree Node Model

Most examples in this lesson assume a binary tree node with a value, a left child, and a right child.

```ts
type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};
```

The exact field names may change from problem to problem. Some problems use `val` instead of `value`. Some trees may have more than two children. The traversal idea stays the same: a node may lead to other nodes, and the algorithm needs a rule for the order in which they are processed.

---

# Invariant I. Recursive DFS as the Definition

## 5. Idea

Recursive depth-first traversal is the cleanest way to define preorder, inorder, and postorder. The recursive function describes what it means to traverse a subtree.

A subtree is handled by applying the same rule to its root and to its children. This is why recursion fits trees so naturally: every child of a tree is itself the root of a smaller tree.

The recursive version is not always the highest-ROI implementation for interviews, but it is the best way to understand the traversal order.

## 6. Invariant

> The call stack contains the path of unfinished subtree work.

When the algorithm enters a node, it may still need to process the node itself, its left subtree, and its right subtree. The recursive calls store this unfinished work automatically.

The traversal finishes when all recursive calls have returned.

## 7. The Three DFS Orders

The three classic DFS traversals differ only in the position of the processing step.

| Traversal | Order               | Meaning                                             |
| --------- | ------------------- | --------------------------------------------------- |
| Preorder  | node → left → right | Process the node before its children                |
| Inorder   | left → node → right | Process the node between the left and right subtree |
| Postorder | left → right → node | Process the node after its children                 |

This table is the main definition of DFS traversal order.

## 8. Standard Form: Recursive Preorder

```ts
function preorder<T>(node: TreeNode<T> | null): void {
  if (node === null) {
    return;
  }

  // process node
  preorder(node.left);
  preorder(node.right);
}
```

Preorder processes the node before visiting its children. This is useful when the parent must be seen before the subtrees.

## 9. Standard Form: Recursive Inorder

```ts
function inorder<T>(node: TreeNode<T> | null): void {
  if (node === null) {
    return;
  }

  inorder(node.left);
  // process node
  inorder(node.right);
}
```

Inorder processes the node after the left subtree and before the right subtree. For a binary search tree, inorder traversal visits values in sorted order.

## 10. Standard Form: Recursive Postorder

```ts
function postorder<T>(node: TreeNode<T> | null): void {
  if (node === null) {
    return;
  }

  postorder(node.left);
  postorder(node.right);
  // process node
}
```

Postorder processes the node after both children. This is useful when the result for a node depends on the results of its subtrees.

## 11. Explanation of the Recursive Forms

The base case is always the empty subtree. If the current node is `null`, there is nothing to visit, so the function returns.

The recursive calls decide the order in which the subtrees are visited. The position of the processing step decides whether the traversal is preorder, inorder, or postorder.

This is why the three recursive forms look almost identical. The traversal order is controlled by one thing: where the algorithm places the processing step.

## 12. Common Applications

Recursive preorder is common when building a copy of a tree, serializing structure, or processing a parent before its children.

Recursive inorder is especially important for binary search trees because it exposes the sorted order of the values.

Recursive postorder is common when computing information from children first, such as subtree height, subtree size, deletion order, or checking whether a tree is balanced.

## 13. Common Mistakes

A common mistake is memorizing the traversal names without knowing where the node is processed. To avoid this, always write the three words explicitly: node, left, right. Then place the processing step in the correct position.

Another mistake is forgetting the null base case. Every recursive traversal needs a rule for the empty subtree. Without it, the algorithm will eventually try to access children of `null`.

A third mistake is assuming recursion is always safe. Very deep trees can cause stack overflow in some environments. This is one reason iterative traversal is important.

---

# Invariant II. Iterative DFS with a Stack

## 14. Idea

Iterative DFS replaces the recursive call stack with an explicit stack. Instead of letting the language remember unfinished calls, the algorithm stores unfinished nodes itself.

This is one of the highest-ROI tree primitives because it makes the hidden mechanism of DFS visible. Once the stack is clear, recursive traversal becomes less magical.

The simplest useful iterative DFS is preorder traversal.

## 15. Invariant

> The stack contains nodes that have been discovered but not yet processed.

The next node to process is at the top of the stack. Since a stack is last-in, first-out, the most recently pushed node is processed first.

This is the reason child push order matters.

## 16. Standard Form: Iterative Preorder

```ts
function preorderIterative<T>(root: TreeNode<T> | null): void {
  if (root === null) {
    return;
  }

  const stack: TreeNode<T>[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;

    // process node

    if (node.right !== null) {
      stack.push(node.right);
    }

    if (node.left !== null) {
      stack.push(node.left);
    }
  }
}
```

This form processes the node first, then schedules its children for later.

## 17. Explanation of the Standard Form

The stack starts with the root because the root is the first discovered node. Each loop iteration removes one node from the stack and processes it.

The right child is pushed before the left child. This looks reversed at first, but it is necessary because the stack is last-in, first-out. If the right child is pushed first and the left child is pushed second, the left child will be popped and processed first.

Therefore, the actual processing order becomes:

```txt
node → left → right
```

The algorithm ends when the stack is empty. At that point, there are no discovered nodes left to process.

## 18. Common Applications

Iterative preorder is useful when recursion is not allowed, when the tree may be too deep, or when the problem asks for explicit stack behavior. It is also useful for searching a tree, collecting values, copying structure, and understanding how DFS works internally.

This form is also a good foundation for graph DFS, although graphs require an additional visited set.

## 19. Common Mistakes

The most common mistake is pushing the children in the wrong order. If the goal is preorder `node → left → right`, then the right child must be pushed before the left child.

Another mistake is pushing `null` nodes and then forgetting to handle them. Both styles are possible, but for beginner clarity it is better to avoid pushing `null` nodes.

A third mistake is believing that the stack stores the final answer. The stack stores unfinished work. The answer, if one is needed, should usually be stored separately.

---

# Invariant III. Controlled Inorder with a Stack

## 20. Idea

Iterative inorder traversal is more subtle than iterative preorder. In preorder, the node is processed as soon as it is popped. In inorder, the algorithm must first go as far left as possible, then process the node, then move to the right subtree.

This traversal is especially important for binary search trees. In a BST, inorder traversal visits values in sorted order.

## 21. Invariant

> The stack contains ancestors whose left side has been entered, but whose own value has not yet been processed.

The `current` pointer moves down the tree. The stack remembers the path back to nodes that still need to be processed after their left subtree is done.

## 22. Standard Form: Iterative Inorder

```ts
function inorderIterative<T>(root: TreeNode<T> | null): void {
  const stack: TreeNode<T>[] = [];
  let current: TreeNode<T> | null = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;

    // process current

    current = current.right;
  }
}
```

This is one of the most important standard forms for tree problems.

## 23. Explanation of the Standard Form

The inner loop walks left until there is no more left child. While walking left, the algorithm pushes each node onto the stack because those nodes still need to be processed later.

When `current` becomes `null`, the algorithm has reached the end of a left chain. The top of the stack is now the next node in inorder sequence. The algorithm pops that node and processes it.

After processing the node, the algorithm moves to its right child. The same rule then repeats: go left as far as possible, process the next node, then go right.

The outer loop continues while there is either a current subtree to enter or an unfinished ancestor on the stack.

## 24. Common Applications

Iterative inorder is high ROI because it appears in many binary search tree problems. It is commonly used for validating a BST, finding the kth smallest value, implementing a BST iterator, converting a BST to a sorted list, or checking whether the traversal order is sorted.

The reason is simple: inorder traversal gives sorted order for a valid binary search tree.

## 25. Common Mistakes

A common mistake is processing the node when it is first pushed. That would turn the traversal into preorder-like behavior. In inorder, pushing a node only means “come back to this node after finishing its left side”.

Another mistake is forgetting to move to `current.right` after processing the node. If the algorithm does not move to the right subtree, it will miss half of the tree.

A third mistake is not understanding the outer loop condition. The algorithm must continue while either `current` is not `null` or the stack is not empty. If only one of these is checked, some nodes may be skipped.

---

# Invariant IV. Breadth-First Traversal with a Queue

## 26. Idea

Breadth-first traversal visits nodes by distance from the root. It visits the root first, then all nodes one edge away, then all nodes two edges away, and so on.

This traversal is also called level order traversal when the result is grouped by levels.

DFS uses a stack. BFS uses a queue.

## 27. Invariant

> The queue contains discovered nodes waiting to be processed in level order.

A queue is first-in, first-out. This means nodes are processed in the same order in which they were discovered.

Because children are added after their parent, all nodes closer to the root are processed before nodes farther from the root.

## 28. Standard Form: BFS Queue

```ts
function bfs<T>(root: TreeNode<T> | null): void {
  if (root === null) {
    return;
  }

  const queue: TreeNode<T>[] = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front];
    front++;

    // process node

    if (node.left !== null) {
      queue.push(node.left);
    }

    if (node.right !== null) {
      queue.push(node.right);
    }
  }
}
```

This version uses a `front` index instead of `queue.shift()`.

## 29. Explanation of the Standard Form

The queue starts with the root because the root is the first discovered node. The `front` index marks the next queue position to process.

Each loop iteration reads the node at `queue[front]`, then increments `front`. This has the same logical effect as removing from the front of the queue, but it avoids the cost of shifting all array elements.

After processing a node, the algorithm adds its children to the back of the queue. Since the queue is first-in, first-out, nodes discovered earlier are processed earlier.

The traversal ends when `front` reaches `queue.length`. At that moment, all discovered nodes have been processed.

## 30. Why Avoid `shift()` in JavaScript

A queue is often described with operations like `push` and `shift`. This is correct conceptually, but in JavaScript arrays, `shift()` can be inefficient because removing the first element may require reindexing the remaining elements.

Using a `front` index keeps the same queue behavior without repeatedly moving array elements.

The idea is still a queue. The implementation is just more efficient.

## 31. Common Applications

BFS is commonly used when the problem cares about levels or distance from the root. It appears in level order traversal, minimum depth, right side view, average of levels, largest value in each level, and shortest path problems in unweighted graphs.

In trees, BFS is often the easiest way to process one level before moving to the next.

## 32. Common Mistakes

A common mistake is using a stack when the problem requires level order. A stack goes deep first. A queue goes level by level.

Another mistake is using `shift()` without considering performance. For small inputs it may not matter, but a reusable primitive should use a `front` index.

A third mistake is pushing children before processing the current node without understanding the order. Usually this still visits the same nodes, but the exact processing moment matters when levels or side views are involved.

---

# Invariant V. Level-by-Level BFS

## 33. Idea

Plain BFS processes nodes in level order, but it does not automatically separate the levels. Some problems need to know where one level ends and the next begins.

Level-by-level BFS adds one important idea: at the beginning of each outer loop, the algorithm records how many nodes belong to the current level.

## 34. Invariant

> At the start of each outer loop, the unprocessed part of the queue begins with exactly the nodes of the current level.

The variable `levelSize` records how many nodes belong to that level. The inner loop processes exactly that many nodes.

Children added during the inner loop belong to the next level, not the current one.

## 35. Standard Form: Level-by-Level BFS

```ts
function bfsByLevel<T>(root: TreeNode<T> | null): void {
  if (root === null) {
    return;
  }

  const queue: TreeNode<T>[] = [root];
  let front = 0;

  while (front < queue.length) {
    const levelSize = queue.length - front;

    for (let i = 0; i < levelSize; i++) {
      const node = queue[front];
      front++;

      // process node as part of the current level

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    // current level is finished here
  }
}
```

This is the standard form when the algorithm needs to group or summarize nodes by level.

## 36. Explanation of the Standard Form

At the start of the outer loop, all nodes from `front` to the current end of the queue are exactly the nodes in the current level. The algorithm stores their count in `levelSize`.

The inner loop runs `levelSize` times. This ensures that only nodes from the current level are processed in that iteration of the outer loop.

When the algorithm pushes children, those children are added to the end of the queue. They do not affect the current `levelSize`, so they will be processed in the next outer loop.

This separation is what makes level-by-level BFS different from plain BFS.

## 37. Common Applications

Level-by-level BFS is used when the result is grouped by tree depth. It is common in level order traversal, zigzag level order traversal, right side view, average of levels, largest value in each level, and problems that need to count or compare levels.

The key signal is that the problem asks for something “per level”.

## 38. Common Mistakes

A common mistake is calculating `levelSize` inside the inner loop. The size must be fixed at the start of the level. If it is recalculated while children are being pushed, the algorithm may accidentally process the next level too early.

Another mistake is confusing plain BFS with grouped BFS. Plain BFS gives the correct visiting order, but it does not tell us where each level begins and ends unless we add level tracking.

To avoid these mistakes, remember that `levelSize` is a snapshot, not a live value.

---

# Invariant VI. Stateful DFS for Postorder

## 39. Idea

Iterative postorder is harder than iterative preorder because a node must be processed after both children. A simple stack of nodes is often not enough because the algorithm must know whether a node is being seen for the first time or whether its children have already been handled.

The deeper lesson is that a stack can store work state, not only nodes.

## 40. Invariant

> The stack contains tasks, and each task records whether the node is ready to be processed.

A node is not ready to be processed the first time it is seen. It becomes ready only after its left and right subtrees have been scheduled before it.

## 41. Standard Form: Postorder with Visited State

```ts
function postorderIterative<T>(root: TreeNode<T> | null): void {
  const stack: Array<[TreeNode<T> | null, boolean]> = [[root, false]];

  while (stack.length > 0) {
    const [node, visited] = stack.pop()!;

    if (node === null) {
      continue;
    }

    if (visited) {
      // process node
    } else {
      stack.push([node, true]);
      stack.push([node.right, false]);
      stack.push([node.left, false]);
    }
  }
}
```

This form explicitly records whether a node should be processed now or expanded first.

## 42. Explanation of the Standard Form

When a node is first popped with `visited = false`, it is not processed yet. Instead, the algorithm pushes the same node back with `visited = true`. That means “process this node later”.

Then the algorithm pushes the right child and the left child as unfinished work. Since the stack is last-in, first-out, the left child is handled before the right child, and both children are handled before the original node is processed.

When the same node is later popped with `visited = true`, its children have already been scheduled before it. Now it is safe to process the node.

This creates postorder:

```txt
left → right → node
```

## 43. Easier Form: Reverse Preorder

There is also a shorter trick for postorder when collecting values into an array.

```ts
function postorderByReversePreorder<T>(root: TreeNode<T> | null): T[] {
  if (root === null) {
    return [];
  }

  const stack: TreeNode<T>[] = [root];
  const result: T[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;

    result.push(node.value);

    if (node.left !== null) {
      stack.push(node.left);
    }

    if (node.right !== null) {
      stack.push(node.right);
    }
  }

  result.reverse();
  return result;
}
```

This works because the traversal first creates a node-right-left order. Reversing that order gives left-right-node, which is postorder.

This version is easier to write, but it is less general than the visited-state version. The visited-state version is better when the algorithm must perform work at the exact moment after both children are complete.

## 44. Common Applications

Postorder is common when a node depends on information from its children. It appears in subtree height, maximum depth, checking whether a tree is balanced, computing subtree sums, deleting a tree, and many dynamic programming problems on trees.

The important signal is that the parent cannot be processed until the children are finished.

## 45. Common Mistakes

A common mistake is trying to use the same iterative structure as preorder. That processes the node too early.

Another mistake is moving the processing step before both children are handled. Postorder requires the children first and the node last.

A third mistake is using reverse preorder when the problem needs true postorder side effects. Reverse preorder is good for collecting traversal values, but the visited-state form is safer for algorithms where the timing of processing matters.

---

# Choosing the Traversal

Before solving a tree traversal problem, do not start by writing code. First decide when the node should be processed.

If the node should be processed before its children, use preorder.

If the left subtree should come before the node and the right subtree after it, use inorder. This is especially important for binary search trees.

If the node should be processed after its children, use postorder.

If nodes should be processed by distance from the root, use BFS.

If the result must be grouped by depth, use level-by-level BFS.

A useful decision table is:

| Question                                  | Traversal          |
| ----------------------------------------- | ------------------ |
| Do I need the parent before the children? | Preorder           |
| Do I need sorted order from a BST?        | Inorder            |
| Do I need children before the parent?     | Postorder          |
| Do I need nodes by distance from root?    | BFS                |
| Do I need separate groups per depth?      | Level-by-level BFS |

The traversal should be chosen from the meaning of the problem, not from habit.

---

# Final Summary

A tree traversal is a rule for turning a tree into a sequence of processed nodes.

The main DFS orders are preorder, inorder, and postorder. They differ only in the position of the processing step relative to the left and right subtrees.

Recursive DFS is the cleanest definition of these orders. Iterative DFS makes the hidden stack explicit and is often more useful as an implementation primitive.

BFS uses a queue instead of a stack. Plain BFS visits nodes in level order, while level-by-level BFS separates the levels.

The correct order of thinking is:

```txt
when should the node be processed → what frontier is needed → recursive, stack, or queue form → code
```

The traversal order comes first. The implementation comes after.
