'use client'

import { useRef, useState, useCallback } from "react";
import { Bold, Italic, Image, Link, Heading2, List, Code, Quote, HelpCircle, Maximize2 } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import ImagePicker from "@/components/ImagePicker/ImagePicker";
import ImageResizeModal from "@/components/ImageResizeModal/ImageResizeModal";
import { parseImageAtCursor, buildImageMarkdown, ImageMatch } from "@/utils/imageMarkdown";

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
    const [showResizeModal, setShowResizeModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageMatch | null>(null);
    const [cursorOnImage, setCursorOnImage] = useState<ImageMatch | null>(null);

    // Check if cursor is on an image and update state
    const checkCursorPosition = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const cursorPos = textarea.selectionStart;
        const imageMatch = parseImageAtCursor(value, cursorPos);
        setCursorOnImage(imageMatch);
    }, [value]);

    // Open resize modal for the image at cursor
    const handleResizeClick = () => {
        if (cursorOnImage) {
            setSelectedImage(cursorOnImage);
            setShowResizeModal(true);
        }
    };

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

    // Handle double-click on textarea to detect image markdown
    const handleDoubleClick = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const cursorPos = textarea.selectionStart;
        const imageMatch = parseImageAtCursor(value, cursorPos);
        console.log(imageMatch);
        if (imageMatch) {
            setSelectedImage(imageMatch);
            setShowResizeModal(true);
        }
    };

    // Handle image resize save
    const handleResizeSave = (width: number | null, height: number | null) => {
        if (!selectedImage) return;

        const newMarkdown = buildImageMarkdown(
            selectedImage.alt,
            selectedImage.url,
            width,
            height
        );

        const newText =
            value.substring(0, selectedImage.startIndex) +
            newMarkdown +
            value.substring(selectedImage.endIndex);

        onChange(newText);
        setSelectedImage(null);
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
                {cursorOnImage && (
                    <Tooltip title="Resize Image" arrow>
                        <button
                            type="button"
                            onClick={handleResizeClick}
                            className="p-2 rounded bg-[#1272CC] dark:bg-[#9379cc] text-white
                                hover:bg-[#5994cc] dark:hover:bg-[#b49ddb]
                                transition-colors flex items-center gap-1"
                        >
                            <Maximize2 size={18} />
                            <span className="text-sm">Resize</span>
                        </button>
                    </Tooltip>
                )}
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
                onClick={checkCursorPosition}
                onKeyUp={checkCursorPosition}
                onDoubleClick={handleDoubleClick}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-3 rounded-b-lg border-2 border-gray-300 dark:border-gray-600
                    bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
                    focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
                    transition-colors resize-none"
                required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {cursorOnImage ? "Click 'Resize Image' in toolbar to resize" : "Click on an image link to resize it"}
            </p>

            <ImagePicker
                isOpen={showImagePicker}
                onClose={() => setShowImagePicker(false)}
                onSelect={handleImageSelect}
            />

            <ImageResizeModal
                isOpen={showResizeModal}
                onClose={() => {
                    setShowResizeModal(false);
                    setSelectedImage(null);
                }}
                imageUrl={selectedImage?.url || ''}
                currentWidth={selectedImage?.width}
                currentHeight={selectedImage?.height}
                onSave={handleResizeSave}
            />
        </div>
    );
}
