"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// Use server actions ideally, but API route is simpler for MVP form submission if prefer client-side
// I'll stick to client-side fetch to keep it simple without setting up server actions for CRUD yet.

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    published: z.boolean().default(false),
    coverImage: z.string().optional(),
    excerpt: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewPostPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            published: false,
            title: "",
            slug: "",
            content: "",
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to create post");

            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to create post");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/posts"
                            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold">New Post</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                {...register("published")}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Publish immediately
                        </label>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium shadow-sm"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Post
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                            <input
                                id="title"
                                {...register("title")}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                                placeholder="Enter post title"
                            />
                            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug</label>
                            <input
                                id="slug"
                                {...register("slug")}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow font-mono text-sm"
                                placeholder="post-url-slug"
                            />
                            {errors.slug && <p className="text-sm text-red-600">{errors.slug.message}</p>}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label htmlFor="content" className="block text-sm font-medium text-slate-700">Content</label>
                            <textarea
                                id="content"
                                {...register("content")}
                                rows={15}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow font-mono text-sm leading-relaxed"
                                placeholder="Write your post content here (Markdown supported)..."
                            />
                            {errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Sidebar Metadata */}
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Settings</h3>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Cover Image URL</label>
                                <input
                                    {...register("coverImage")}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="/uploads/..."
                                />
                                <p className="text-xs text-slate-500">Upload in Media library first and copy URL.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Excerpt</label>
                                <textarea
                                    {...register("excerpt")}
                                    rows={3}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Short summary..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
