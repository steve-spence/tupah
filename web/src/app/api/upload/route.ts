import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

function generateShortId(length: number = 8): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: Request) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const storagePath = `${user.id}/${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
        .from("post-images")
        .upload(storagePath, file);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate short ID and save to database using Supabase client
    const shortId = generateShortId();
    const { error: insertError } = await supabase
        .from("images")
        .insert({
            id: shortId,
            user_id: user.id,
            filename: file.name,
            storage_path: data.path,
        });

    if (insertError) {
        // Clean up uploaded file if DB insert fails
        await supabase.storage.from("post-images").remove([data.path]);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Return short URL
    const shortUrl = `/api/media/${shortId}`;

    return NextResponse.json({ url: shortUrl, id: shortId, path: data.path });
}