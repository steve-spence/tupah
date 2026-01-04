"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { WitchTable } from "@/lib/models/WitchTable";
import { CookBlog } from "./CookBlog";
import PacmanLoader from "react-spinners/PacmanLoader";

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


            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="dark:text-white text-black text-3xl">I'm working on this page still :\</h1>
                <PacmanLoader color="#9379cc" />
            </div>
        </div>
    );
}
