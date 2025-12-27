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

    return NextResponse.json(profile);
}

// PUT - Update current user's profile
export async function PUT(request: Request) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { avatar_url } = body;

    // Validate avatar_url is one of the allowed options
    const allowedAvatars = [
        "/avatars/avatar1.png",
        "/avatars/avatar2.png",
        "/avatars/avatar3.png",
        "/avatars/avatar4.png",
        "/avatars/avatar5.png",
        "/avatars/avatar6.png",
    ];

    if (avatar_url && !allowedAvatars.includes(avatar_url)) {
        return NextResponse.json({ error: "Invalid avatar" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url })
        .eq("id", user.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
