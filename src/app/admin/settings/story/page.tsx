"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useRouter } from "next/navigation";

export default function StorySettings() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (!res.ok) throw new Error("Failed to save settings");
            alert("Hikayemiz bölümü güncellendi!");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 uppercase">Hikayemiz (Story) Ayarları</h1>
                    <p className="text-slate-500 mt-1">Hakkımızda sayfası ve ana sayfadaki hikaye bölümlerini buradan yönetin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all font-semibold shadow-md shadow-blue-500/20"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Değişiklikleri Kaydet
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Main Story Content */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <FileText className="w-6 h-6 text-purple-500" />
                        <h2 className="text-xl font-bold text-slate-800">Ana Hikaye İçeriği</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Hikaye Başlığı</label>
                            <input
                                value={settings.story_title || ""}
                                onChange={(e) => handleChange("story_title", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 font-bold text-xl uppercase"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Hikaye Metni (Paragraf 1)</label>
                            <textarea
                                value={settings.story_text1 || ""}
                                onChange={(e) => handleChange("story_text1", e.target.value)}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Hikaye Metni (Paragraf 2)</label>
                            <textarea
                                value={settings.story_text2 || ""}
                                onChange={(e) => handleChange("story_text2", e.target.value)}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4"
                            />
                        </div>
                    </div>
                </section>

                {/* Imagery */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <ImageIcon className="w-6 h-6 text-pink-500" />
                        <h2 className="text-xl font-bold text-slate-800">Görseller</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <ImageUpload
                                label="Kapak Görseli URL"
                                value={settings.story_cover_img || ""}
                                onChange={(url) => handleChange("story_cover_img", url)}
                            />
                        </div>
                        <div className="space-y-2">
                            <ImageUpload
                                label="Yan Görsel URL"
                                value={settings.story_side_img || ""}
                                onChange={(url) => handleChange("story_side_img", url)}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
