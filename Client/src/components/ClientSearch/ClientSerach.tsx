"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import type { mdxProps } from "@/lib/mdx";

export default function ClientSearch({
  posts,
  className,
}: {
  posts: mdxProps[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  // MAKE THIS CENTERED and make it smaller an come out to like 50%
  return (
    <div
      className={`!transition-all duration-300 ease-in-out overflow-hidden ${
        className || ""
      } ${focus ? "w-[70%]" : "w-[70%] sm:w-[60%] md:w-[50%]"}`}
    >
      <div className="mx-5">
        {/* Actual Search Bar */}
        <TextField
          className="w-full dark:text-white text-black"
          label="Search"
          value={query}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              style: {
                border: "none",
                boxShadow: "none",
                textAlign: "center",
                color: "inherit",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            },
          }}
        />

        <div
          className={`z-10 !transition-all duration-300 ease-in-out overflow-hidden 
                ${
                  focus && query != ""
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
        >
          <div className="flex flex-col gap-2 p-2 text-white">
            {filtered.length === 0 && query !== "" ? (
              <p>No posts found.</p>
            ) : (
              filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="bg-[#333] p-4 rounded-4xl hover:bg-[#444] transition flex flex-row items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <div className="relative w-15 h-15">
                        <Image
                          className="rounded-2xl"
                          src={post.image_path}
                          alt="Image for blog post"
                          fill
                        ></Image>
                      </div>
                      <h3 className="text-lg font-bold">{post.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300">{post.date}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
