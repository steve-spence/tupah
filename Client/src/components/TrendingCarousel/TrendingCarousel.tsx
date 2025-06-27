'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export interface TrendingProps {
    images: string[]
}

export function TrendingCarousel({ images }: TrendingProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    const CARD_WIDTH = 400 + 16 // width + gap

    return (
        <div className="overflow-hidden w-full py-5">
            <motion.div
                className="flex gap-4"
                animate={{ x: -index * CARD_WIDTH }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                {images.map((img, idx) => (
                    <Link
                        key={idx}
                        href="/"
                        className="relative flex-shrink-0 w-[400px] h-[225px] bg-amber-500 rounded-2xl"
                    >
                        <Image
                            src={img}
                            alt={`Blog ${idx}`}
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </Link>
                ))}
            </motion.div>
        </div>
    )
}