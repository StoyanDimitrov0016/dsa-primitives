# §1. Two Pointers

## 1. Introduction

Two pointers is a method for processing a sequence by keeping track of two meaningful positions at the same time. The sequence is usually an array or a string, although a related version of the idea also appears in linked lists.

The method is useful when a problem can be solved by gradually reducing the part of the input that is still unknown, or by gradually increasing the part that is already known to be correct. The important idea is not that the algorithm has two variables. The important idea is that the two variables divide the input into regions with different meanings.

A correct two pointers solution is built around this separation. Some regions are already processed, some regions are still unknown, and some regions are already known to contain values of a certain kind. Once these regions are clear, the pointer movement becomes much easier to derive.

---

## 2. What the Pattern Does

Two pointers usually does one of three things.

First, it can shrink an unknown interval from both sides. This happens when the useful part of the input is somewhere between a left boundary and a right boundary. Reversing, comparing opposite ends, and searching for a pair in a sorted array are common examples.

Second, it can grow a correct prefix from left to right. This happens when the beginning of the array is gradually turned into the answer. Removing values, moving zeroes, and removing duplicates from a sorted array often have this shape.

Third, it can divide the input into zones. This happens when values must be grouped according to a condition. Partitioning values less than a target, grouping booleans, or sorting an array containing only `0`, `1`, and `2` are examples of this shape.

These three ideas cover most common array and string two-pointer problems. Slow and fast pointers are also often called two pointers, but they are based on a different idea: relative speed inside a chain-like structure. They are usually better treated as a separate lesson.

---

## 3. Why the Pattern Works

The pattern works because every pointer movement is justified by an invariant. An invariant is a statement that remains true after every step of the algorithm. If we know that everything before a certain pointer is already correct, then the algorithm does not need to inspect that part again. If we know that everything outside an interval has already been ruled out, then the answer, if it still exists, must be inside the interval.

This is the central reasoning of two pointers: the code is only the implementation of the invariant. A pointer should not move because “this is how the trick works”. A pointer should move because the invariant proves that the position being skipped is already handled, already correct, or no longer able to change the answer.

---

## 4. Where the Pattern Is Commonly Applied

Two pointers appears most often in problems involving arrays and strings. It is common when the problem asks us to reverse, compare, remove, compact, group, partition, or search for a pair.

The pattern is especially useful when a brute-force solution would check many combinations, but the structure of the input allows some possibilities to be ignored safely. For example, a sorted array gives information about which pointer movement can increase or decrease a sum. A palindrome check gives information about which opposite positions must match. An in-place removal problem gives information about which prefix of the array is already correct.

The pattern should not be chosen only because the input is an array. The important question is whether two positions can describe what is already known and what is still unknown.

---

# Invariant I. Shrinking the Unknown Interval

## 5. Idea

In this form, the two pointers mark the current unknown interval. The left pointer starts near the beginning of the sequence, and the right pointer starts near the end. The algorithm repeatedly examines the two boundary values and then makes the interval smaller.

This invariant is natural when the problem has a relationship between the beginning and the end of the sequence. The algorithm looks at both sides, decides what can be processed or ruled out, and then moves inward.

| Region                 | Meaning                        |
| ---------------------- | ------------------------------ |
| Before `left`          | Already processed or ruled out |
| From `left` to `right` | Still unknown                  |
| After `right`          | Already processed or ruled out |

## 6. Invariant

> At every step, everything outside `[left, right]` has already been processed or ruled out.

Therefore, the algorithm only needs to continue working inside `[left, right]`. The interval `[left, right]` is the only part that may still affect the answer.

## 7. Functionality

This invariant is useful when the problem works with opposite positions. Sometimes both pointers move after every step. This happens when both positions have been fully handled, such as when reversing an array or checking a simple palindrome.

Sometimes only one pointer moves. This happens when the input gives enough information to decide that one side can no longer produce a useful answer. Searching for a pair in a sorted array is the most common example. The important distinction is that when both sides are handled, both pointers can move; when only one side is ruled out, only that pointer should move.

## 8. Standard Form: Both Ends Are Handled

```ts
let left = 0;
let right = items.length - 1;

while (left < right) {
  // inspect items[left] and items[right]

  left++;
  right--;
}
```

This is the standard form when both ends are handled together. It appears in reversing, simple symmetry checks, and simple palindrome checks.

## 9. Explanation of the Standard Form

The variable `left` marks the first position of the unknown interval, and `right` marks the last position of the unknown interval. The loop continues while there are still two different positions to process. The condition `left < right` means that the algorithm is working with a pair of positions.

After the algorithm handles `items[left]` and `items[right]`, both positions become processed. Therefore, `left` moves one step to the right and `right` moves one step to the left. The unknown interval becomes smaller after every iteration.

