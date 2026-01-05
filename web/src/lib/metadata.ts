import { Metadata } from 'next';

const BASE_URL = 'https://tupah.me';

function buildCanonicalUrl(path: string) {
    // Make sure path starts with /
    return `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

export function generatePageMetadata(
    title: string,
    description: string,
    path: string
): Metadata {
    const canonicalUrl = buildCanonicalUrl(path);

    return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        robots: { index: true, follow: true },
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
