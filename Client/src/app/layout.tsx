// Home Page Layout
'use client'

import { useState, } from 'react';
import React from "react";
import { LeftNav } from '@/components/LeftNav/LeftNav';
import '@/app/globals.css';
import Image from 'next/image'
import Link from 'next/link'

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = isOpen ? 'w-25' : 'w-0' // also change in leftNav className w and pull button

  return (
    <html lang="en">
      <body className="flex flex-col">
        {/* Layout UI */}
        <div className="flex flex-1">

          {/* Place children where you want to render a page or nested layout */}
          <div className={`transition-all duration-300 overflow-hidden ${sidebarWidth}`}>
            <LeftNav
              className={`transition-all duration-300 bg-[#9379cc] overflow-hidden text-white ${isOpen ? 'w-25 opacity-100' : 'w-0 opacity-0'}`}
            ></LeftNav>
            <button className={`w-8 h-16 rounded-r-full
         fixed top-1/2 -translate-y-1/2 z-22 transition-all duration-300 ${isOpen ? 'left-25 bg-[#9379cc]' : 'left-0 bg-[#B695FC]'}
         contain-content bg-no-repeat bg-center bg-contain cursor-pointer`}
              onClick={() => setIsOpen(prev => !prev)}>
              {/* <img src="/pull.svg" alt="Sidebar" className="scale-x-[-1]" /> */}
              <Image src="pull.svg" fill alt="Sidebar" className="scale-x-[-1]" />
            </button>
          </div>

          <main className={`transition-all duration-300 flex-1`}>{children}</main>

        </div>

        <footer>
          <div className="flex flex-row w-full h-fit bg-[#212121] text-white gap-5">
            <div className="flex flex-col items-center px-30 py-10">
              {/* <img src="/owl_logo.png" className="w-55 p-10"></img> */}
              <Image src="/owl_logo.png" className="p-10" width="55" height="55" alt=" Owl Logo" />
              <h1 className="py-5">Tupah</h1>
              <p className="text-gray-300 text-center">Steven Spencer's blog<br></br>about life.</p>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">About</h5>
              <ul className="text-center">
                <li><Link href="/about">Me</Link></li>
                <li><Link href="/blog">Blogs</Link></li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">Privacy</h5>
              <ul className="text-center">
                <li><Link href="/privacy#policy">Privacy Policy</Link></li>
                <li><Link href="/privacy#terms">Terms and Conditions</Link></li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">Social</h5>
              <ul className="text-center">
                <li><Link href="/privacy#discord">Discord</Link></li>
                <li><Link href="/privacy#instagram">Instagram</Link></li>
                <li><Link href="/privacy#X">X</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html >
  )
}
