// Home Page Layout
"use client";

import { useEffect, useState } from "react";
import React from "react";
import { LeftNav } from "@/components/LeftNav/LeftNav";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = isOpen ? "w-24" : "w-0"; // also change in leftNav className w and pull button

  return (
    <html lang="en">
      <body className="flex flex-col">
        {/* Layout UI */}
        <div className="flex flex-1">
          {/* bg-gradient-to-b from-[#9379cc] to-[#4B0A1B] */}
          {/* Place children where you want to render a page or nested layout */}
          <div
            className={`!transition-all duration-300 overflow-hidden ${sidebarWidth}`}
          >
            <LeftNav
              className={`fixed top-0 left-0 !transition-all duration-300 ${sidebarWidth} h-full py-5 z-10
     overflow-hidden text-white bg-gradient-to-b from-gray-100 to-gray-300`}
              onNavigate={() => setIsOpen(false)}
            ></LeftNav>
          </div>
          {/* 9379cc B695FC */}
          {/* Pull Button !not relative!*/}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className={`
             fixed top-1/2 -translate-y-1/2 z-20
             w-7 h-14 rounded-r-full
             !transition-all duration-300
             ${isOpen ? "left-24 bg-gray-200" : "left-0"}
             bg-gray-200  bg-no-repeat bg-center bg-contain select-none cursor-pointer
           `}
          >
            <Image
              src={isOpen ? "/icons/pull_right.svg" : "/icons/pull_left.svg"}
              fill
              alt="Toggle Sidebar"
              className="scale-x-[-1] scale-80"
            />
          </button>

          <main
            className={`transition-all duration-300 flex-1 overflow-x-hidden overflow-y-hidden`}
          >
            {children}
          </main>
        </div>

        <footer>
          <div className="flex flex-row w-full h-fit bg-gray-300 dark:bg-[#212121] text-black dark:text-white gap-5">
            <div className="hidden sm:flex flex-col items-center">
              <div className="relative lg:w-48 lg:h-48 w-32 h-32">
                <Image
                  src="/pictures/owl_logo.png"
                  className="object-contain p-5"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt=" Owl Logo"
                />
              </div>
              <h1 className="py-5">Tupah</h1>
              <p className="font-bold text-center">
                Steven Spencer's website<br></br>for stuff.
              </p>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                About
              </h5>
              <ul className="text-center">
                <li>
                  <Link href="/about">Me</Link>
                </li>
                <li>
                  <Link href="/blog">Blogs</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                Privacy
              </h5>
              <ul className="text-center">
                <li>
                  <Link href="/privacy#policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/privacy#terms">Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                Social
              </h5>
              <ul className="text-center">
                <li>
                  <Link href="/privacy#discord">Discord</Link>
                </li>
                <li>
                  <Link href="/privacy#instagram">Instagram</Link>
                </li>
                <li>
                  <Link href="/privacy#X">X</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
