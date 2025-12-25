import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Get 10 random posts
export async function GET() {
    const supabase = await createClient();

    // Fetch posts and shuffle on server
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .limit(50);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Shuffle and take 10
    const shuffled = data?.sort(() => Math.random() - 0.5).slice(0, 10) ?? [];
    return NextResponse.json(shuffled);
}
