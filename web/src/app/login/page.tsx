"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useServerRateLimit } from "@/hooks/useServerRateLimit";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLimited, remainingTime, recordAttempt, clearAttempts, formatRemainingTime } = useServerRateLimit('login');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (isLimited) {
            setError(`Too many attempts. Please try again in ${formatRemainingTime(remainingTime)}`);
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                await recordAttempt();
                setError("Invalid credentials");
            } else {
                await clearAttempts();
                router.push('/kitchen');
            }
        } catch (err) {
            await recordAttempt();
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
                }
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError("Failed to sign in with Google.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
            <Header
                data={{
                    title: "Tupah",
                    subtext: "Welcome back",
                    showLinks: false,
                }}
            />

            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-[#1c1c1c] rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-center mb-2 text-black dark:text-white">
                            Sign In
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                            Log in to your account to continue
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-[#2a2a2a] text-black dark:text-white
                                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                        transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600
                                            bg-white dark:bg-[#2a2a2a] text-black dark:text-white
                                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent
                                            transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 dark:border-gray-600 text-blue-500 dark:text-purple-500
                                                focus:ring-blue-500 dark:focus:ring-purple-500" />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-500 dark:text-purple-400 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || isLimited}
                                className="w-full py-3 px-4 bg-blue-500 dark:bg-purple-600 hover:bg-blue-600
                                        dark:hover:bg-purple-700 text-white font-semibold rounded-lg
                                        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? "Signing in..." : isLimited ? `Locked (${formatRemainingTime(remainingTime)})` : "Sign In"}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-[#1c1c1c] text-gray-500 dark:text-gray-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="mt-4 w-full py-3 px-4 border border-gray-300 dark:border-gray-600
                                rounded-lg font-semibold text-gray-700 dark:text-gray-300
                                bg-white dark:bg-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#333]
                                transition-colors duration-200 flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-blue-500 dark:text-purple-400 hover:underline font-semibold"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
