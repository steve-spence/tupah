import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-2 px-4 bg-gray-100 dark:bg-[#161616] text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between text-xs">
                <span>© {new Date().getFullYear()} Tupah</span>
                <div className="flex gap-4">
                    <Link href="/about" className="hover:text-[#1272CC] dark:hover:text-[#9379cc]">About</Link>
                    <Link href="/blog" className="hover:text-[#1272CC] dark:hover:text-[#9379cc]">Blogs</Link>
                    <Link href="/privacy" className="hover:text-[#1272CC] dark:hover:text-[#9379cc]">Privacy</Link>
                </div>
            </div>
        </footer>
    );
}
