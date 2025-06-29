import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Header({ data, className }: Props) {
    const { title, subtext } = data;

    return (
        <div className={`${className}`}>
            <div className="hidden relative sm:flex sm:w-24 sm:h-24">
                <Link href="/">
                    <Image src="/pictures/owl_logo.png" fill alt="Logo" />
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-gray-800 dark:text-white font-extrabold mb-6 tracking-wide text-5xl">{title}</h1>
                <h4 className="text-gray-400 dark:text-gray-300 italic">{subtext}</h4>
            </div>
            <div className="hidden sm:flex flex-row text-gray-800 dark:text-white gap-5 items-center justify-center p-10 font-semibold">
                <Link href="/about">About</Link>
                <Link href="/blog">Blogs</Link>
            </div>
        </div>
    )

}

interface HeaderProps {
    title: string,
    subtext: string,
};

type Props = {
    data: HeaderProps,
    className?: string,
};