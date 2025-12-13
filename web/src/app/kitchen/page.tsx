"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { WitchTable } from "@/lib/models/WitchTable";
import { CookBlog } from "./CookBlog";

type View = "home" | "cook";

export default function KitchenPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<View>("home");

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
                    subtext: "Kitchen",
                    showLinks: true,
                    skinny: true,
                }}
            />


            {/* 3D Background */}
            <div className="absolute inset-0 z-0 ">
                <Canvas camera={{ position: [0, 12, 5], fov: 50 }}>
                    <ambientLight />
                    <WitchTable position={[0, 3, 1]} rotation={[-3.14 / 4, 0, 0]} />
                    <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
            </div>

            {/* UI Overlay */}
            {view === "home" && (
                <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-6 pointer-events-none">
                    <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                        What&apos;s cooking?
                    </h2>
                    <div className="flex gap-4 pointer-events-auto">
                        <button
                            onClick={() => setView("cook")}
                            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-lg transition-colors"
                        >
                            Cook Blog
                        </button>
                        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-lg transition-colors">
                            New Recipe
                        </button>
                        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg transition-colors">
                            Browse Dishes
                        </button>
                    </div>
                </div>
            )}

            {view === "cook" && <CookBlog onBack={() => setView("home")} />}

        </div>
    );
}
