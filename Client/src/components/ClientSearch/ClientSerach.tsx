'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import type { mdxProps } from '@/lib/mdx'

export default function ClientSearch({ posts }: { posts: mdxProps[] }) {
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(false);

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-[#9379cc] rounded-4xl m-10 p-4">
            <TextField
                className="w-full"
                label="Search"
                value={query}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => setQuery(e.target.value)}

            />

            <div className={`transitino-all duration-300 ease-in-out overflow-hidden 
                ${focus ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2 p-2 text-white">
                    {filtered.length === 0 && query !== '' ? (
                        <p>No posts found.</p>
                    ) : (
                        filtered.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <div className="bg-[#333] p-4 rounded-md hover:bg-[#444] transition flex flex-row items-center justify-between">
                                    <div className="relative w-15 h-15">
                                        <Image className="rounded-2xl" src={post.image_path} alt="Image for blog post" fill></Image>
                                    </div>
                                    <h3 className="text-lg font-bold">{post.title}</h3>
                                    <p className="text-sm text-gray-300">{post.date}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}