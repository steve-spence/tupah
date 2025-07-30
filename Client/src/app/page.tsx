// Home Page
"use client";

import React from "react";
import { NavIconProps } from "@/components/NavIcon/NavIcon";
import { RotatingIcons } from "@/components/RotatingIcons/RotatingIcons";
import { Header } from "@/components/Header/Header";
import Image from "next/image";

export default function HomePage() {
  // Max 4 otherwise responsive is thrown off
  // This is also just terrible code I need to fix this soon. When I feel like featuring other posts.
  const rotating_icons: NavIconProps[] = [
    {
      id: "blog1",
      title: "Dark vs Light Mode",
      bg_path: "/pictures/blog/dark-vs-light.png",
      link: "blog/dark-mode-vs-light-mode",
    },
    {
      id: "blog2",
      title: "What I wish I knew...",
      bg_path: "/pictures/blog/tailwind-cheatsheet.png",
      link: "blog/things-i-wish-i-knew-before-tailwind",
    },
    {
      id: "blog3",
      title: "AI Buzz",
      bg_path: "/pictures/blog/ai-buzz.png",
      link: "blog/why-ai-is-just-buzz",
    },
    {
      id: "blog4",
      title: "Why I Built from Scratch",
      bg_path: "/pictures/blog/react-logo.png",
      link: "blog/why-i-built-from-scratch",
    },
  ];

  return (
    <div className="flex flex-col">
      <section>
        <div
          className="fixed top-0 w-full h-fit z-[-1] bg-[#F5F5F5] dark:bg-[#171717] 
        transition-colors duration-300 ease-in-out
        flex flex-col gap-10 items-center justify-center pb-30"
        >
          <div className=" relative w-[90vw] max-w-[640px] aspect-[1/1]">
            <Image
              src="/pictures/favorite_dark.svg"
              className="
            z-1 object-contain 
            opacity-0 hidden 
            dark:block dark:opacity-100 
            transition-all duration-700 ease-in"
              fill
              alt="https://pixabay.com/users/andsproject-26081561/ I love their art."
            />
            <Image
              src="/pictures/favorite_light.svg"
              className="
            z-1 object-contain 
            dark:hidden dark:opacity-0 
            opcaity-100 block 
            transition-all duration-700 ease-in"
              fill
              alt="https://pixabay.com/users/andsproject-26081561/ I love their art."
            />
          </div>
          <div className="w-[90vw] max-w-[640px] aspect-[1/1] relative">
            <Image
              src="/blowing_girl.png"
              className="z-1 object-contain block"
              fill
              alt="https://pixabay.com/users/andsproject-26081561/ I love their art."
            />
          </div>
        </div>
      </section>

      {/* Home Page Header */}
      <section id="home">
        <Header
          data={{
            title: "Tupah",
            subtext: "Unfiltered thoughts with occasional genius.",
          }}
          className="flex sm:justify-between justify-center bg-[#eff1f1] shadow-sm dark:bg-[#1c1c1c] p-5 h-32 w-full z-2"
        />
      </section>

      {/* The section in front of the background */}
      <section>
        <div className="flex flex-col md:flex-row content-between py-30 text-center">
          <div className="flex flex-col flex-1 items-start justify-center px-20 py-10">
            <div>
              <h1 className="text-[#1272CC] dark:sm:text-[#9379cc] dark:text-[#ffffff] font-bold text-2xl text-shadow-2xs transition-colors">
                What's here
              </h1>
              <p className=" text-gray-800 dark:text-white outline-black max-w-3xs overflow-hidden font-semibold">
                A growing pile of thoughts. From tech rants to anime, whatever's
                on my mind. It's controlled chaos.
              </p>
            </div>
          </div>
          <div className=""></div>
          <div className="flex flex-col flex-1 items-end justify-end px-20 py-10 text-center">
            <div>
              <h1 className="text-[#1272CC] dark:sm:text-[#9379cc] dark:text-[#ffffff] font-bold text-2xl text-center text-shadow-2xs transition-colors">
                Why it's here
              </h1>
              <p className="text-gray-800 dark:text-white outline-black max-w-3xs overflow-hidden font-semibold">
                I built this blog to keep my brain from rotting. Writing clears
                my head, and if someone finds value in it, that's a win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I post section */}
      <section id="posts">
        <div
          className="flex flex-col p-10 gap-5 w-full justify-center items-center bg-[#f0f0f0] dark:bg-[#0e0e0e] 
        shadow-xl shodow-indigo-500/50 text-white text-center"
        >
          <h2 className="text-4xl font-bold text-gray-700 dark:text-white">
            What do I post here?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline mb-4">
                Gaming
              </h3>
              <p className="text-gray-800 dark:text-white">
                I've been gaming since I could move a mouse. From Halo 4 on
                launch day to 7,000 hours in Overwatch and RuneScape, I've
                grinded everything from shooters to survival sims, MMO's to
                puzzle co-ops. If the game has a community, a meta, or a boss
                fight, I've probably been there.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline text-center md:text-left mb-2">
                Anime
              </h3>
              <p className="text-gray-800 dark:text-white">
                I keep up with seasonal anime and always have something to say.
                Whether it’s praise, slander, or a new favorite, expect honest
                takes and unfiltered opinions.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc] underline text-center md:text-left mb-2">
                Tech Support
              </h3>
              <p className="text-gray-800 dark:text-white">
                I'm a Computer Science major at Michigan State University, and
                I've helped enough people fix their computers/code to know it’s
                worth writing down. Tips, tools, rants, and tutorials, it's all
                here.
              </p>
            </div>
          </div>
        </div>

        {/* Rotating Blog Posts */}
        <div className="flex flex-col items-center w-full h-fit bg-gray-200 dark:bg-[#121212] py-5">
          <h1 className="text-3xl text-black dark:text-white font-bold grow-1 text-left">
            Featured Posts
          </h1>
          <RotatingIcons
            data={{ icons: rotating_icons }}
            className="bg-gradient-to-br from-[#88c9ff] to-[#5994cc] dark:from-[#4a3577] dark:to-[#9379cc]
      rounded-4xl m-5 dark:text-white text-black font-semibold"
          />
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
  );
}
