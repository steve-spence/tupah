// Blog Page
// Add some display page for the home page for blogs like these are all my blogs!
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import { Header } from "@/components/Header/Header";
import ClientSearch from "@/components/ClientSearch/ClientSerach";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { Post } from "@/utils/types";

const AMOUNT_OF_POSTS = 10;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs', { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load posts.");
        const data: Post[] = await res.json();

        setPosts(data);

        const shuffledPosts = [...data].sort(() => Math.random() - 0.5);
        setRandomPosts(shuffledPosts.slice(0, AMOUNT_OF_POSTS));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <section>
        <Header data={{ title: "Blogs", subtext: "We be bloggin'" }} />
      </section>

      <section>
        <div className="flex flex-col-reverse items-center sm:flex-row h-fit bg-[#ffffff] dark:bg-[#171717] p-5">
          <div className="flex flex-col flex-1 p-10 text-center items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
              Is Blogging Art?
            </h1>
            <p className="md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose">
              While you might not see blogging in a gallery or museum, it's still a form
              of self-expression. When others share a personal story, solve a
              problem, or just document thier experiences, they create something.
              The way an author structures thier words, images, or even thier site’s layout. It
              all adds up to a creative fingerprint. You don’t need to be a
              professional writer to make something meaningful. In the end,
              blogging is less about being perfect and more about being yourself.
            </p>
          </div>
          <div className="flex items-center justify-center w-[50vw] mx-5">
            <ImageCarousel
              verticalImages={[
                "/pictures/codingview.jpg",
                "/pictures/codingview2.jpg",
                "/pictures/japan_streetview.jpg",
              ]}
              wideImages={[
                "/pictures/wide_codingview.jpg",
                "/pictures/wide_japan_codingview.jpg",
                "/pictures/wide_codingview2.jpg",
              ]}
            ></ImageCarousel>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center items-center my-5 w-full">
        <ClientSearch
          className="bg-[#2a8ae4] dark:bg-radial from-[#9379cc] to-[#c0abe6] rounded-4xl"
          posts={posts}
        />
      </div>

      <section className="bg-gray-400 dark:bg-[#1a1a1a] p-10 text-white w-full mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Why I Started Blogging
        </h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed max-w-4xl">
          I started blogging as a way to document what I'm working on — whether
          it's coding projects, game design thoughts, or just cool stuff I’ve
          been learning. Writing helps me think more clearly and gives me a
          place to look back at my progress. If someone else finds it helpful or
          interesting, that is the whole reason.
        </p>
      </section>

      {/* Random Posts Cards */}
      <div className="p-10 flex flex-wrap gap-6 justify-center bg-gray-400 dark:bg-[#1a1a1a]">
        {randomPosts.map((post) => {
          //console.log(post);
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="max-w-sm bg-gray-600 dark:bg-[#272727] rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={post.cover_image_path ?? "/pictures/blog/default.png"}
                  alt={post.title ?? "Blog cover"}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-white">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-gray-300 mt-2">
                  {getPreview(post.contentMd ?? "", 200)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

function getPreview(content: string, length = 200) {
  return (
    content
      .replace(/^---[\s\S]*?---/, "") // Strip frontmatter
      .replace(/!\[.*?\]\(.*?\)/g, "") // Strip images
      .replace(/^# .*$\n?/m, "")
      .replace(/<BlogImage\s+[^>]*\/>/g, "")
      .replace(/[#>*_\-\n]/g, " ") // Strip markdown syntax
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim()
      .slice(0, length) + "..."
  );
}
