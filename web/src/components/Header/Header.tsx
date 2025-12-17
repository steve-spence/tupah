"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Header({ data }: { data: { title: string, subtext: string, showLinks?: boolean, skinny?: boolean } }) {
  const { title, subtext, showLinks = true, skinny = false } = data;
  const { user } = useAuth();

  return (
    <div className={`flex items-center justify-between w-full px-10 bg-[#ffffff] shadow-sm dark:bg-[#1c1c1c] h-fit p-3 z-10`}>
      {/* Logo - Left side */}
      <div className="absolute left-10 hidden sm:flex items-center">
        <Link className={`relative ${skinny ? 'w-12 h-12' : 'w-20 h-20'}`} href="/">
          <Image src="/pictures/owl_logo.png" fill alt="Logo" />
        </Link>
      </div>
      {/* Left spacer to balance the layout */}
      <div className="hidden sm:flex w-24" />

      {/* Title*/}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className={`text-black dark:text-white font-extrabold mb-2 tracking-wide text-2xl sm:text-${skinny ? 3 : 5}xl text-center whitespace-nowrap`}>
          {!skinny ? title : subtext}
        </h1>
        {!skinny ? (
          <h4 className="text-gray-600 dark:text-gray-300 italic text-center">
            {subtext}
          </h4>
        ) : <div />}

      </div>

      {/* Links - Right side */}
      {showLinks && (
        <div className="absolute flex right-10 text-gray-800 dark:text-white gap-5 items-center font-semibold">
          <Link href="/about" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link href="/blog" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            Blogs
          </Link>
          {user ? (
            <Link href="/kitchen" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
              Account
            </Link>
          ) : (
            <Link href="/login" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      )}
      {/* Right spacer to balance the layout */}
      <div className="hidden sm:flex w-24" />
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
