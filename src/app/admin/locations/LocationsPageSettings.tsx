"use client";

import { useState } from "react";
import { Save, Loader2, Layout } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LocationsPageSettings({ initialSettings }: { initialSettings: any }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState(initialSettings);

    const handleChange = (key: string, value: string) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));
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
            alert("Mağazalar sayfası ayarları kaydedildi!");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Layout className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Sayfa Genel İçeriği</h2>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-black transition-all font-bold text-xs"
                >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    AYARLARI KAYDET
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ana Başlık (HERO)</label>
                    <input
                        value={settings.locations_page_title || ""}
                        onChange={(e) => handleChange("locations_page_title", e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="Visit Us."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Açıklama Metni</label>
                    <textarea
                        value={settings.locations_page_desc || ""}
                        onChange={(e) => handleChange("locations_page_desc", e.target.value)}
                        rows={2}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-medium text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="Kısa bir tanıtım yazısı..."
                    />
                </div>
            </div>
        </section>
    );
}
