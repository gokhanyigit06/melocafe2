"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";

interface UploadableImageFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    description?: string;
}

export default function UploadableImageField({
    label,
    value,
    onChange,
    placeholder = "/images/...",
    description
}: UploadableImageFieldProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            if (data.success && data.url) {
                onChange(data.url);
            }
        } catch (error) {
            console.error(error);
            alert("Yükleme başarısız oldu.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider">{label}</label>
                {description && <span className="text-[10px] text-slate-600 font-bold">{description}</span>}
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <ImageIcon className="w-4 h-4" />
                    </div>
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-950 focus:border-blue-600 focus:ring-blue-600/10 transition-all outline-none font-mono text-xs"
                        placeholder={placeholder}
                    />
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/*"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-black disabled:opacity-50 transition-all font-bold text-xs uppercase shadow-sm"
                >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {isUploading ? "Yükleniyor..." : "Yükle"}
                </button>
            </div>
        </div>
    );
}
