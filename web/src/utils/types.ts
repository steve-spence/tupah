// types.ts for db schema

export type UUID = string;
export type PostStatus = "draft" | "published" | "archived" | "all";

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
    cover_image_id: string | null;
    cover_image_url?: string | null;
    views: number;
    likes: number;
    comments: number;
    tags: string[];
    username?: string;
}

export type ImageCtx = {
    id: UUID;
    user_id: UUID;
    filename: string;
    storage_path: string;
    created_at: Date | null;
}

export type LikesCtx = {
    id: UUID;
    userId: UUID;
    targetType: string;
    targetId: UUID;
    created_at: Date;
}

export type CommentCtx = {
    id: UUID;
    post_id: UUID;
    user_id: UUID;
    content: string;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    parent_id: UUID;
}

export type ProfileCtx = {
    id: UUID;
    username: string;
    avatarUrl: string;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
}

