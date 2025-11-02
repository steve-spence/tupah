'use client'

import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header/Header";
import CommentEditor from "@/components/CommentEditor/CommentEditor";
import BlogImage from "@/components/BlogImage/BlogImage";


export default async function BlogPost() {

  const sp = useSearchParams();
  const slug = sp.get("slug");

  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?=${slug}`));
  const post = await res.json();

  if (!post) return notFound();
  console.log(post);
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
    </div>
  );
}
