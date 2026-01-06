export interface ImageMatch {
    fullMatch: string;
    alt: string;
    url: string;
    width?: number;
    height?: number;
    startIndex: number;
    endIndex: number;
}

// Parse image markdown and extract size params
export function parseImageAtCursor(text: string, cursorPos: number): ImageMatch | null {
    // Find all image patterns
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
        const startIndex = match.index;
        const endIndex = startIndex + match[0].length;

        // Check if cursor is within this image
        if (cursorPos >= startIndex && cursorPos <= endIndex) {
            const url = match[2];

            // Parse URL to extract width/height params
            let width: number | undefined;
            let height: number | undefined;

            try {
                const urlObj = new URL(url, 'http://localhost');
                const wParam = urlObj.searchParams.get('w');
                const hParam = urlObj.searchParams.get('h');
                width = wParam ? parseInt(wParam) : undefined;
                height = hParam ? parseInt(hParam) : undefined;
            } catch {
                // URL parsing failed, no size params
            }

            return {
                fullMatch: match[0],
                alt: match[1],
                url: url,
                width,
                height,
                startIndex,
                endIndex,
            };
        }
    }
    return null;
}

// Build a new image markdown with updated size params
export function buildImageMarkdown(
    alt: string,
    baseUrl: string,
    width: number | null,
    height: number | null
): string {
    // Remove existing query params
    const cleanUrl = baseUrl.split('?')[0];

    // Build query params
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());

    const queryString = params.toString();
    const finalUrl = queryString ? `${cleanUrl}?${queryString}` : cleanUrl;

    return `![${alt}](${finalUrl})`;
}

// Parse width and height from image URL
export function parseImageSize(src: string): { width?: number; height?: number } {
    try {
        const urlObj = new URL(src, 'http://localhost');
        const wParam = urlObj.searchParams.get('w');
        const hParam = urlObj.searchParams.get('h');

        return {
            width: wParam ? parseInt(wParam) : undefined,
            height: hParam ? parseInt(hParam) : undefined,
        };
    } catch {
        return {};
    }
}
