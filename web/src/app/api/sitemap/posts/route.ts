import { NextResponse } from 'next/server'
import { db } from '@/db'
import { posts, profile } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const publishedPosts = await db
            .select({
                slug: posts.slug,
                username: profile.username,
                updatedAt: posts.updatedAt,
            })
            .from(posts)
            .innerJoin(profile, eq(posts.userId, profile.id))
            .where(eq(posts.status, 'published'))

        return NextResponse.json(publishedPosts)
    } catch (error) {
        console.error('Failed to fetch posts for sitemap:', error)
        return NextResponse.json([], { status: 500 })
    }
}
