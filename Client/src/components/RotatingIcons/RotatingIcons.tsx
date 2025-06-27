
import React, { useEffect, useState } from "react";
import { NavIcon, NavIconProps } from "@/components/NavIcon/NavIcon"
import { motion } from 'motion/react'
import { Transition } from 'framer-motion'


// Creates container that rotates icons horizontally
// using more than 4 elements will make it go off the page on mobile
export function RotatingIcons({ data, className }: Props) {

    const [icons, setIcons] = useState<NavIconProps[]>(data.icons);

    // Set up the timer for when the start the transition
    useEffect(() => {
        const interval = setInterval(() => {
            setIcons((prevIcons) => {
                const [first, ...rest] = prevIcons; // spread operator so we extract the elements from the list so its not [[x,x], x] its [x, x, x]
                return [...rest, first];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`w-fit h-fit ${className}`} >
            <div className="flex flex-row justify-baseline items-baseline p-5 transition-all duration-300 ease-in gap-5">
                {icons.map((icon, index) => (
                    <motion.div
                        key={icon.id}
                        layout
                        transition={spring}
                    >
                        <NavIcon key={index} data={icon} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const spring: Transition = {
    type: 'spring',
    damping: 25,
    stiffness: 300,
}

interface RotatingIconsProps {
    icons: NavIconProps[],
};

type Props = {
    data: RotatingIconsProps,
    className?: string,
};