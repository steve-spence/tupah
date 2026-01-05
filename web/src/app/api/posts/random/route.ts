import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Helper to construct Supabase public URL
function getPublicImageUrl(storagePath: string | null): string | null {
    if (!storagePath) return null;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/${storagePath}`;
}

// Get 10 random posts
export async function GET() {
    const supabase = await createClient();

    // Fetch published posts with username, image storage path, and shuffle on server
    const { data, error } = await supabase
        .from("posts")
        .select("*, profiles!user_id(username), images!cover_image_id(storage_path)")
        .eq("status", "published")
        .limit(50);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Flatten username, add cover_image_url, and shuffle
    const postsWithUsername = data?.map(post => ({
        ...post,
        username: post.profiles?.username,
        cover_image_url: getPublicImageUrl(post.images?.storage_path),
        profiles: undefined,
        images: undefined
    })) ?? [];

    const shuffled = postsWithUsername.sort(() => Math.random() - 0.5).slice(0, 10);
    return NextResponse.json(shuffled);
}
