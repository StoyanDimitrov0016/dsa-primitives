"use client";

import { useEffect, useState } from "react";
import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import Link from "next/link";
import type { editor } from "monaco-editor";
import {
  Braces,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileCode2,
  Moon,
  Play,
  RotateCcw,
  Sun,
  Terminal,
  XCircle,
} from "lucide-react";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Drill, DrillCase, DrillGroup } from "./drills";

type RunResult = {
  name: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  error?: string;
  kind?: "visible" | "hidden";
};

type RunState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "passed"; results: RunResult[]; durationMs: number }
  | { status: "failed"; results: RunResult[]; durationMs: number }
  | { status: "error"; message: string; durationMs?: number };

type Theme = "light" | "dark";

type IconButtonProps = React.ComponentProps<typeof Button> & {
  label: string;
};

type PrimitiveSidebarProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
  openGroups: Record<string, boolean>;
  onGroupOpenChange: (id: string, open: boolean) => void;
};

type AppHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

type ConsolePanelProps = {
  runState: RunState;
  theme: Theme;
};

type DrillHeaderProps = {
  drill: Drill;
  runState: RunState;
};

type DrillWorkspaceProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
};

const RUN_TIMEOUT_MS = 1200;

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
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

function formatValue(value: unknown) {
  if (typeof value === "undefined") {
    return "undefined";
  }

  return JSON.stringify(value);
}

function runInWorker(
  drill: Drill,
  code: string,
  cases: Array<DrillCase & { kind: "visible" | "hidden" }>
): Promise<RunState> {
  const startedAt = performance.now();
  const worker = new Worker("/drill-runner.worker.js");

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => {
      worker.terminate();
      resolve({
        status: "error",
        message: `Timed out after ${RUN_TIMEOUT_MS}ms. Check for an infinite loop or an unexpectedly slow implementation.`,
        durationMs: Math.round(performance.now() - startedAt),
      });
    }, RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent) => {
      window.clearTimeout(timeoutId);
      worker.terminate();

      const durationMs = Math.round(performance.now() - startedAt);
      const payload = event.data as
        { ok: true; results: RunResult[] } | { ok: false; error: string };

      if (!payload.ok) {
        resolve({ status: "error", message: payload.error, durationMs });
        return;
      }

      const passed = payload.results.every((result) => result.passed);
      resolve({
        status: passed ? "passed" : "failed",
        results: payload.results,
        durationMs,
      });
    };

    worker.onerror = (error) => {
      window.clearTimeout(timeoutId);
      worker.terminate();
      resolve({
        status: "error",
        message: error.message,
        durationMs: Math.round(performance.now() - startedAt),
      });
    };

    worker.postMessage({
      code,
      functionName: drill.functionName,
      cases,
    });
  });
}

