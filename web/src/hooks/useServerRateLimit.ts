import { useState, useEffect, useCallback } from 'react';

interface RateLimitState {
    isLimited: boolean;
    remainingTime: number;
}

export function useServerRateLimit(action: 'login' | 'signup') {
    const [state, setState] = useState<RateLimitState>({
        isLimited: false,
        remainingTime: 0,
    });

    const checkRateLimit = useCallback(async () => {
        try {
            const response = await fetch('/api/rate-limit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, operation: 'check' }),
            });

            if (response.ok) {
                const data = await response.json();
                setState({
                    isLimited: data.isLimited,
                    remainingTime: data.remainingTime,
                });
            }
        } catch (error) {
            console.error('Rate limit check failed:', error);
        }
    }, [action]);

    const recordAttempt = useCallback(async () => {
        try {
            await fetch('/api/rate-limit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, operation: 'record' }),
            });
            await checkRateLimit();
        } catch (error) {
            console.error('Record attempt failed:', error);
        }
    }, [action, checkRateLimit]);

    const clearAttempts = useCallback(async () => {
        try {
            await fetch('/api/rate-limit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, operation: 'clear' }),
            });
            setState({ isLimited: false, remainingTime: 0 });
        } catch (error) {
            console.error('Clear attempts failed:', error);
        }
    }, [action]);

    useEffect(() => {
        checkRateLimit();
        const interval = setInterval(checkRateLimit, 1000);
        return () => clearInterval(interval);
    }, [checkRateLimit]);

    const formatRemainingTime = useCallback((seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    }, []);

    return {
        isLimited: state.isLimited,
        remainingTime: state.remainingTime,
        recordAttempt,
        clearAttempts,
        formatRemainingTime,
    };
}
