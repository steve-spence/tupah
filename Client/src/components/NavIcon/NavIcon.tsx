// Navigation icon

import React from 'react';

export function NavIcon({ data, }: Props) {

    const { title, bg_path } = data;

    return (
        // styling for the icon
        // might need to safelist this might cause error or something
        <div className={`bg-${bg_path}`}>
            {title}, {bg_path}
        </div>
    )
}

interface NavIconProps {
    title: string,
    bg_path: string,
}

type Props = {
    data: NavIconProps
};