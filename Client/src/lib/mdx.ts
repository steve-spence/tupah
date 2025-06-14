import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';


const POSTS_PATH = path.join(process.cwd(), 'src/data/posts');

export function getPostSlugs() {
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
}

export function getAllPosts(): mdxProps[] {
    const fileNames = fs.readdirSync(POSTS_PATH);

    const posts: mdxProps[] = fileNames
        .filter((file) => file.endsWith('.mdx'))
        .map((fileName) => {
            const fullPath = path.join(POSTS_PATH, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                title: data.title,
                date: data.date,
                tags: data.tags || [],
                slug: data.slug || fileName.replace(/\.mdx$/, ''),
                image_path: data.image_path,
            };
        });

    return posts;
}