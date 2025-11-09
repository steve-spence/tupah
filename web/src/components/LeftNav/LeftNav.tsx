// Navigation icon
'use client'

import React from 'react';
import { useState, useEffect } from 'react'
import { NavIcon } from '@/components/NavIcon/NavIcon'
import { useTheme } from '@/hooks/useTheme';
import { MoonStar, SunMoon } from 'lucide-react';

export function LeftNav({ data, className = "", onNavigate }: Props) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = theme === 'dark';
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <div className={`${className} flex flex-col justify-between items-center`}>
            <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/icons/home.svg", link: "/" }}
                className="text-[#000000] font-bold flex shrink-0" onClick={onNavigate} />
            <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/icons/about_me.svg", link: "/about" }}
                onClick={onNavigate} className="text-black font-bold whitespace-nowrap flex shrink-0" />
            <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/icons/blog.svg", link: "/blog" }}
                className="text-[#000000] font-bold flex shrink-0" onClick={onNavigate} />

            <button
                type="button"
                className="mt-auto flex w-full h-[60px] items-center justify-center"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                aria-pressed={mounted ? isDark : undefined}
                title={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}>
                {!mounted ? <span className="w-[50%] h-15" aria-hidden /> :
                    theme === 'dark' ? <SunMoon className="w-[50%] h-15 text-black" /> :
                        <MoonStar className="w-[50%] h-15" />}
            </button>
        </div >
    );
}

interface LeftNavProps {
    title: string,
    bg_path: string,
};

type Props = {
    data?: LeftNavProps,
    className?: string,
    onNavigate?: () => void,
};