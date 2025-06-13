'use client'

import Link from 'next/link'
import { useState } from 'react'
import TextField from '@mui/material/TextField'

import type { mdxProps } from '@/lib/mdx'

export default function ClientSearch({ posts }: { posts: mdxProps[] }) {
    const [query, setQuery] = useState('');

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-[#9379cc] rounded-4xl m-10 p-4">
            <TextField
                className="w-full"
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="flex flex-col gap-4 p-4 text-white">
                {filtered.length === 0 && query !== '' ? (
                    <p>No posts found.</p>
                ) : (
                    filtered.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <div className="bg-[#333] p-4 rounded-md hover:bg-[#444] transition">
                                <h3 className="text-lg font-bold">{post.title}</h3>
                                <p className="text-sm text-gray-300">{post.date}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}