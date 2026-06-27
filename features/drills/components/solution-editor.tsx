"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { defineEditorTheme, editorOptions } from "../lib/editor-config";
import type { Theme } from "../types";

type SolutionEditorProps = {
  code: string;
  theme: Theme;
  onChange: (code: string) => void;
};

const handleEditorMount: OnMount = (editorInstance) => {
  editorInstance.focus();
};

export function SolutionEditor({ code, theme, onChange }: SolutionEditorProps) {
  return (
    <div className="min-h-0 flex-1 bg-[var(--editor)]">
      <Editor
        aria-label="Solution code"
        beforeMount={defineEditorTheme}
        defaultLanguage="primitive-javascript"
        height="100%"
        language="primitive-javascript"
        loading={
          <div
            className={cn(
              "flex h-full items-center justify-center bg-[var(--editor)] text-sm",
              theme === "dark" ? "text-zinc-400" : "text-muted-foreground"
            )}
          >
            Loading editor...
          </div>
        }
        onChange={(value) => onChange(value ?? "")}
        onMount={handleEditorMount}
        options={editorOptions}
        theme={theme === "dark" ? "primitive-dark" : "primitive-light"}
        value={code}
      />
    </div>
  );
}
