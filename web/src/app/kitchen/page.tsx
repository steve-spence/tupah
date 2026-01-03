"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { WitchTable } from "@/lib/models/WitchTable";
import { CookBlog } from "./CookBlog";
import { NewRecipe } from "./NewRecipe";
import { CameraController } from "./CameraController";
import { BookOpen, Flame, Globe } from "lucide-react";
import Loading from "@/components/Loading/Loading";

type View = "home" | "cook" | "recipe";

export default function KitchenPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<View>("home");

    const cameraConfig = { position: [0, 12, 0] as [number, number, number], fov: 50 };

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

    if (loading || !user) {
        return (
            <Loading />
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
            <div className="absolute top-15 inset-0 z-0 ">
                <Canvas camera={cameraConfig}>
                    <ambientLight />
                    <WitchTable position={[0, 5, 0]} rotation={[0, 0, 0]} />
                    <CameraController
                        targetPosition={
                            view === "cook" ? [-3.5, 8.5, 2.5] :
                                view === "recipe" ? [0, 8.5, 2.5] : [0, 12, 0]
                        }
                        targetLookAt={
                            view === "cook" ? [0, -60, -20] :
                                view === "recipe" ? [-1, -1, -15] : [0, 0, 0]
                        }
                    />
                </Canvas>
            </div>

            {/* UI Overlay */}
            {view === "home" && (
                <div className="relative z-10 flex flex-col items-center justify-baseline min-h-screen p-5">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 drop-shadow-lg text-center">
                        What&apos;s cooking?
                    </h2>
                    <p className="text-gray-600 mb-12 text-center max-w-md">
                        Your AI-powered kitchen for crafting delicious blog content
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {/* Cook Blog */}
                        <button
                            onClick={() => setView("cook")}
                            className="group bg-gray-900/70 backdrop-blur-sm border border-gray-700 hover:border-orange-500 rounded-2xl p-8 text-left transition-all hover:scale-105 hover:bg-gray-900/90">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Flame />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Cook Blog</h3>
                            <p className="text-gray-400 text-sm">Fire up a fresh blog post with AI assistance</p>
                        </button>

                        {/* New Recipe */}
                        <button
                            onClick={() => setView("recipe")}
                            className="group bg-gray-900/70 backdrop-blur-sm border border-gray-700 hover:border-purple-500 rounded-2xl p-8 text-left transition-all hover:scale-105 hover:bg-gray-900/90">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BookOpen />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">New Recipe</h3>
                            <p className="text-gray-400 text-sm">Create a reusable template for future posts</p>
                        </button>

                        {/* Browse Dishes */}
                        <button
                            onClick={() => { router.push('/browse') }}
                            className="group bg-gray-900/70 backdrop-blur-sm border border-gray-700 hover:border-emerald-500 rounded-2xl p-8 text-left transition-all hover:scale-105 hover:bg-gray-900/90">
                            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Browse Dishes</h3>
                            <p className="text-gray-400 text-sm">View and manage your published content</p>
                        </button>
                    </div>
                </div>
            )}

            {view === "cook" && <CookBlog onBack={() => setView("home")} />}
            {view === "recipe" && <NewRecipe onBack={() => setView("home")} />}

        </div>
    );
}
