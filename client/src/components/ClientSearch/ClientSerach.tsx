"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import type { mdxProps } from "@/lib/mdx";
import { isObject } from "motion";

export default function ClientSearch({ posts, className, }: { posts: mdxProps[]; className?: string; }) {

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [hint, setHint] = useState("Search Blogs");

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  // MAKE THIS CENTERED and make it smaller an come out to like 50%
  return (
    <div
      className={`!transition-all duration-300 ease-in-out overflow-hidden ${className
        } ${focus ? "w-[70%]" : "w-[70%] sm:w-[60%] md:w-[50%]"}`}
    >
      <div className="mx-5">
        {/* Actual Search Bar */}
        <TextField
          className="w-full dark:text-white text-black"
          label={hint}
          value={query}
          onFocus={() => { setFocus(true); setHint("") }}
          onBlur={() => {
            if (!query) {
              setHint("Search Blogs");
            }
            setFocus(false)
          }}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              style: {
                border: "none",
                boxShadow: "none",
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
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
                ${focus && query != ""
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-2 p-2 text-white">
            {filtered.length === 0 && query !== "" ? (
              <p>No posts found.</p>
            ) : (
              filtered.map((post) => (
                // Each item on the serach bar
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="bg-[#333] p-4 rounded-4xl hover:bg-[#444] transition flex flex-row items-center justify-between">
                    <div className="flex gap-5 items-center justify-between">
                      {/* Image */}
                      <div className="relative h-10 aspect-[16/9]">
                        <Image
                          className="rounded-2xl"
                          src={post.image_path}
                          alt="Image for blog post"
                          fill
                        ></Image>
                      </div>
                      {/* Title */}

                      <h3 className="text-lg font-bold whitespace-nowrap">{post.title}</h3>
                    </div>
                    {/* Date */}
                    <p className="text-sm text-gray-300">{formatDate(post.date)}</p>

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

// Reformat the date
function formatDate(date: string) {
  // Date in form 2025-08-05
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return date;

  const year = m[1].slice(-2);
  const month = String(parseInt(m[2], 10));
  const day = String(parseInt(m[3], 10));
  return `${month}/${day}/${year}`;
}