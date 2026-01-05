import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();
    console.log("here");
    const { data: image, error } = await supabase
        .from("images")
        .select("*")
        .eq("id", id)
        .single()

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
    const image = await db.query.images.findFirst({
        where: and(eq(images.id, id), eq(images.userId, user.id)),
    });

    if (!image) {
        return NextResponse.json({ error: "Image not found or unauthorized" }, { status: 404 });
    }

    // Delete from Supabase storage
    const { error: storageError } = await supabase.storage
        .from("post-images")
        .remove([image.storagePath]);

    if (storageError) {
        console.error("Storage delete error:", storageError);
        // Continue anyway - we still want to remove the DB record
    }

    // Delete from database (FK will set cover_image_id to null in posts)
    await db.delete(images).where(eq(images.id, id));

    return NextResponse.json({ success: true });
}
