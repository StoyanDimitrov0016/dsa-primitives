"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { MONACO_DARK_THEME_ID, MONACO_LANGUAGE_ID, MONACO_LIGHT_THEME_ID } from "../constants";
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
        options={editorOptions}
        theme={theme === "dark" ? MONACO_DARK_THEME_ID : MONACO_LIGHT_THEME_ID}
        value={code}
      />
    </div>
  );
}
