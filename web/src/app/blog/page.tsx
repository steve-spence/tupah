// Blog Page
// Add some display page for the home page for blogs like these are all my blogs!
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Header } from "@/components/Header/Header";
import ClientSearch from "@/components/ClientSearch/ClientSerach";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { Post } from "@/utils/types";
import Loading from "@/components/Loading/Loading";
import { getRandomPosts } from "@/services/post";

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

export default function BlogPage() {
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Getting the random posts from the post service
  useEffect(() => {
    getRandomPosts()
      .then((data) => setRandomPosts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

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
        <section>
          <Header data={{ title: "Blogs", subtext: "We be bloggin'" }} />
        </section>

        {/* Hero */}
        <section className="w-full px-6 py-16 md:py-24">
          <Reveal
            className="relative mx-auto w-full max-w-[90rem] overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-6 sm:p-10 md:p-14 [--panel-grid-line:rgba(18,114,204,0.08)] dark:[--panel-grid-line:rgba(147,121,204,0.1)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--panel-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--panel-grid-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <AmbientGlow className="-top-24 -right-16 h-72 w-72" duration="18s" />

            <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                  Is Blogging{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1272CC] to-[#5994cc] dark:from-[#b79bf3] dark:to-[#9379cc]">
                    Art?
                  </span>
                </h1>
                <p className="md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose">
                  While you might not see blogging in a gallery or museum, it&apos;s still a form
                  of self-expression. When others share a personal story, solve a
                  problem, or just document their experiences, they create something.
                  The way an author structures their words, images, or even their site&apos;s
                  layout, it all adds up to a creative fingerprint. You don&apos;t need to be a
                  professional writer to make something meaningful. In the end,
                  blogging is less about being perfect and more about being yourself.
                </p>
              </div>
              <div className="relative w-full">
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
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Search Bar */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1272CC] dark:text-[#9379cc]">
              Find something to read
            </p>
            <ClientSearch className="w-full" />
          </Reveal>
        </section>

        {/* Why I Started Blogging */}
        <section className="w-full px-6 pb-16 md:pb-24">
          <Reveal
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-8 sm:p-12 text-center [--panel-grid-line:rgba(18,114,204,0.08)] dark:[--panel-grid-line:rgba(147,121,204,0.1)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--panel-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--panel-grid-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <AmbientGlow className="-bottom-20 -left-16 h-56 w-56" duration="14s" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Why I Started Blogging
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
                I started blogging as a way to document what I&apos;m working on. It could be
                coding projects (likely), dev logs, or just cool stuff/rambles I might have.
                Writing helps me think more clearly and gives me a place to look back at my progress.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Random Posts */}
        <section className="w-full px-6 pb-24">
          <Reveal className="mx-auto mb-10 max-w-[90rem] text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Jump In Somewhere
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              A handful of posts, picked at random.
            </p>
          </Reveal>

          <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {randomPosts.map((post) => {
              // Use direct Supabase URL if available, otherwise fall back to API route
              const imageSrc = post.cover_image_url
                ?? (post.cover_image_id ? `/api/media/${post.cover_image_id}` : null)
                ?? "/pictures/blog/default.png";
              return (
                <Reveal key={post.slug}>
                  <Link
                    href={`/blog/${post.username}/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/20 transition-colors hover:border-[#1272CC]/50 dark:hover:border-[#9379cc]/50"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={post.title ?? "Blog cover"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {getPreview(post.content_md ?? "", 160)}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </>
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
