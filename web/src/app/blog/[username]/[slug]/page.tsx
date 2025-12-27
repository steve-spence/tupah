'use client'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/Header/Header";
import BlogImage from "@/components/BlogImage/BlogImage";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

export default function BlogPost() {
  const params = useParams();
  const username = params.username as string;
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}?username=${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!data) {
          setLoading(false);
          return;
        }

        // Serialize the MDX content
        const serialized = await serialize(data.content_md || "");

        setPost(data);
        setMdxSource(serialized);
        setLoading(false);

        // Track view (fire and forget)
        fetch(`/api/posts/${slug}/view`, { method: "POST" }).catch(() => { });
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    if (username && slug) {
      fetchPost();
    }
  }, [username, slug]);

  if (loading) {
    return <Loading />
  }

  if (!post || !mdxSource) {
    return notFound();
  }

  const components = {
    BlogImage,
  };

  return (
    <div className="flex flex-col">
      <section id="home">
        <Header data={{ title: "Tupah", subtext: "Unfiltered thoughts with occasional genius." }} />
      </section>
      <div className="h-32"></div>

      <div className="w-full px-10 bg-white dark:bg-[#171717] pb-10">
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
          By @{username}
        </p>
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
