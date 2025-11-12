import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#080808] text-black dark:text-white">
            <div className="flex flex-row w-full h-fit gap-5 py-8 px-4">
                <div className="hidden sm:flex flex-col items-center">
                    <div className="relative lg:w-48 lg:h-48 w-32 h-32">
                        <Image
                            src="/pictures/owl_logo.png"
                            className="object-contain p-5"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="Owl Logo"
                        />
                    </div>
                    <h1 className="py-5 font-bold text-xl">Tupah</h1>
                    <p className="font-medium text-center text-gray-600 dark:text-gray-400">
                        A website that's cool
                    </p>
                </div>
                <div className="flex flex-col flex-1 justify-center items-center">
                    <h5 className="p-5 text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc]">
                        About
                    </h5>
                    <ul className="text-center space-y-2">
                        <li>
                            <Link href="/about" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Me
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Blogs
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col flex-1 justify-center items-center">
                    <h5 className="p-5 text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc]">
                        Privacy
                    </h5>
                    <ul className="text-center space-y-2">
                        <li>
                            <Link href="/privacy#policy" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy#terms" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Terms and Conditions
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col flex-1 justify-center items-center">
                    <h5 className="p-5 text-2xl font-semibold text-[#1272CC] dark:text-[#9379cc]">
                        Social
                    </h5>
                    <ul className="text-center space-y-2">
                        <li>
                            <Link href="#" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Discord
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                Instagram
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors">
                                X
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full border-t border-gray-300 dark:border-gray-700 py-4">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Tupah. All rights reserved.
                </p>
            </div>
        </footer>
    );
}