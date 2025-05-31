// Home Page Layout
'use client'

import { useState, } from 'react';
import React from "react";
import { LeftNav } from '@/components/LeftNav/LeftNav';
import '@/app/globals.css';

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarWidth = isOpen ? 'w-25' : 'w-0' // also change in leftNav className w

  return (
    <html lang="en">
      <body className="flex flex-col">
        {/* Layout UI */}
        <div className="flex flex-1">

          {/* Place children where you want to render a page or nested layout */}
          <div className={`transition-all duration-300 overflow-hidden ${sidebarWidth}`}>
            <LeftNav
              className={`transition-all duration-300 bg-[#202020] overflow-hidden ${isOpen ? 'w-25 opacity-100' : 'w-0 opacity-0'}`}
            ></LeftNav>
            <button className="w-8 h-16 rounded-r-full bg-[#B695FC]
         fixed top-1/2 left -translate-y-1/2 z-22 
         contain-content bg-no-repeat bg-center bg-contain"
              onClick={() => setIsOpen(prev => !prev)}>
              <img src="/pull.svg" alt="pull" className="scale-x-[-1]" />
            </button>
          </div>

          <main className={`transition-all duration-300 flex-1`}>{children}</main>
        </div>

        <footer>
          <div className="flex flex-row w-full h-fit bg-[#212121] text-white gap-5">
            <div className="flex flex-col items-center px-30 py-10">
              <img src="/owl_logo.png" className="w-55 p-10"></img>
              <h1 className="py-5">Tupah</h1>
              <p className="text-gray-300 text-center">Steven Spencer's blog<br></br>about life.</p>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">About</h5>
              <ul className="text-center">
                <li><a>Me</a></li>
                <li><a>Blogs</a></li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">Privacy</h5>
              <ul className="text-center">
                <li><a>Privacy Policy</a></li>
                <li><a>Terms and Conditions</a></li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
              <h5 className="p-5 text-2xl text-[#9379cc]">Social</h5>
              <ul className="text-center">
                <li><a>Discord</a></li>
                <li><a>Instagram</a></li>
                <li><a>Twitter/X</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html >
  )
}
