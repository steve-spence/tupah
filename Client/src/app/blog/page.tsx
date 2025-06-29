// Blog Page
// Add some display page for the home page for blogs like these are all my blogs!

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Header } from '@/components/Header/Header'
import { NavIcon } from '@/components/NavIcon/NavIcon'
import { getAllPosts, mdxProps } from '@/lib/mdx';
import ClientSearch from '@/components/ClientSearch/ClientSerach'
import { TrendingCarousel } from '@/components/TrendingCarousel/TrendingCarousel'

// testing packages
import TextField from '@mui/material/TextField'
import Dropdown from 'react-bootstrap/Dropdown'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'

export default async function BlogPage() {
    const posts = getAllPosts();

    const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
    const randomPosts = shuffledPosts.slice(0, 3);

    return (
        <div className="bg-[#FAFAFA] dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100">
            {/* Header */}
            <section>
                <Header data={{ title: "Blogs", subtext: "I be bloggin'" }}
                    className="flex sm:justify-between justify-center bg-[#ffffff] dark:bg-[#272727] p-5 h-32 w-full z-2"
                />
            </section>

            <section>
                <div className="flex flex-col-reverse items-center sm:flex-row h-fit bg-[#ffffff] dark:bg-[#171717] p-5">
                    <div className="flex flex-col flex-1 p-10 text-center items-center justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                            Is Blogging Art?
                        </h1>
                        <p className="md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose">
                            Blogging is the art of capturing fleeting moments—like the neon glow of a Tokyo side street at dusk—and
                            transforming them into stories that resonate across time and space. Each post becomes a brushstroke,
                            blending personal insight with vivid imagery to create a living tapestry of ideas. Whether you’re sharing travel
                            musings, technical deep dives, or reflections on daily life, your words have the power to engage, inspire,
                            and connect. In this way, blogging isn’t just writing—it’s a form of modern storytelling that combines
                            creativity, authenticity, and community.
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-[50vw] mx-5">
                        <ImageCarousel
                            verticalImages={[
                                '/pictures/codingview.jpg',
                                '/pictures/codingview2.jpg',
                                '/pictures/japan_streetview.jpg',
                            ]}
                            wideImages={[
                                '/pictures/wide_codingview.jpg',
                                '/pictures/wide_japan_codingview.jpg',
                                '/pictures/wide_codingview2.jpg'
                            ]}
                        ></ImageCarousel>
                    </div>
                </div>
            </section >


            {/* Trending Section */}
            {/* < section className="flex items-center justify-center my-5" >
                <TrendingCarousel images={trending_images}></TrendingCarousel>
            </ section> */}

            {/* Search Bar */}
            < div className="flex justify-center items-center my-5 w-full" >
                <ClientSearch className="bg-[#2a8ae4] dark:bg-[#9379cc] rounded-4xl" posts={posts} />
            </ div>


            <section className="bg-gray-400 dark:bg-[#1a1a1a] p-10 text-white w-full mx-auto flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Why I Started Blogging</h2>
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed max-w-4xl">
                    I started blogging as a way to document what I'm working on — whether it's coding projects,
                    game design thoughts, or just cool stuff I’ve been learning. Writing helps me think more clearly
                    and gives me a place to look back at my progress. If someone else finds it helpful or interesting,
                    that’s just a bonus.
                </p>
            </section>

            {/* Random Posts Cards */}
            <div className="p-10 flex flex-wrap gap-6 justify-center bg-gray-400 dark:bg-[#1a1a1a]">
                {randomPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="max-w-sm bg-gray-600 dark:bg-[#272727] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                        <div className="relative h-40 w-full">
                            <Image src={post.image_path || "/pictures/blog/default.png"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 text-white">
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-sm text-gray-300 mt-2">{getPreview(post.content ?? '', 200)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )

}

function getPreview(content: string, length = 200) {
    return content
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/[#>*_\-\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, length) + '...';
}