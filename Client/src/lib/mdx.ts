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
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
        },
        scope: data,
    });

    return {
        slug: realSlug,
        fontMatter: data,
        mdxSource,
    };
}