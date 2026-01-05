import { ImageCtx } from "@/utils/types";

export async function fetchUserImages(): Promise<ImageCtx[]> {
    const res = await fetch("/api/media");
    if (!res.ok) throw new Error("Failed to fetch images");
    const data = await res.json();
    return data.images || [];
}

export async function uploadImage(file: File): Promise<void> {
    if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file");
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
    }
}

export async function deleteImage(imageId: string): Promise<void> {
    const res = await fetch(`/api/media/${imageId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
    }
}
