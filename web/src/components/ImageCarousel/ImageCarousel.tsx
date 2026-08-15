'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
    verticalImages: string[],
    wideImages: string[],
}

function subscribeMd(callback: () => void) {
    const mql = window.matchMedia('(min-width: 1440px)')
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
}

function getMdSnapshot() {
    return window.matchMedia('(min-width: 1440px)').matches
}

export default function ImageCarousel({ verticalImages, wideImages }: ImageCarouselProps) {
    const isMd = useSyncExternalStore(subscribeMd, getMdSnapshot, () => false)
    const [idx, setIdx] = useState(0)

    // Only run the carousel when at md+
    // Note: This should be done with tailwind and just making one div hidden on md: breakpoint
    // but we learn from our mistakes
    useEffect(() => {
        const whichImage = isMd ? wideImages.length : verticalImages.length
        const interval = setInterval(() => {
            setIdx((i) => (i + 1) % whichImage)
        }, 5000) // change every 5s
        return () => clearInterval(interval)
    }, [isMd, verticalImages.length, wideImages.length])

    const src = isMd ? wideImages[idx] : verticalImages[idx]
    const aspectRatio = isMd ? 'aspect-[16/9]' : 'aspect-[3/4]'
    return (
        <div
            className={`relative flex items-center justify-center w-full overflow-hidden rounded-2xl shadow-lg ${aspectRatio}`}
        >
            <Image
                fill
                loading="eager"
                src={src}
                sizes="50vw"
                alt="Blog hero"
                className="object-cover transition-opacity duration-700 ease-in-out"
            />
        </div>
    )
}