If the array has an odd number of elements, the pointers eventually meet at the middle. This usually does not require special handling. If the array has an even number of elements, the pointers cross after the final pair is processed. A good loop condition handles both cases naturally.

## 10. Standard Form: Skipping Irrelevant Values

Sometimes not every value participates in the comparison. In that case, the pointers still move inward, but they may skip irrelevant positions before comparing.

```ts
let left = 0;
let right = text.length - 1;

while (left < right) {
  while (left < right && shouldSkip(text[left])) {
    left++;
  }

  while (left < right && shouldSkip(text[right])) {
    right--;
  }

  // compare text[left] and text[right]

  left++;
  right--;
}
```

The helper `shouldSkip` defines which values are ignored. The pointer logic is still the main lesson. The helper is not the core algorithm.

For example, if the lesson is about palindrome checking while ignoring non-alphanumeric characters, the platform can provide a helper such as `isAlphaNumeric`. The student should focus on pointer movement, not on remembering character rules.

## 11. Standard Form: Sorted Pair Search

When the input is sorted, pointer movement can be based on the ordering of the values.

```ts
let left = 0;
let right = numbers.length - 1;

while (left < right) {
  const sum = numbers[left] + numbers[right];

  if (sum === target) {
    // found the required pair
  }

  if (sum < target) {
    left++;
  } else {
    right--;
  }
}
```

This form is different from reversing or simple palindrome checking. The pointers do not both move automatically. The current sum decides which pointer is safe to move.

## 12. Why Sorted Pair Movement Is Safe

Assume the array is sorted in increasing order. If `numbers[left] + numbers[right] < target`, then the current sum is too small. Keeping the same `left` and moving `right` left would only make the sum smaller or equal, because values to the left of `right` are not larger than `numbers[right]`.

So the current `left` cannot form the target with the current `right` or with any value before `right`. Therefore, moving `left` is safe.

Similarly, if `numbers[left] + numbers[right] > target`, then the current sum is too large. Keeping the same `right` and moving `left` right would only make the sum larger or equal, because values to the right of `left` are not smaller than `numbers[left]`.

So the current `right` cannot form the target with the current `left` or with any value after `left`. Therefore, moving `right` is safe. This reasoning is the reason sorted pair search can be linear instead of quadratic.

## 13. Common Applications

This invariant commonly solves problems where the useful part is between two boundaries. It appears in reversing arrays, reversing strings, reversing a subarray, comparing symmetric positions, checking palindromes, skipping ignored characters during comparison, and searching for pairs in sorted arrays.

When the input is sorted, this invariant is also useful for problems about closest sums, pair counts, and ruling out impossible pairs. The surface of these problems may look different, but the invariant is the same: the answer, if it still exists, must be inside the current interval.

## 14. Common Mistakes

The most common mistake is moving both pointers automatically. This is correct when both positions have been fully processed, as in reversing or simple palindrome checking. It is not correct when the algorithm has only ruled out one side. In sorted pair search, moving both pointers may skip the only valid answer. To avoid this, ask which side has become impossible. Only the impossible side should move.

Another common mistake is using the wrong loop condition. For most shrinking interval problems that process pairs, `left < right` is correct. When `left === right`, there is no pair left to process. However, some search-style problems may require a different condition. The loop condition should come from the meaning of the pointers, not from memorization.

A third mistake is forgetting to protect the pointer movement while skipping. If the algorithm skips characters or values, it must still ensure that `left < right` before comparing.

---

# Invariant II. Growing the Correct Prefix

## 15. Idea

In this form, the algorithm builds the correct answer at the beginning of the array. One pointer scans the input, while another pointer marks the next position where a valid value should be placed.

This invariant is natural when the problem asks us to remove, keep, compact, overwrite, or preserve only part of an array. The correct part grows from left to right.

| Region         | Meaning                            |
| -------------- | ---------------------------------- |
| Before `write` | Already correct                    |
| At `write`     | Next position to fill              |
| After `write`  | Unknown, old, or irrelevant values |

## 16. Invariant

> At every step, everything before `write` is already correct.

The position `write` is the next place where a useful value should be written. The values after `write` are not guaranteed to be meaningful yet. They may be old values, ignored values, or values that will be overwritten later.

## 17. Functionality

This invariant is useful when the problem asks us to reuse the same array as storage for the answer. Instead of creating a new array, we treat the beginning of the existing array as the result area.

The `read` pointer scans the original content. The `write` pointer grows the valid prefix. This is why the two pointers usually move in the same direction. The `read` pointer moves through the input, and the `write` pointer moves only when the algorithm accepts a value into the result.

## 18. Standard Form: Stable Compaction

```ts
let write = 0;

for (let read = 0; read < items.length; read++) {
  if (shouldKeep(items[read])) {
    items[write] = items[read];
    write++;
  }
}
```

