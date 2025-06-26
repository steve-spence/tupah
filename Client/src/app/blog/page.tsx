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

export default async function BlogPage() {
    const posts = getAllPosts();

    const trending_images: string[] = [
        "/pictures/blog/solo_leveling.png",
        "/pictures/blog/solo_leveling.png",
        "/pictures/blog/solo_leveling.png",
    ];

    const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
    const randomPosts = shuffledPosts.slice(0, 3);

    return (
        <div>
            {/* Header */}
            <section>
                <Header data={{ title: "Blogs", subtext: "I be bloggin'" }}
                    className="flex sm:justify-between justify-center bg-[#272727] p-5 h-32 w-full z-2"
                />
            </section>


            {/* Trending Section */}
            <section className="flex items-center justify-center my-5">
                <TrendingCarousel images={trending_images}></TrendingCarousel>
            </section>

            {/* Search Bar */}
            <div className="flex justify-center items-center my-5 w-full">
                <ClientSearch className="bg-[#9379cc] rounded-4xl" posts={posts} />
            </div>


            <section className="bg-[#1a1a1a] p-10 text-white w-full mx-auto flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-4">Why I Started Blogging</h2>
                <p className="text-gray-300 leading-relaxed max-w-4xl">
                    I started blogging as a way to document what I'm working on — whether it's coding projects,
                    game design thoughts, or just cool stuff I’ve been learning. Writing helps me think more clearly
                    and gives me a place to look back at my progress. If someone else finds it helpful or interesting,
                    that’s just a bonus.
                </p>
            </section>

            {/* Random Posts Cards */}
            <div className="p-10 flex flex-wrap gap-6 justify-center bg-[#1a1a1a]">
                {randomPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="max-w-sm bg-[#272727] rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                        <div className="relative h-40 w-full">
                            <Image src={post.image_path || "/pictures/blog/default.png"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 text-white">
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{getPreview(post.content ?? '', 200)}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
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