// Metadata configuration for canonical URLs and SEO
import { Metadata } from 'next';

const baseUrl = 'https://tupah.me';

export function generateCanonicalMetadata(path: string): Metadata {
    const canonicalUrl = `${baseUrl}${path}`;

    return {
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
        other: {
            'canonical': canonicalUrl,
        }
    };
}

export function generatePageMetadata(
    title: string,
    description: string,
    path: string
): Metadata {
    const canonicalUrl = `${baseUrl}${path}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'Tupah',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}