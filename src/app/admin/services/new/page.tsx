"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.string().optional(), // Store as string for input flexibility
    isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export default function NewServicePage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            isActive: true,
            title: "",
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to create service");

            router.push("/admin/services");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to create service");
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
                            href="/admin/services"
                            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold">New Service</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                {...register("isActive")}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Active
                        </label>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium shadow-sm"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Service
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Title</label>
                            <input
                                {...register("title")}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Product/Service Name"
                            />
                            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                {...register("description")}
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Details..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Price (Optional)</label>
                            <input
                                {...register("price")}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="25.00"
                                type="number"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Media</h3>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Image URL</label>
                                <input
                                    {...register("imageUrl")}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="/uploads/..."
                                />
                                <p className="text-xs text-slate-500">Upload in Media library first.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
