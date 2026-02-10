"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Layout, Mail, Home, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FooterSettings() {
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
            alert("Footer ayarları kaydedildi!");
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
                    <h1 className="text-3xl font-bold text-slate-900 uppercase">Footer (Alt Bar) Ayarları</h1>
                    <p className="text-slate-500 mt-1">İletişim bilgileri, sosyal medya ve alt metinleri buradan yönetin.</p>
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
                {/* Contact Section */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <Mail className="w-6 h-6 text-green-500" />
                        <h2 className="text-xl font-bold text-slate-800">İletişim Bilgileri</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">E-Posta</label>
                            <input
                                value={settings.footer_email || ""}
                                onChange={(e) => handleChange("footer_email", e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Telefon</label>
                            <input
                                value={settings.footer_phone || ""}
                                onChange={(e) => handleChange("footer_phone", e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Adres</label>
                            <textarea
                                value={settings.footer_address || ""}
                                onChange={(e) => handleChange("footer_address", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer Content */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <Layout className="w-6 h-6 text-indigo-500" />
                        <h2 className="text-xl font-bold text-slate-800">Footer Tasarımı</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Footer Büyük Slogan ( STATEMENT )</label>
                            <textarea
                                value={settings.footer_big_text || ""}
                                onChange={(e) => handleChange("footer_big_text", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 font-medium text-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Social Media Links */}
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                        <Share2 className="w-6 h-6 text-pink-500" />
                        <h2 className="text-xl font-bold text-slate-800">Sosyal Medya Linkleri</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Instagram</label>
                            <input
                                value={settings.social_instagram || ""}
                                onChange={(e) => handleChange("social_instagram", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Facebook</label>
                            <input
                                value={settings.social_facebook || ""}
                                onChange={(e) => handleChange("social_facebook", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
