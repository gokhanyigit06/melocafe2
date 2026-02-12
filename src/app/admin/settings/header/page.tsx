"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadableImageField from "@/components/admin/UploadableImageField";

export default function HeaderSettings() {
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
            alert("Header ayarları kaydedildi!");
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
                    <h1 className="text-3xl font-bold text-slate-900 uppercase">Header (Üst Bar) Ayarları</h1>
                    <p className="text-slate-500 mt-1">Logo, duyuru çubuğu ve menü navigasyonunu buradan yönetin.</p>
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
                {/* Logo & Identity */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <ImageIcon className="w-6 h-6 text-blue-500" />
                        <h2 className="text-xl font-bold text-slate-800">Logo ve Kimlik</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Site Başlığı (Logo Yerine)</label>
                            <input
                                value={settings.site_name || ""}
                                onChange={(e) => handleChange("site_name", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold"
                            />
                        </div>

                        <UploadableImageField
                            label="Logo Görseli"
                            value={settings.logo_url || ""}
                            onChange={(val) => handleChange("logo_url", val)}
                            description="PC'den yükleyebilir veya URL yapıştırabilirsiniz"
                        />
                    </div>
                </section>

                {/* Announcement Bar */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                            <Type className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Duyuru Çubuğu (En Üstteki Mavi Bar)</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Duyuru Metni (Subscribe & save...)</label>
                            <input
                                value={settings.announcement_text || ""}
                                onChange={(e) => handleChange("announcement_text", e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium"
                                placeholder="Ücretsiz kargo fırsatını kaçırmayın!"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Buton Metni (Opsiyonel)</label>
                                <input
                                    value={settings.announcement_btn_text || ""}
                                    onChange={(e) => handleChange("announcement_btn_text", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Buton Linki</label>
                                <input
                                    value={settings.announcement_btn_link || ""}
                                    onChange={(e) => handleChange("announcement_btn_link", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm"
                                    placeholder="/shop"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
