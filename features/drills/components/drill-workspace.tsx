"use client";

import { useEffect, useState } from "react";
import { Code2, Play, RotateCcw, TextCursorInput } from "lucide-react";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { getBrowserTheme, THEME_CHANGE_EVENT } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { runInWorker } from "../lib/runner";
import type { Drill, DrillGroup, RunState, Theme } from "../domain/types";
import { ConsolePanel } from "./console-panel";
import { DrillHintsContent, DrillHintsPanel } from "./drill-hints-panel";
import { DrillHeader } from "./drill-header";
import { IconButton } from "./icon-button";
import { PrimitiveMobileNavigation, PrimitiveSidebar } from "./primitive-sidebar";
import { useDrillSidebarState } from "./sidebar-state";
import { SolutionEditor } from "./solution-editor";

type DrillWorkspaceProps = {
  drillGroups: DrillGroup[];
  drills: Drill[];
  selectedDrill: Drill;
};

export function DrillWorkspace({ drillGroups, drills, selectedDrill }: DrillWorkspaceProps) {
  const sidebarState = useDrillSidebarState();
  const [fallbackOpenGroups, setFallbackOpenGroups] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<Theme>(getBrowserTheme);
  const [solutions, setSolutions] = useState<Record<string, string>>(() =>
    Object.fromEntries(drills.map((drill) => [drill.id, drill.starterCode]))
  );
  const [runState, setRunState] = useState<RunState>({ status: "idle" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const [isMobileHintsOpen, setIsMobileHintsOpen] = useState(false);
  const [isHintsPanelOpen, setIsHintsPanelOpen] = useState(false);
  const [autoSuggestions, setAutoSuggestions] = useState(false);

  const code = solutions[selectedDrill.id] ?? selectedDrill.starterCode;
  const openGroups = sidebarState?.openGroups ?? fallbackOpenGroups;

  useEffect(() => {
    function handleThemeChange(event: Event) {
      setTheme((event as CustomEvent<Theme>).detail);
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

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
      ...selectedDrill.cases.visible.map((testCase) => ({
        ...testCase,
        kind: "visible" as const,
      })),
      ...selectedDrill.cases.hidden.map((testCase) => ({
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
    if (sidebarState) {
      sidebarState.setGroupOpen(groupId, open);
      return;
    }

    setFallbackOpenGroups((current) => ({ ...current, [groupId]: open }));
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <Sheet onOpenChange={setIsMobileNavigationOpen} open={isMobileNavigationOpen}>
        <SheetContent className="gap-0 p-0 md:hidden" side="left">
          <SheetHeader className="border-b">
            <SheetTitle>Drills</SheetTitle>
            <SheetDescription>Select a primitive to practice.</SheetDescription>
          </SheetHeader>
          <PrimitiveMobileNavigation
            drillGroups={drillGroups}
            drills={drills}
            onDrillSelect={() => setIsMobileNavigationOpen(false)}
            onGroupOpenChange={updateGroupOpen}
            openGroups={openGroups}
            selectedDrill={selectedDrill}
          />
        </SheetContent>
      </Sheet>

      <Sheet onOpenChange={setIsMobileHintsOpen} open={isMobileHintsOpen}>
        <SheetContent className="gap-0 p-0 xl:hidden" side="right">
          <SheetHeader className="border-b">
            <SheetTitle>Hints</SheetTitle>
            <SheetDescription>Use concept and implementation hints while practicing.</SheetDescription>
          </SheetHeader>
          <DrillHintsContent drill={selectedDrill} />
        </SheetContent>
      </Sheet>

      <PrimitiveSidebar
        drillGroups={drillGroups}
        drills={drills}
        isOpen={isSidebarOpen}
        onGroupOpenChange={updateGroupOpen}
        openGroups={openGroups}
        selectedDrill={selectedDrill}
      />

      <section className="min-w-0 flex-1 overflow-hidden">
        <div
          className={cn(
            "grid h-full min-h-0 overflow-hidden",
            isHintsPanelOpen && "xl:grid-cols-[minmax(0,1fr)_320px]"
          )}
        >
          <ResizablePanelGroup className="h-full min-h-0 overflow-hidden" orientation="vertical">
            <ResizablePanel className="min-h-0 overflow-hidden" defaultSize={72} minSize={42}>
              <div className="flex h-full min-h-0 flex-col overflow-hidden">
                  <DrillHeader
                    drill={selectedDrill}
                    isSidebarOpen={isSidebarOpen}
                    isHintsPanelOpen={isHintsPanelOpen}
                    onOpenMobileNavigation={() => setIsMobileNavigationOpen(true)}
                    onOpenMobileHints={() => setIsMobileHintsOpen(true)}
                    onToggleHintsPanel={() => setIsHintsPanelOpen((current) => !current)}
                    onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
                  />
                <div className="flex shrink-0 flex-col border-b">
                  <div className="flex h-11 items-center justify-between px-3">
                    <div className="text-sm font-medium">Solution</div>
                    <div className="flex items-center gap-1">
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              aria-label="Editor suggestions"
                              aria-pressed={autoSuggestions}
                              size="icon-sm"
                              variant={autoSuggestions ? "secondary" : "ghost"}
                            >
                              <TextCursorInput className="size-4" />
                            </Button>
                          }
                        />
                        <PopoverContent>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-medium">Auto-suggestions</div>
                              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                Show Monaco completions while typing. Off by default so drills stay
                                closer to recall practice.
                              </p>
                            </div>
                            <Switch
                              aria-label="Toggle editor auto-suggestions"
                              checked={autoSuggestions}
                              onCheckedChange={setAutoSuggestions}
                              size="sm"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
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
                <SolutionEditor
                  autoSuggestions={autoSuggestions}
                  code={code}
                  onChange={updateCode}
                  theme={theme}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="min-h-0 overflow-hidden" defaultSize={28} minSize={18}>
              <ConsolePanel drill={selectedDrill} runState={runState} theme={theme} />
            </ResizablePanel>
          </ResizablePanelGroup>

          {isHintsPanelOpen ? <DrillHintsPanel drill={selectedDrill} /> : null}
        </div>
      </section>
    </div>
  );
}
