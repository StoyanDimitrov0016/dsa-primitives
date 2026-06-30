"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { MONACO_LANGUAGE_ID } from "../constants";
import { getEditorOptions } from "../lib/editor-config";
import type { Theme } from "../domain/types";

type SolutionEditorProps = {
  code: string;
  theme: Theme;
  autoSuggestions: boolean;
  onChange: (code: string) => void;
};

const handleEditorMount: OnMount = (editorInstance) => {
  editorInstance.focus();
};

export function SolutionEditor({ autoSuggestions, code, theme, onChange }: SolutionEditorProps) {
  return (
    <div className="min-h-0 flex-1 overflow-hidden bg-[var(--editor)]">
      <Editor
        aria-label="Solution code"
        defaultLanguage={MONACO_LANGUAGE_ID}
        height="100%"
        language={MONACO_LANGUAGE_ID}
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
        options={getEditorOptions({ autoSuggestions })}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        value={code}
      />
    </div>
  );
}
