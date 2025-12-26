import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

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

export async function GET(_request: Request, { params }: RouteParams) {
    const slugOrId = (await params).slug;

    const supabase = await createClient();

    // Check if it's a UUID (id) or a slug
    const column = isUUID(slugOrId) ? "id" : "slug";

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq(column, slugOrId)
        .maybeSingle();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(data);
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
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Update post (only if user owns it)
    const { data, error } = await supabase
        .from("posts")
        .update({ title, content_md: content, updated_at: new Date().toISOString() })
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