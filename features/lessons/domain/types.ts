import type { Drill } from "@/features/drills/domain/types";

export type Lesson = {
  slug: string;
  title: string;
  order: number;
  groupId: string;
  fileName: string;
  summary: string;
};

export type LessonWithContent = Lesson & {
  content: string;
  drills: Drill[];
};
