// types.ts

export type UUID = string;
export type PostStatus = "draft" | "published" | "archived";

export type Post = {
    id: UUID;
    user_id: UUID;
    slug: string;
    title: string;
    excerpt?: string | null;
    content_md: string;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    status: PostStatus;
    cover_image_path: string | null;
    views: number;
    likes: number;
    comments: number;
    username?: string;
}