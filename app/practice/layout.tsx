import { DrillSidebarStateProvider } from "@/features/drills/components/sidebar-state";

type PracticeLayoutProps = {
  children: React.ReactNode;
};

export default function PracticeLayout({ children }: PracticeLayoutProps) {
  return <DrillSidebarStateProvider>{children}</DrillSidebarStateProvider>;
}
