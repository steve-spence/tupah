import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// Use service role to bypass RLS for analytics
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(_request: Request, { params }: RouteParams) {
    const slug = (await params).slug;

    // Get current views
    const { data, error: fetchError } = await supabaseAdmin
        .from("posts")
        .select("views")
        .eq("slug", slug)
        .single();

    if (fetchError || !data) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment views
    const { error: updateError } = await supabaseAdmin
        .from("posts")
        .update({ views: (data.views || 0) + 1 })
        .eq("slug", slug);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, views: (data.views || 0) + 1 });
}
