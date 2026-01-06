'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header/Header";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Check } from "lucide-react";
import Loading from "@/components/Loading/Loading";
import TextField from "@mui/material/TextField";

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
    const [originalUsername, setOriginalUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");

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
                        setOriginalUsername(data.username);
                    }
                    if (data.email) {
                        setEmail(data.email);
                        setCreatedAt(data.created_at);
                    }
                })
                .catch(err => console.error("Failed to fetch profile:", err));
        }
    }, [user]);

    const hasChanges = selectedAvatar !== currentAvatar || username !== originalUsername;

    const handleSave = async () => {
        if (!hasChanges) return;

        // Validate username length
        if (username.length < 5) {
            setUsernameError("Username must be at least 5 characters");
            return;
        }

        setSaving(true);
        setUsernameError("");
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    avatar_url: selectedAvatar,
                    username: username
                })
            });

            if (res.ok) {
                setCurrentAvatar(selectedAvatar);
                setOriginalUsername(username);
                // Update localStorage cache so Header shows new avatar immediately
                if (selectedAvatar) localStorage.setItem("avatar_url", selectedAvatar);
            } else {
                const data = await res.json();
                // Show username errors inline, other errors as alert
                if (res.status === 409) {
                    setUsernameError(data.error);
                } else {
                    alert(data.error || "Failed to update profile");
                }
            }
        } catch (err) {
            alert("Failed to update profile");
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
                            {username.charAt(0).toUpperCase() + username.substring(1,)}'s Profile
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 p-2">
                            Email: {email}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 p-2">
                            Created Account: {new Date(createdAt).toLocaleDateString()}
                        </p>
                        {/* Change the username */}
                        <p className="text-gray-800 dark:text-gray-100 p-2 font-bold">
                            Change your username
                        </p>
                        <TextField
                            fullWidth
                            placeholder="Update your unique username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError("");
                            }}
                            error={!!usernameError}
                            slotProps={{ htmlInput: { minLength: 5 } }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                    ".dark &": {
                                        backgroundColor: "#2a2a2a",
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    color: "#333",
                                    ".dark &": {
                                        color: "#fff",
                                    },
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: usernameError ? "red" : "gray",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: usernameError ? "red" : "#9379cc",
                                },
                            }}
                        />
                        {usernameError && (
                            <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                        )}


                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 my-4">
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
                                        sizes="50vw"
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
                                sx={{
                                    borderColor: '#1272CC',
                                    color: '#1272CC',
                                    '&:hover': {
                                        borderColor: '#5994cc',
                                        backgroundColor: 'rgba(18, 114, 204, 0.1)',
                                    },
                                    '.dark &': {
                                        borderColor: '#9379cc',
                                        color: '#9379cc',
                                    },
                                    '.dark &:hover': {
                                        borderColor: '#b49ddb',
                                        backgroundColor: 'rgba(147, 121, 204, 0.1)',
                                    },
                                }}
                            >
                                Back to Dashboard
                            </Button>
                            {hasChanges && (
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={saving}
                                    sx={{
                                        backgroundColor: '#1272CC',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#5994cc',
                                        },
                                        '.dark &': {
                                            backgroundColor: '#9379cc',
                                        },
                                        '.dark &:hover': {
                                            backgroundColor: '#b49ddb',
                                        },
                                    }}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
