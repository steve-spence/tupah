import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowed origins for API requests
const ALLOWED_ORIGINS = [
    "https://www.tupah.me",
    "https://tupah.me",
    "http://localhost:4200",
    "http://localhost:4201",
];

// Routes that should be publicly accessible (no origin check)
const PUBLIC_API_ROUTES: string[] = [
    // Add any webhook endpoints here
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /api routes
    if (!pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // Allow public API routes
    if (PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Get origin or referer
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    // Check if request comes from allowed origin
    const isAllowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
    const isAllowedReferer = referer && ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed));

    // For same-origin requests (like form submissions), origin might be null but referer should be set
    // For fetch/XHR requests, origin should be set
    if (!isAllowedOrigin && !isAllowedReferer) {
        // Check for custom header as additional validation
        // Your frontend can send this header with API requests
        const customHeader = request.headers.get("x-requested-with");
        if (customHeader !== "tupah-frontend") {
            return NextResponse.json(
                { error: "YOU SHALL NOT PASS! WHY ARE YOU TRYING TO LOOK AT MY STUFF?" },
                { status: 403 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};