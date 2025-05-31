
import React, { useEffect, useState } from "react";
import { NavIcon, NavIconProps } from "@/components/NavIcon/NavIcon"
import { MotionConfig } from "motion/react";
import { motion } from 'motion/react'

export function RotatingIcons({ data, className }: Props) {

    const [icons, setIcons] = useState<NavIconProps[]>(data.icons);

    // Set up the timer for when the start the transition
    useEffect(() => {
        const interval = setInterval(() => {
            setIcons((prevIcons) => {
                const [first, ...rest] = prevIcons; // spread operator so we extract the elements from the list so its not [[x,x], x] its [x, x, x]
                console.log("interval");
                return [...rest, first];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`w-fit h-fit ${className}`} >
            <div className="flex flex-row justify-center items-center p-5 transition-all duration-300 ease-in">
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

const spring = {
    type: "spring",
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