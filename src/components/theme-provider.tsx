"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// One theme source for the site and the /componentes demos; "theme" in localStorage, System by default.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" storageKey="theme" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
