'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            return localStorage.getItem("theme") || "system";
        }
        return "system";
    });

    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onWindowMatch = () => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    }

    useEffect(() => {
        onWindowMatch();
    }, [])

    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme", "light");
                break;
            default:
                localStorage.removeItem("theme");
                onWindowMatch();
                break;

        }
    }, [theme]);

    useEffect(() => {
        const changeHandler = (e: MediaQueryListEvent) => {
            if (!("theme" in localStorage)) {
                if (e.matches) {
                    element.classList.add("dark");
                } else {
                    element.classList.remove("dark");
                }
            }
        }

        darkQuery.addEventListener("change", changeHandler);

        return () => {
            darkQuery.removeEventListener("change", changeHandler);
        };
    }, []);

    return { theme, setTheme }
}