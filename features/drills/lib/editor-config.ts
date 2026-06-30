import type { editor } from "monaco-editor";

type EditorOptionsInput = {
  autoSuggestions: boolean;
};

export function getEditorOptions({
  autoSuggestions,
}: EditorOptionsInput): editor.IStandaloneEditorConstructionOptions {
  return {
    automaticLayout: true,
    contextmenu: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    detectIndentation: false,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontLigatures: false,
    fontSize: 14,
    formatOnPaste: false,
    formatOnType: false,
    folding: true,
    lineHeight: 24,
    minimap: { enabled: false },
    padding: { top: 16, bottom: 16 },
    renderLineHighlight: "line",
    scrollBeyondLastLine: false,
    tabSize: 2,
    wordWrap: "on",
    acceptSuggestionOnEnter: autoSuggestions ? "on" : "off",
    quickSuggestions: autoSuggestions,
    suggestOnTriggerCharacters: autoSuggestions,
    wordBasedSuggestions: autoSuggestions ? "matchingDocuments" : "off",
  };
}
