// Navigation icon
'use client'

import React from 'react';
import { useState } from 'react'
import { NavIcon } from '@/components/NavIcon/NavIcon'
import { useTheme } from '@/hooks/useTheme';

// Dark mode button
import "@theme-toggles/react/css/InnerMoon.css"
import { InnerMoon } from "@theme-toggles/react"

import { Classic } from "@theme-toggles/react"

export function LeftNav({ data, className, onNavigate }: Props) {
    className = className == null ? "" : className;

    // Dark mode support
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    const isDark = theme === 'dark';

    return (
        <div className={`${className} flex flex-col justify-between items-center`}>
            <div className="flex flex-col items-center justify-center gap-5">
                <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/icons/home.svg", link: "/" }}
                    className="text-[#000000] font-bold" onClick={onNavigate} />
                <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/icons/about_me.svg", link: "/about" }}
                    onClick={onNavigate} className="text-[#000000] font-bold whitespace-nowrap" />
                <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/icons/blog.svg", link: "/blog" }}
                    className="text-[#000000] font-bold" onClick={onNavigate} />
            </div>

            {/* Real Dark Mode button */}
            <InnerMoon className="transition-colors duration-200 text-6xl dark:text-[#131313] text-white" onToggle={(next) => setTheme(next ? 'dark' : 'light')} toggled={isDark} duration={750}
                placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} />
        </div>
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