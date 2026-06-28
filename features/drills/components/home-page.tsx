import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Drill, DrillGroup } from "../types";
import { HomeCodePreview } from "./home-code-preview";

type HomePageProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
};

function getDrillCountForGroup(drills: Drill[], groupId: string) {
  return drills.filter((drill) => drill.groupId === groupId).length;
}

export function HomePage({ drillGroups, drills }: HomePageProps) {
  const drillsHref = "/drills";
  const activeGroupCount = drillGroups.filter(
    (group) => getDrillCountForGroup(drills, group.id) > 0
  ).length;

  return (
    <div className="min-h-[calc(100dvh-3.5rem)]">
      <section className="grid min-h-[calc(100dvh-3.5rem)] grid-cols-1 border-b lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.78fr)]">
        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:py-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
              DSA training ground
            </span>
            <div className="h-px w-16 bg-primary/40" />
          </div>

          <h1 className="max-w-3xl text-4xl leading-[1.04] font-semibold tracking-normal text-balance md:text-6xl">
            Stop thinking about the <span className="font-mono text-primary">primitives.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            Drill the building blocks until binary search, traversal, windows, pointers, and
            prefixes become reflex. Then the real problem gets your full attention.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link className={cn(buttonVariants({ size: "lg" }))} href={drillsHref}>
              Start drilling
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              href="/patterns"
            >
              Browse patterns
            </Link>
          </div>

          <p className="mt-8 font-mono text-sm text-muted-foreground">
            {activeGroupCount} active groups / {drills.length} drills
          </p>
        </div>

        <div className="hidden items-center justify-center border-l bg-muted/20 px-6 lg:flex xl:px-10">
          <div className="w-full max-w-2xl">
            <HomeCodePreview />
          </div>
        </div>
      </section>
    </div>
  );
}
