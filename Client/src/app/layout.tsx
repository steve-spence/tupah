// Home Page Layout
'use client'

import { useState, } from 'react';
import React from "react";
import { LeftNav } from '@/components/LeftNav/LeftNav';
import '@/app/globals.css';

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarWidth = isOpen ? 'w-25' : 'w-0'


  return (
    <html lang="en">
      <body className="flex flex-col">
        {/* Layout UI */}
        <div className="flex flex-1">

          {/* Place children where you want to render a page or nested layout */}
          <div className={`transition-all duration-300 overflow-hidden ${sidebarWidth}`}>
            {isOpen && (
              <LeftNav className="bg-[#202020]" />
            )}
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
          <div className="flex flex-row w-full h-32 bg-[#212121]">
            <div>

            </div>
            <div>

            </div>
          </div>
        </footer>
      </body>
    </html >
  )
}
