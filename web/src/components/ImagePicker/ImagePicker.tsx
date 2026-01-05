'use client'

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Images, CloudUpload, Trash2 } from "lucide-react";
import Loading from "../Loading/Loading";
import { fetchUserImages, uploadImage, deleteImage } from "@/services/mediaUpload";
import { ImageCtx } from "@/utils/types";

interface ImagePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

type Tab = "library" | "upload";

export default function ImagePicker({ isOpen, onClose, onSelect }: ImagePickerProps) {
    const [activeTab, setActiveTab] = useState<Tab>("library");
    const [images, setImages] = useState<ImageCtx[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Fetch user's images from database
    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const imgs = await fetchUserImages();
            setImages(imgs);
        } catch (err) {
            console.error("Failed to fetch images:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen, fetchImages]);

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadImage(file);
            // Refresh the library and switch to it
            await fetchImages();
            setActiveTab("library");
        } catch (err: any) {
            console.error("Upload failed:", err);
            alert(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDelete = async (imageId: string) => {
        setDeleting(imageId);
        try {
            await deleteImage(imageId);
            // Remove from local state
            setImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (err: any) {
            console.error("Delete failed:", err);
            alert(err.message || "Delete failed");
        } finally {
            setDeleting(null);
        }
    };

    if (!isOpen) return null;

    // Use portal to render outside form context
    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl w-full max-w-3xl h-[500px] flex overflow-hidden border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                }}
            >
                {/* Left Nav */}
                <div className="w-48 bg-gray-50 dark:bg-[#252525] border-r border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Images</h2>
                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab("library")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "library"
                                ? "bg-[#1272CC] dark:bg-[#9379cc] text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            <Images size={18} />
                            Your Media
                        </button>
                        <button
                            onClick={() => setActiveTab("upload")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "upload"
                                ? "bg-[#1272CC] dark:bg-[#9379cc] text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            <Upload size={18} />
                            Upload Media
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                            {activeTab === "library" ? "Your Media" : "Upload Media"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-4 overflow-auto">
                        {activeTab === "library" && (
                            <>
                                {loading ? (
                                    <Loading />
                                ) : images.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                        <Images size={48} className="mb-2 opacity-50" />
                                        <p>No images yet</p>
                                        <button
                                            onClick={() => setActiveTab("upload")}
                                            className="mt-2 text-[#1272CC] dark:text-[#9379cc] hover:underline"
                                        >
                                            Upload your first image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-3">
                                        {images.map((image) => (
                                            <div key={image.id} className="relative group">
                                                <button
                                                    onClick={() => {
                                                        onSelect(`/api/media/${image.id}`);
                                                        onClose();
                                                    }}
                                                    disabled={deleting === image.id}
                                                    className="aspect-square w-full rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1272CC] dark:hover:border-[#9379cc] transition-colors"
                                                >
                                                    <img
                                                        src={`/api/media/${image.id}`}
                                                        alt={image.filename}
                                                        className={`w-full h-full object-cover ${deleting === image.id ? "opacity-50" : ""}`}
                                                    />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(image.id);
                                                    }}
                                                    disabled={deleting === image.id}
                                                    className="absolute bottom-2 right-1 p-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <Trash2 size={16} color="white" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "upload" && (
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${dragOver
                                    ? "border-[#1272CC] dark:border-[#9379cc] bg-blue-50 dark:bg-[#9379cc]/10"
                                    : "border-gray-300 dark:border-gray-600"
                                    }`}
                            >
                                {uploading ? (
                                    <div className="text-gray-500 dark:text-gray-400">
                                        Uploading...
                                    </div>
                                ) : (
                                    <>
                                        <CloudUpload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            Drag and drop your image here
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">or</p>
                                        <label
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-4 py-2 bg-[#1272CC] dark:bg-[#9379cc] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        >
                                            Browse Files
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleFileSelect(e);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="hidden"
                                            />
                                        </label>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
