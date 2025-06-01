import React from 'react'

export function Header({ data, }: Props) {
    const { title, subtext } = data;

    return (
        <div className="flex justify-between bg-[#272727] p-5 h-32">
            <img src="/owl_logo.png" className="h-full min-h-22" alt="Logo"></img>
            <div className="flex flex-col items-center">
                <h1 className="text-white font-extrabold mb-6 tracking-wide text-5xl">{title}</h1>
                <h4 className="text-gray-300 italic">{subtext}</h4>
            </div>
            <div className="flex flex-row text-white gap-5 items-center justify-center p-10 font-semibold">
                <a href="/about">About</a>
                <a href="/blog">Blogs</a>
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
};