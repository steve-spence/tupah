// Home Page
"use client";

import React, { useEffect } from "react";
import { NavIconProps } from "@/components/NavIcon/NavIcon";
import { RotatingIcons } from "@/components/RotatingIcons/RotatingIcons";
import { Header } from "@/components/Header/Header";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Background images to rotate through
  const backgroundImages = [
    { light: "/pictures/favorite_light.svg", dark: "/pictures/favorite_dark.svg" },
    { light: "/pictures/bird-bg.svg", dark: "/pictures/bird-bg.svg" },
    { light: "/pictures/girl-bg.svg", dark: "/pictures/girl-bg.svg" },
    { light: "/blowing_girl.png", dark: "/blowing_girl.png" },
  ];

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Add canonical URL for home page
  useEffect(() => {
    const canonicalUrl = "https://tupah.me";
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, []);

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
      title: "The Best First Mic",
      bg_path: "/pictures/blog/mv7-1.jpg",
      link: "blog/the-best-first-mic",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Fixed Background Images */}
      <div className="fixed top-0 w-full h-[100vh] -z-10 bg-[#c0b8b8] dark:bg-[#171717] transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center pb-30">
          {/* First rotating background image with theme support */}
          <div className="relative w-[90vw] max-w-[640px] aspect-square">
            {backgroundImages.map((img, index) => (
              <React.Fragment key={index}>
                {/* Light mode image */}
                <Image
                  src={img.light}
                  className={`object-contain absolute inset-0 transition-opacity duration-1000 dark:hidden ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  fill
                  alt="Artwork by andsproject"
                  priority={index === 0}
                />
                {/* Dark mode image */}
                <Image
                  src={img.dark}
                  className={`object-contain absolute inset-0 transition-opacity duration-1000 hidden dark:block ${index === currentImageIndex ? "dark:opacity-100" : "dark:opacity-0"
                    }`}
                  fill
                  alt="Artwork by andsproject"
                  priority={index === 0}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Second rotating background image (offset by 1) - hidden on mobile, shown on md+ */}
          <div className="relative w-[90vw] max-w-[640px] aspect-square md:block">
            {backgroundImages.map((img, index) => {
              const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
              return (
                <React.Fragment key={index}>
                  {/* Light mode image */}
                  <Image
                    src={img.light}
                    className={`object-contain absolute inset-0 transition-opacity duration-1000 dark:hidden ${index === nextIndex ? "opacity-100" : "opacity-0"
                      }`}
                    fill
                    alt="Artwork by andsproject"
                    priority={index === 1}
                  />
                  {/* Dark mode image */}
                  <Image
                    src={img.dark}
                    className={`object-contain absolute inset-0 transition-opacity duration-1000 hidden dark:block ${index === nextIndex ? "dark:opacity-100" : "dark:opacity-0"
                      }`}
                    fill
                    alt="Artwork by andsproject"
                    priority={index === 1}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Home Page Header */}
      <section id="home">
        <Header
          data={{
            title: "Tupah",
            subtext: "Explore | Create | Enjoy",
          }}
          className="flex sm:justify-between justify-center bg-[#eff1f1] shadow-sm
           dark:bg-[#1c1c1c] p-5 h-32 w-full relative z-10"
        />
      </section>

      {/* Info Section */}
      <section className="relative">
        <div className="flex flex-col md:flex-row gap-10 py-20 px-10 md:px-20 drop-shadow-text-sm min-h-50 md:min-h-80">
          <div className="flex-1 p-1 md:pr-40">
            <h2 className="text-white font-bold text-2xl mb-3 transition-colors">
              What you'll find here
            </h2>
            <p className="text-white font-semibold">
              Join a growing library of blogs, all anonymously. Follow creators you like and publish your first post in minutes.
            </p>
          </div>

          <div className="flex-1 md:text-right p-1 md:pl-40">
            <h2 className="text-white font-bold text-2xl mb-3 transition-colors">
              Why Tupah?
            </h2>
            <p className="text-white font-semibold">
              Just like the Tupah forest in Malaysia, this is a quiet space on a loud internet. Enjoy the content, create your own, and explore.
            </p>
          </div>
        </div>

        {/* Artist Credit */}
        <p className="absolute bottom-4 right-4 text-xl text-[#e9e9e9] drop-shadow-text-sm">
          @ansproject
        </p>
      </section>

      <section>
        <div className="flex grow flex-col items-center justify-center gap-8 py-20 bg-linear-to-b from-[#f0f0f0] to-[#e5e5e5] dark:from-[#171717] dark:to-[#121212]
        transition-all duration-300">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r text-black dark:text-white bg-clip-text">
              Create
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md text-center">
              Share your thoughts, stories, and ideas with the world
            </p>
          </div>
          <Button
            variant="contained"
            className="px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b49ddb]"
            onClick={() => router.push('/create')}>
            Start Writing
          </Button>
        </div>
      </section>


      {/* What I hope people post */}
      <section id="posts">
        <div
          className="flex flex-col p-10 gap-5 w-full justify-center items-center bg-linear-to-b from-[#e5e5e5] to-[#d6d6d6] dark:from-[#121212] dark:to-[#171717]
        shadow-xl shodow-indigo-500/50 text-white text-center"
        >
          <h2 className="text-4xl font-bold text-gray-700 dark:text-white">
            What I hope people post
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#b79bf3] mb-4">
                Experiences
              </h3>
              <p className="text-gray-800 dark:text-white">
                I think people have a lot to share. I want to give people another platform
                to express their opinions and make others laugh. You can be the one to
                create a new post that might take this site to the next level. Be that guy.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#b79bf3] text-center md:text-left mb-2">
                Anime
              </h3>
              <p className="text-gray-800 dark:text-white">
                I hope we get some good anime opinions. I love anime and I have been watching
                for the last few (8) years. I might know a few... I hope some people
                can come together and use this site to share their opinions in a nuanced way.
                I am still working on how this site can stand out, so let's hope for more on that
                in the future!
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#1272CC] dark:text-[#b79bf3] text-center md:text-left mb-2">
                Code
              </h3>
              <p className="text-gray-800 dark:text-white">
                I'm a Computer Science major at Michigan State University, and
                I've helped enough people fix their computers/code to know it’s
                worth writing down. I want to create some basic tutorials on how
                to create and find good code. I don't know how far I'll get, but I have a
                love for the game so we'll' see.
              </p>
            </div>
          </div>
        </div>

        {/* Rotating Blog Posts */}
        <div className="flex flex-col items-center w-full h-fit bg-linear-to-b from-[#d6d6d6] to-[#e7e7e7] dark:from-[#171717] dark: dark:to-[#505050] bg-gray-200 dark:bg-[#121212] py-5">
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
        <div className="flex flex-col gap-1 justify-center items-center h-fit w-full bg-linear-to-b from[#d6d6d6] to-[#d6d6d6] dark:bg-[#9e9e9e] p-5">
          <p className="italic text-2xl p-3 text-white drop-shadow-text-sm">"Death leaves nothing behind."</p>
          {/* Responsive Image Container */}
          <div className="relative lg:w-32 lg:h-32 md:w-24 md:h-24 w-16 h-16">
            <Image
              src="/pictures/brook.png"
              alt="Brook, One Piece"
              fill
              className="rounded-4xl object-contain"
            />
          </div>
          <p className="text-white drop-shadow-text-sm font-bold ">Brook</p>
          <p className="drop-shadow-text-sm text-[#ffffff] font-semibold">Musician, New World</p>
        </div>
      </section>
    </div>
  );
}
