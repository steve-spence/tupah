import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (

        <div className="flex flex-row w-full h-fit bg-gray-300 dark:bg-[#212121] text-black dark:text-white gap-5">
            <div className="hidden sm:flex flex-col items-center">
                <div className="relative lg:w-48 lg:h-48 w-32 h-32">
                    <Image
                        src="/pictures/owl_logo.png"
                        className="object-contain p-5"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt=" Owl Logo"
                    />
                </div>
                <h1 className="py-5">Tupah</h1>
                <p className="font-bold text-center">
                    Steven Spencer's website<br></br>for stuff.
                </p>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
                <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                    About
                </h5>
                <ul className="text-center">
                    <li>
                        <Link href="/about">Me</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blogs</Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
                <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                    Privacy
                </h5>
                <ul className="text-center">
                    <li>
                        <Link href="/privacy#policy">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/privacy#terms">Terms and Conditions</Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center">
                <h5 className="p-5 text-2xl text-[#1272CC] dark:text-[#9379cc]">
                    Social
                </h5>
                <ul className="text-center">
                    <li>
                        <Link href="/privacy#discord">Discord</Link>
                    </li>
                    <li>
                        <Link href="/privacy#instagram">Instagram</Link>
                    </li>
                    <li>
                        <Link href="/privacy#X">X</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}