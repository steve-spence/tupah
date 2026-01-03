import { environment } from "@/environments/environment";
import { Post, PostStatus } from "@/utils/types";


export async function createPost(post: { title: string; content: string; status: string; selectedTags: string[] }) {
    const res = await fetch('/api/posts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: post.title,
            content: post.content,
            status: post.status,
            tags: post.selectedTags,
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not post to api posts.");
    }

    return data;
}

export async function getUserPosts() {
    const res = await fetch('api/posts', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not get from /api/posts");
    }

    return data;
}

export async function getRandomPosts() {
    const res = await fetch('api/posts/random', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not get from /api/posts");
    }
    console.log("data: ", data);
    return data;
}

export async function getPostById(id: string) {
    const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not get post");
    }

    return data;
}

export async function updatePost(id: string, title: string, content: string, tags: string[], status: PostStatus) {
    const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags, status })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not update post");
    }

    return data;
}

export async function deletePost(id: string) {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Could not delete post");
    }

    return data;
}