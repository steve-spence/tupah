import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.tupah.me'
    const apiUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_SITE_URL || baseUrl

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

    // Fetch published blog posts from API
    let blogPages: MetadataRoute.Sitemap = []
    try {
        const res = await fetch(`${apiUrl}/api/sitemap/posts`, {
            cache: 'no-store',
        })

        if (res.ok) {
            const publishedPosts: { slug: string; username: string; updatedAt: string }[] = await res.json()

            blogPages = publishedPosts.map((post) => ({
                url: `${baseUrl}/blog/${post.username}/${post.slug}`,
                lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }))
            console.log('[sitemap] API returned %d published posts', publishedPosts.length)
        }
    } catch (error) {
        console.error('Failed to fetch posts for sitemap:', error)
    }

    return [...staticPages, ...blogPages]
}
