// components/BlogImage.tsx
'use client'
import Image, { ImageProps } from 'next/image'
import { parseImageSize } from '@/utils/imageMarkdown'

export default function BlogImage(props: ImageProps) {
    // Parse width and height from URL query params
    const src = typeof props.src === 'string' ? props.src : '';
    const { width, height } = parseImageSize(src);

    // If custom size is specified, use fixed dimensions
    if (width || height) {
        return (
            <span className="block max-w-4xl mx-auto my-6 text-center">
                <Image
                    {...props}
                    alt={props.alt || 'Blog Image'}
                    width={width || 800}
                    height={height || 600}
                    className="rounded-xl object-cover mx-auto"
                    style={{
                        width: width ? `${width}px` : 'auto',
                        height: height ? `${height}px` : 'auto',
                        maxWidth: '100%',
                    }}
                />
            </span>
        )
    }

    // Default: full width with aspect ratio
    return (
        <span className="block relative w-full aspect-video max-w-4xl mx-auto my-6">
            <Image
                {...props}
                alt={props.alt || 'Blog Image'}
                fill
                className="rounded-xl object-cover"
            />
        </span>
    )
}
