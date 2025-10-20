"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // system
      localStorage.removeItem("theme");
      if (darkQuery.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }, [theme]);

  return { theme, setTheme };
}
