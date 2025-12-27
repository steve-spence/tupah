import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// Admin client to bypass RLS for updating like count
const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Check if user has liked this post
export async function GET(_request: Request, { params }: RouteParams) {
    const slug = (await params).slug;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ liked: false });
    }

    // Get post ID
    const { data: post } = await supabase
        .from("posts")
        .select("id, likes")
        .eq("slug", slug)
        .single();

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user has liked
    const { data: like } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("target_type", "post")
        .eq("target_id", post.id)
        .maybeSingle();

    return NextResponse.json({ liked: !!like, likes: post.likes || 0 });
}

// POST - Toggle like
export async function POST(_request: Request, { params }: RouteParams) {
    const slug = (await params).slug;
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get post
    const { data: post, error: postError } = await supabase
        .from("posts")
        .select("id, likes")
        .eq("slug", slug)
        .single();

    if (postError || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if already liked
    const { data: existingLike } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("target_type", "post")
        .eq("target_id", post.id)
        .maybeSingle();

    if (existingLike) {
        // Unlike - remove the like
        await supabase
            .from("likes")
            .delete()
            .eq("id", existingLike.id);

        // Decrement likes count
        const newLikes = Math.max(0, (post.likes || 0) - 1);
        await supabaseAdmin
            .from("posts")
            .update({ likes: newLikes })
            .eq("id", post.id);

        return NextResponse.json({ liked: false, likes: newLikes });
    } else {
        // Like - add the like
        await supabase
            .from("likes")
            .insert({
                user_id: user.id,
                target_type: "post",
                target_id: post.id
            });

        // Increment likes count
        const newLikes = (post.likes || 0) + 1;
        await supabaseAdmin
            .from("posts")
            .update({ likes: newLikes })
            .eq("id", post.id);

        return NextResponse.json({ liked: true, likes: newLikes });
    }
}
