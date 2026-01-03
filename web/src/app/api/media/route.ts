import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userImages = await db
        .select()
        .from(images)
        .where(eq(images.userId, user.id))
        .orderBy(desc(images.createdAt));

    return NextResponse.json({ images: userImages });
}
