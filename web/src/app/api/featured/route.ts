import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Fetch top 10 posts by views, with username from profile
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      cover_image_id,
      views,
      profiles:user_id (username)
    `)
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Failed to fetch featured posts:", error);
    return NextResponse.json([]);
  }

  // Transform to NavIconProps format
  const featuredPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    cover_image_id: post.cover_image_id || "/pictures/blog/default.png",
    link: `/blog/${post.profiles?.username || "unknown"}/${post.slug}`,
  }));

  return NextResponse.json(featuredPosts);
}