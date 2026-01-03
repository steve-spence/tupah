'use client'

import { Header } from "@/components/Header/Header";
import { getUserPosts, deletePost } from "@/services/post";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Eye, Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import SortSelect, { SortOption } from "./SortSelect";
import { Post } from "@/utils/types";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

export default function DashboardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [deletePostId, setDeletePostId] = useState<string | null>(null);

    const handleDeleteConfirm = () => {
        if (!deletePostId) return;
        deletePost(deletePostId)
            .then(() => setPosts(prev => prev.filter(p => p.id !== deletePostId)))
            .catch(err => alert(err.message))
            .finally(() => setDeletePostId(null));
    };

    useEffect(() => {
        getUserPosts()
            .then((data) => setPosts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const sortedPosts = useMemo(() => {
        const sorted = [...posts];
        switch (sortBy) {
            case "newest":
                return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            case "oldest":
                return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            case "views":
                return sorted.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
            case "likes":
                return sorted.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
            case "comments":
                return sorted.sort((a, b) => (b.comments ?? 0) - (a.comments ?? 0));
            case "a-z":
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case "z-a":
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return sorted;
        }
    }, [posts, sortBy]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header data={{ title: "nothing", subtext: "Dashboard", skinny: true }} />
            <div className="flex-1 dark:bg-[#212121]">
                <div className="flex flex-row gap-5 items-center justify-between px-5 py-3 dark:text-gray-100 text-black">
                    <div className="flex gap-3">
                        <Button variant="outlined" onClick={() => { router.push('/') }}>
                            Home
                        </Button>
                        <Button variant="outlined" onClick={() => { router.push('/kitchen') }}>
                            Go to Kitchen
                        </Button>
                    </div>
                    <SortSelect value={sortBy} onChange={setSortBy} />
                </div>

                <div id="user-posts" className="p-4 space-y-4">
                    {loading && <p>Loading...</p>}
                    {!loading && sortedPosts.length === 0 && <p>No posts yet.</p>}
                    {sortedPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => router.push(`/blog/${post.username}/${post.slug}`)}
                            className="p-4 bg-white text-black dark:text-white dark:bg-[#1a1a1a] rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/edit?id=${post.id}`);
                                    }}>
                                    <Pencil size={16} />
                                </button>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    {post.status}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye size={16} /> {post.views ?? 0}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Heart size={16} /> {post.likes ?? 0}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageCircle size={16} /> {post.comments ?? 0}
                                </span>
                                <button
                                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeletePostId(post.id);
                                    }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmDialog
                isOpen={deletePostId !== null}
                text="Once deleted, you will not be able to recover this blog. Are you sure you want to delete this post?"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeletePostId(null)}
            />
        </div>
    );
}