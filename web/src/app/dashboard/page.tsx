"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
            <Header
                data={{
                    title: "Tupah",
                    subtext: "Dashboard",
                    showLinks: true,
                }}
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white dark:bg-[#1c1c1c] rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
                        Welcome, {user?.email}
                    </h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                            <h3 className="font-semibold text-black dark:text-white mb-2">
                                Account Info
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Email: {user?.email}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                User ID: {user?.id}
                            </p>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
