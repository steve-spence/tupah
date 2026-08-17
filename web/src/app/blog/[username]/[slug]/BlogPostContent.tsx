'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Header } from "@/components/Header/Header";
import BlogImage from "@/components/BlogImage/BlogImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { MessageCircle, Share2, ArrowUp } from "lucide-react";
import Snackbar from '@mui/material/Snackbar';

interface BlogPostContentProps {
    post: {
        title: string;
        likes: number;
        tags: string[];
        cover_image_url: string | null;
    };
    username: string;
    slug: string;
    mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPostContent({ post, username, slug, mdxSource }: BlogPostContentProps) {
    const [showCopied, setShowCopied] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Track view on mount
    useEffect(() => {
        fetch(`/api/posts/${slug}/view`, { method: "POST" }).catch(() => { });
    }, [slug]);

    // Back-to-top button only appears once the reader has scrolled past the fold
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 480);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const components = {
        BlogImage,
    };

    const scrollToComments = () => {
        document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: post.title, url });
            } catch {
                // User cancelled or error
            }
        } else {
            await navigator.clipboard.writeText(url);
            setShowCopied(true);
        }
    };

    return (
        <>
            {/* Background — CSS grid, pinned behind everything, matches the rest of the site */}
            <div
                className="fixed inset-0 -z-10 bg-white dark:bg-[#121212] [--grid-line:rgba(0,0,0,0.06)] dark:[--grid-line:rgba(255,255,255,0.07)]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="flex flex-col bg-white dark:bg-transparent transition-colors duration-300">
                <Header data={{
                    title: post.title,
                    subtext: "Author: " + username.charAt(0).toUpperCase() + username.substring(1, username.length)
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full px-6 pb-16"
                >
                    {/* Post meta bar: tags, comment, like, share */}
                    <div className="max-w-prose mx-auto mt-8 flex flex-wrap items-center gap-3">
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 flex-1">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm rounded-full bg-[#1272CC]/10 dark:bg-[#9379cc]/15 text-[#1272CC] dark:text-[#9379cc] font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={scrollToComments}
                                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-[#1272CC] dark:hover:text-[#9379cc] hover:bg-[#1272CC]/10 dark:hover:bg-[#9379cc]/10 transition-colors"
                                aria-label="Go to comments"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <LikeButton slug={slug} initialLikes={post.likes || 0} showLikeCount={false} />
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-[#1272CC] dark:hover:text-[#9379cc] hover:bg-[#1272CC]/10 dark:hover:bg-[#9379cc]/10 transition-colors"
                                aria-label="Share post"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <Snackbar
                        open={showCopied}
                        autoHideDuration={2000}
                        onClose={() => setShowCopied(false)}
                        message="Link copied to clipboard"
                    />

                    {post.cover_image_url && (
                        <div className="relative max-w-prose mx-auto mt-6 aspect-video overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/10">
                            <Image
                                src={post.cover_image_url}
                                alt={post.title}
                                fill
                                sizes="(min-width: 768px) 65ch, 100vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="flex flex-col prose lg:prose-xl dark:prose-invert prose-a:text-[#1272CC] dark:prose-a:text-[#9379cc] mx-auto h-fit py-8">
                        <MDXRemote {...mdxSource} components={components} />
                    </div>

                    {/* Like & Comments Section */}
                    <div
                        id="comments-section"
                        className="relative left-1/2 -translate-x-1/2 w-[90vw] mt-4 rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <LikeButton slug={slug} initialLikes={post.likes || 0} />
                        </div>
                        <CommentSection slug={slug} />
                    </div>
                </motion.div>

                {/* Back to top button */}
                <AnimatePresence>
                    {showBackToTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.7, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: 10 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ duration: 0.2 }}
                            onClick={scrollToTop}
                            className="fixed bottom-10 right-10 p-3 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur text-gray-600 dark:text-gray-400 hover:text-[#1272CC] dark:hover:text-[#9379cc] hover:border-[#1272CC]/50 dark:hover:border-[#9379cc]/50 shadow-lg transition-colors"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
