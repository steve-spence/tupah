// Home Page 

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { NavIcon } from "@/components/NavIcon/NavIcon"

export default function HomePage() {
  return (
    <div className="flex flex-col p-17 gap-2">
      <Link href={'/blog'}>link</Link>
      <Image src="/test.png" alt="test" width={200} height={200} />
      <NavIcon data={{ title: "title", bg_path: "/test.png" }} />
    </div>
  )
}