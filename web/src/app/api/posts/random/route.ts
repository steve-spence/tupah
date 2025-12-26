import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Get 10 random posts
export async function GET() {
    const supabase = await createClient();

    // Fetch posts with username and shuffle on server
    const { data, error } = await supabase
        .from("posts")
        .select("*, profiles:user_id(username)")
        .limit(50);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Flatten username and shuffle
    const postsWithUsername = data?.map(post => ({
        ...post,
        username: post.profiles?.username,
        profiles: undefined
    })) ?? [];

    const shuffled = postsWithUsername.sort(() => Math.random() - 0.5).slice(0, 10);
    return NextResponse.json(shuffled);
}
