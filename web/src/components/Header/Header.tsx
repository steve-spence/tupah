"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { boolean } from "drizzle-orm/gel-core";
import { useAuth } from "@/contexts/AuthContext";

export function Header({ data }: { data: { title: string, subtext: string, showLinks?: boolean } }) {
  const { title, subtext, showLinks = true } = data;
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between w-full px-10 bg-[#ffffff] shadow-sm dark:bg-[#1c1c1c] p-5 h-32 z-10">
      {/* Logo - Left side */}
      <div className="hidden sm:flex items-center">
        <Link className="relative w-24 h-24" href="/">
          <Image src="/pictures/owl_logo.png" fill alt="Logo" />
        </Link>
      </div>

      {/* Title - Center */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-black dark:text-white font-extrabold mb-2 tracking-wide text-4xl sm:text-5xl text-center whitespace-nowrap">
          {title}
        </h1>
        <h4 className="text-gray-600 dark:text-gray-300 italic text-center">
          {subtext}
        </h4>
      </div>

      {/* Links - Right side */}
      {showLinks ? (
        <div className="hidden sm:flex flex-row text-gray-800 dark:text-white gap-5 items-center font-semibold">
          <Link href="/about" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link href="/blog" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            Blogs
          </Link>
          {user ? (
            <Link href="/dashboard" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
              Account
            </Link>
          ) : (
            <Link href="/login" className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      ) : (
        <div className="hidden sm:flex w-24" />
      )}
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
