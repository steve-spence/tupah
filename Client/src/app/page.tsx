// Home Page 
'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { LeftNav } from "@/components/LeftNav/LeftNav"
import { useState } from 'react'

export default function HomePage() {


  return (
    <div className="flex flex-row border-9 h-fit w-111">

      {/* Main Page Layout */}
      <div className="flex flex-col p-17 gap-2 border-2">
        <Link href={'/blog'}>link</Link>
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
        <Image src="/test.png" alt="test" width={200} height={200} />
      </div>
    </div>
  )
}