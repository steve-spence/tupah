'use client'
import { Header } from "@/components/Header/Header";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { getPostById, updatePost } from "@/services/post";
import Button from "@mui/material/Button";
import TagSelector from "@/components/TagSelector/TagSelector";
import Autocomplete from "@mui/material/Autocomplete";
import { Post, PostStatus } from "@/utils/types";
import TextField from "@mui/material/TextField";
import Markdown from "react-markdown";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import Loading from "@/components/Loading/Loading";

const statusOptions: PostStatus[] = ["draft", "published", "archived"]

function EditForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const postId = searchParams.get("id");

    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<PostStatus>("draft");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (!postId) {
            setError("No post ID provided");
            setLoading(false);
            return;
        }

        getPostById(postId)
            .then((data) => {
                setPost(data);
                setTitle(data.title);
                setContent(data.content_md);
                setStatus(data.status);
                console.log("tags", data.tags);
                setSelectedTags(data.tags);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postId) return;

        setSaving(true);
        setError("");

        try {
            await updatePost(postId, title, content, selectedTags, status);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error && !post) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600
                                bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white
                                focus:outline-none focus:border-[#1272CC] dark:focus:border-[#9379cc]
                                transition-colors"
                        required />
                </div>

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

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving}
                        className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg
                                bg-gradient-to-r from-[#1272CC] to-[#5994cc] dark:from-[#9379cc] dark:to-[#b49ddb]">
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => router.push("/dashboard")}
                        className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-gray-400
                                text-gray-700 dark:text-gray-300">
                        Cancel
                    </Button>
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
                            <div className="prose dark:prose-invert prose-gray max-w-none">
                                <Markdown>{content}</Markdown>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EditPage() {
    return (
        <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#0e0e0e]">
            <Header data={{ title: "", subtext: "Edit Post", skinny: true }} />
            <Suspense fallback={<Loading />}>
                <EditForm />
            </Suspense>
        </div>
    );
}