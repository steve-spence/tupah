// Navigation icon

import React from 'react';
import { NavIcon } from '@/components/NavIcon/NavIcon'

export function LeftNav({ data, className }: Props) {

    // const { title, bg_path } = data;
    // var hasPath = bg_path != null;
    className = className == null ? "" : className;

    return (
        <div className={`${className} h-screen flex flex-col justify-between items-center fixed`}>
            <div>
                <NavIcon data={{ title: "home", bg_path: "/blog_icon.svg" }} />
                <NavIcon data={{ title: "about me", bg_path: "/blog_icon.svg" }} />
                <NavIcon data={{ title: "blog", bg_path: "/blog_icon.svg" }} />
            </div>
            <NavIcon data={{ title: "settings", bg_path: "/settings_icon.svg" }} />
        </div>
    )
}

interface LeftNavProps {
    title: string,
    bg_path: string,
}

type Props = {
    data?: LeftNavProps,
    className?: string
};