import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// pass in slug to get that slug's data
export async function GET(req?: NextRequest) {
    // todo global state managemnet get check if there is a supabase connection (cache it b)
    const supabase = await createClient();
    const slug = req?.nextUrl.searchParams.get("slug");

    if (slug) {
        const { data, error } = await supabase.from("posts").select("slug, title, content").eq("slug", slug).maybeSingle();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(data);
    }

    const { data, error } = await supabase.from("posts").select("*");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
