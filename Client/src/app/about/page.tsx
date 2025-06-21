
import React from 'react'
import { Header } from '@/components/Header/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <div>
            {/* Header */}
            <section className="relative">
                <Header data={{ title: "Steven Spencer", subtext: "About me" }}
                    className="flex sm:justify-between justify-center bg-[#272727] p-5 h-32 w-full z-2" />
            </section>

            {/* Hero Section */}
            <div className="flex flex-row w-full h-[50vh] bg-[#131313] items-center justify-center gap-10">
                <div className="text-[#ffffff]">
                    <h1 className="font-sans font-bold text-4xl">Hey, I'm Steve.</h1>
                </div>
                <div className="relative w-60 aspect-[3/4] rounded-3xl overflow-hidden">
                    <Image className="object-cover" src="/pictures/good_pic.jpg" alt="The Hero" fill ></Image>
                </div>

            </div>

            <section className="bg-[#0f0f0f] text-white py-16 px-6 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Let’s build something together.
                </h2>
                <p className="max-w-2xl text-gray-400 mb-6">
                    Whether it’s a sleek website, an AI-powered app, or a creative experiment, I’m always open to new projects.
                    I’ve been exploring LLMs, training models, and building full-stack applications. If you've got an idea, I’m in.
                </p>
                <Link
                    href="stevenallenspencer@gmail.com"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition duration-300"
                >
                    Contact Me
                </Link>
            </section>

            {/* Background / Bio Section */}
            <section className="p-10 flex flex-col gap-6 max-w-4xl mx-auto bg-[#0f0f0f] text-white">
                <h2 className="text-2xl font-bold">Who I Am</h2>
                <p className="text-gray-300">
                    I’m Steven Spencer, a self-taught web developer with a background in computer science and a soft spot for clean interfaces.
                    I’ve been building apps, experimenting with animation, and writing code that doesn't make me cringe when I come back to it 6 months later.
                </p>
                <p className="text-gray-300">
                    Outside of code, I play guitar, mess around with game development, and pretend I’m better at chess than I actually am.
                    I'm currently building my personal blog and working on a game called <i>Witchpaw</i>.
                </p>
            </section>


            <section className="p-10 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Projects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Project 1 */}
                    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-white mb-2">🧙 Witchpaw</h3>
                        <p className="text-gray-400 mb-4">
                            A magic-focused indie game where you play as a raccoon wizard. Built in Unity, inspired by Soulslike aesthetics.
                        </p>
                        <Link
                            href="/projects/witchpaw" // Replace with actual route or GitHub
                            className="text-purple-400 hover:underline"
                        >
                            Learn more →
                        </Link>
                    </div>

                    {/* Project 2 */}
                    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-white mb-2">📓 Blog & Portfolio</h3>
                        <p className="text-gray-400 mb-4">
                            My personal blog and site (this one!) built with Next.js, Tailwind, MDX, and good vibes. Fully responsive and searchable.
                        </p>
                        <Link
                            href="/blog"
                            className="text-purple-400 hover:underline"
                        >
                            View blog →
                        </Link>
                    </div>

                    {/* Project 3 */}
                    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-white mb-2">📈 AI Stock Prediction</h3>
                        <p className="text-gray-400 mb-4">
                            LSTM + sentiment model to predict stock movement using hourly price windows and news article timestamps.
                        </p>
                        <Link
                            href="https://github.com/MSU-AI/investment-ai" // Update with real repo
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:underline"
                        >
                            View on GitHub →
                        </Link>
                    </div>
                </div>
            </section>


            <section className="relative py-16 bg-[#131313] text-white text-center">
                <h1 className="text-3xl font-bold mb-8">Connect with Me</h1>

                <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
                    {/* GitHub */}
                    <Link
                        href="https://github.com/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        <div className="relative w-12 h-12 mb-2">
                            <Image fill src="/icons/github-logo.svg" alt="GitHub" />
                        </div>
                        <span className="text-sm text-gray-300">GitHub</span>
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://linkedin.com/in/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        <div className="relative w-12 h-12 mb-2">
                            <Image fill src="/icons/linkedin-logo.svg" alt="LinkedIn" />
                        </div>
                        <span className="text-sm text-gray-300">LinkedIn</span>
                    </Link>

                    {/* Email */}
                    <Link
                        href="mailto:steven@example.com"
                        className="flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        <div className="relative w-12 h-12 mb-2">
                            <Image fill src="/icons/email-logo.svg" alt="Email" />
                        </div>
                        <span className="text-sm text-gray-300">Email</span>
                    </Link>
                </div>
            </section>





            {/* Skills Section */}
            <section className="p-10 bg-[#0f0f0f]">
                <h2 className="text-2xl font-bold mb-4">Tech I Use</h2>
                <ul className="flex flex-wrap gap-4 text-gray-200">
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">React</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">Next.js</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">Tailwind CSS</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">TypeScript</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">Python</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">MySQL</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">Unity (C#)</li>
                    <li className="bg-[#272727] px-4 py-2 rounded-lg">FastAPI</li>
                </ul>
            </section>
        </div>
    )

}