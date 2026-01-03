// types.ts

export type UUID = string;
export type PostStatus = "draft" | "published" | "archived";

export type Post = {
    id: UUID;
    user_id: UUID;
    slug: string;
    title: string;
    content_md: string;
    published_at?: Date | null;
    created_at: Date;
    updated_at: Date;
    status: PostStatus;
    cover_image_path: string | null;
    views: number;
    likes: number;
    comments: number;
    tags: string[];
    username?: string;
}