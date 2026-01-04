import { MetadataRoute } from 'next'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.tupah.me'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/browse`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/kitchen`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/projects/witchpaw`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/projects/toaster`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/projects/chess`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Fetch published blog posts with their authors
    let blogPages: MetadataRoute.Sitemap = []
    try {
        // Opt out of static rendering
        noStore()

        // Dynamic imports to avoid module-level DATABASE_URL evaluation at build time
        const { db } = await import('@/db')
        const { posts, profile } = await import('@/db/schema')
        const { eq } = await import('drizzle-orm')

        const publishedPosts = await db
            .select({
                slug: posts.slug,
                username: profile.username,
                updatedAt: posts.updatedAt,
            })
            .from(posts)
            .innerJoin(profile, eq(posts.userId, profile.id))
            .where(eq(posts.status, 'published'))

        blogPages = publishedPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.username}/${post.slug}`,
            lastModified: post.updatedAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))
        console.log('[sitemap] DB returned %d published posts', publishedPosts.length);

    } catch (error) {
        console.error('Failed to fetch posts for sitemap:', error)
    }
    console.log('[sitemap] about to return %d static + %d blog entries',
        staticPages.length, blogPages.length);
    return [...staticPages, ...blogPages]
}
