

import React from 'react'
import Image from 'next/image'

interface ProjectProps {
    icon_path: string,
    subscript: string,
}

type Props = {
    project_props: ProjectProps,
    className?: string,
}

export function ProjectIcon({ project_props, className }: Props) {
    const { icon_path, subscript } = project_props;

    return (
        <div className={`${className} flex flex-col items-center justify-center select-none`}>
            {/*  */}
            <div className="relative w-15 h-15">
                <Image src={icon_path} fill alt="Icon" />
            </div>
            <p>{subscript}</p>
        </div>
    )
}