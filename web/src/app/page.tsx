// Home Page
"use client";

import React, { useEffect, useRef } from "react";
import { NavIconProps } from "@/components/NavIcon/NavIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { Header } from "@/components/Header/Header";
import { DrawOnLogo } from "@/components/DrawOnLogo/DrawOnLogo";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";

// Scroll-reveal wrapper: children fade up into view as the user scrolls
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

// One distinct background pattern per card, all built from the same
// accent-tinted --card-pattern custom property (set per-card via className).
const CARD_PATTERNS: React.CSSProperties[] = [
  {
    // dots
    backgroundImage: "radial-gradient(var(--card-pattern) 1.5px, transparent 1.5px)",
    backgroundSize: "20px 20px",
  },
  {
    // diagonal lines
    backgroundImage:
      "repeating-linear-gradient(45deg, var(--card-pattern) 0, var(--card-pattern) 1px, transparent 1px, transparent 14px)",
  },
  {
    // large grid
    backgroundImage:
      "linear-gradient(to right, var(--card-pattern) 1px, transparent 1px), linear-gradient(to bottom, var(--card-pattern) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
];

interface CharacterQuote {
  quote: string;
  image: string;
  imageAlt: string;
  name: string;
  role: string;
}

const characterQuotes: CharacterQuote[] = [
  {
    quote: "I Shouldn't Discount The Possibility That I'm Unique.",
    image: "/pictures/rudeus.webp",
    imageAlt: "Rudeus Greyrat, Mushoku Tensei",
    name: "Rudeus Greyrat",
    role: "Mushoku Tensei",
  },
  {
    quote: "Death leaves nothing behind.",
    image: "/pictures/brook.png",
    imageAlt: "Brook, One Piece",
    name: "Brook",
    role: "Musician, New World",
  },
  {
    quote: "Behold, The Unthinkable Present.",
    image: "/pictures/natsuki-subaru.webp",
    imageAlt: "Natsuki Subaru, Re:Zero",
    name: "Natsuki Subaru",
    role: "Re:Zero",
  },
];

const postTypes: PostType[] = [
  {
    number: "01",
    title: "Experiences",
    description: "Tell your unique story.",
    image: "/pictures/japan_streetview.jpg",
    imageAlt: "A neon-lit street at night",
  },
  {
    number: "02",
    title: "Anime",
    description: "Deep dives or hot takes - whever floats your boat.",
    image: "/blowing_girl.png",
    imageAlt: "Illustration of a girl beneath a starry sky",
    credit: { label: "art by @andsproject", href: "https://pixabay.com/users/andsproject-26081561/" },
  },
  {
    number: "03",
    title: "Code",
    description: "Notes from the trenches or hard learned lessons.",
    image: "/pictures/wide_codingview.jpg",
    imageAlt: "A desk with code on a monitor",
  },
];

// One "What Can I Post" card — tracks its own scroll progress so its outline
// lights up in accent color as the flowing light in the panel passes it.
function PostCard({ post, index }: { post: PostType; index: number }) {
  const imageFromLeft = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 50%"],
  });
  const glow = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

  return (
    <div
      ref={cardRef}
      className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/20 p-6 sm:p-10 [--card-pattern:rgba(18,114,204,0.12)] dark:[--card-pattern:rgba(147,121,204,0.14)]"
      style={CARD_PATTERNS[index % CARD_PATTERNS.length]}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#1272CC] dark:border-[#9379cc] shadow-[0_0_32px_6px_rgba(18,114,204,0.3)] dark:shadow-[0_0_32px_6px_rgba(147,121,204,0.3)]"
        style={{ opacity: glow }}
      />

      <motion.div
        initial={{ opacity: 0, x: imageFromLeft ? -60 : 60, rotate: imageFromLeft ? -3 : 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-4/3 rounded-2xl overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: imageFromLeft ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`relative text-center ${index % 2 === 1 ? "md:order-1 md:text-right" : "md:text-left"}`}
      >
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
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [featuredPosts, setFeaturedPosts] = React.useState<NavIconProps[]>([]);

  // "What Can I Post" scroll light — tracks progress through the card stack
  // and drives a glowing orb that flows down the spine as the user scrolls.
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: postsScrollProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  });
  const lightProgress = useSpring(postsScrollProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });
  const lightTop = useTransform(lightProgress, [0, 1], ["0%", "100%"]);
  const beamHeight = useTransform(lightProgress, [0, 1], ["0%", "100%"]);

  // Handoff glow — once the scroll light exits the card stack above, the next
  // panel's outline gradually lights up as it's scrolled into view.
  const quotesPanelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: quotesScrollProgress } = useScroll({
    target: quotesPanelRef,
    offset: ["start end", "start 50%"],
  });
  const quotesGlow = useSpring(quotesScrollProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.4,
  });

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

        {/* What to Post — one numbered feature per post type, inside its own grid-backed panel */}
        <section id="posts" className="w-full px-6 py-24 md:py-32">
          <div
            className="relative mx-auto w-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-6 py-16 sm:px-10 md:px-16 md:py-24 [--panel-grid-line:rgba(18,114,204,0.08)] dark:[--panel-grid-line:rgba(147,121,204,0.1)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--panel-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--panel-grid-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <Reveal className="text-center mb-20 md:mb-28">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                What Can I Post?
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                A few ideas to get you started.
              </p>
            </Reveal>

            <div ref={cardsRef} className="relative flex flex-col gap-20 md:gap-32">
              {/* Flowing scroll light — a track + glowing orb that travels down the
                  spine of the card stack in step with scroll progress. Sits behind
                  the cards in DOM/stacking order, so it peeks out in the gaps. */}
              <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10" />
              <motion.div
                className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2 bg-linear-to-b from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b79bf3]"
                style={{ height: beamHeight }}
              />
              <motion.div
                className="pointer-events-none absolute left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1272CC]/30 dark:bg-[#9379cc]/30 blur-xl"
                style={{ top: lightTop }}
              />
              <motion.div
                className="pointer-events-none absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1272CC] dark:bg-[#9379cc] shadow-[0_0_16px_4px_rgba(18,114,204,0.7)] dark:shadow-[0_0_16px_4px_rgba(147,121,204,0.7)]"
                style={{ top: lightTop }}
              />

              {postTypes.map((post, i) => (
                <PostCard key={post.title} post={post} index={i} />
              ))}
            </div>
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

        {/* Character Quotes */}
        <section id="brook" className="w-full px-6 py-16 md:py-20">
          <div
            ref={quotesPanelRef}
            className="relative mx-auto w-full max-w-5xl rounded-3xl border border-black/10 dark:border-white/10 px-6 py-14 sm:px-10 md:py-16"
          >
            {/* Handoff glow — dim border lights up in accent color as this panel
                scrolls into view, picking up where the light above left off. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#1272CC] dark:border-[#9379cc] shadow-[0_0_40px_8px_rgba(18,114,204,0.35)] dark:shadow-[0_0_40px_8px_rgba(147,121,204,0.35)]"
              style={{ opacity: quotesGlow }}
            />

            <div className="relative grid w-full grid-cols-1 gap-14 md:grid-cols-3 md:gap-4 md:divide-x md:divide-black/10 md:dark:divide-white/10">
              {characterQuotes.map((character) => (
                <Reveal
                  key={character.name}
                  className="flex flex-col items-center gap-2 px-6 text-center"
                >
                  <p className="italic text-xl min-h-14 flex items-center text-gray-700 dark:text-gray-300">
                    &quot;{character.quote}&quot;
                  </p>
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full ring-2 ring-[#1272CC]/20 dark:ring-[#9379cc]/20">
                    <Image
                      src={character.image}
                      alt={character.imageAlt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold">{character.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">{character.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