This is the standard form for stable compaction. Stable means that the relative order of the kept values is preserved.

## 19. Explanation of the Standard Form

The `read` pointer visits every value in the original array. The `write` pointer does not move on every iteration. It moves only when a value is accepted into the correct prefix.

When `shouldKeep(items[read])` is true, the current value belongs in the result. The algorithm writes it to `items[write]`, then moves `write` to the next free position. When `shouldKeep(items[read])` is false, the current value is ignored. The `read` pointer continues, but `write` does not move.

At the end, `write` usually equals the length of the meaningful part of the array. The array may still contain old values after index `write - 1`. Those values do not matter unless the problem explicitly requires the whole array to be cleaned.

## 20. Returning a Valid Length

Many in-place array problems do not require the whole array to represent the answer. Instead, the function returns a number. If the function returns `k`, then the meaningful part is `items[0]` through `items[k - 1]`.

Everything from `items[k]` onward may be ignored. This is common because the array has fixed storage, but the logical result may be shorter than the original input. The returned length is often the final value of `write`.

## 21. Standard Form: Compact Then Fill

Some problems require the whole array to have a final valid form. For example, after compacting one group to the front, the remaining positions may need to be filled with another value.

```ts
let write = 0;

for (let read = 0; read < items.length; read++) {
  if (shouldGoFirst(items[read])) {
    items[write] = items[read];
    write++;
  }
}

while (write < items.length) {
  items[write] = fillValue;
  write++;
}
```

This structure has two phases. The first phase builds the correct prefix. The second phase completes the rest of the array.

## 22. Removing Duplicates from a Sorted Array

Removing duplicates from a sorted array is also a correct-prefix problem. The sorted order is important because equal values appear next to each other. This means the algorithm does not need to remember all values it has seen. It only needs to compare the current value with the values already placed in the correct prefix.

The general shape is:

```ts
let write = 0;

for (let read = 0; read < items.length; read++) {
  if (shouldWrite(items, read, write)) {
    items[write] = items[read];
    write++;
  }
}
```

The pointer structure stays the same. Only the rule `shouldWrite` changes. One problem may allow one copy of each value. Another may allow at most two copies. A more general version may allow at most `k` copies.

The invariant remains the same: everything before `write` is the correct prefix according to the duplicate rule.

## 23. Common Applications

This invariant commonly solves problems where the answer is a prefix built from accepted values. It appears in removing values, keeping values that satisfy a condition, moving zeroes while preserving order, compacting arrays, removing duplicates from sorted arrays, and returning the valid length of an in-place result.

The common structure is that `read` discovers candidates and `write` records accepted values.

## 24. Common Mistakes

A common mistake is incrementing `write` every time. That is wrong because `write` means “next position to fill”, not “current position being inspected”. It should move only after a value has been written into the correct prefix.

Another common mistake is forgetting that the values after `write` may not matter. In many in-place problems, only the prefix before `write` is checked. The rest of the array may contain old values.

A third mistake is accidentally breaking stable order. If the problem requires preserving the order of accepted values, then values should be written in the same order in which `read` discovers them.

To avoid these mistakes, always define the meaning of `write` before writing the loop.

---

# Invariant III. Dividing the Input into Zones

## 25. Idea

In this form, the array is divided into regions. Each completed region has a known meaning. One region may contain values of the first group, another region may contain values of the second group, and the remaining region is still unknown.

This invariant is natural when the problem asks us to group values rather than preserve their exact original order. The algorithm continues until the unknown region disappears.

For two groups, one common interpretation is:

| Region       | Meaning                       |
| ------------ | ----------------------------- |
| Left zone    | Values that belong to group A |
| Unknown zone | Values not processed yet      |
| Right zone   | Values that belong to group B |

Another common two-zone implementation uses a growing boundary:

| Region                           | Meaning                                       |
| -------------------------------- | --------------------------------------------- |
| Before `boundary`                | Values that belong to the left group          |
| From `boundary` to `current - 1` | Values already seen but not in the left group |
| From `current` onward            | Unknown values                                |

For three groups, the structure is:

| Region                      | Meaning        |
| --------------------------- | -------------- |
| Before `low`                | Low group      |
| From `low` to `current - 1` | Middle group   |
| From `current` to `high`    | Unknown values |
| After `high`                | High group     |

## 26. Invariant

> At every step, each completed zone contains only values that belong in that zone.

The algorithm is correct when there is no unknown zone left. Unlike the correct-prefix invariant, zone partitioning does not always preserve the original order of values. Its main goal is grouping, not stability.

## 27. Functionality

This invariant is useful when values need to be separated by a condition: smaller values before larger values, false before true, even before odd, or low values before high values.

