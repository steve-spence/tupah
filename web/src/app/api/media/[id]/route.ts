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

    const image = await db.query.images.findFirst({
        where: eq(images.id, id),
    });

    if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const supabase = await createClient();
    const { data: { publicUrl } } = supabase.storage
        .from("post-images")
        .getPublicUrl(image.storagePath);

    return NextResponse.redirect(publicUrl);
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
