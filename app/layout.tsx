import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSA Primitives",
  description: "Drill algorithm building blocks in the browser.",
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("lp-theme");
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
