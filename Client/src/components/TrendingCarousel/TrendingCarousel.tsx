'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TrendingCarouselProps {
    images: string[]
    className?: string
}

export function TrendingCarousel({
    images,
    className = '',
}: TrendingCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const [cardWidth, setCardWidth] = useState(0)

    // Measure the first card’s total width (including margin-right)
    useEffect(() => {
        if (!cardRef.current) return
        const style = window.getComputedStyle(cardRef.current)
        const margin = parseFloat(style.marginRight)
        setCardWidth(cardRef.current.offsetWidth + margin)
    }, [])

    // Auto-scroll by measured width
    useEffect(() => {
        const el = containerRef.current
        if (!el || cardWidth === 0) return

        const interval = setInterval(() => {
            // if at (or beyond) end, jump back
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
                el.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                el.scrollBy({ left: cardWidth, behavior: 'smooth' })
            }
        }, 4000)

        return () => clearInterval(interval)
    }, [cardWidth, images])

    return (
        <div
            ref={containerRef}
            className={`overflow-x-auto no-scrollbar w-full py-5 ${className}`}
        >
            <div className="flex gap-4 px-4 w-max">
                {images.map((img, idx) => (
                    <Link
                        key={idx}
                        href="/"
                        className="shrink-0 rounded-2xl overflow-hidden bg-[#333]"
                    >
                        <div
                            // attach ref only to the first card so we measure it once
                            ref={idx === 0 ? cardRef : null}
                            className="relative w-72 h-48"
                        >
                            <Image
                                src={img}
                                alt={`Slide ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

