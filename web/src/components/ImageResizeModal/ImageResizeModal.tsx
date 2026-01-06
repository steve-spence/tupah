'use client'

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { X } from 'lucide-react';

interface ImageResizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    currentWidth?: number;
    currentHeight?: number;
    onSave: (width: number | null, height: number | null) => void;
}

export default function ImageResizeModal({
    isOpen,
    onClose,
    imageUrl,
    currentWidth,
    currentHeight,
    onSave,
}: ImageResizeModalProps) {
    const [width, setWidth] = useState<string>(currentWidth?.toString() || '');
    const [height, setHeight] = useState<string>(currentHeight?.toString() || '');

    useEffect(() => {
        setWidth(currentWidth?.toString() || '');
        setHeight(currentHeight?.toString() || '');
    }, [currentWidth, currentHeight, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const w = width ? parseInt(width) : null;
        const h = height ? parseInt(height) : null;
        onSave(w, h);
        onClose();
    };

    const handleClear = () => {
        onSave(null, null);
        onClose();
    };

    // Strip existing query params for preview
    const baseUrl = imageUrl.split('?')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Resize Image
                </h2>

                {/* Image Preview */}
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ height: '150px' }}>
                    <img
                        src={baseUrl}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {/* Size Inputs */}
                <div className="flex gap-4 mb-4">
                    <TextField
                        label="Width (px)"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Auto"
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'gray' },
                                '&:hover fieldset': { borderColor: '#9379cc' },
                            },
                            '& .MuiInputLabel-root': { color: 'gray' },
                            '& .MuiInputBase-input': {
                                color: '#333',
                                '.dark &': { color: '#fff' },
                            },
                        }}
                    />
                    <TextField
                        label="Height (px)"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Auto"
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'gray' },
                                '&:hover fieldset': { borderColor: '#9379cc' },
                            },
                            '& .MuiInputLabel-root': { color: 'gray' },
                            '& .MuiInputBase-input': {
                                color: '#333',
                                '.dark &': { color: '#fff' },
                            },
                        }}
                    />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Leave empty for auto sizing. Set both for exact dimensions, or just one to maintain aspect ratio.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        variant="outlined"
                        onClick={handleClear}
                        sx={{
                            borderColor: 'gray',
                            color: 'gray',
                            '&:hover': { borderColor: '#666', backgroundColor: 'rgba(0,0,0,0.05)' },
                        }}
                    >
                        Clear Size
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: '#1272CC',
                            '&:hover': { backgroundColor: '#5994cc' },
                            '.dark &': { backgroundColor: '#9379cc' },
                            '.dark &:hover': { backgroundColor: '#b49ddb' },
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
