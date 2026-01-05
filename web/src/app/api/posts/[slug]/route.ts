import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Admin client to bypass RLS for deleting likes
const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

// Check if string is a UUID
function isUUID(str: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export async function GET(request: Request, { params }: RouteParams) {
    const slugOrId = (await params).slug;
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    const supabase = await createClient();

    // Check if it's a UUID (id) or a slug
    const column = isUUID(slugOrId) ? "id" : "slug";

    // If username provided, join profile table to verify ownership
    if (username) {
        const { data, error } = await supabase
            .from("posts")
            .select("*, profiles:user_id(username)")
            .eq(column, slugOrId)
            .maybeSingle();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.profiles?.username !== username.toLowerCase()) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ ...data, username: data.profiles?.username, profiles: undefined });
    }

    // No username provided, still include username in response
    const { data, error } = await supabase
        .from("posts")
        .select("*, profiles:user_id(username)")
        .eq(column, slugOrId)
        .maybeSingle();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ ...data, username: data.profiles?.username, profiles: undefined });
}

export async function PUT(request: Request, { params }: RouteParams) {
    const id = (await params).slug;

    if (!isUUID(id)) {
        return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, tags, status, coverImageId } = body;

    if (!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Update post (only if user owns it)
    const { data, error } = await supabase
        .from("posts")
        .update({ title, content_md: content, updated_at: new Date().toISOString(), tags: tags, status: status, cover_image_id: coverImageId || null })
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: "Post not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
    const id = (await params).slug;

    if (!isUUID(id)) {
        return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user owns this post
    const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("id")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!post) {
        return NextResponse.json({ error: "Post not found or unauthorized" }, { status: 404 });
    }

    // Delete likes for this post (uses admin client to bypass RLS)
    await supabaseAdmin
        .from("likes")
        .delete()
        .eq("target_type", "post")
        .eq("target_id", id);

    // Delete the post (comments cascade automatically)
    const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}