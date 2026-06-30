"use client";

import { Check, Clipboard, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Drill, DrillLessonBlock } from "../domain/types";

type DrillHintsContentProps = {
  drill: Drill;
};

type DrillHintsPanelProps = DrillHintsContentProps & {
  className?: string;
};

type LessonBlockProps = {
  block: DrillLessonBlock;
};

function LessonBlock({ block }: LessonBlockProps) {
  if (block.type === "principle") {
    return (
      <section>
        <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{block.text}</p>
      </section>
    );
  }

  if (block.type === "steps") {
    return (
      <section>
        <h3 className="text-sm font-medium text-foreground">{block.title}</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    );
  }

  return <p className="text-sm leading-6 text-muted-foreground">{block.text}</p>;
}

function ConceptHints({ drill }: DrillHintsContentProps) {
  return (
    <div className="space-y-5">
      {drill.lesson.map((block, index) => (
        <LessonBlock block={block} key={index} />
      ))}
    </div>
  );
}

function ImplementationHints({ drill }: DrillHintsContentProps) {
  const [copied, setCopied] = useState(false);

  async function copyImplementation() {
    try {
      await navigator.clipboard.writeText(drill.implementation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">Implementation</h3>
        <Button className="gap-1.5" onClick={copyImplementation} size="xs" variant="outline">
          {copied ? <Check className="size-3" /> : <Clipboard className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <CodeBlock className="mt-2" code={drill.implementation} />
    </section>
  );
}

export function DrillHintsContent({ drill }: DrillHintsContentProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">{drill.title}</h2>
        </div>
      </div>

      <Tabs className="min-h-0 flex-1 gap-0" defaultValue="concept">
        <div className="border-b p-3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="min-h-0" value="concept">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ConceptHints drill={drill} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent className="min-h-0" value="implementation">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ImplementationHints drill={drill} />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function DrillHintsPanel({ className, drill }: DrillHintsPanelProps) {
  return (
    <aside className={cn("hidden min-h-0 border-l xl:block", className)}>
      <DrillHintsContent drill={drill} />
    </aside>
  );
}
