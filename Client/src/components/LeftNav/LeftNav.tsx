// Navigation icon

import React from 'react';
import { NavIcon } from '@/components/NavIcon/NavIcon'

export function LeftNav({ data, className, onNavigate }: Props) {
    className = className == null ? "" : className;

    return (
        <div className={`${className} h-full flex flex-col justify-between items-center fixed z-100`}>
            <div className="flex flex-col items-center">
                <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/blog_icon.svg", link: "/" }} onClick={onNavigate} />
                <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/blog_icon.svg", link: "/about" }} onClick={onNavigate} />
                <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/blog_icon.svg", link: "/blog" }} onClick={onNavigate} />
            </div>
            <NavIcon data={{ id: "nav_settings", title: "Settings", bg_path: "/settings_icon.svg", link: "/settings" }} onClick={onNavigate} />
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