import { NextRequest, NextResponse } from 'next/server';
import { loginRateLimiter, signupRateLimiter } from '@/utils/serverRateLimit';

function getClientIdentifier(request: NextRequest): string {
    // Use IP address as identifier
    // In production with a proxy, use x-forwarded-for header
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    // Try different headers in order of preference
    const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';
    return ip;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, operation } = body;

        if (!action || !['login', 'signup'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action' },
                { status: 400 }
            );
        }

        const identifier = getClientIdentifier(request);
        const rateLimiter = action === 'login' ? loginRateLimiter : signupRateLimiter;

        switch (operation) {
            case 'check': {
                const result = rateLimiter.checkRateLimit(identifier);
                return NextResponse.json(result);
            }

            case 'record': {
                rateLimiter.recordAttempt(identifier);
                return NextResponse.json({ success: true });
            }

            case 'clear': {
                rateLimiter.clearAttempts(identifier);
                return NextResponse.json({ success: true });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid operation' },
                    { status: 400 }
                );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
