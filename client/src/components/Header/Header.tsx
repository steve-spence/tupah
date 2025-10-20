import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Header({ data, className }: Props) {
  const { title, subtext } = data;

  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center w-full gap-4 px-10 ${className}`}
    >
      {/* Logo - Left side */}
      <div className="hidden sm:flex justify-start">
        <div className="relative w-24 h-24">
          <Link href="/">
            <Image src="/pictures/owl_logo.png" fill alt="Logo" />
          </Link>
        </div>
      </div>

      {/* Title - Always centered */}
      <div className="flex flex-col items-center col-span-3 sm:col-span-1 min-w-0">
        <h1 className="text-gray-800 dark:text-white font-extrabold mb-6 tracking-wide text-4xl sm:text-5xl text-center whitespace-nowrap">
          {title}
        </h1>
        <h4 className="text-gray-400 dark:text-gray-300 italic text-center">
          {subtext}
        </h4>
      </div>

      {/* Navigation Links - Right side */}
      <div className="hidden sm:flex flex-row text-gray-800 dark:text-white gap-5 items-center justify-end font-semibold">
        <Link href="/about">About</Link>
        <Link href="/blog">Blogs</Link>
      </div>
    </div>
  );
}

interface HeaderProps {
  title: string;
  subtext: string;
}

type Props = {
  data: HeaderProps;
  className?: string;
};