const defineEditorTheme: BeforeMount = (monaco) => {
  const languageIds = monaco.languages
    .getLanguages()
    .map((language: { id: string }) => language.id);

  if (!languageIds.includes("primitive-javascript")) {
    monaco.languages.register({ id: "primitive-javascript" });
  }

  monaco.languages.setMonarchTokensProvider("primitive-javascript", {
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

  monaco.editor.defineTheme("primitive-light", {
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

  monaco.editor.defineTheme("primitive-dark", {
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

function getStatusLabel(runState: RunState) {
  if (runState.status === "passed") {
    return "Passed";
  }
  if (runState.status === "failed") {
    return "Failed";
  }
  if (runState.status === "error") {
    return "Error";
  }
  if (runState.status === "running") {
    return "Running";
  }
  return "Idle";
}

function getStatusClassName(runState: RunState) {
  if (runState.status === "passed") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }
  if (runState.status === "failed" || runState.status === "error") {
    return "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300";
  }
  if (runState.status === "running") {
    return "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300";
  }
  return "border-border bg-muted text-muted-foreground";
}

function getResultTextClassName(result: RunResult, theme: Theme) {
  if (result.passed) {
    return theme === "dark" ? "text-emerald-300" : "text-emerald-700";
  }

  return theme === "dark" ? "text-red-200" : "text-red-700";
}

function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button aria-label={label} size="icon" variant="ghost" {...props}>
            {children}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PrimitiveSidebar({
  drillGroups,
  drills,
  selectedDrill,
  openGroups,
  onGroupOpenChange,
}: PrimitiveSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="LeetCode Primitives">
              <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Braces className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">LeetCode Primitives</p>
                <p className="truncate text-xs text-muted-foreground">Pattern catalog</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {drillGroups.map((group) => {
          const groupDrills = drills.filter((drill) => drill.groupId === group.id);
          const hasActiveDrill = groupDrills.some((drill) => drill.id === selectedDrill.id);

          return (
            <Collapsible
              className="group/collapsible"
              key={group.id}
              onOpenChange={(open) => onGroupOpenChange(group.id, open)}
              open={openGroups[group.id] ?? hasActiveDrill}
            >
              <SidebarGroup>
                <CollapsibleTrigger
                  render={
                    <SidebarGroupLabel className="cursor-pointer">
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto size-4 transition-transform group-data-[panel-open]/collapsible:rotate-180" />
                    </SidebarGroupLabel>
                  }
                />
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      {groupDrills.length > 0 ? (
                        groupDrills.map((drill) => (
                          <SidebarMenuSubItem key={drill.id}>
                            <SidebarMenuSubButton
                              isActive={selectedDrill.id === drill.id}
                              render={<Link href={`/practice/${drill.groupId}/${drill.id}`} />}
                            >
                              <FileCode2 className="size-4" />
                              <span>{drill.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            aria-disabled
                            render={<button disabled type="button" />}
                          >
                            <FileCode2 className="size-4" />
                            <span>Planned</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <Terminal className="size-4" />
              <span>Browser runner</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-3">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger />

        <Separator className="hidden h-6 md:block" orientation="vertical" />

        <div className="flex min-w-0 items-center gap-4">
          <span className="truncate text-sm font-semibold">LeetCode Primitives</span>
          <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Button size="sm" variant="ghost">
              Library
            </Button>
            <Button size="sm" variant="ghost">
              Practice
            </Button>
            <Button size="sm" variant="ghost">
              Review
            </Button>
          </nav>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <IconButton
          label={theme === "dark" ? "Use light theme" : "Use dark theme"}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </IconButton>
      </div>
    </header>
  );
}

function ConsolePanel({ runState, theme }: ConsolePanelProps) {
  const results =
    runState.status === "passed" || runState.status === "failed" ? runState.results : [];
  const failedResults = results.filter((result) => !result.passed);
  const passedCount = results.filter((result) => result.passed).length;

  return (
    <div
      className={cn("flex h-full flex-col bg-[var(--console)] text-[var(--console-foreground)]")}
    >
      <div className="flex h-10 items-center justify-between border-b border-[var(--console-border)] px-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Terminal className="size-4 text-muted-foreground" />
          Console
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {"durationMs" in runState && runState.durationMs ? (
            <span>{runState.durationMs}ms</span>
          ) : null}
          <Badge className={cn("h-6", getStatusClassName(runState))} variant="outline">
            {getStatusLabel(runState)}
          </Badge>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 p-3 font-mono text-xs">
          {runState.status === "idle" ? (
            <p className="text-muted-foreground">Run tests to inspect output.</p>
          ) : null}
          {runState.status === "running" ? (
            <p className="text-blue-300">Executing in a disposable worker...</p>
          ) : null}
          {runState.status === "error" ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-red-200">
              {runState.message}
            </p>
          ) : null}
          {results.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                {failedResults.length === 0 ? (
                  <CheckCircle2 className="size-4 text-emerald-400" />
                ) : (
                  <XCircle className="size-4 text-red-400" />
                )}
                <span>
                  {passedCount}/{results.length} tests passed
                </span>
              </div>
              {[...failedResults, ...results.filter((result) => result.passed)].map((result) => (
                <div
                  className={cn(
                    "rounded-md border p-3",
                    result.passed
                      ? "border-[var(--console-border)] bg-[var(--console-card)]"
                      : "border-red-500/30 bg-red-500/10"
                  )}
                  key={`${result.kind}-${result.name}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("font-semibold", getResultTextClassName(result, theme))}>
                      {result.passed ? "PASS" : "FAIL"} {result.name}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] uppercase",
                        theme === "dark" ? "bg-zinc-800 text-zinc-400" : "bg-zinc-200 text-zinc-600"
                      )}
                    >
                      {result.kind ?? "case"}
                    </span>
                  </div>
                  {!result.passed ? (
                    <div className="mt-2 space-y-1 text-muted-foreground">
                      <p>expected: {formatValue(result.expected)}</p>
                      <p>actual: {formatValue(result.actual)}</p>
                      {result.error ? <p>error: {result.error}</p> : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
}

function DrillHeader({ drill, runState }: DrillHeaderProps) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-b px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">{drill.title}</h2>
        <Badge variant="secondary">{drill.category}</Badge>
        <Badge className={getStatusClassName(runState)} variant="outline">
          {getStatusLabel(runState)}
        </Badge>
      </div>
      <div className="space-y-2">
        <p className="max-w-5xl text-sm leading-6 text-muted-foreground">{drill.prompt}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Contract</span>
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
            {drill.functionName}
          </code>
        </div>
      </div>
    </div>
  );
}

export function DrillWorkspace({ drillGroups, drills, selectedDrill }: DrillWorkspaceProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const storedTheme = window.localStorage.getItem("lp-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    arrays: true,
    searching: true,
    [selectedDrill.groupId]: true,
  });
  const [solutions, setSolutions] = useState<Record<string, string>>(() =>
    Object.fromEntries(drills.map((drill) => [drill.id, drill.starterCode]))
  );
  const [runState, setRunState] = useState<RunState>({ status: "idle" });

  const code = solutions[selectedDrill.id] ?? selectedDrill.starterCode;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("lp-theme", theme);
  }, [theme]);

  function updateCode(nextCode: string) {
    setSolutions((current) => ({
      ...current,
      [selectedDrill.id]: nextCode,
    }));
    setRunState({ status: "idle" });
  }

  async function runTests() {
    setRunState({ status: "running" });
    const cases = [
      ...selectedDrill.visibleCases.map((testCase) => ({
        ...testCase,
        kind: "visible" as const,
      })),
      ...selectedDrill.hiddenCases.map((testCase) => ({
        ...testCase,
        kind: "hidden" as const,
      })),
    ];
    setRunState(await runInWorker(selectedDrill, code, cases));
  }

  function resetCode() {
    setSolutions((current) => ({
      ...current,
      [selectedDrill.id]: selectedDrill.starterCode,
    }));
    setRunState({ status: "idle" });
  }

  async function formatCode() {
    try {
      const formatted = await prettier.format(code, {
        parser: "babel",
        plugins: [babelPlugin, estreePlugin],
        semi: true,
        singleQuote: false,
        tabWidth: 2,
      });

      updateCode(formatted.trimEnd());
    } catch (error) {
      setRunState({
        status: "error",
        message:
          error instanceof Error ? `Formatting failed: ${error.message}` : "Formatting failed.",
      });
    }
  }

  const handleEditorMount: OnMount = (editorInstance) => {
    editorInstance.focus();
  };

  function updateGroupOpen(groupId: string, open: boolean) {
    setOpenGroups((current) => ({ ...current, [groupId]: open }));
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <SidebarProvider className="h-screen min-h-0 overflow-hidden">
      <PrimitiveSidebar
        drillGroups={drillGroups}
        drills={drills}
        onGroupOpenChange={updateGroupOpen}
        openGroups={openGroups}
        selectedDrill={selectedDrill}
      />

      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader onToggleTheme={toggleTheme} theme={theme} />

        <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px]">
          <ResizablePanelGroup className="min-h-0" orientation="vertical">
            <ResizablePanel defaultSize={72} minSize={42}>
              <div className="flex h-full min-h-0 flex-col">
                <DrillHeader drill={selectedDrill} runState={runState} />
                <div className="flex shrink-0 flex-col border-b">
                  <div className="flex h-11 items-center justify-between px-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Code2 className="size-4 text-muted-foreground" />
                      Solution
                    </div>
                    <div className="flex items-center gap-1">
                      <IconButton label="Format solution" onClick={formatCode}>
                        <Code2 className="size-4" />
                      </IconButton>
                      <IconButton label="Reset solution" onClick={resetCode}>
                        <RotateCcw className="size-4" />
                      </IconButton>
                      <Button
                        className="gap-2"
                        disabled={runState.status === "running"}
                        onClick={runTests}
                        size="sm"
                      >
                        <Play className="size-4" />
                        {runState.status === "running" ? "Running" : "Run"}
                      </Button>
                    </div>
                  </div>
                </div>
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
                    onChange={(value) => updateCode(value ?? "")}
                    onMount={handleEditorMount}
                    options={editorOptions}
                    theme={theme === "dark" ? "primitive-dark" : "primitive-light"}
                    value={code}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={28} minSize={18}>
              <ConsolePanel runState={runState} theme={theme} />
            </ResizablePanel>
          </ResizablePanelGroup>

          <aside className="hidden min-h-0 border-l xl:block">
            <ScrollArea className="h-full">
              <div className="space-y-4 p-4">
                <div>
                  <h2 className="text-sm font-semibold">Visible Tests</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    These cases are shown before you run.
                  </p>
                </div>
                {selectedDrill.visibleCases.map((testCase) => (
                  <div className="rounded-md border bg-card p-3" key={testCase.name}>
                    <p className="text-sm font-medium">{testCase.name}</p>
                    <div className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
                      <p>args: {formatValue(testCase.args)}</p>
                      <p>expected: {formatValue(testCase.expected)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
