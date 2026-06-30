import { notFound } from "next/navigation";
import { LessonDetailPage } from "@/features/lessons/components/lesson-detail-page";
import { getLessonWithContent, getLessons } from "@/features/lessons/domain/registry";

export const dynamicParams = false;

type LessonPageProps = {
  params: Promise<{
    lesson: string;
  }>;
};

export function generateStaticParams() {
  return getLessons().map((lesson) => ({
    lesson: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { lesson: slug } = await params;
  const lesson = getLessons().find((item) => item.slug === slug);

  if (!lesson) {
    return {
      title: "Lesson not found",
    };
  }

  return {
    title: `${lesson.title} | DSA Primitives`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lesson: slug } = await params;
  const lesson = await getLessonWithContent(slug);

  if (!lesson) {
    notFound();
  }

  return <LessonDetailPage lesson={lesson} />;
}
