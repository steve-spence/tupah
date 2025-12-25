'use client'

import { Header } from "@/components/Header/Header";
import { getUserPosts } from "@/services/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Post {
    id: string;
    slug: string;
    title: string;
    content_md: string;
    created_at: string;
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
        <div>
            <Header data={{ title: "nothing", subtext: "Dashboard", skinny: true }} />
            <button onClick={() => { router.push('/kitchen') }}>
                Go to Kitchen
            </button>
            <div id="user-posts" className="p-4 space-y-4">
                {loading && <p>Loading...</p>}
                {!loading && posts.length === 0 && <p>No posts yet.</p>}
                {posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}