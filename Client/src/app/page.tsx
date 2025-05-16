// Home Page 
'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { LeftNav } from "@/components/LeftNav/LeftNav"
import { useState } from 'react'

export default function HomePage() {


  return (
    <div className="flex flex-col">

      {/* Background Image  ----------------- 4000x4000px size svg ------------------ */}
      <section>
        <div className="fixed flex top-0 left-0 w-full h-full items-top justify-center z-[-1] bg-[#171717]">
          <div className="transition-all duration-300 w-[600] h-[600]">
            <img className="z-[50] py-[10vh]" src="/my_favorite.svg" alt="https://pixabay.com/users/andsproject-26081561/ I love their art."></img>
          </div>
        </div>
      </section>


      {/* Home Page Header */}
      <section>
        <div className="flex flex-col items-center bg-[#272727] p-10">
          <h1>Tupah</h1>
          <h4>Tasteful insights from a strong young mind.</h4>
        </div>
      </section>

      {/* The section in front of the background */}
      <section>
        <div className="flex flex-row content-between">
          <div className="flex md:w-1/2 h-[60vh] border-radius-3">
            <div className="flex grow items-center justify-center">
              <h1 className="text-red-300">LEFT</h1>
            </div>
          </div>
          <div className="flex grow items-center justify-center">

            <h1 className="text-red-300">RIGHT</h1>
          </div>
        </div>
      </section>

      {/* --------------------- Background ------------------------ */}
      {/* The image in the background */}
      <section>
        <div className="fixed">

        </div>
      </section>

      {/* Rotating thing */}
      <section>
        <div>

        </div>
      </section>

      {/* rs images */}
      <div className="flex flex-col p-17 gap-2 w-full justify-center items-center bg-[#242424]">
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