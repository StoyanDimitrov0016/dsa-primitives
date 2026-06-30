import Link from "next/link";
import { ArrowRight, BookOpen, Dumbbell } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Drill } from "@/features/drills/domain/types";
import type { Lesson } from "../domain/types";

type LessonsPageProps = {
  lessons: Lesson[];
  drills: Drill[];
};

function countDrillsForLesson(drills: Drill[], lesson: Lesson) {
  return drills.filter((drill) => drill.groupId === lesson.groupId).length;
}

export function LessonsPage({ lessons, drills }: LessonsPageProps) {
  return (
    <div className="min-h-full">
      <section className="border-b px-6 py-12 md:px-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
            Lesson path
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold md:text-5xl">
            Learn the invariant, then drill the primitive.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Lessons are the book flow. Drills stay available as the fast lane when you already know
            the idea and only want repetitions.
          </p>
        </div>
      </section>

      <section className="px-6 py-8 md:px-12">
        <div className="grid gap-4 lg:grid-cols-2">
          {lessons.map((lesson) => {
            const drillCount = countDrillsForLesson(drills, lesson);

            return (
              <Link
                className="group rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
                href={`/learn/${lesson.slug}`}
                key={lesson.slug}
              >
                <div className="flex items-start justify-between gap-4">
                  <BookOpen className="mt-1 size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    Lesson {lesson.order}
                  </span>
                </div>
                <h2 className="mt-8 text-xl font-semibold">{lesson.title}</h2>
                <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">
                  {lesson.summary}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Dumbbell className="size-4" />
                    {drillCount} related drills
                  </span>
                  <span className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-0")}>
                    Open
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
