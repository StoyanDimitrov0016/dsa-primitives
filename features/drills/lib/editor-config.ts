import type { BeforeMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { MONACO_DARK_THEME_ID, MONACO_LANGUAGE_ID, MONACO_LIGHT_THEME_ID } from "../constants";

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  bracketPairColorization: { enabled: false },
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
  guides: {
    bracketPairs: false,
    bracketPairsHorizontal: false,
    highlightActiveBracketPair: false,
    indentation: false,
  },
  lineHeight: 24,
  minimap: { enabled: false },
  padding: { top: 16, bottom: 16 },
  renderLineHighlight: "all",
  scrollBeyondLastLine: false,
  "semanticHighlighting.enabled": true,
  tabSize: 2,
  wordWrap: "on",
  acceptSuggestionOnEnter: "off",
  quickSuggestions: false,
  suggestOnTriggerCharacters: false,
  wordBasedSuggestions: "off",
};

export const defineEditorTheme: BeforeMount = (monaco) => {
  const languageIds = monaco.languages
    .getLanguages()
    .map((language: { id: string }) => language.id);

  if (!languageIds.includes(MONACO_LANGUAGE_ID)) {
    monaco.languages.register({ id: MONACO_LANGUAGE_ID });
  }

  monaco.languages.setMonarchTokensProvider(MONACO_LANGUAGE_ID, {
    defaultToken: "identifier",
    tokenPostfix: ".js",
    keywords: [
      "break",
      "case",
      "catch",
      "continue",
      "default",
      "do",
      "else",
      "finally",
      "for",
      "function",
      "if",
      "new",
      "switch",
      "throw",
      "try",
      "while",
    ],
    declarations: ["const", "let", "var"],
    returns: ["return"],
    globals: ["Array", "JSON", "Map", "Math", "Object", "Set"],
    operators: [
      "<=",
      ">=",
      "===",
      "!==",
      "==",
      "!=",
      "=>",
      "+",
      "-",
      "*",
      "/",
      "%",
      "=",
      "<",
      ">",
      "!",
      "&&",
      "||",
    ],
    tokenizer: {
      root: [
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@stringDouble"],
        [/'/, "string", "@stringSingle"],
        [/\.\s*([A-Za-z_$][\w$]*)/, "property"],
        [/[A-Za-z_$][\w$]*(?=\s*\()/, "function"],
        [
          /[A-Za-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "controlKeyword",
              "@declarations": "declarationKeyword",
              "@returns": "returnKeyword",
              "@globals": "global",
              "@default": "identifier",
            },
          },
        ],
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number"],
        [/\d+/, "number"],
        [/[{}()[\]]/, "delimiter.bracket"],
        [/[;,.]/, "delimiter"],
        [
          /[<>=!+\-*/%&|]+/,
          {
            cases: {
              "@operators": "keyword.operator",
              "@default": "delimiter",
            },
          },
        ],
        [/\s+/, "white"],
      ],
      comment: [
        [/[^/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[/*]/, "comment"],
      ],
      stringDouble: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],
      stringSingle: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  monaco.editor.defineTheme(MONACO_LIGHT_THEME_ID, {
    base: "vs",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "0067b8" },
      { token: "keyword.control", foreground: "9b1d9a" },
      { token: "keyword.operator", foreground: "007c8a" },
      { token: "identifier", foreground: "1f2328" },
      { token: "identifier.function", foreground: "8a6d00", fontStyle: "bold" },
      { token: "type.identifier", foreground: "00796b" },
      { token: "delimiter", foreground: "57606a" },
      { token: "delimiter.bracket", foreground: "9b1d9a" },
      { token: "number", foreground: "116329" },
      { token: "string", foreground: "a43d00" },
      { token: "comment", foreground: "6e7781", fontStyle: "italic" },
      { token: "controlKeyword", foreground: "9b1d9a" },
      { token: "declarationKeyword", foreground: "0067b8" },
      { token: "returnKeyword", foreground: "9b1d9a" },
      { token: "function", foreground: "8a6d00", fontStyle: "bold" },
      { token: "global", foreground: "00796b" },
      { token: "property", foreground: "0550ae" },
    ],
    colors: {
      "editor.background": "#fbfbfb",
      "editor.foreground": "#1f2328",
      "editor.lineHighlightBackground": "#eef2f7",
      "editorLineNumber.foreground": "#8c959f",
      "editorLineNumber.activeForeground": "#24292f",
      "editorCursor.foreground": "#5f3dc4",
      "editor.selectionBackground": "#b6d7ff",
      "editor.inactiveSelectionBackground": "#d8e8ff",
      "editorBracketHighlight.foreground1": "#9b1d9a",
      "editorBracketHighlight.foreground2": "#0969da",
      "editorBracketHighlight.foreground3": "#116329",
    },
  });

  monaco.editor.defineTheme(MONACO_DARK_THEME_ID, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "4aa5ff" },
      { token: "keyword.control", foreground: "ff7ad9" },
      { token: "keyword.operator", foreground: "89ddff" },
      { token: "identifier", foreground: "f8f8f2" },
      { token: "identifier.function", foreground: "ffe066", fontStyle: "bold" },
      { token: "type.identifier", foreground: "4ec9b0" },
      { token: "delimiter", foreground: "d4d4d4" },
      { token: "delimiter.bracket", foreground: "ffd866" },
      { token: "number", foreground: "b5cea8" },
      { token: "string", foreground: "ce9178" },
      { token: "comment", foreground: "6a9955", fontStyle: "italic" },
      { token: "regexp", foreground: "d16969" },
      { token: "controlKeyword", foreground: "ff7ad9" },
      { token: "declarationKeyword", foreground: "4aa5ff" },
      { token: "returnKeyword", foreground: "ff7ad9" },
      { token: "function", foreground: "ffe066", fontStyle: "bold" },
      { token: "global", foreground: "4ec9b0" },
      { token: "property", foreground: "9cdcfe" },
    ],
    colors: {
      "editor.background": "#171717",
      "editor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#202020",
      "editorLineNumber.foreground": "#858f9f",
      "editorLineNumber.activeForeground": "#f8f8f2",
      "editorCursor.foreground": "#ffd866",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#3a3d41",
      "editorIndentGuide.background1": "#171717",
      "editorIndentGuide.activeBackground1": "#171717",
      "editorBracketHighlight.foreground1": "#ffd866",
      "editorBracketHighlight.foreground2": "#ff7ad9",
      "editorBracketHighlight.foreground3": "#4aa5ff",
    },
  });
};
