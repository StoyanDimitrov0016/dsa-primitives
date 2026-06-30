import Link from "next/link";
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { LessonWithContent } from "../domain/types";
import { MarkdownRenderer } from "./markdown-renderer";

type LessonDetailPageProps = {
  lesson: LessonWithContent;
};

export function LessonDetailPage({ lesson }: LessonDetailPageProps) {
  const firstDrill = lesson.drills[0];

  return (
    <div className="grid h-full min-h-0 min-w-0 overflow-hidden lg:grid-cols-[clamp(16rem,20vw,18rem)_minmax(0,1fr)]">
      <ScrollArea className="min-h-0 min-w-0 border-r bg-sidebar text-sidebar-foreground">
        <aside className="px-5 py-6">
          <Link
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/learn"
          >
            <ArrowLeft className="size-4" />
            Lessons
          </Link>

          <h2 className="text-lg font-semibold">{lesson.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Move here after the lesson, or jump straight in when the concept is already familiar.
          </p>

          {firstDrill ? (
            <Link
              className={cn(buttonVariants({ className: "mt-5 w-full justify-between" }))}
              href={`/practice/${firstDrill.groupId}/${firstDrill.id}`}
            >
              Start drill set
              <ArrowRight className="size-4" />
            </Link>
          ) : null}

          <div className="mt-6 space-y-2">
            {lesson.drills.map((drill) => (
              <Link
                className="flex h-11 items-center rounded-md border border-sidebar-border bg-background/40 px-3 text-sm transition-colors hover:bg-sidebar-accent"
                href={`/practice/${drill.groupId}/${drill.id}`}
                key={drill.id}
              >
                <span className="flex items-center gap-2 font-medium">
                  <Dumbbell className="size-4 text-muted-foreground" />
                  {drill.title}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </ScrollArea>

      <ScrollArea className="min-h-0 min-w-0">
        <article className="min-w-0 px-6 py-8 md:px-12">
          <MarkdownRenderer content={lesson.content} />
        </article>
      </ScrollArea>
    </div>
  );
}
