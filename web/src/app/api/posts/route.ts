import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { uuid } from "drizzle-orm/gel-core";

// Get all posts by the authenticated user
export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// each post needs a 
// id: uuid, slug: varchar, title: varchar, content_md: text, created_at: timestamptz 
// updated_at: timestamptz, status: post_status, tags: jsonb
export async function POST(req: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, slug } = body;

    if (!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }
    // Generate slug from title if not provided
    let baseSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let postSlug = baseSlug;

    // Check for duplicate slugs and append number if needed
    let counter = 1;
    while (true) {
        const { data: existing } = await supabase
            .from("posts")
            .select("id")
            .eq("slug", postSlug)
            .maybeSingle();

        if (!existing) break;
        counter++;
        postSlug = `${baseSlug}-${counter}`;
    }

    const { data, error } = await supabase
        .from("posts")
        .insert({ title: title, content_md: content, slug: postSlug, user_id: user.id })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}