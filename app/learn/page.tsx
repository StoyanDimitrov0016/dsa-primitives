import { drills } from "@/features/drills";
import { LessonsPage } from "@/features/lessons/components/lessons-page";
import { getLessons } from "@/features/lessons/domain/registry";

export default function LearnPage() {
  return <LessonsPage drills={drills} lessons={getLessons()} />;
}
