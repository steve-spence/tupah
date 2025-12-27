import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    const supabase = await createClient();

    // Search posts by title (case-insensitive)
    const { data, error } = await supabase
        .from("posts")
        .select("*, profiles:user_id(username)")
        .ilike("title", `%${query}%`)
        .limit(10);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten username into each post
    const postsWithUsername = data?.map(post => ({
        ...post,
        username: post.profiles?.username,
        profiles: undefined
    })) ?? [];

    return NextResponse.json(postsWithUsername);
}
