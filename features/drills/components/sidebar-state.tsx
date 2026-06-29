"use client";

import { createContext, useContext, useState } from "react";

type SidebarOpenGroups = Record<string, boolean>;

type DrillSidebarStateContextValue = {
  openGroups: SidebarOpenGroups;
  setGroupOpen: (groupId: string, open: boolean) => void;
};

const DrillSidebarStateContext = createContext<DrillSidebarStateContextValue | null>(null);

type DrillSidebarStateProviderProps = {
  children: React.ReactNode;
};

export function DrillSidebarStateProvider({ children }: DrillSidebarStateProviderProps) {
  const [openGroups, setOpenGroups] = useState<SidebarOpenGroups>({});

  function setGroupOpen(groupId: string, open: boolean) {
    setOpenGroups((current) => ({ ...current, [groupId]: open }));
  }

  return (
    <DrillSidebarStateContext.Provider value={{ openGroups, setGroupOpen }}>
      {children}
    </DrillSidebarStateContext.Provider>
  );
}

export function useDrillSidebarState() {
  return useContext(DrillSidebarStateContext);
}
