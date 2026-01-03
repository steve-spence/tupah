'use client'

import { useRef, useState } from "react";
import { Bold, Italic, Image, Link, Heading2, List, Code, Quote, HelpCircle } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import ImagePicker from "@/components/ImagePicker/ImagePicker";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}

export default function MarkdownEditor({
    value,
    onChange,
    placeholder = "Write your content...",
    rows = 15
}: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showImagePicker, setShowImagePicker] = useState(false);

    const insertFormatting = (before: string, after: string = before) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        const newText =
            value.substring(0, start) +
            before +
            selectedText +
            after +
            value.substring(end);

        onChange(newText);

        // Restore cursor position after the inserted text
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = selectedText
                ? start + before.length + selectedText.length + after.length
                : start + before.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleImageSelect = (url: string) => {
        insertFormatting(`![image](${url})`, "");
    };

    const toolbarButtons = [
        { icon: Bold, action: () => insertFormatting("**"), title: "Bold" },
        { icon: Italic, action: () => insertFormatting("*"), title: "Italic" },
        { icon: Heading2, action: () => insertFormatting("## ", ""), title: "Heading" },
        { icon: Link, action: () => insertFormatting("[", "](url)"), title: "Link" },
        { icon: Image, action: () => setShowImagePicker(true), title: "Image" },
        { icon: Code, action: () => insertFormatting("`"), title: "Code" },
        { icon: List, action: () => insertFormatting("- ", ""), title: "List" },
        { icon: Quote, action: () => insertFormatting("> ", ""), title: "Quote" },
    ];

    return (
        <div>
            {/* Toolbar */}
            <div className="flex gap-1 p-2 bg-gray-100 dark:bg-[#252525] rounded-t-lg border-2 border-b-0 border-gray-300 dark:border-gray-600">
                {toolbarButtons.map(({ icon: Icon, action, title }) => (
                    <Tooltip key={title} title={title} arrow>
                        <button
                            type="button"
                            onClick={action}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700
                                text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white
                                transition-colors"
                        >
                            <Icon size={18} />
                        </button>
                    </Tooltip>
                ))}
                <Tooltip title="Markdown Guide" arrow>
                    <a
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 px-2 py-1 text-sm rounded
                            text-gray-500 dark:text-gray-400 hover:text-[#1272CC] dark:hover:text-[#9379cc]
                            transition-colors"
                    >
                        <HelpCircle size={16} />
                    </a>
                </Tooltip>
            </div>

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-3 rounded-b-lg border-2 border-gray-300 dark:border-gray-600
                    bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
                    focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
                    transition-colors resize-none"
                required
            />

            <ImagePicker
                isOpen={showImagePicker}
                onClose={() => setShowImagePicker(false)}
                onSelect={handleImageSelect}
            />
        </div>
    );
}
