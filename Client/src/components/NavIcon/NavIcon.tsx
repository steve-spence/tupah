// Navigation icon

import React from 'react';
import { motion } from 'motion/react'

export function NavIcon({ data, }: Props) {

    const { title, bg_path } = data;
    var hasPath = bg_path != null;

    return (
        // styling for the icon
        // might need to safelist this might cause error or something
        <div className="flex flex-col items-center justify-center w-fit h-fit">
            <div className={`w-25 h-15 rounded-2xl bg-no-repeat bg-center bg-contain p-6 
                bg-grey-800 flex justify-center items-center`}
                style={{ backgroundImage: `url(${hasPath ? bg_path : "#ff0000"})` }}>
            </div>
            <p>{title}</p>
        </div>
    );
}

export interface NavIconProps {
    id: string
    title: string,
    bg_path: string,
}

type Props = {
    data: NavIconProps
};