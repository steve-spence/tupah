"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header/Header";
import { createPost } from "@/services/post";
import TagSelector from "@/components/TagSelector/TagSelector";
import Autocomplete from "@mui/material/Autocomplete";
import { PostStatus } from "@/utils/types";
import TextField from "@mui/material/TextField";

const statusOptions: PostStatus[] = ["draft", "published", "archived"]

export default function CreatePage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const p_title = searchParams.get("title");
  const p_tags = searchParams.get("tags");

  const [title, setTitle] = useState(p_title || "");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<PostStatus>("draft");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    p_tags ? p_tags.split(",") : []
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = { title, content, status, selectedTags };
    try {
      console.log("title", { title, content });
      await createPost(post);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
    router.push('/dashboard')
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#0e0e0e]">
      <Header
        data={{
          title: "Tupah",
          subtext: "Welcome back",
          showLinks: true,
        }}
      />
      <div className="max-w-4xl mx-auto p-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600
                bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
                focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
                transition-colors"
              required
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-semibold text-gray-700 dark:text-white mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={15}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600
                bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
                focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
                transition-colors resize-none"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Tags
            </label>
            <TagSelector
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Status */}
          <div>
            <Autocomplete
              options={statusOptions}
              value={status}
              onChange={(_, newValue) => newValue && setStatus(newValue)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#9379cc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#b49ddb',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9379cc',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9ca3af',
                },
                '& .MuiSvgIcon-root': {
                  color: '#9379cc',
                },
              }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="contained"
              className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl
                transform hover:scale-105 transition-all duration-300
                bg-gradient-to-r from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b49ddb]"
            >
              Publish Post
            </Button>
            <Suspense>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
                className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-gray-400
                text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                Clear
              </Button>
            </Suspense>
          </div>
        </form>

        {/* Preview Section */}
        {(title || content) && (
          <div className="mt-10 p-6 rounded-lg bg-white dark:bg-[#1a1a1a] shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Preview
            </h2>
            <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
              {title && (
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {title}
                </h3>
              )}
              {content && (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {content}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}