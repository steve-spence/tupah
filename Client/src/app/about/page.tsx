

import React from 'react'
import { Header } from '@/components/Header/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <div>

            {/* Header */}
            <section>
                <Header data={{ title: "Steven Spencer", subtext: "About me" }}
                    className="flex sm:justify-between justify-center bg-[#272727] p-5 h-32 w-full z-2" />
            </section>

            {/* Hero Section */}
            <div className="flex flex-col w-full h-[50vh]">
                <div className="relative w-60 aspect-[3/4] rounded-3xl overflow-hidden">
                    <Image className="object-cover" src="/pictures/good_pic.jpg" alt="The Hero" fill ></Image>
                </div>


            </div>
        </div>
    )

}