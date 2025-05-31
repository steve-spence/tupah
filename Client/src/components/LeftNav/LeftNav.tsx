// Navigation icon

import React from 'react';
import { NavIcon } from '@/components/NavIcon/NavIcon'

export function LeftNav({ data, className }: Props) {

    // const { title, bg_path } = data;
    // var hasPath = bg_path != null;
    className = className == null ? "" : className;

    return (
        <div className={`${className} h-full flex flex-col justify-between items-center fixed`}>
            <div>
                <NavIcon data={{ id: "nav_home", title: "Home", bg_path: "/blog_icon.svg", link: "/" }} />
                <NavIcon data={{ id: "nav_about", title: "About me", bg_path: "/blog_icon.svg", link: "/about" }} />
                <NavIcon data={{ id: "nav_blog", title: "Blog", bg_path: "/blog_icon.svg", link: "/blog" }} />
            </div>
            <NavIcon data={{ id: "nav_settings", title: "Settings", bg_path: "/settings_icon.svg", link: "/settings" }} />
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