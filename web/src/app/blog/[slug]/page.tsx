'use client'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/Header/Header";
import CommentEditor from "@/components/CommentEditor/CommentEditor";
import BlogImage from "@/components/BlogImage/BlogImage";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`, {
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
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <Loading />
  }

  if (!post || !mdxSource) {
    return notFound();
  }

  // Add components needed in mdx here NO DANGEROUS STUFF CHECK IT ALL FOR EVILLLLLLLL!!!!!!!!!!
  const components = {
    BlogImage,
  };

  return (
    <div className="flex flex-col">
      {/* Blog Post Header */}
      <section id="home">
        <Header data={{ title: "Tupah", subtext: "Unfiltered thoughts with occasional genius." }} />
      </section>
      <div className="h-32"></div>

      {/* Content */}
      <div className="w-full px-10 bg-white dark:bg-[#171717]">
        <div className="flex flex-col prose lg:prose-xl dark:prose-invert mx-auto h-fit py-5">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </div>
  );
}
