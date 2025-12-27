'use client'

import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

interface Comment {
    id: string;
    content: string;
    username: string;
    created_at: string;
}

interface CommentSectionProps {
    slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [error, setError] = useState("");

    // Fetch comments on mount
    useEffect(() => {
        fetch(`/api/posts/${slug}/comments`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setComments(data);
                }
            })
            .catch(err => console.error("Failed to load comments:", err))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || submitting) return;

        setSubmitting(true);
        setError("");
        setShowAuthPrompt(false);

        try {
            const res = await fetch(`/api/posts/${slug}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment.trim() })
            });

            if (res.ok) {
                const comment = await res.json();
                setComments(prev => [...prev, comment]);
                setNewComment("");
            } else if (res.status === 401) {
                setShowAuthPrompt(true);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to post comment");
            }
        } catch (err) {
            setError("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
                <MessageCircle size={24} />
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            "@media (prefers-color-scheme: dark)": {
                                backgroundColor: "#2a2a2a",
                            },
                        },
                        "& .MuiInputBase-input": {
                            color: "#333",
                            "@media (prefers-color-scheme: dark)": {
                                color: "#fff",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9379cc",
                        },
                    }}
                />
                {showAuthPrompt && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                        You need to have an account to comment. Do you want to{" "}
                        <Link href="/login" className="text-[#9379cc] hover:underline font-semibold">
                            sign up
                        </Link>
                        ?
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!newComment.trim() || submitting}
                    startIcon={<Send size={16} />}
                    sx={{
                        mt: 2,
                        backgroundColor: "#9379cc",
                        "&:hover": { backgroundColor: "#7a5fbd" },
                    }}
                >
                    {submitting ? "Posting..." : "Post Comment"}
                </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-gray-500">Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    @{comment.username}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
