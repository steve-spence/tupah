"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header/Header";
import { createPost } from "@/services/post";
import TagSelector from "@/components/TagSelector/TagSelector";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import Autocomplete from "@mui/material/Autocomplete";
import { PostStatus } from "@/utils/types";
import TextField from "@mui/material/TextField";
import Markdown from "react-markdown";
import Loading from "@/components/Loading/Loading";
import ImagePicker from "@/components/ImagePicker/ImagePicker";
import { ImagePlus, X } from "lucide-react";

const statusOptions: PostStatus[] = ["draft", "published", "archived"]

function CreateForm() {
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
  const [coverImageId, setCoverImageId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = { title, content, status, selectedTags, coverImageId };
    try {
      console.log("title", { title, content });
      await createPost(post);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
    router.push('/dashboard')
  };

  return (
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
            maxLength={30}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
              focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
              transition-colors"
            required
          />
        </div>

        {/* Content Editor */}
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-semibold text-gray-700 dark:text-white mb-2"
          >
            Content
          </label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="Write your post content..."
            rows={15}
          />
        </div>
        {/* Cover Image */}
        <div className="flex items-center justify-between">
          {coverImageId ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 group">
              <img
                src={coverImageId}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsImagePickerOpen(true)}
                  className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <ImagePlus size={14} className="text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => setCoverImageId(null)}
                  className="p-1.5 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X size={14} className="text-gray-700" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsImagePickerOpen(true)}
              className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600
                flex flex-col items-center justify-center gap-1
                text-gray-500 dark:text-gray-400 hover:border-[#1272CC] dark:hover:border-[#9379cc]
                hover:text-[#1272CC] dark:hover:text-[#9379cc] transition-colors"
            >
              <ImagePlus size={20} />
              <span className="text-xs">Cover Image</span>
            </button>
          )}
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
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setTitle("");
              setContent("");
              setCoverImageId(null);
            }}
            className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-gray-400
            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            Clear
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      {(title || content || coverImageId) && (
        <div className="mt-10 p-6 rounded-lg bg-white dark:bg-[#1a1a1a] shadow-lg">
          <h1 className="pb-3 text-center text-gray-800 dark:text-white text-3xl font-bold">Preview</h1>
          <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
            {title && (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {title}
              </h2>
            )}

            {content && (
              <div className="prose dark:prose-invert prose-gray max-w-none">
                <Markdown>{content}</Markdown>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={(url) => setCoverImageId(url)}
      />
    </div>
  );
}

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#0e0e0e]">
      <Header
        data={{
          title: "Create",
          subtext: "Create",
          showLinks: true,
          skinny: true,
        }}
      />
      <Suspense fallback={<Loading />}>
        <CreateForm />
      </Suspense>
    </div>
  );
}