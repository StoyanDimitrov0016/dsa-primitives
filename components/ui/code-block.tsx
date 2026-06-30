"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  className?: string;
  language?: string;
};

export function CodeBlock({ code, className, language = "javascript" }: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighted = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      });

      if (!cancelled) {
        setHtml(highlighted);
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) {
    return (
      <pre
        className={cn(
          "max-h-[calc(100dvh-15rem)] max-w-full min-w-0 overflow-auto rounded-lg border bg-[#24292e] p-3 text-xs leading-5",
          className
        )}
      >
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={cn(
        "code-block max-h-[calc(100dvh-15rem)] max-w-full min-w-0 overflow-auto rounded-lg border bg-[#24292e] text-xs leading-5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
