/**
 * Wrapper around fetch that adds security headers for API requests.
 * Use this instead of raw fetch() for all /api calls.
 */
export async function apiFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers = new Headers(options.headers);

    // Add custom header for API validation
    headers.set("x-requested-with", "tupah-frontend");

    return fetch(url, {
        ...options,
        headers,
    });
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
    get: (url: string, options?: RequestInit) =>
        apiFetch(url, { ...options, method: "GET" }),

    post: (url: string, body?: unknown, options?: RequestInit) =>
        apiFetch(url, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: (url: string, body?: unknown, options?: RequestInit) =>
        apiFetch(url, {
            ...options,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: (url: string, options?: RequestInit) =>
        apiFetch(url, { ...options, method: "DELETE" }),
};