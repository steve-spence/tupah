// Home Page 
'use client'

import React from 'react'
import { NavIconProps } from '@/components/NavIcon/NavIcon'
import { RotatingIcons } from '@/components/RotatingIcons/RotatingIcons'
import { Header } from '@/components/Header/Header'
import Image from 'next/image'

export default function HomePage() {

  // Max 4 otherwise responsive is thrown off
  const rotating_icons: NavIconProps[] = [
    { id: "blog1", title: "Orlando", bg_path: "/pictures/blog/orlando.jpg", link: "blog/orlando" },
    { id: "blog2", title: "The First Post", bg_path: "/pictures/blog/first_post.jpg", link: "blog/the-first-post" },
    { id: "blog3", title: "Finding out", bg_path: "/pictures/blog/finding_out.jpg", link: "blog/finding-out" },
    { id: "blog4", title: "Why Solo Leveling?", bg_path: "/pictures/blog/solo_leveling.png", link: "blog/why-solo-leveling" },
  ];

  return (
    <div className="flex flex-col">

      <section>
        <div className="fixed top-0 w-full h-fit z-[-1] bg-[#F5F5F5] dark:bg-[#171717] 
        transition-colors duration-300 ease-in-out
        flex flex-col gap-10 items-center justify-center pb-30" >
          <div className=" relative w-[90vw] max-w-[640px] aspect-[1/1]">
            <Image src="/pictures/favorite_dark.svg" className="
            z-1 object-contain 
            opacity-0 hidden 
            dark:block dark:opacity-100 
            transition-all duration-700 ease-in"
              fill
              alt="https://pixabay.com/users/andsproject-26081561/ I love their art."
            />
            <Image src="/pictures/favorite_light.svg" className="
            z-1 object-contain 
            dark:hidden dark:opacity-0 
            opcaity-100 block 
            transition-all duration-700 ease-in"
              fill
              alt="https://pixabay.com/users/andsproject-26081561/ I love their art."
            />
          </div>
          <div className="w-[90vw] max-w-[640px] aspect-[1/1] relative">
            <Image src="/blowing_girl.png" className="z-1 object-contain block" fill alt="https://pixabay.com/users/andsproject-26081561/ I love their art." />
          </div>

        </div>
      </section>

      {/* Home Page Header */}
      <section id="home">
        <Header data={{ title: "Tupah", subtext: "Unfiltered thoughts with occasional genius." }}
          className="flex sm:justify-between justify-center bg-[#eff1f1] shadow-sm dark:bg-[#1c1c1c] p-5 h-32 w-full z-2"
        />

      </section>

      {/* The section in front of the background */}
      <section>
        <div className="flex flex-col md:flex-row content-between py-30 text-center">
          <div className="flex flex-col flex-1 items-start justify-baseline p-10">
            <div>
              <h1 className="text-[#1272CC] dark:text-[#9379cc] font-bold text-2xl text-shadow-2xs">What's here</h1>
              <p className=" text-gray-800 dark:text-white outline-black w-44 overflow-hidden">A bunch of blog posts I have started to accumulate. I post cool stuff sometimes.
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-end justify-end p-10 text-center">
            <div>
              <h1 className="text-[#1272CC] dark:text-[#9379cc] font-bold text-2xl text-center text-shadow-2xs">Why it's here</h1>
              <p className="text-gray-800 dark:text-white outline-black w-44 overflow-hidden">I made this blog because I have nothing better do with myself and I enjoy it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I post section */}
      <section id="posts">
        <div className="flex flex-col p-10 gap-5 w-full justify-center items-center bg-[#f0f0f0] dark:bg-[#0e0e0e] shadow-xl shodow-indigo-500/50 text-white">
          <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">What do I post here?</h2>
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline text-center md:text-left mb-2">Gaming</h3>
              <p className="text-1xl font-normal text-gray-800 dark:text-white">I've been playing Marvel Rivals and I like keeping my pages updated with the newest Marvel
                related content. I used to play LoL, Overwatch, Old School RuneScape, and so many other titles
                I could go on for days.</p>
            </div>
            <div className="relative bg-black rounded-4xl"></div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline text-center md:text-left mb-2">Anime</h3>
              <p className="text-gray-800 dark:text-white">I enjoy watching seasonal anime and posting my favorites. I post about the worst and best anime of each season.</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline text-center md:text-left mb-2">Tech Support</h3>
              <p className="text-gray-800 dark:text-white">I'm at Michigan State University studying for my Bachelor's in Computer Science, so I know might know something about computers.
                I have always wanted to start a page where I could let people know useful tutorials or helpful tips,
                this is that dream realized.</p>
            </div>
          </div>
        </div>

        {/* Rotating Blog Posts */}
        <div className="flex items-center justify-center w-full h-fit bg-gray-200 dark:bg-[#121212] py-5">
          <RotatingIcons data={{ icons: rotating_icons }} className="bg-[#5994cc] dark:bg-[#9379cc] rounded-4xl m-5" />
        </div>
      </section>

      {/* Brook Image */}
      <section id="brook">
        <div className="flex flex-col gap-1 justify-center items-center h-fit w-full bg-gray-400 dark:bg-amber-50 p-5">
          <p className="italic text-2xl p-3">"Death leaves nothing behind."</p>
          {/* Responsive Image Container */}
          <div className="relative lg:w-32 lg:h-32 md:w-24 md:h-24 w-16 h-16">
            <Image
              src="/pictures/brook.png"
              alt="Brook, One Piece"
              fill
              className="rounded-4xl object-contain"
            />
          </div>
          <p>Brook</p>
          <p className="text-gray-500">Musician, New World</p>

        </div>
      </section>

    </div>
  )
}