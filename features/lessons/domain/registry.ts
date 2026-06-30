import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { drills } from "@/features/drills";
import type { Lesson, LessonWithContent } from "./types";

const lessonsRoot = path.join(process.cwd(), "lessons");

const lessonCatalog = [
  {
    slug: "two-pointers",
    title: "Two Pointers",
    order: 1,
    groupId: "two-pointers",
    fileName: "two-pointers.lesson.md",
    summary:
      "Learn the invariant shapes behind shrinking intervals, write pointers, and zone partitioning.",
  },
  {
    slug: "tree-traversal",
    title: "Tree Traversals",
    order: 2,
    groupId: "trees",
    fileName: "tree-traversal.lesson.md",
    summary:
      "Build traversal fluency by treating recursion, stacks, and queues as frontiers of unfinished work.",
  },
] satisfies Lesson[];

export function getLessons() {
  return [...lessonCatalog].sort((left, right) => left.order - right.order);
}

export function getLessonBySlug(slug: string) {
  return lessonCatalog.find((lesson) => lesson.slug === slug);
}

export async function getLessonWithContent(slug: string): Promise<LessonWithContent | undefined> {
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return undefined;
  }

  const content = await readFile(path.join(lessonsRoot, lesson.fileName), "utf8");

  return {
    ...lesson,
    content,
    drills: drills.filter((drill) => drill.groupId === lesson.groupId),
  };
}
