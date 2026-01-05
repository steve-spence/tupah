'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Header } from "@/components/Header/Header";
import BlogImage from "@/components/BlogImage/BlogImage";
import Image from "next/image";
import { useEffect } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

interface BlogPostContentProps {
    post: {
        title: string;
        likes: number;
        cover_image_url: string | null;
    };
    username: string;
    slug: string;
    mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPostContent({ post, username, slug, mdxSource }: BlogPostContentProps) {
    // Track view on mount
    useEffect(() => {
        fetch(`/api/posts/${slug}/view`, { method: "POST" }).catch(() => { });
    }, [slug]);

    const components = {
        BlogImage,
    };

    return (
        <div className="flex flex-col">
            <section id="home">
                <Header data={{
                    title: post.title,
                    subtext: "Author: " + username.charAt(0).toUpperCase() + username.substring(1, username.length)
                }} />
            </section>

            <div className="w-full px-10 bg-white dark:bg-[#171717] pb-10">
                {post.cover_image_url && (
                    <div className="max-w-prose mx-auto pt-8">
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
                <div className="max-w-prose mx-auto mt-8">
                    <div className="flex items-center gap-4 mb-6">
                        <LikeButton slug={slug} initialLikes={post.likes || 0} />
                    </div>
                    <CommentSection slug={slug} />
                </div>
            </div>
        </div>
    );
}
