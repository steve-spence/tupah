// Home Page
"use client";

import React, { useEffect } from "react";
import { NavIconProps } from "@/components/NavIcon/NavIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { Header } from "@/components/Header/Header";
import { DrawOnLogo } from "@/components/DrawOnLogo/DrawOnLogo";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'motion/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";

// Scroll-reveal wrapper: children fade up into view as the user scrolls
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PostType {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  credit?: { label: string; href: string };
}

const postTypes: PostType[] = [
  {
    number: "01",
    title: "Experiences",
    description: "Tell the story only you can tell — no byline needed.",
    image: "/pictures/japan_streetview.jpg",
    imageAlt: "A neon-lit street at night",
  },
  {
    number: "02",
    title: "Anime",
    description: "Deep dives and hot takes, judged on merit alone.",
    image: "/blowing_girl.png",
    imageAlt: "Illustration of a girl beneath a starry sky",
    credit: { label: "art by @andsproject", href: "https://pixabay.com/users/andsproject-26081561/" },
  },
  {
    number: "03",
    title: "Code",
    description: "Notes from the trenches — bugs, fixes, hard-won lessons.",
    image: "/pictures/wide_codingview.jpg",
    imageAlt: "A desk with code on a monitor",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [featuredPosts, setFeaturedPosts] = React.useState<NavIconProps[]>([]);

  // Fetch featured posts
  useEffect(() => {
    fetch('/api/featured')
      .then(res => res.json())
      .then(data => setFeaturedPosts(data))
      .catch(err => console.error('Failed to fetch featured posts:', err));
  }, []);

  return (
    <>
      {/* Background — CSS grid, no image to download/decode, pinned behind everything */}
      <div
        className="fixed inset-0 -z-10 bg-white dark:bg-[#121212] [--grid-line:rgba(0,0,0,0.06)] dark:[--grid-line:rgba(255,255,255,0.07)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="flex flex-col bg-white dark:bg-transparent transition-colors duration-300">
        {/* Home Page Header */}
        <section id="home">
          <Header data={{ title: "Tupah", subtext: "Explore | Create | Enjoy", }} />
        </section>

        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <div className="grid md:grid-cols-2 gap-15 md:gap-16 items-center w-full max-w-[90rem] mx-auto">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                No names.{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1272CC] to-[#5994cc] dark:from-[#b79bf3] dark:to-[#9379cc]">
                  Just voices.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                A quiet corner of a loud internet — write freely, read deeply, stay anonymous.
              </p>
              <div className="mt-2 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  variant="contained"
                  className="px-10 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all! duration-300 bg-linear-to-r from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#562e9b]"
                  onClick={() => router.push('/create')}>
                  Start Writing
                </Button>
                <Link
                  href="/blog"
                  className="text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-[#1272CC] dark:hover:text-[#b79bf3] transition-colors"
                >
                  Explore the blogs →
                </Link>
              </div>
            </div>

            <DrawOnLogo
              src="/pictures/logo-drawn.svg"
              label="Tupah logo"
              className="w-full"
            />
          </div>
        </section>

        <div className="border-t border-black/10 dark:border-white/10" />

        {/* What to Post — one numbered feature per post type */}
        <section id="posts" className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
          <Reveal className="text-center mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What to Post
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              A few ideas to get you started.
            </p>
          </Reveal>

          <div className="flex flex-col gap-20 md:gap-32">
            {postTypes.map((post, i) => (
              <Reveal
                key={post.title}
                className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                <div className={`relative aspect-4/3 rounded-2xl overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className={`text-center ${i % 2 === 1 ? "md:order-1 md:text-right" : "md:text-left"}`}>
                  <span className="font-mono text-sm text-[#1272CC] dark:text-[#9379cc]">
                    {post.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                  {post.credit && (
                    <Link
                      href={post.credit.href}
                      target="_blank"
                      className="mt-3 inline-block text-xs text-gray-500 dark:text-gray-500 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {post.credit.label}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="border-t border-black/10 dark:border-white/10" />

        {/* Featured Posts */}
        {/* <section className="flex flex-col items-center w-full px-5 py-20">
          <h2 className="text-3xl text-gray-900 dark:text-white font-bold mb-10">
            Featured Posts
          </h2>
          <div className="w-full max-w-7xl">
            {featuredPosts.length > 0 && (<Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="right-1 left-1 relative bottom-1"
            >
              {featuredPosts.map((post) => (
                <SwiperSlide key={post.id}>
                  <NavIcon data={post} size="16" />
                </SwiperSlide>
              ))}
            </Swiper>
            )}
          </div>
        </section> */}

        <div className="border-t border-black/10 dark:border-white/10" />

        {/* Brook Image */}
        <section id="brook" className="flex flex-col gap-1 justify-center items-center w-full px-5 py-16 text-center">
          <p className="italic text-2xl p-3 text-gray-700 dark:text-gray-300">"Death leaves nothing behind."</p>
          {/* Responsive Image Container */}
          <div className="relative lg:w-32 lg:h-32 md:w-24 md:h-24 w-16 h-16">
            <Image
              src="/pictures/brook.png"
              alt="Brook, One Piece"
              fill
              sizes="50vw"
              className="rounded-4xl object-contain"
            />
          </div>
          <p className="text-gray-900 dark:text-white font-bold">Brook</p>
          <p className="text-gray-600 dark:text-gray-400 font-semibold">Musician, New World</p>
        </section>
      </div>
    </>
  );
}
