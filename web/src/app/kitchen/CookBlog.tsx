"use client";

import { useRouter } from "next/navigation"
import { useState } from "react";
import TagSelector from "@/components/TagSelector/TagSelector";

interface CookBlogProps {
    onBack: () => void;
}

export function CookBlog({ onBack }: CookBlogProps) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [style, setStyle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleStartCooking = () => {
        const params = new URLSearchParams();
        if (title) params.set("title", title);
        if (style) params.set("style", style);
        if (ingredients) params.set("ingredients", ingredients);
        if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
        router.push(`/create?${params.toString()}`);
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">Cook a Blog</h2>
                    <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What should your blog be about?"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Cooking Style
                        </label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">Select a style...</option>
                            <option value="casual">Casual & Conversational</option>
                            <option value="professional">Professional & Formal</option>
                            <option value="technical">Technical & Detailed</option>
                            <option value="storytelling">Storytelling</option>
                        </select>
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tags
                        </label>
                        <TagSelector
                            selectedTags={selectedTags}
                            onTagsChange={setSelectedTags}
                            className="mt-3"
                        />
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        onClick={onBack}
                        className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button onClick={handleStartCooking} className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors">
                        Start Cooking
                    </button>
                </div>
            </div>
        </div>
    );
}