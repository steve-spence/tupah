// Navigation icon

import React from 'react';

export function NavIcon({ data, }: Props) {

    const { title, bg_path } = data;
    var hasPath = bg_path != null;

    return (
        // styling for the icon
        // might need to safelist this might cause error or something
        <div className="text-center">
            <div className={`w-25 h-15 rounded-2xl bg-no-repeat bg-center bg-contain p-6 
                bg-grey-800 flex justify-center items-baseline`}
                style={{ backgroundImage: `url(${hasPath ? bg_path : "#000000"})` }}>
            </div>
            <p>{title}</p>
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