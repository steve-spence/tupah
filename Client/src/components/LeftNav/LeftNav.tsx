// Navigation icon

import React from 'react';
import { NavIcon } from '@/components/NavIcon/NavIcon'

export function LeftNav({ data, className }: Props) {

    // const { title, bg_path } = data;
    // var hasPath = bg_path != null;
    className = className == null ? "" : className;

    return (
        <div className={`${className} h-screen flex flex-col justify-between items-center 
        fixed transition-all duration-300`}>
            <div>
                <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/blog_icon.svg" }} />
                <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/blog_icon.svg" }} />
                <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/blog_icon.svg" }} />
            </div>
            <NavIcon data={{ id: "nav_settings", title: "Settings", bg_path: "/settings_icon.svg" }} />
        </div>
    );
}

interface LeftNavProps {
    title: string,
    bg_path: string,
};

type Props = {
    data?: LeftNavProps,
    className?: string
};