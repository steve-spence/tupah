// Navigation icon

import React from 'react';
import { NavIcon } from '@/components/NavIcon/NavIcon'

export function LeftNav({ data, className, onNavigate }: Props) {
    className = className == null ? "" : className;

    return (
        <div className={`${className} h-full flex flex-col justify-between items-center fixed z-100 py-5`}>
            <div className="flex flex-col items-center justify-center">
                <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/icons/home.svg", link: "/" }} onClick={onNavigate} />
                <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/icons/about_me.svg", link: "/about" }} onClick={onNavigate} className="whitespace-nowrap" />
                <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/icons/quill.svg", link: "/blog" }} onClick={onNavigate} />
            </div>
            {/* This might have to be a different component for it to do dark mode */}
            <NavIcon data={{ id: "nav_settings", title: "Mode", bg_path: "/icons/theme.svg", link: "" }} onClick={onNavigate} />
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