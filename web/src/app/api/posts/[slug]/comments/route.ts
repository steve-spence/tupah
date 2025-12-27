import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// Admin client to bypass RLS for updating comment count
const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET comments for a post
export async function GET(_request: Request, { params }: RouteParams) {
    const slug = (await params).slug;
    const supabase = await createClient();

    // Get post ID from slug
    const { data: post, error: postError } = await supabase
        .from("posts")
        .select("id")
        .eq("slug", slug)
        .single();

    if (postError || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get comments with author info
    const { data: comments, error } = await supabase
        .from("comments")
        .select("*, profiles:user_id(username)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten username
    const commentsWithUsername = comments?.map(comment => ({
        ...comment,
        username: comment.profiles?.username || "Anonymous",
        profiles: undefined
    })) ?? [];

    return NextResponse.json(commentsWithUsername);
}

// POST a new comment
export async function POST(request: Request, { params }: RouteParams) {
    const slug = (await params).slug;
    const supabase = await createClient();

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
        return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    // Get post ID from slug
    const { data: post, error: postError } = await supabase
        .from("posts")
        .select("id, comments")
        .eq("slug", slug)
        .single();

    if (postError || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Insert comment
    const { data: comment, error: insertError } = await supabase
        .from("comments")
        .insert({
            post_id: post.id,
            user_id: user.id,
            content: content.trim()
        })
        .select("*, profiles:user_id(username)")
        .single();

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Update comment count on post using admin client
    await supabaseAdmin
        .from("posts")
        .update({ comments: (post.comments || 0) + 1 })
        .eq("id", post.id);

    return NextResponse.json({
        ...comment,
        username: comment.profiles?.username || "Anonymous",
        profiles: undefined
    }, { status: 201 });
}
