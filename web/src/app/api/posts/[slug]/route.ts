import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function GET(request: Request, { params }: RouteParams) {
    const slug = (await params).slug;

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}