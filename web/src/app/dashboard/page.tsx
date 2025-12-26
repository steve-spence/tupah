'use client'

import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getUserPosts } from "@/services/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, Heart, MessageCircle, Pencil } from "lucide-react";
import Button from "@mui/material/Button";

interface Post {
    id: string;
    slug: string;
    title: string;
    content_md: string;
    created_at: string;
    views: number;
    likes: number;
    comments: number;
    username: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserPosts()
            .then((data) => setPosts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header data={{ title: "nothing", subtext: "Dashboard", skinny: true }} />
            <div className="flex-1 dark:bg-[#212121]">
                <div className="flex flex-row gap-5 items-end justify-baseline px-5 p-1 dark:text-gray-100 text-black">
                    <Button variant="outlined" onClick={() => { router.push('/') }}>
                        Home
                    </Button>
                    <Button variant="outlined" onClick={() => { router.push('/kitchen') }}>
                        Go to Kitchen
                    </Button>
                </div>

                <div id="user-posts" className="p-4 space-y-4">
                    {loading && <p>Loading...</p>}
                    {!loading && posts.length === 0 && <p>No posts yet.</p>}
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => router.push(`/blog/${post.username}/${post.slug}`)}
                            className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span
                                    className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-purple-400 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/edit?id=${post.id}`);
                                    }}>
                                    <Pencil size={16} />
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}