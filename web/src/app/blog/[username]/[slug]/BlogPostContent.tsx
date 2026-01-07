'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Header } from "@/components/Header/Header";
import BlogImage from "@/components/BlogImage/BlogImage";
import Image from "next/image";
import { useEffect, useState } from "react";
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

    // Track view on mount
    useEffect(() => {
        fetch(`/api/posts/${slug}/view`, { method: "POST" }).catch(() => { });
    }, [slug]);

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
        <div className="flex flex-col">
            <Header data={{
                title: post.title,
                subtext: "Author: " + username.charAt(0).toUpperCase() + username.substring(1, username.length)
            }} />

            <div className="w-full px-10 bg-white dark:bg-[#171717] pb-10">
                {/* Post meta bar: tags, comment, like, share */}
                <div className="max-w-prose mx-auto mt-4 flex flex-wrap items-center gap-3">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 flex-1">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollToComments}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Go to comments"
                        >
                            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <LikeButton slug={slug} initialLikes={post.likes || 0} showLikeCount={false} />
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Share post"
                        >
                            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
                    <div className="max-w-prose mx-auto mt-2">
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg object-cover"
                            priority
                        />
                    </div>
                )}
                <div className="flex flex-col prose lg:prose-xl dark:prose-invert mx-auto h-fit py-5">
                    <MDXRemote {...mdxSource} components={components} />
                </div>

                {/* Like & Comments Section */}
                <div id="comments-section" className="max-w-prose mx-auto mt-8">
                    <div className="flex items-center gap-4 mb-6">
                        <LikeButton slug={slug} initialLikes={post.likes || 0} />
                    </div>
                    <CommentSection slug={slug} />
                </div>
            </div>

            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-10 p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-lg"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
        </div>
    );
}