Partitioning is often more flexible than stable compaction because it can use swaps. However, this also means it may change the relative order of values inside each group. Before using this invariant, the algorithm must know whether order matters. If order matters, stable compaction is usually safer. If order does not matter, partitioning is often enough.

## 28. Standard Form: Two-Way Partition

```ts
let boundary = 0;

for (let current = 0; current < items.length; current++) {
  if (belongsToLeftGroup(items[current])) {
    // move items[current] into the left group
    boundary++;
  }
}
```

The exact movement may involve assignment or swapping, depending on whether the algorithm must preserve order. The important part is the meaning of the two pointers.

## 29. Explanation of the Two-Way Standard Form

The pointer `boundary` marks the end of the left group. The pointer `current` scans the unknown part of the array.

When the current value belongs to the left group, it must be moved into the position marked by `boundary`. After that, the left group becomes larger, so `boundary` moves one step to the right. When the current value does not belong to the left group, it remains outside the left group, and only `current` continues.

The invariant after each step is that everything before `boundary` belongs to the left group.

## 30. Stable and Unstable Partition

A stable partition preserves the relative order of values inside each group. An unstable partition does not promise to preserve order. This difference matters.

If the task says to move all zeroes to the end while preserving the order of the non-zero values, a stable method is needed. If the task says to place all even numbers before all odd numbers and does not mention order, an unstable partition is acceptable.

Many wrong solutions come from using an unstable partition when the task requires stable order.

## 31. Standard Form: Three-Way Partition

Some problems require more than two groups. The classic form uses three pointers:

```ts
let low = 0;
let current = 0;
let high = items.length - 1;

while (current <= high) {
  if (belongsToLowGroup(items[current])) {
    // move current value into the low zone
    low++;
    current++;
  } else if (belongsToMiddleGroup(items[current])) {
    // current value is already in the middle zone
    current++;
  } else {
    // move current value into the high zone
    high--;
  }
}
```

This form is more delicate than the two-way version because the algorithm keeps several zones correct at the same time.

## 32. Explanation of the Three-Way Standard Form

The pointer `low` marks the boundary after the low group. The pointer `current` marks the first unknown value. The pointer `high` marks the boundary before the high group.

Values before `low` already belong to the low group. Values from `low` to `current - 1` already belong to the middle group. Values after `high` already belong to the high group. Values from `current` to `high` are still unknown.

When the current value belongs to the low group, it is moved to the low zone. Then both `low` and `current` move forward. When the current value belongs to the middle group, it is already in the correct zone for now, so only `current` moves forward.

When the current value belongs to the high group, it is moved to the high zone. Then `high` moves backward. The `current` pointer should not automatically move, because the value swapped into the current position has not been inspected yet. This last detail is one of the most important parts of three-way partitioning.

## 33. Common Applications

This invariant commonly solves problems where values must be grouped. It appears in boolean partitioning, separating values by a target, grouping even and odd values, sorting arrays with two possible values, and sorting arrays with three possible values.

The common structure is that each pointer marks a boundary between zones.

## 34. Common Mistakes

A common mistake is using partitioning when the problem requires stable order. Partitioning may change the relative order of values. This is fine only when the problem allows it.

Another common mistake is failing to describe the zones before writing code. Without zones, the pointer movement feels arbitrary.

A third common mistake appears in three-way partitioning. When a value is moved from the high side into the current position, the new current value is unknown. If the algorithm moves `current` immediately, it may skip an unprocessed value.

To avoid these mistakes, write down the zones first. Then decide which pointer moves after each case.

---

# Choosing the Invariant

Before solving a two pointers problem, do not ask which memorized trick should be used. Ask which invariant describes the problem.

If the useful part is an interval that shrinks from both sides, use the shrinking unknown interval invariant. If the answer is being built at the beginning of the array, use the growing correct prefix invariant. If the array must be divided into groups, use the zone invariant.

A useful decision rule is:

| Question                                        | Invariant                      |
| ----------------------------------------------- | ------------------------------ |
| Do I have an unknown interval between two ends? | Shrinking the unknown interval |
| Am I building the valid answer at the front?    | Growing the correct prefix     |
| Am I grouping values into regions?              | Dividing the input into zones  |

The invariant should be chosen before the implementation. This classification is more useful than memorizing problem names.

---

# Final Summary

Two pointers is a family of methods based on maintaining two meaningful positions. The important part is not the number of pointers. The important part is the invariant created by them.

Most array and string two-pointer problems are based on one of three invariant shapes: shrinking an unknown interval, growing a correct prefix, or dividing the input into zones.

Once the invariant is known, the pointer movement and the code structure become much easier to derive.

The correct order of thinking is:

```txt
meaning of pointers → invariant → pointer movement → code
```

Code should come last. The invariant comes first.
