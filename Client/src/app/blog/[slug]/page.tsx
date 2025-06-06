
import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'


interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = (await import('@/lib/mdx')).getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, '')
    }));
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return notFound();
    console.log("slug", slug);

    // Add components needed in mdx here NO DANGEROUS STUFF CHECK IT ALL FOR EVILLLLLLLL!!!!!!!!!!
    const components = {};
    return (
        <div>
            <MDXRemote source={post.mdxSource} components={components} />
        </div>
    )
}