// Server-side rate limiting using in-memory storage
// In production, consider using Redis or a database

interface RateLimitEntry {
    attempts: number[];
    lockoutUntil?: number;
}

class ServerRateLimiter {
    private store: Map<string, RateLimitEntry>;
    private maxAttempts: number;
    private lockoutDuration: number;
    private cleanupInterval: NodeJS.Timeout | null;

    constructor(maxAttempts: number = 5, lockoutDurationMinutes: number = 5) {
        this.store = new Map();
        this.maxAttempts = maxAttempts;
        this.lockoutDuration = lockoutDurationMinutes * 60 * 1000;
        this.cleanupInterval = null;
        this.startCleanup();
    }

    private startCleanup() {
        // Clean up old entries every minute
        this.cleanupInterval = setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of this.store.entries()) {
                // Remove entries that are expired
                if (entry.lockoutUntil && entry.lockoutUntil < now) {
                    this.store.delete(key);
                } else if (entry.attempts.length === 0) {
                    this.store.delete(key);
                }
            }
        }, 60000);
    }

    checkRateLimit(identifier: string): { isLimited: boolean; remainingTime: number } {
        const now = Date.now();
        const entry = this.store.get(identifier);

        if (!entry) {
            return { isLimited: false, remainingTime: 0 };
        }

        // Check if currently locked out
        if (entry.lockoutUntil && entry.lockoutUntil > now) {
            const remainingTime = Math.ceil((entry.lockoutUntil - now) / 1000);
            return { isLimited: true, remainingTime };
        }

        // Filter out old attempts
        const recentAttempts = entry.attempts.filter(
            (timestamp) => now - timestamp < this.lockoutDuration
        );

        if (recentAttempts.length >= this.maxAttempts) {
            const oldestAttempt = Math.min(...recentAttempts);
            const lockoutUntil = oldestAttempt + this.lockoutDuration;

            if (lockoutUntil > now) {
                entry.lockoutUntil = lockoutUntil;
                entry.attempts = recentAttempts;
                this.store.set(identifier, entry);

                const remainingTime = Math.ceil((lockoutUntil - now) / 1000);
                return { isLimited: true, remainingTime };
            }
        }

        // Update entry with filtered attempts
        entry.attempts = recentAttempts;
        entry.lockoutUntil = undefined;
        this.store.set(identifier, entry);

        return { isLimited: false, remainingTime: 0 };
    }

    recordAttempt(identifier: string): void {
        const now = Date.now();
        const entry = this.store.get(identifier) || { attempts: [] };

        // Filter out old attempts and add new one
        const recentAttempts = entry.attempts.filter(
            (timestamp) => now - timestamp < this.lockoutDuration
        );
        recentAttempts.push(now);

        entry.attempts = recentAttempts;
        this.store.set(identifier, entry);
    }

    clearAttempts(identifier: string): void {
        this.store.delete(identifier);
    }

    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.store.clear();
    }
}

// Singleton instances for login and signup
export const loginRateLimiter = new ServerRateLimiter(5, 5);
export const signupRateLimiter = new ServerRateLimiter(5, 5);
