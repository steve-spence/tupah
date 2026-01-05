import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: image, error } = await supabase
        .from("images")
        .select("*")
        .eq("id", id)
        .single();

    if (!image || error) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Supabase returns snake_case column names
    const { data: { publicUrl } } = supabase.storage
        .from("post-images")
        .getPublicUrl(image.storage_path);

    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: publicUrl,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the image and verify ownership
    const { data: image, error: fetchError } = await supabase
        .from("images")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (fetchError || !image) {
        return NextResponse.json({ error: "Image not found or unauthorized" }, { status: 404 });
    }

    // Delete from Supabase storage
    const { error: storageError } = await supabase.storage
        .from("post-images")
        .remove([image.storage_path]);

    if (storageError) {
        console.error("Storage delete error:", storageError);
        // Continue anyway - we still want to remove the DB record
    }

    // Delete from database (FK will set cover_image_id to null in posts)
    const { error: deleteError } = await supabase
        .from("images")
        .delete()
        .eq("id", id);

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}