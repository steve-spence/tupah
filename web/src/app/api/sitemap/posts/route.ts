import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const supabase = await createClient()

        const { data: posts, error } = await supabase
            .from('posts')
            .select(`
                slug,
                updated_at,
                profiles:user_id (username)
            `)
            .eq('status', 'published')

        if (error) {
            console.error('Failed to fetch posts for sitemap:', error)
            return NextResponse.json([])
        }

        const result = posts.map((post: any) => ({
            slug: post.slug,
            username: post.profiles?.username || 'unknown',
            updatedAt: post.updated_at,
        }))

        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to fetch posts for sitemap:', error)
        return NextResponse.json([], { status: 500 })
    }
}
