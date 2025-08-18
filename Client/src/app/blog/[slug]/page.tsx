import React, { ImgHTMLAttributes } from "react";
import Image, { ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { generatePageMetadata } from "@/lib/metadata";

// Blog Components
import BlogImage from "@/components/BlogImage";

type PostParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = (await import("@/lib/mdx")).getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: PostParams }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return generatePageMetadata(
    post.fontMatter.title || "Blog Post",
    post.fontMatter.description || "A blog post from Tupah",
    `/blog/${slug}`
  );
}

export default async function BlogPost({ params }: { params: PostParams }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  // Add components needed in mdx here NO DANGEROUS STUFF CHECK IT ALL FOR EVILLLLLLLL!!!!!!!!!!
  const components = {
    BlogImage,
  };

  return (
    <div className="flex flex-col">
      {/* Blog Post Header */}
      <section id="home">
        <Header
          data={{
            title: "Tupah",
            subtext: "Unfiltered thoughts with occasional genius.",
          }}
          className="flex sm:justify-between justify-center bg-white dark:bg-[#272727] p-5 h-32 w-full z-2 fixed"
        />
      </section>
      <div className="h-32"></div>

      {/* Content */}
      <div className="w-full px-10 bg-white dark:bg-[#171717]">
        <div className="flex flex-col prose lg:prose-xl dark:prose-invert mx-auto h-fit py-5">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>

      {/* Lets make an auto scroller that is good */}
      {/* 
            The header will stick and the text in the middle will turn into a slider for 
            reading speed the text will be long and down th emiddle. After text takes up 
            4 lines then make a new paragraph
             */}
    </div>
  );
}
