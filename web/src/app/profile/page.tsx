'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Check } from "lucide-react";
import Loading from "@/components/Loading/Loading";

const AVATAR_OPTIONS = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
];

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Fetch current profile
    useEffect(() => {
        if (user) {
            fetch("/api/profile")
                .then(res => res.json())
                .then(data => {
                    if (data.avatar_url) {
                        setCurrentAvatar(data.avatar_url);
                        setSelectedAvatar(data.avatar_url);
                    }
                    if (data.username) {
                        setUsername(data.username);
                    }
                })
                .catch(err => console.error("Failed to fetch profile:", err));
        }
    }, [user]);

    const handleSave = async () => {
        if (!selectedAvatar || selectedAvatar === currentAvatar) return;

        setSaving(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ avatar_url: selectedAvatar })
            });

            if (res.ok) {
                setCurrentAvatar(selectedAvatar);
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update avatar");
            }
        } catch (err) {
            alert("Failed to update avatar");
        } finally {
            setSaving(false);
        }
    };

    if (authLoading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header data={{ title: "nothing", subtext: "Profile", skinny: true }} />
            <div className="flex-1 bg-gray-100 dark:bg-[#212121] p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Your Profile
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            @{username}
                        </p>

                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Choose your avatar
                        </h3>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {AVATAR_OPTIONS.map((avatar) => (
                                <button
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(avatar)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-4 transition-all ${selectedAvatar === avatar
                                        ? "border-[#9379cc] scale-105"
                                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                        }`}
                                >
                                    <Image
                                        src={avatar}
                                        alt="Avatar option"
                                        fill
                                        className="object-cover"
                                    />
                                    {selectedAvatar === avatar && (
                                        <div className="absolute inset-0 bg-[#9379cc]/20 flex items-center justify-center">
                                            <Check className="text-white drop-shadow-lg" size={32} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/dashboard")}
                            >
                                Back to Dashboard
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                disabled={saving || selectedAvatar === currentAvatar}
                                sx={{
                                    backgroundColor: "#9379cc",
                                    "&:hover": { backgroundColor: "#7a5fbd" },
                                }}
                            >
                                {saving ? "Saving..." : "Save Avatar"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
