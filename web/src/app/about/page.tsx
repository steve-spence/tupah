"use client";

import React from "react";
import { Header } from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ProjectIcon } from "@/components/ProjectIcon/ProjectIcon";
import { Music, ChartSpline, BookOpenText, WandSparkles } from 'lucide-react';
import { environment } from "@/environments/environment";

//1272CC
//

// only load in client
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function AboutPage() {
  return (
    <div className="bg-white bg-linear-to-b dark:from-[#A1A1A1] dark:to-[#212121]">
      {/* Header */}
      <section className="relative">
        <Header data={{ title: "Steven Spencer", subtext: "About me", showLinks: false }} />
      </section>

      {/* Hero Section */}
      <div className="flex items-center justify-center bg-[#fffafa] bg-linear-to-b dark:from-[#1C1C1C] dark:to-[#131313]">
        <div
          className="flex flex-col md:flex-row-reverse items-center justify-center gap-5 grow-[0.6]
            text-[#000000] dark:text-[#ffffff] text-5xl font-sans h-[50vh] bg-white dark:bg-[#131313] shadow-md
            text-center"
        >
          <div className="relative w-60 h-auto aspect-3/4 rounded-3xl overflow-hidden">
            <Image
              className="object-cover"
              src="/pictures/good_pic.jpg"
              alt="The Hero"
              fill
            />
          </div>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString("Hi, I'm Steve.")
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

      {/* Dividor
      <div className="flex justify-center w-full h-fit py-5 bg-white dark:bg-[#0f0f0f]">
        <div className="relative w-[80%] h-1 bg-gray-900 dark:bg-[#eaeaea] rounded-4xl"></div>
      </div> */}

      {/* Who I Am */}
      <section className="p-10 flex flex-col justyify-center items-center w-full mx-auto bg-white bg-linear-to-b dark:from-[#131313] dark:to-[#212121] text-white">
        <div className="w-full md:w-[70%] lg:w-[50%] text-center flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Who I Am
          </h2>
          <p className="text-gray-900 dark:text-gray-200 font-semibold">
            I'm a new Computer Science graduate from Michigan State University.
            I have a background in web development, networking, game development and video editing.
            I was working as a student network engineer at MSU where I learned core networking concepts.
            After graduating University, I've found my passion lies in web development and entrepreneurship.
          </p>
          <p className="text-gray-900 dark:text-gray-200 font-semibold">
            Outside of code, I play guitar, dabble in game development,
            and I like reading. I've been building this blogging website,
            working on a game called <i>Witchpaw</i>, and editing videos.
            I'm always learning and staying curious to improve myself and my skills.
          </p>
        </div>
      </section>


      {/* Education Section */}
      <section className="p-10 dark:bg-[#212121]">
        <h2 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* MSU Card */}
          <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src="/pictures/msu_icon.png"
                  alt="Michigan State University"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Michigan State University
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2022 - 2026</p>
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
                • Member and winner of AI clab and its competitions, studied Machine Learning and developed AI-Driven full-stack applications
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                • My favorite classes were Operating Systems, Parallel Programming, Web Development, and Game Development
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                • Worked as a Student Network Engineer where I learned the fundamentals of enterprise networking
              </p>
            </div>
          </div>

          {/* Delta College Card */}
          <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src="/pictures/delta_icon.png"
                  alt="Delta College"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Delta College
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2020 - 2022</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                Associate's in Computer Programming
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
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="p-10 w-full mx-auto text-center dark:bg-[#212121]">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
          Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Urban Science */}
          <div className="bg-gray-300 dark:bg-[#161616] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow md:col-span-2">
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
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Generating Mapping Insights Using AI
              </h3>
            </div>
            <p className="text-gray-900 dark:text-gray-400 font-semibold mb-4">
              Developed an AI that reduced the need for OEM planners to reference legal documents when
              planning new locations to open dealerships. I worked in a team of 6 to create a full-stack
              web application that analyzed Ford's Key Performance Indicators and made accurate predictions
              where new dealerships could open legally. I created a Retrieval Augmented Generation (RAG)
              system that embeded documents enabling us to semantically search these legal documents to retrieve accurate
              legal information relevant to user queries. This app enabled OEM planners to get work done faster and
              achieve a better understanding of areas of opportunity within the Ford network.
            </p>
          </div>

          {/* Blog Portfolio */}
          <div className="bg-gray-300 dark:bg-[#161616] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              <BookOpenText className="inline-block text-amber-400 mr-1" /> Blog & Portfolio
            </h3>
            <p className="text-gray-900 dark:text-gray-400 font-semibold mb-4">
              My personal blog and site, which I built with Next.js, Tailwind,
              and Typescript. Enables users to write free-form blogs, comment, like, and view their
              analytics of all posts associated with their user id. I am using Supabase as a relational database
              to store relations and information about each user, as well as their buckets to store user uploads.
              I used Google Cloud Console to expose the site so the pages would appear on Google search results.
            </p>
            <Link
              href="/blog"
              className="text-[#1272CC] dark:text-purple-400 hover:underline"
            >
              View blog →
            </Link>
          </div>

          {/* FoxStocks */}
          <div className="bg-gray-300 dark:bg-[#161616] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow align-middle">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              <ChartSpline className="inline-block text-red-300 mr-1" /> AI Stock Prediction
            </h3>
            <p className="text-gray-900 dark:text-gray-400 font-semibold mb-4">
              LSTM + sentiment model that ingested Bloomberg news articles for the day
              and attempted to predict the future price movements. I worked on the LSTM model, which
              used Pytorch and I also scraped all the article data and turned them into sentiment scores.
            </p>
            <Link
              href="https://github.com/MSU-AI/investment-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1272CC] dark:text-purple-400 hover:underline"
            >
              View on GitHub →
            </Link>
          </div>

          {/* Music AI */}
          <div className="bg-gray-300 dark:bg-[#161616] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2 flex justify-center items-center gap-2">
              <Music className="inline-block text-blue-400 mr-1" /> Music AI Assistant
            </h3>
            <p className="text-gray-900 dark:text-gray-400 font-semibold mb-4">
              Digital Audio Workstation (DAW) simplified! Ambitious project that aims to
              take human humming and beatboxing and convert it into real notes you can
              move around and play with.
            </p>
            <Link
              href="https://github.com/MSU-AI/investment-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1272CC] dark:text-purple-400 hover:underline"
            >
              View on GitHub →
            </Link>
          </div>

          {/* Witchpaw */}
          <div className="bg-gray-300 dark:bg-[#161616] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              <WandSparkles className="inline-block text-green-600 mr-1" /> Witchpaw
            </h3>
            <p className="text-gray-900 dark:text-gray-400 mb-4 font-semibold">
              A magic-focused indie game where you play as a raccoon wizard.
              Built in Unity, inspired by Soulslike aesthetics. This is not public yet,
              but I have some small projects I built on Itch.io (Metriod Recreation!).
            </p>
            <Link
              href="https://seaharpy.itch.io/"
              className="text-[#1272CC] dark:text-purple-400 hover:underline"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="flex flex-col items-center gap-4 bg-gary-500 dark:bg-[#212121] pb-10">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          What can I work in?
        </h2>
        <p className="text-[#000000] dark:text-[#ffffff] text-center px-10 pb-5 lg:px-30">
          I am happy to learn a new language or API, I actaully like what I do (shocker!).
          These are some of the technoloiges I've learned to use on my
          own.
        </p>
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-black dark:text-gray-200">
          {[
            { icon_path: "/icons/react.svg", subscript: "React" },
            { icon_path: "/icons/nextjs.svg", subscript: "Next.js" },
            { icon_path: "/icons/tailwind.svg", subscript: "Tailwind" },
            { icon_path: "/icons/typescript.svg", subscript: "TypeScript" },
            { icon_path: "/icons/html.svg", subscript: "HTML" },
            { icon_path: "icons/css.svg", subscript: "CSS" },
            { icon_path: "/icons/javascript.svg", subscript: "JavaScript" },
            { icon_path: "/icons/mysql.svg", subscript: "MySQL" },
            { icon_path: "/icons/python.svg", subscript: "Python" },
            { icon_path: "/icons/c_plus_plus.svg", subscript: "C++" },
            { icon_path: "/icons/unity.svg", subscript: "Unity (C#)" },
            { icon_path: "/icons/blender.svg", subscript: "Blender" },
          ].map((proj, i) => (
            <li
              key={i}
              className="bg-gray-400 dark:bg-[#161616] px-4 py-2 rounded-lg transition-all hover:scale-110 hover:bg-gray-500 dark:hover:bg-[#212121]"
            >
              <ProjectIcon project_props={proj} />
            </li>
          ))}
        </ul>
      </section>

      {/* Lets Build */}
      <section className="dark:bg-[#212121]  text-white py-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
          Let’s build together.
        </h2>
        <p className="max-w-2xl text-gray-900 dark:text-gray-300 mb-6 font-semibold px-10">
          Whether it’s an idea for a website, a new startup, or contract work
          I’m always open to new projects or jobs. I’ve been working with AI/ML
          and building full-stack applications for about a year now.
          If you think we could build out your idea, let me know! We can make it happen.
        </p>
        <a
          href={`mailto:${environment.person_email}`}
          className="bg-blue-500 hover:bg-blue-400 dark:bg-[#9379cc] dark:hover:bg-[#9379cc] text-white font-medium py-3 px-6 rounded-xl transition duration-300">
          Contact Me
        </a>
      </section>


      <section className="relative py-10 bg-gray-150 dark:bg-[#212121]  text-white text-center shadow-2xl">
        <h1 className="text-3xl text-black dark:text-white font-bold mb-8">Connect with Me!</h1>

        <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
          {/* GitHub */}
          <Link
            href="https://github.com/steve-spence"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <div className="relative w-12 h-12 mb-2">
              <Image
                className="select-none"
                fill
                src="/icons/github-logo.svg"
                alt="GitHub"
              />
            </div>
            <span className="text-sm text-gray-900 dark:text-white">Github</span>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com/in/stevenallenspencer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <div className="relative w-12 h-12 mb-2">
              <Image
                className="select-none"
                fill
                src="/icons/linkedin-logo.svg"
                alt="LinkedIn"
              />
            </div>
            <span className="text-sm text-gray-900 dark:text-white">Linkedin</span>
          </Link>

          {/* Email */}
          <Link
            href="mailto:stevenistotallyawesome@gmail.com"
            className=""
          >
            <div className="relative w-12 h-12 mb-2">
              <Image
                className="select-none"
                fill
                src="/icons/email-logo.svg"
                alt="Email"
              />
            </div>
            <span className="text-sm text-gray-900 dark:text-white">Email</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
