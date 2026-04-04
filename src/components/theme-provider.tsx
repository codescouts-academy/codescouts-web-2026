"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultTheme, setDefaultTheme] = React.useState<"system" | "dark">("dark");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    setDefaultTheme(
      typeof window.matchMedia === "function" ? "system" : "dark",
    );
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
