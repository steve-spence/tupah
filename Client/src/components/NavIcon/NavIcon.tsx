// Navigation icon

import React from 'react';
import Link from 'next/link'

export function NavIcon({ data, className, onClick }: Props) {

    const { title, bg_path, link } = data;
    const hasPath = bg_path != null;


    const inner = (
        <div className={`${className} cursor-pointer flex flex-col items-center justify-center`} onClick={onClick} >
            <div className="w-12 h-12 rounded-2xl bg-no-repeat bg-center bg-contain p-3" style={{ backgroundImage: `url(${bg_path})` }} />
            <p className="mt-1 text-sm text-center">{title}</p>
        </div>
    )

    // If there's a link prop, wrap inner in a Link
    if (link) {
        return (
            <Link
                href={link}
                // prevent jump-to-top when clicking the theme toggle
                {...(onClick ? { scroll: false } : {})}
                className="no-underline text-inherit"
            >
                {inner}
            </Link>
        )
    }
    return inner
}

export interface NavIconProps {
    id: string
    title: string,
    bg_path: string,
    link?: string,
}

type Props = {
    data: NavIconProps,
    className?: string,
    onClick?: () => void,
};