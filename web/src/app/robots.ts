import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/profile',
                '/dashboard',
                '/create',
                '/edit',
                '/login',
                '/signup',
                '/api/',
            ],
        },
        sitemap: 'https://www.tupah.me/sitemap.xml',
    }
}