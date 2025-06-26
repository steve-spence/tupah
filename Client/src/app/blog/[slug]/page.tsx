
import React, { ImgHTMLAttributes } from 'react'
import Image, { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header/Header';


type PostParams = Promise<{ slug: string }>

export async function generateStaticParams() {
    const slugs = (await import('@/lib/mdx')).getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, '')
    }));
}

export default async function BlogPost({ params }: { params: PostParams }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return notFound();

    // Add components needed in mdx here NO DANGEROUS STUFF CHECK IT ALL FOR EVILLLLLLLL!!!!!!!!!!
    const components = {
        img: (props: ImageProps) => (<Image {...props} alt={props.alt || 'Blog Image'} width={300} height={300} className="rounded-xl" />),
    };

    return (
        <div>
            {/* Blog Post Header */}
            <section id="home">
                <Header data={{ title: "Tupah", subtext: "Unfiltered thoughts with occasional genius." }}
                    className="flex sm:justify-between justify-center bg-[#272727] p-5 h-32 w-full z-2" />

            </section>
            <div className="prose lg:prose-xl mx-auto h-fit py-5">
                <MDXRemote source={post.content} components={components} />
            </div>

            {/* Lets make an auto scroller that is good */}
            {/* 
            The header will stick and the text in the middle will turn into a slider for 
            reading speed the text will be long and down th emiddle. After text takes up 
            4 lines then make a new paragraph
             */}

        </div >

    )
}