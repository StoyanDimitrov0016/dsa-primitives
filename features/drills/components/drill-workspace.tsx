"use client";

import { useEffect, useState } from "react";
import { Code2, Play, RotateCcw } from "lucide-react";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DEFAULT_OPEN_GROUP_IDS, THEME_STORAGE_KEY } from "../constants";
import { runInWorker } from "../lib/runner";
import type { Drill, DrillGroup, RunState, Theme } from "../types";
import { AppHeader } from "./app-header";
import { ConsolePanel } from "./console-panel";
import { DrillHeader } from "./drill-header";
import { IconButton } from "./icon-button";
import { PrimitiveSidebar } from "./primitive-sidebar";
import { SolutionEditor } from "./solution-editor";
import { VisibleTestsPanel } from "./visible-tests-panel";

type DrillWorkspaceProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
};

export function DrillWorkspace({ drillGroups, drills, selectedDrill }: DrillWorkspaceProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    ...Object.fromEntries(DEFAULT_OPEN_GROUP_IDS.map((groupId) => [groupId, true])),
    [selectedDrill.groupId]: true,
  });
  const [solutions, setSolutions] = useState<Record<string, string>>(() =>
    Object.fromEntries(drills.map((drill) => [drill.id, drill.starterCode]))
  );
  const [runState, setRunState] = useState<RunState>({ status: "idle" });

  const code = solutions[selectedDrill.id] ?? selectedDrill.starterCode;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
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
                <DrillHeader drill={selectedDrill} />
                <div className="flex shrink-0 flex-col border-b">
                  <div className="flex h-11 items-center justify-between px-3">
                    <div className="text-sm font-medium">Solution</div>
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
                <SolutionEditor code={code} onChange={updateCode} theme={theme} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={28} minSize={18}>
              <ConsolePanel runState={runState} theme={theme} />
            </ResizablePanel>
          </ResizablePanelGroup>

          <VisibleTestsPanel drill={selectedDrill} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
