"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Phone, Mail, MapPin, Type, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadableImageField from "@/components/admin/UploadableImageField";

export default function ContactSettings() {
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
            alert("İletişim sayfası ayarları kaydedildi!");
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
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">İletişim Sayfası Yönetimi</h1>
                    <p className="text-slate-500 mt-1 font-medium">İletişim sayfasındaki metinleri, görselleri ve bilgileri güncelleyin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl hover:bg-black transition-all font-bold shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    DEĞİŞİKLİKLERİ KAYDET
                </button>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {/* 1. HERO SECTION (TALK TO US) */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">1. Giriş (Hero) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Büyük Başlık (Görsel Üstü)</label>
                                <input
                                    value={settings.contact_hero_title || ""}
                                    onChange={(e) => handleChange("contact_hero_title", e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 font-black text-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Talk to us."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Açıklama Metni</label>
                                <textarea
                                    value={settings.contact_hero_desc || ""}
                                    onChange={(e) => handleChange("contact_hero_desc", e.target.value)}
                                    rows={3}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Uzmanlarımız Modern Kahve sorularınız için burada..."
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <UploadableImageField
                                label="Hero Arka Plan Görseli"
                                value={settings.contact_hero_image || ""}
                                onChange={(val) => handleChange("contact_hero_image", val)}
                                description="PC'den yükleyin"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Buton 1 Yazısı</label>
                                    <input
                                        value={settings.contact_hero_btn1_text || ""}
                                        onChange={(e) => handleChange("contact_hero_btn1_text", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold"
                                        placeholder="FAQS"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Buton 2 Yazısı</label>
                                    <input
                                        value={settings.contact_hero_btn2_text || ""}
                                        onChange={(e) => handleChange("contact_hero_btn2_text", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold"
                                        placeholder="FEEDBACK"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. CONTACT DETAILS (OFFICES, ONLINE ORDERS ETC) */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">2. İletişim Detayları & Ofisler</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Address */}
                        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="font-black text-indigo-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Adres Bölümü
                            </h3>
                            <div className="space-y-3">
                                <input
                                    value={settings.contact_addr_label || ""}
                                    onChange={(e) => handleChange("contact_addr_label", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg font-bold"
                                    placeholder="Address."
                                />
                                <input
                                    value={settings.contact_addr_value || ""}
                                    onChange={(e) => handleChange("contact_addr_value", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg text-sm"
                                    placeholder="36 Maltby Street, London..."
                                />
                            </div>
                        </div>

                        {/* Online Orders */}
                        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="font-black text-indigo-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Online Siparişler
                            </h3>
                            <div className="space-y-3">
                                <input
                                    value={settings.contact_online_label || ""}
                                    onChange={(e) => handleChange("contact_online_label", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg font-bold"
                                    placeholder="Online Orders."
                                />
                                <textarea
                                    value={settings.contact_online_value || ""}
                                    onChange={(e) => handleChange("contact_online_value", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-lg text-sm"
                                    placeholder="Hours & Email..."
                                />
                            </div>
                        </div>

                        {/* Support Office */}
                        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="font-black text-indigo-900 uppercase tracking-widest text-xs">Destek Ofisi</h3>
                            <div className="space-y-3">
                                <input
                                    value={settings.contact_support_label || ""}
                                    onChange={(e) => handleChange("contact_support_label", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg font-bold"
                                    placeholder="Support Office."
                                />
                                <textarea
                                    value={settings.contact_support_value || ""}
                                    onChange={(e) => handleChange("contact_support_value", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-lg text-sm"
                                    placeholder="Hours & Email..."
                                />
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="font-black text-indigo-900 uppercase tracking-widest text-xs">Pazarlama</h3>
                            <div className="space-y-3">
                                <input
                                    value={settings.contact_marketing_label || ""}
                                    onChange={(e) => handleChange("contact_marketing_label", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg font-bold"
                                    placeholder="Marketing."
                                />
                                <textarea
                                    value={settings.contact_marketing_value || ""}
                                    onChange={(e) => handleChange("contact_marketing_value", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-lg text-sm"
                                    placeholder="Hours & Email..."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. MESSAGE FORM SECTION */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                            <Type className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">3. Mesaj Formu Başlığı</h2>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Form Başlığı</label>
                        <input
                            value={settings.contact_form_title || ""}
                            onChange={(e) => handleChange("contact_form_title", e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-slate-200 font-black text-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                            placeholder="Send us a message."
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
