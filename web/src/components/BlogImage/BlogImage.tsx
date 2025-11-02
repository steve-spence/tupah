// components/BlogImage.tsx
'use client'
import Image, { ImageProps } from 'next/image'

export default function BlogImage(props: ImageProps, className?: string) {

    // todo implement some kind of system to just pass of list of string that will become links to a page in like a defined \
    // todo sitemap
    return (
        <figure className="relative w-full aspect-video max-w-4xl mx-auto my-6 text-center">
            <Image
                {...props}
                alt={props.alt || 'Blog Image'}
                fill
                className={`rounded-xl object-cover ${className}`}
            />
        </figure>
    )
}
