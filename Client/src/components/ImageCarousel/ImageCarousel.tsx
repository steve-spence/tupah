'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
    verticalImages: string[],
    wideImages: string[],
}

export function ImageCarousel({ verticalImages, wideImages }: ImageCarouselProps) {
    const mainImage = verticalImages[0];

    const [isMd, setIsMd] = useState(false)
    const [idx, setIdx] = useState(0)

    // Watch for md breakpoint
    useEffect(() => {
        const mql = window.matchMedia('(min-width: 1440px)')
        const onChange = (e: MediaQueryListEvent) => setIsMd(e.matches)

        setIsMd(mql.matches)
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
    }, [])

    // Only run the carousel when at md+
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
                src={src}
                alt="Blog hero"
                className="object-cover transition-opacity duration-700 ease-in-out"
            />
        </div>
    )
}
