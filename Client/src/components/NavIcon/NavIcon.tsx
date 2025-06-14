// Navigation icon

import React from 'react';
import Link from 'next/link'

export function NavIcon({ data, className, onClick }: Props) {

    const { title, bg_path, link } = data;
    const hasPath = bg_path != null;


    return (
        // styling for the icon
        // might need to safelist this might cause error or something
        <Link href={link} className="no-underline text-inherit">
            <div onClick={onClick} className={`${className} flex flex-col items-center justify-center`}>
                <div className={`w-fit h-auto rounded-2xl bg-no-repeat bg-center bg-contain p-6 
                bg-grey-800 flex justify-center items-center`}
                    style={{ backgroundImage: `url(${hasPath ? bg_path : "#ff0000"})` }}>
                </div>
                <p className="p-3">{title}</p>
            </div>
        </Link>
    );
}

export interface NavIconProps {
    id: string
    title: string,
    bg_path: string,
    link: string,
}

type Props = {
    data: NavIconProps,
    className?: string,
    onClick?: () => void,
};