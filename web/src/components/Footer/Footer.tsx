import Link from "next/link";
import Image from "next/image";

const Section = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
    <div className="flex flex-col items-center py-1">
        <ul className="text-sm text-center">
            {links.map((l) => (
                <li key={l.label}>
                    <Link
                        href={l.href}
                        className="hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors"
                    >
                        {l.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default function Footer() {
    return (
        <footer className="relative w-full text-black dark:text-white">
            <div className="flex flex-wrap px-4 bg-gray-100 dark:bg-[#161616] md:flex-col">

                <div className="flex flex-wrap flex-row-reverse gap-6 items-center justify-center">

                    {/* Floating logo */}
                    <div className="absolute left-1/8 -top-[60px] -translate-x-1/2 w-24 h-24">
                        <Image
                            src="/pictures/owl_logo.png"
                            alt="Owl Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <Section
                        title="About"
                        links={[
                            { label: "Me", href: "/about" },
                            { label: "Blogs", href: "/blog" },
                        ]}
                    />

                    <Section
                        title="Privacy"
                        links={[
                            { label: "Privacy Policy", href: "/privacy#policy" },
                            { label: "Terms", href: "/privacy#terms" },
                        ]}
                    />

                </div>
            </div>

            <div className="py-2 text-center text-xs text-gray-900 dark:text-gray-300 bg-gray-100 dark:bg-[#161616]">
                © {new Date().getFullYear()} Tupah
            </div>
        </footer>
    );
}
