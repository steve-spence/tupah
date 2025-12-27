'use client'

const PRESET_TAGS = [
    "Tech",
    "Anime",
    "Gaming",
    "Music",
    "Movies",
    "Lifestyle",
    "Tutorial",
    "Opinion",
    "Story",
    "Code",
];

interface TagSelectorProps {
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
    className?: string;
}

export default function TagSelector({ selectedTags, onTagsChange, className = "" }: TagSelectorProps) {
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag));
        } else {
            onTagsChange([...selectedTags, tag]);
        }
    };

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {PRESET_TAGS.map((tag) => (
                <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag)
                        ? "bg-[#1976d2] dark:bg-[#b49ddb] text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
