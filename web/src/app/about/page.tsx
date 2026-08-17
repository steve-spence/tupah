"use client";

import React from "react";
import { motion } from "motion/react";
import { Header } from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ProjectIcon } from "@/components/ProjectIcon/ProjectIcon";
import { Music, ChartSpline, BookOpenText, WandSparkles } from 'lucide-react';
import { environment } from "@/environments/environment";

// only load in client
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

// Scroll-reveal wrapper: children fade up into view as the user scrolls
function Reveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Soft, slowly-drifting accent blob — decorative "moving component" that sits
// behind panel content. Pure CSS animation, no scroll/ref wiring required.
function AmbientGlow({ className, duration = "16s" }: { className?: string; duration?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-[#1272CC]/10 dark:bg-[#9379cc]/15 blur-3xl ${className ?? ""}`}
      style={{ animation: `tupah-blob-float ${duration} ease-in-out infinite` }}
    />
  );
}

const panelGridStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, var(--panel-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--panel-grid-line) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const panelClassName =
  "relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] [--panel-grid-line:rgba(18,114,204,0.08)] dark:[--panel-grid-line:rgba(147,121,204,0.1)]";

const cardClassName =
  "rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/20 transition-colors hover:border-[#1272CC]/50 dark:hover:border-[#9379cc]/50";

const skills = [
  { icon_path: "/icons/react.svg", subscript: "React" },
  { icon_path: "/icons/nextjs.svg", subscript: "Next.js" },
  { icon_path: "/icons/tailwind.svg", subscript: "Tailwind" },
  { icon_path: "/icons/typescript.svg", subscript: "TypeScript" },
  { icon_path: "/icons/html.svg", subscript: "HTML" },
  { icon_path: "/icons/css.svg", subscript: "CSS" },
  { icon_path: "/icons/javascript.svg", subscript: "JavaScript" },
  { icon_path: "/icons/mysql.svg", subscript: "MySQL" },
  { icon_path: "/icons/python.svg", subscript: "Python" },
  { icon_path: "/icons/c_plus_plus.svg", subscript: "C++" },
  { icon_path: "/icons/unity.svg", subscript: "Unity (C#)" },
  { icon_path: "/icons/blender.svg", subscript: "Blender" },
];

export default function AboutPage() {
  return (
    <>
      {/* Background — CSS grid, pinned behind everything, matches the home page */}
      <div
        className="fixed inset-0 -z-10 bg-white dark:bg-[#121212] [--grid-line:rgba(0,0,0,0.06)] dark:[--grid-line:rgba(255,255,255,0.07)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="flex flex-col bg-white dark:bg-transparent transition-colors duration-300">
        {/* Header */}
        <section className="relative">
          <Header data={{ title: "Steven Spencer", subtext: "About me", showLinks: false }} />
        </section>

        {/* Hero */}
        <section className="w-full px-6 py-16 md:py-24">
          <Reveal className={`mx-auto w-full max-w-[90rem] p-6 sm:p-10 md:p-14 ${panelClassName}`} style={panelGridStyle}>
            <AmbientGlow className="-top-24 -right-16 h-72 w-72" duration="18s" />

            <div className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-10 md:gap-16">
              <div className="relative w-56 sm:w-64 aspect-3/4 shrink-0 rounded-3xl overflow-hidden ring-2 ring-[#1272CC]/20 dark:ring-[#9379cc]/20">
                <Image
                  className="object-cover"
                  src="/pictures/good_pic.jpg"
                  alt="Steven Spencer"
                  fill
                />
              </div>
              <div className="min-h-[1.5em] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center md:text-left">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(2500)
                      .typeString("Hi, I'm Steven.")
                      .pauseFor(2500) // show full text for 2.5s
                      .deleteAll() // wipe it
                      .typeString("I build software solutions.")
                      .pauseFor(2500)
                      .deleteAll()
                      .typeString("Let's talk.")
                      .pauseFor(2500)
                      .start(); // kick off the loop
                  }}
                  options={{
                    loop: true,
                    delay: 50,
                    deleteSpeed: 25,
                  }}
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Who I Am */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className={`mx-auto w-full max-w-4xl p-8 sm:p-12 text-center ${panelClassName}`} style={panelGridStyle}>
            <AmbientGlow className="-bottom-20 -left-16 h-56 w-56" duration="14s" />

            <div className="relative flex flex-col gap-5">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Who I Am
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                I&apos;m a new Computer Science graduate from Michigan State University.
                I have a background in web development, networking, game development and video editing.
                I was working as a student network engineer at MSU where I learned core networking concepts.
                After graduating University, I&apos;ve found my passion lies in web development and entrepreneurship.
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                Outside of code, I play guitar, dabble in game development,
                and I like reading. I&apos;ve been building this blogging website,
                working on a game called <i>Witchpaw</i>, and editing videos.
                I&apos;m always learning and staying curious to improve myself and my skills.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Education */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Education
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* MSU Card */}
            <Reveal className={`${cardClassName} p-6`}>
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src="/pictures/msu_icon.png"
                    alt="Michigan State University"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Michigan State University
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">2022 - 2025</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Baccalaureate in Computer Science
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Graduated in December 2025
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Member and winner of AI club and its competitions, studied Machine Learning and developed AI-driven full-stack applications
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • My favorite classes were Operating Systems, Parallel Programming, Web Development, and Game Development
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Worked as a Student Network Engineer where I learned the fundamentals of enterprise networking
                </p>
              </div>
            </Reveal>

            {/* Delta College Card */}
            <Reveal className={`${cardClassName} p-6`}>
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src="/pictures/delta_icon.png"
                    alt="Delta College"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delta College
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">2020 - 2022</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Associate&apos;s in Computer Programming
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Graduated in May 2022
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Developed full-stack applications using Java, SQL, and Node.js
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Learned object-oriented programming / data structures and algorithms
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • Completed projects involving web development and database design
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  • This was from 2020-2022, COVID-19 took away a lot of the freedom I wished I had at this college
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Projects */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className="mx-auto mb-10 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Urban Science */}
            <Reveal className={`${cardClassName} p-6 md:col-span-2`}>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-3">
                <div className="shrink-0">
                  <Image
                    className="select-none bg-white rounded-sm p-2"
                    width={300}
                    height={60}
                    src="/urbanscience.svg"
                    alt="Urban Science"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generating Mapping Insights Using AI
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-400 font-semibold">
                Developed an AI that reduced the need for OEM planners to reference legal documents when
                planning new locations to open dealerships. I worked in a team of 6 to create a full-stack
                web application that analyzed Ford&apos;s Key Performance Indicators and made accurate predictions
                where new dealerships could open legally. I created a Retrieval Augmented Generation (RAG)
                system that embedded documents enabling us to semantically search these legal documents to retrieve accurate
                legal information relevant to user queries. This app enabled OEM planners to get work done faster and
                achieve a better understanding of areas of opportunity within the Ford network.
              </p>
            </Reveal>

            {/* Blog Portfolio */}
            <Reveal className={`${cardClassName} p-6`}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <BookOpenText className="inline-block text-amber-400 mr-1" /> Blog &amp; Portfolio
              </h3>
              <p className="text-gray-700 dark:text-gray-400 font-semibold mb-4">
                My personal blog and site, which I built with Next.js, Tailwind,
                and Typescript. Enables users to write free-form blogs, comment, like, and view their
                analytics of all posts associated with their user id. I am using Supabase as a relational database
                to store relations and information about each user, as well as their buckets to store user uploads.
                I used Google Cloud Console to expose the site so the pages would appear on Google search results.
              </p>
              <Link
                href="/blog"
                className="text-[#1272CC] dark:text-[#9379cc] hover:underline"
              >
                View blog →
              </Link>
            </Reveal>

            {/* FoxStocks */}
            <Reveal className={`${cardClassName} p-6`}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <ChartSpline className="inline-block text-red-300 mr-1" /> AI Stock Prediction
              </h3>
              <p className="text-gray-700 dark:text-gray-400 font-semibold mb-4">
                LSTM + sentiment model that ingested Bloomberg news articles for the day
                and attempted to predict the future price movements. I worked on the LSTM model, which
                used Pytorch and I also scraped all the article data and turned them into sentiment scores.
              </p>
              <Link
                href="https://github.com/MSU-AI/investment-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1272CC] dark:text-[#9379cc] hover:underline"
              >
                View on GitHub →
              </Link>
            </Reveal>

            {/* Music AI */}
            <Reveal className={`${cardClassName} p-6`}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Music className="inline-block text-blue-400 mr-1" /> Music AI Assistant
              </h3>
              <p className="text-gray-700 dark:text-gray-400 font-semibold mb-4">
                Digital Audio Workstation (DAW) simplified! Ambitious project that aims to
                take human humming and beatboxing and convert it into real notes you can
                move around and play with.
              </p>
              <Link
                href="https://github.com/MSU-AI/investment-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1272CC] dark:text-[#9379cc] hover:underline"
              >
                View on GitHub →
              </Link>
            </Reveal>

            {/* Witchpaw */}
            <Reveal className={`${cardClassName} p-6`}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <WandSparkles className="inline-block text-green-600 mr-1" /> Witchpaw
              </h3>
              <p className="text-gray-700 dark:text-gray-400 font-semibold mb-4">
                A magic-focused indie game where you play as a raccoon wizard.
                Built in Unity, inspired by Soulslike aesthetics. This is not public yet,
                but I have some small projects I built on Itch.io (Metroid Recreation!).
              </p>
              <Link
                href="https://seaharpy.itch.io/"
                className="text-[#1272CC] dark:text-[#9379cc] hover:underline"
              >
                Learn more →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Skills */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              What can I work in?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
              I am happy to learn a new language or API, I actually like what I do (shocker!).
              These are some of the technologies I&apos;ve learned to use on my own.
            </p>
            <ul className="mt-2 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {skills.map((proj, i) => (
                <li
                  key={i}
                  className={`${cardClassName} px-4 py-3 transition-transform hover:scale-110`}
                >
                  <ProjectIcon project_props={proj} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Let's Build */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className={`mx-auto w-full max-w-4xl p-10 sm:p-14 text-center ${panelClassName}`} style={panelGridStyle}>
            <AmbientGlow className="-top-16 -left-20 h-64 w-64" duration="20s" />

            <div className="relative flex flex-col items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Let&apos;s build{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1272CC] to-[#5994cc] dark:from-[#b79bf3] dark:to-[#9379cc]">
                  together.
                </span>
              </h2>
              <p className="max-w-2xl text-gray-700 dark:text-gray-300 font-semibold">
                Whether it&apos;s an idea for a website, a new startup, or contract work,
                I&apos;m always open to new projects or jobs. I&apos;ve been working with AI/ML
                and building full-stack applications for about a year now.
                If you think we could build out your idea, let me know! We can make it happen.
              </p>
              <a
                href={`mailto:${environment.person_email}`}
                className="mt-2 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white bg-linear-to-r from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#562e9b]"
              >
                Contact Me
              </a>
            </div>
          </Reveal>
        </section>

        {/* Connect */}
        <section className="w-full px-6 pb-24">
          <Reveal className={`mx-auto w-full max-w-4xl p-10 text-center ${panelClassName}`} style={panelGridStyle}>
            <h2 className="relative text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Connect with Me!
            </h2>

            <div className="relative flex flex-wrap justify-center items-center gap-10">
              {/* GitHub */}
              <Link
                href="https://github.com/steve-spence"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="relative w-12 h-12">
                  <Image
                    className="select-none"
                    fill
                    src="/icons/github-logo.svg"
                    alt="GitHub"
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Github</span>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://linkedin.com/in/stevenallenspencer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="relative w-12 h-12">
                  <Image
                    className="select-none"
                    fill
                    src="/icons/linkedin-logo.svg"
                    alt="LinkedIn"
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Linkedin</span>
              </Link>

              {/* Email */}
              <Link
                href="mailto:stevenistotallyawesome@gmail.com"
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="relative w-12 h-12">
                  <Image
                    className="select-none"
                    fill
                    src="/icons/email-logo.svg"
                    alt="Email"
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
