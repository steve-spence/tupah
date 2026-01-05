'use client'

import { useState, useEffect, useRef } from "react";
import { HeartIcon, HeartIconHandle } from "@/components/ui/heart";
import Button from "@mui/material/Button";
import Link from "next/link";

interface LikeButtonProps {
    slug: string;
    initialLikes: number;
}

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const heartRef = useRef<HeartIconHandle>(null);

    // Check if user has liked on mount
    useEffect(() => {
        fetch(`/api/posts/${slug}/like`)
            .then(res => res.json())
            .then(data => {
                setLiked(data.liked);
                if (data.likes !== undefined) {
                    setLikes(data.likes);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [slug]);

    const handleLike = async () => {
        if (loading) return;

        setLoading(true);
        setShowAuthPrompt(false);

        try {
            const res = await fetch(`/api/posts/${slug}/like`, { method: "POST" });
            if (res.ok) {
                const data = await res.json();
                setLikes(data.likes);
                setLiked(data.liked);
                // Trigger heart animation on like
                if (data.liked) {
                    heartRef.current?.startAnimation();
                }
            } else if (res.status === 401) {
                // User not logged in - show prompt
                setShowAuthPrompt(true);
            }
        } catch (err) {
            console.error("Failed to like:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>


            <Button
                variant="outlined"
                onClick={handleLike}
                disabled={loading}
                startIcon={
                    <HeartIcon
                        ref={heartRef}
                        size={20}
                        filled={liked}
                        className={liked ? "text-red-500" : ""}
                    />
                }
                sx={{
                    borderColor: liked ? "#ef4444" : "gray",
                    color: liked ? "#ef4444" : "inherit",
                    "&:hover": {
                        borderColor: "#ef4444",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                    },
                }}
            >
                {likes} {likes === 1 ? "Like" : "Likes"}
            </Button>
            {
                showAuthPrompt && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                        You need to have an account to <b>Like</b> posts. Do you want to{" "}
                        <Link href="/login" className="text-[#9379cc] hover:underline font-semibold">
                            sign up
                        </Link>
                        ?
                    </p>
                )
            }
        </div>);
}
