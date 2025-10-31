import { pgTable, varchar, text, timestamp, uuid, integer, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const postStatus = pgEnum("post_status", ["draft", "published", "archived"]);

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

// --- Authors (minimal)
export const authors = pgTable("authors", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }),
    avatarUrl: varchar("avatar_url", { length: 512 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),

    // URL-safe unique identifier
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),

    // optional short summary for cards/SEO
    excerpt: varchar("excerpt", { length: 300 }),

    // Markdown source (store raw MD here)
    contentMd: text("content_md").notNull(),

    // optional rendered HTML (pre-render/cache)
    contentHtml: text("content_html"),

    // ISO date the post is meant to be “live”
    publishedAt: timestamp("published_at", { withTimezone: true }),

    // bookkeeping
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),

    // status for drafts/published flow
    status: postStatus("status").default("draft").notNull(),

    // cover image relative path or URL
    coverImagePath: varchar("cover_image_path", { length: 512 }),

    // tags: use string array via JSONB for flexibility
    tags: jsonb("tags").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),

    // optional metrics
    wordCount: integer("word_count"),
    readingTimeMin: integer("reading_time_min"),

    // author
    authorId: uuid("author_id").references(() => authors.id, { onDelete: "set null" }),
});

export const postsRelations = relations(posts, ({ one }) => ({
    author: one(authors, {
        fields: [posts.authorId],
        references: [authors.id],
    }),
}));