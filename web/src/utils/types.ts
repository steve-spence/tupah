// types.ts

export type UUID = string;
export type PostStatus = "draft" | "published" | "archived";

export interface Post {
    id: UUID;
    slug: string;
    title: string;
    excerpt?: string | null;
    contentMd: string;
    contentHtml?: string | null;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    status: PostStatus;
    coverImagePath?: string | null;
    tags: string[];
    wordCount?: number | null;
    readingTimeMin?: number | null;
    authorId?: UUID | null;
}


export interface PostCreate {
    slug: string;
    title: string;
    contentMd: string;
    excerpt?: string;
    contentHtml?: string;
    publishedAt?: Date;
    status?: PostStatus;       // default "draft" if omitted
    coverImagePath?: string;
    tags?: string[];
    wordCount?: number;
    readingTimeMin?: number;
    authorId?: UUID;
}

export interface PostUpdate {
    slug?: string;
    title?: string;
    contentMd?: string;
    excerpt?: string | null;
    contentHtml?: string | null;
    publishedAt?: Date | null;
    status?: PostStatus;
    coverImagePath?: string | null;
    tags?: string[];
    wordCount?: number | null;
    readingTimeMin?: number | null;
    authorId?: UUID | null;
}
