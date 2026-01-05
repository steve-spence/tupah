import { pgTable, varchar, text, timestamp, uuid, integer, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { bookKeeping } from "./schema.helper";


export const postStatus = pgEnum("post_status", ["draft", "published", "archived"]);

// Profile
export const profile = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 120 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 512 }),
    ...bookKeeping,
});

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => profile.id, { onDelete: "set null" }),

    // URL-safe unique identifier
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),

    contentMd: text("content_md").notNull(),

    // bookkeeping
    ...bookKeeping,

    // status for drafts/published flow
    status: postStatus("status").default("draft").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),

    // cover image relative path or URL
    coverImageId: varchar("cover_image_id", { length: 12 }).references(() => images.id, { onDelete: "set null" }),

    // Analytics
    views: integer().default(1),
    likes: integer().default(0),
    comments: integer().default(0),

});

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
    userId: uuid("user_id").references(() => profile.id, { onDelete: "set null" }),
    content: text("content").notNull(),
    ...bookKeeping,
    parentId: uuid("parent_id").references((): any => comments.id, { onDelete: "cascade" }),
});

// User uploaded images with short IDs
export const images = pgTable("images", {
    id: varchar("id", { length: 12 }).primaryKey(), // Short ID like "abc123"
    userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" }).notNull(),
    filename: varchar("filename", { length: 255 }).notNull(),
    storagePath: varchar("storage_path", { length: 512 }).notNull(), // Full path in Supabase storage
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Generic likes table - works for posts, comments, or any entity
export const likes = pgTable("likes", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" }).notNull(),
    targetType: varchar("target_type", { length: 50 }).notNull(), // "post" | "comment"
    targetId: uuid("target_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
    profile: one(profile, {
        fields: [posts.userId],
        references: [profile.id],
    }),
    comments: many(comments),
    coverImage: one(images, {
        fields: [posts.coverImageId],
        references: [images.id]
    }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id],
    }),
    author: one(profile, {
        fields: [comments.userId],
        references: [profile.id],
    }),
    parent: one(comments, {
        fields: [comments.parentId],
        references: [comments.id],
    }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
    user: one(profile, {
        fields: [images.userId],
        references: [profile.id],
    }),
}));