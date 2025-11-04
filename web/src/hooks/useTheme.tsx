"use client";

import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "system";

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const useIsoEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

  useIsoEffect(() => {
    if (typeof window === "undefined") return;

    const el = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (t: Theme) => {
      if (t === "dark") {
        el.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (t === "light") {
        el.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        // system: follow OS, do not persist a fixed value
        localStorage.removeItem("theme");
        if (darkQuery.matches) el.classList.add("dark");
        else el.classList.remove("dark");
      }
    };

    apply(theme);

    // If user chose 'system', react to OS changes live
    const onChange = () => theme === "system" && apply("system");
    darkQuery.addEventListener?.("change", onChange);
    return () => darkQuery.removeEventListener?.("change", onChange);
  }, [theme]);

  return { theme, setTheme };
}
