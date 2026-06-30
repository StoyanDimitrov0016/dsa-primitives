"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { getBrowserTheme, THEME_CHANGE_EVENT } from "@/lib/theme";
import { MONACO_LANGUAGE_ID } from "../constants";
import { getEditorOptions } from "../lib/editor-config";
import type { Theme } from "../domain/types";

const previewCode = `function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    hi = mid - 1;
  }

  return -1;
}`;

export function HomeCodePreview() {
  const [theme, setTheme] = useState<Theme>(getBrowserTheme);

  useEffect(() => {
    function handleThemeChange(event: Event) {
      setTheme((event as CustomEvent<Theme>).detail);
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border bg-[var(--editor)] shadow-2xl">
      <div className="flex h-10 items-center justify-between border-b px-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-yellow-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
          binary-search.js
        </div>
        <div className="w-16" />
      </div>
      <Editor
        height="calc(100% - 2.5rem)"
        language={MONACO_LANGUAGE_ID}
        options={{
          ...getEditorOptions({ autoSuggestions: false }),
          contextmenu: false,
          cursorBlinking: "solid",
          domReadOnly: true,
          folding: false,
          glyphMargin: false,
          hover: { enabled: false },
          links: false,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          occurrencesHighlight: "off",
          overviewRulerLanes: 0,
          readOnly: true,
          renderLineHighlight: "none",
          renderValidationDecorations: "off",
          selectionHighlight: false,
          scrollbar: {
            horizontal: "hidden",
            vertical: "hidden",
          },
          suggest: { showWords: false },
          wordWrap: "off",
        }}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        value={previewCode}
      />
    </div>
  );
}
