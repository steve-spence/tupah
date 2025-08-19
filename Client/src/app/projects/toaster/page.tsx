"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ToasterPage() {
  useEffect(() => {
    const interval = Math.floor(Math.random());
    console.log(interval);
    setInterval(() => {}, interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-[#212121]">
      <h1 className="text-4xl text-black dark:text-white p-10 bg-gray-400 w-full text-center font-bold">
        Click when the toast comes up!
      </h1>
      <div className="relative ">
        <Image src="/projects/toast.png" fill alt="A piece of toast" />
        <div id="toaster" className="w-fit h-fit p-3 pt-20">
          <div className="relative w-64 h-40 bg-gradient-to-br from-[#b4d2d9] to-[#88a2a7] rounded-3xl shadow-lg border-4 border-[#3b4c50] flex items-end justify-center">
            <div className="absolute left-0 top-12 -ml-4 w-4 h-12 bg-[#3b4c50] rounded-r-lg" />

            <div className="absolute bottom-10 flex flex-col items-center">
              <div className="flex gap-8">
                <div className="w-4 h-4 bg-black rounded-full" />
                <div className="w-4 h-4 bg-black rounded-full" />
              </div>
              <div className="w-12 h-2 border-b-2 border-black rounded-b-full mt-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
