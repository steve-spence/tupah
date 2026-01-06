import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET - Fetch current user's profile
export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .maybeSingle();


    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ ...profile, email: user.email, created_at: user.created_at });
}

// PUT - Update current user's profile
export async function PUT(request: Request) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { avatar_url, username } = body;
    const updateData: Record<string, any> = {};

    // Validate avatar_url is one of the allowed options
    // This will change in the future
    const allowedAvatars = [
        "/avatars/avatar1.png",
        "/avatars/avatar2.png",
        "/avatars/avatar3.png",
        "/avatars/avatar4.png",
        "/avatars/avatar5.png",
        "/avatars/avatar6.png",
    ];

    // Validate username length
    if (username && username.length < 5) {
        return NextResponse.json({ error: "Username must be at least 5 characters" }, { status: 400 });
    }

    // username updating
    const { data: existingUser, error: usernameError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

    if (usernameError) {
        return NextResponse.json({ error: usernameError.message }, { status: 500 });
    }
    if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 409 })
    }

    if (avatar_url && !allowedAvatars.includes(avatar_url)) {
        return NextResponse.json({ error: "Invalid avatar" }, { status: 400 });
    }

    if (avatar_url) updateData.avatar_url = avatar_url;
    if (username) updateData.username = username;

    const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...updateData })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
