import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Header({ data, className }: Props) {
  const { title, subtext } = data;

  return (
    <div className={`flex w-full gap-4 px-10 ${className}`}>
      {/* Logo - Left side */}
      <div className="absolute hidden sm:flex justify-start">
        <Link className="relative w-24 h-24" href="/">
          <Image src="/pictures/owl_logo.png" fill alt="Logo" />
        </Link>
      </div>

      {/* Title */}
      <div className="flex grow-1 flex-col items-center justify-center">
        <h1 className="text-gray-800 dark:text-white font-extrabold mb-6 tracking-wide text-4xl sm:text-5xl text-center whitespace-nowrap">
          {title}
        </h1>
        <h4 className="text-gray-400 dark:text-gray-300 italic text-center">
          {subtext}
        </h4>
      </div>

      {/* Navigation Links - Right side */}
      <div className="absolute hidden sm:flex flex-row text-gray-800 dark:text-white gap-5 items-center justify-end font-semibold">
        <div id="tmp"></div>
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
