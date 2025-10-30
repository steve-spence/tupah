'use server';
import 'server-only'

import path from 'path'
import fs, { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';


const POSTS_PATH = path.join(process.cwd(), 'src/data/posts');

export async function getPostSlugs() {
    return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith('.mdx'));
}

export async function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx/, '');
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    return {
        slug: realSlug,
        fontMatter: data,
        content,
    };
}

export type mdxProps = {
    title: string,
    date: string,
    tags: string[],
    slug: string,
    image_path: string,
    content?: string,
}

export async function getAllPosts(): Promise<mdxProps[]> {
    const fileNames = await readdirSync(POSTS_PATH);

    const mdxFiles = fileNames.filter((f) => f.endsWith('.mdx'));

    const posts = await Promise.all(
        mdxFiles.map(async (fileName) => {
            const fullPath = path.join(POSTS_PATH, fileName);
            const fileContents = await readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                title: data.title,
                date: data.date,
                tags: data.tags || [],
                slug: data.slug || fileName.replace(/\.mdx$/, ''),
                image_path: data.image_path,
                content,
            } as mdxProps;
        })
    );

    // optional: sort newest → oldest
    posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return posts;
}