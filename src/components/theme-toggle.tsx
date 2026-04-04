"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, SunMedium } from "lucide-react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia !== "function" &&
      !theme
    ) {
      setTheme("dark");
    }
  }, [setTheme, theme]);

  const effectiveTheme = mounted ? (resolvedTheme ?? "dark") : "dark";
  const isDark = effectiveTheme === "dark";
  const Icon = isDark ? SunMedium : Moon;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground backdrop-blur-sm hover:bg-transparent hover:text-primary",
        className,
      )}
      aria-label={
        locale === "es"
          ? isDark
            ? "Cambiar a tema claro"
            : "Cambiar a tema oscuro"
          : isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
