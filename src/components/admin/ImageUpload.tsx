"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export default function ImageUpload({ value, onChange, label, className = "" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        // Show local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: "Upload failed" }));
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await res.json();
            onChange(data.url);
            setPreview(data.url); // Use the server URL after upload
        } catch (error) {
            console.error("Upload error:", error);
            alert("Görsel yüklenirken bir hata oluştu.");
            setPreview(value || null); // Revert to old value on error
        } finally {
            setIsUploading(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">
                    {label}
                </label>
            )}

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative group cursor-pointer 
                    border-2 border-dashed rounded-xl 
                    transition-all duration-200 ease-in-out
                    overflow-hidden
                    ${preview ? 'border-blue-500/50 bg-blue-50/10' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30'}
                    ${isUploading ? 'opacity-70 pointer-events-none' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {preview ? (
                    <div className="relative aspect-video w-full h-40 bg-slate-100 flex items-center justify-center">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <span className="text-white text-xs font-bold uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                Değiştir
                            </span>
                            <button
                                onClick={handleClear}
                                className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 gap-3 text-slate-400 hover:text-blue-500 transition-colors">
                        <div className="p-3 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
                            {isUploading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <Upload className="w-6 h-6" />
                            )}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">
                            {isUploading ? "Yükleniyor..." : "Görsel Yükle"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
