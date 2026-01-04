'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search } from "lucide-react";
import Button from "@mui/material/Button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#0e0e0e] flex flex-col items-center justify-center px-6">
            {/* Animated 404 */}
            <div className="relative mb-8">
                <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b49ddb] select-none">
                    404
                </h1>
                <div className="absolute inset-0 text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b49ddb] blur-2xl opacity-30 select-none">
                    404
                </div>
            </div>

            {/* Message */}
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Looks like you wandered into the Tupah forest and got lost.
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="outlined"
                    startIcon={<ArrowLeft size={18} />}
                    onClick={() => router.back()}
                    sx={{
                        borderColor: '#9379cc',
                        color: '#9379cc',
                        '&:hover': {
                            borderColor: '#b49ddb',
                            backgroundColor: 'rgba(147, 121, 204, 0.1)',
                        },
                    }}
                    className="px-6 py-3 font-semibold rounded-lg border-2"
                >
                    Go Back
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Home size={18} />}
                    onClick={() => router.push('/')}
                    sx={{
                        background: 'linear-gradient(to right, #9379cc, #503094)',
                        '&:hover': {
                            background: 'linear-gradient(to right, #8269bc, #a38dcb)',
                        },
                    }}
                    className="px-6 py-3 font-semibold rounded-lg shadow-lg"
                >
                    Go Home
                </Button>
                <Button
                    variant="outlined"
                    endIcon={<Search size={18} />}
                    onClick={() => router.push('/blog')}
                    sx={{
                        borderColor: '#9379cc',
                        color: '#9379cc',
                        '&:hover': {
                            borderColor: '#b49ddb',
                            backgroundColor: 'rgba(147, 121, 204, 0.1)',
                        },
                    }}
                    className="px-6 py-3 font-semibold rounded-lg border-2"
                >
                    Browse Blogs
                </Button>
            </div>

        </div>
    );
}
