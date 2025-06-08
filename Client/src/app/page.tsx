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
    { id: "blog1", title: "Who still reads?", bg_path: "/blog_icon.svg", link: "/" },
    { id: "blog2", title: "The First Post", bg_path: "/blog_icon.svg", link: "blog/the-first-post" },
    { id: "blog3", title: "What College gives you.", bg_path: "/blog_icon.svg", link: "blog/what-college-gives-you" },
    { id: "blog4", title: "Why Solo Leveling?", bg_path: "/blog_icon.svg", link: "blog/why-solo-leveling" },
  ];

  return (
    <div className="flex flex-col">

      <section>
        <div className="fixed top-0 w-full h-fit z-[-1] bg-[#171717] flex flex-col gap-10 items-center justify-center pb-30">
          <div className="w-[90vw] max-w-[640px] aspect-[1/1] relative">
            <Image src="/my_favorite.svg" className="z-1 object-contain" fill alt="https://pixabay.com/users/andsproject-26081561/ I love their art." />
          </div>
          <div className="w-[90vw] max-w-[640px] aspect-[1/1] relative">
            <Image src="/blowing_girl.png" className="z-1 object-contain" fill alt="https://pixabay.com/users/andsproject-26081561/ I love their art." />
          </div>

        </div>
      </section>


      {/* Home Page Header */}
      <section id="home">
        <Header data={{ title: "Tupah", subtext: "Unfiltered thoughts with occasional genius." }}
          className="flex sm:justify-between justify-center bg-[#272727] p-5 h-32 w-full z-2" />

      </section>

      {/* The section in front of the background */}
      <section>
        <div className="flex flex-col md:flex-row content-between py-30 text-center">
          <div className="flex flex-col flex-1 items-start justify-baseline p-10">
            <h1 className="text-[#9379cc] font-bold text-2xl">What's here</h1>
            <p className="text-white outline-black w-44 overflow-hidden">A bunch of blog posts I have started to accumulate. I tend to post of cool stuff sometimes.
            </p>
          </div>
          <div className="flex flex-col flex-1 items-end justify-end p-10 text-center">
            <h1 className="text-[#9379cc] font-bold text-2xl text-center">Why it's here</h1>
            <p className="text-white outline-black w-44 overflow-hidden">I made this blog because I have nothing better do with myself and I enjoy it.
            </p>
          </div>
        </div>
      </section>

      {/* What I post section */}
      <section id="posts">
        <div className="flex flex-col p-17 gap-2 w-full justify-center items-center bg-[#121212]
      text-white">
          <h2 className="text-4xl font-bold text-center">What do I post here?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-[#9379cc] underline text-center md:text-left">Gaming</h3>
              <p>I've been playing Marvel Rivals and I like keeping my pages updated with the newest Marvel
                related content. I used to play LoL, Overwatch, Old School RuneScape, and so many other titles
                I could go on for days.</p>
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-[#9379cc] underline text-center md:text-left">Anime</h3>
              <p>I enjoy watching seasonal anime and posting my favorites. I post about the worst and best anime of each season.</p>
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-[#9379cc] underline text-center md:text-left">Tech Support</h3>
              <p>I graduated college with a computer science degree, so I know a thing or two about computers.
                I have always wanted to start a page where I could let people know useful tutorials or helpful tips,
                this is that dream realized.</p>
            </div>
          </div>
        </div>

        {/* Rotating Blog Posts */}
        <div className="flex items-center justify-center w-full h-fit bg-[#121212] py-5">
          <RotatingIcons data={{ icons: rotating_icons }} className="bg-[#9379cc] rounded-4xl m-5" />
        </div>
      </section>

      {/* Brook Image */}
      <section id="brook">
        <div className="flex flex-col gap-1 justify-center items-center h-fit w-full bg-amber-50 p-5">

          <p className="italic text-2xl p-3">"Death leaves nothing behind."</p>
          {/* Responsive Image Container */}
          <div className="relative lg:w-32 lg:h-32 md:w-24 md:h-24 w-16 h-16">
            <Image
              src="/brook.png"
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