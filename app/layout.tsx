import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSA Primitives",
  description: "Drill algorithm building blocks in the browser.",
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full font-sans antialiased" suppressHydrationWarning>
      <body className="h-full overflow-hidden flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <TooltipProvider>
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto bg-background text-foreground">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
