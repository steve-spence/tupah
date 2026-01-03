import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

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
