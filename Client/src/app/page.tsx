// Home Page 
'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { LeftNav } from "@/components/LeftNav/LeftNav"
import { useState } from 'react'
import { NavIcon, NavIconProps } from '@/components/NavIcon/NavIcon'
import { RotatingIcons } from '@/components/RotatingIcons/RotatingIcons'

export default function HomePage() {

  const rotating_icons: NavIconProps[] = [
    { id: "blog1", title: "Blog 1", bg_path: "/blog_icon.svg" },
    { id: "blog2", title: "Blog 2", bg_path: "/blog_icon.svg" },
    { id: "blog3", title: "Blog 3", bg_path: "/blog_icon.svg" },
    { id: "blog4", title: "Blog 4", bg_path: "/blog_icon.svg" },
    { id: "blog5", title: "Blog 5", bg_path: "/blog_icon.svg" }
  ];

  return (
    <div className="flex flex-col">

      {/* Background Image  ----------------- 4000x4000px size svg ------------------ */}
      <section>
        <div className="z-[-1] fixed flex top-0 left-0 w-full h-full items-top justify-center bg-[#171717]">
          <div className="transition-all duration-300 w-[50%] min-w-[640px] h-[50%]">
            <img className="z-[-10%]" src="/my_favorite.svg" alt="https://pixabay.com/users/andsproject-26081561/ I love their art."></img>
          </div>
        </div>
      </section>


      {/* Home Page Header */}
      <section>
        <div className="flex justify-between bg-[#272727] p-5 h-32">
          <img src="/owl_logo.png" className="h-full" alt="Logo"></img>
          <div className="flex flex-col items-center">
            <h1 className="text-white font-extrabold mb-6 tracking-wide text-5xl">Tupah</h1>
            <h4 className="text-gray-300 italic">Unfiltered thoughts with occasional genius.</h4>
          </div>
          <div></div>
        </div>
      </section>

      {/* The section in front of the background */}
      <section>
        <div className="flex flex-row content-between">
          <div className="flex md:w-1/2 h-[60vh] border-radius-3">
            <div className="flex flex-col items-left justify-baseline p-10 px-30 text-left">
              <h1 className="text-white font-bold text-2xl">What's here</h1>
              <p className="text-white w-44">A bunch of blog posts I have started to accumulate. I tend to post of cool stuff sometimes.
              </p>
            </div>
          </div>
          <div className="flex grow flex-col w-[50%] items-end justify-center p-10 px-30 text-right">

            <h1 className="text-white font-bold text-2xl">Why it's here</h1>
            <p className="text-white w-44">I made this blog because I have nothing better do with myself and I enjoy it.
            </p>
          </div>
        </div>
      </section>

      {/* Rotating thing */}
      <section>
        <RotatingIcons data={{ icons: rotating_icons }} className="bg-[#B695FC]" />
      </section>


      {/* rs images */}
      <div className="flex flex-col p-17 gap-2 w-full justify-center items-center bg-[#121212]
      text-white">
        <h2 className="text-3xl">What do I post here?</h2>
        <div className="flex justify-center items-center">
          <div>
            <h3 className="text-2xl">Gaming</h3>
            <p>I've been playing Marvel Rivals and I like keeping my pages updated with the newest Marvel
              related content. I used to play LoL, Overwatch, Old School RuneScape, and so many other titles
              I could go on for days.</p>
          </div>
          <div>
            <h3 className="text-2xl">Anime</h3>
            <p>I enjoy watching seasonal anime and posting my favorites. I post about the worst and best anime of each season.</p>
          </div>
          <div>
            <h3 className="text-2xl">Tech Support</h3>
            <p>I graduated college with a computer science degree, so I know a thing or two about computers.
              I have always wanted to start a page where I could let people know useful tutorials or helpful tips,
              this is that dream realized.</p>
          </div>
        </div>
      </div>


      {/* Brook Image */}
      <section>
        <div className="flex flex-col gap-1 justify-center items-center h-fit w-full bg-amber-50 p-5">

          <p className="italic text-2xl p-3">"Death leaves nothing behind."</p>
          <img src="/brook.png" className="rounded-4xl h-32"></img>
          <p>Brook</p>
          <p className="text-gray-500">Musician, New World</p>

        </div>
      </section>

    </div>

  )
}