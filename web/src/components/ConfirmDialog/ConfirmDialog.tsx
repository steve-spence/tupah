'use client'

interface ConfirmDialogProps {
    isOpen: boolean;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmDialog({
    isOpen,
    text,
    onConfirm,
    onCancel,
    confirmText = "Delete",
    cancelText = "Cancel"
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl p-6 max-w-md mx-4 border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-gray-800 dark:text-white text-lg mb-6">
                    {text}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                            text-white font-medium transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
