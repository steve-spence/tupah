import { pgTable, varchar, text, timestamp, uuid, integer, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const postStatus = pgEnum("post_status", ["draft", "published", "archived"]);

// Profile
export const profile = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 120 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 512 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => profile.id, { onDelete: "set null" }),

    // URL-safe unique identifier
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),

    contentMd: text("content_md").notNull(),

    // optional rendered HTML (pre-render/cache)
    // contentHtml: text("content_html"),

    // bookkeeping
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),

    // status for drafts/published flow
    status: postStatus("status").default("draft").notNull(),

    // cover image relative path or URL
    coverImagePath: varchar("cover_image_path", { length: 512 }),

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
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    // Optional: for nested/threaded replies
    parentId: uuid("parent_id").references((): any => comments.id, { onDelete: "cascade" }),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
    profile: one(profile, {
        fields: [posts.userId],
        references: [profile.id],
    }),
    comments: many(comments),
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