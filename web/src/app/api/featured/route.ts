import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Helper to construct Supabase public URL
function getPublicImageUrl(storagePath: string | null): string | null {
  if (!storagePath) return null;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/${storagePath}`;
}

export async function GET() {
  const supabase = await createClient();

  // Fetch top 10 posts by views, with username and image storage path
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      cover_image_id,
      views,
      profiles!user_id (username),
      images!cover_image_id (storage_path)
    `)
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Failed to fetch featured posts:", error);
    return NextResponse.json([]);
  }

  // Transform to NavIconProps format with direct Supabase URL
  const featuredPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    cover_image_id: post.cover_image_id,
    cover_image_url: getPublicImageUrl(post.images?.storage_path),
    link: `/blog/${post.profiles?.username || "unknown"}/${post.slug}`,
  }));

  return NextResponse.json(featuredPosts);
}