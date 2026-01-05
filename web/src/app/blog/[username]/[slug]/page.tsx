import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { createClient } from "@/utils/supabase/server";
import BlogPostContent from "./BlogPostContent";

const BASE_URL = 'https://tupah.me';

interface PageProps {
    params: Promise<{
        username: string;
        slug: string;
    }>;
}

// Helper to construct Supabase public URL
function getPublicImageUrl(storagePath: string | null): string | null {
    if (!storagePath) return null;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/${storagePath}`;
}

// Fetch post data (reused by both metadata and page)
async function getPost(username: string, slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*, profiles!user_id(username), images!cover_image_id(storage_path)")
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) return null;

    // Case-insensitive username check
    if (data.profiles?.username?.toLowerCase() !== username.toLowerCase()) {
        return null;
    }

    return {
        ...data,
        username: data.profiles?.username,
        cover_image_url: getPublicImageUrl(data.images?.storage_path),
    };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username, slug } = await params;
    const post = await getPost(username, slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }

    // Get first 160 chars of content for description (strip markdown)
    const description = post.content_md
        ?.replace(/[#*`\[\]()>-]/g, '')
        ?.substring(0, 160)
        ?.trim() + '...' || `A blog post by ${username}`;

    const canonicalUrl = `${BASE_URL}/blog/${username}/${slug}`;

    return {
        title: `${post.title} | ${username}'s Blog`,
        description,
        authors: [{ name: username }],
        alternates: { canonical: canonicalUrl },
        robots: { index: true, follow: true },
        openGraph: {
            title: post.title,
            description,
            url: canonicalUrl,
            siteName: 'Tupah',
            type: 'article',
            authors: [username],
            ...(post.cover_image_url && {
                images: [{
                    url: post.cover_image_url,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }],
            }),
        },
        twitter: {
            card: post.cover_image_url ? 'summary_large_image' : 'summary',
            title: post.title,
            description,
            ...(post.cover_image_url && { images: [post.cover_image_url] }),
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { username, slug } = await params;
    const post = await getPost(username, slug);

    if (!post) {
        return notFound();
    }

    // Serialize MDX content on the server
    const mdxSource = await serialize(post.content_md || "");

    return (
        <BlogPostContent
            post={post}
            username={username}
            slug={slug}
            mdxSource={mdxSource}
        />
    );
}
