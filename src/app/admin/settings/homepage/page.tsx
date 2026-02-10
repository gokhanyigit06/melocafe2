"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Video, Type, Home, Image as ImageIcon, Sparkles, Star, Quote, Layout } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomepageSettings() {
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
            alert("Tüm ana sayfa ayarları kaydedildi!");
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
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            <div className="flex items-center justify-between border-b border-slate-200 pb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md z-20 pt-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">Ana Sayfa Yönetimi</h1>
                    <p className="text-slate-500 mt-1">Sitenin ana yüzündeki tüm bölümleri ve içerikleri buradan yönetin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all font-bold shadow-lg shadow-blue-500/25"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    DEĞİŞİKLİKLERİ KAYDET
                </button>
            </div>

            <div className="space-y-12">
                {/* 1. HERO SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Video className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">1. Hero (Giriş) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ana Slogan (Hero Title)</label>
                            <textarea
                                value={settings.hero_title || ""}
                                onChange={(e) => handleChange("hero_title", e.target.value)}
                                rows={2}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-serif text-2xl font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Alt Başlık (Hero Subtitle)</label>
                            <textarea
                                value={settings.hero_subtitle || ""}
                                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                                rows={2}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-light text-sm"
                            />

                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Buton Yazısı</label>
                            <input
                                value={settings.hero_button_text || ""}
                                onChange={(e) => handleChange("hero_button_text", e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Arka Plan Video URL</label>
                            <div className="flex gap-3">
                                <input
                                    value={settings.hero_video_url || ""}
                                    onChange={(e) => handleChange("hero_video_url", e.target.value)}
                                    className="flex-1 px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 font-mono text-sm"
                                    placeholder="/hero-video.mp4"
                                />
                                <button onClick={() => window.open('/admin/media', '_blank')} className="px-6 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase hover:bg-black transition-all">MEDYA</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. FEATURES SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">2. Özellikler (Features) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-6 pt-4 border-t md:border-t-0 md:pt-0">
                                <h3 className="text-sm font-black text-emerald-600 uppercase italic underline decoration-2">Özellik {i}</h3>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase">İkon/Görsel URL</label>
                                    <input value={settings[`feature${i}_icon`] || ""} onChange={(e) => handleChange(`feature${i}_icon`, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-mono" placeholder="Boş bırakılırsa varsayılan ikon kullanılır" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase">Başlık</label>
                                    <input value={settings[`feature${i}_title`] || ""} onChange={(e) => handleChange(`feature${i}_title`, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase">Açıklama</label>
                                    <textarea value={settings[`feature${i}_description`] || ""} onChange={(e) => handleChange(`feature${i}_description`, e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. FAVORITES SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                            <Star className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">3. Favoriler Bölümü</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3 max-w-md">
                            <label className="text-xs font-black text-slate-400 uppercase">Bölüm Başlığı</label>
                            <input value={settings.favorites_title || ""} onChange={(e) => handleChange("favorites_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-serif text-2xl font-bold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Ürün Görseli</label>
                                        <input value={settings[`fav${i}_image`] || ""} onChange={(e) => handleChange(`fav${i}_image`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-mono text-[10px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Ürün Adı</label>
                                        <input value={settings[`fav${i}_title`] || ""} onChange={(e) => handleChange(`fav${i}_title`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Açıklama</label>
                                        <textarea value={settings[`fav${i}_description`] || ""} onChange={(e) => handleChange(`fav${i}_description`, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border bg-white text-xs" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. NITRO BREW SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                            <Type className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">4. Nitro Brew Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Başlık</label>
                                <input value={settings.nitro_title || ""} onChange={(e) => handleChange("nitro_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Açıklama Metni</label>
                                <textarea value={settings.nitro_description || ""} onChange={(e) => handleChange("nitro_description", e.target.value)} rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-200" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Görsel 1 (Tek Kutu)</label>
                                    <input value={settings.nitro_img1 || ""} onChange={(e) => handleChange("nitro_img1", e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-white font-mono text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Görsel 2 (Paket/Kutu)</label>
                                    <input value={settings.nitro_img2 || ""} onChange={(e) => handleChange("nitro_img2", e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-white font-mono text-xs" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. PRESS MARQUEE SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                            <Quote className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">5. Basın / Yorumlar (Marquee)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Kaynak Adı</label>
                                        <input value={settings[`press${i}_source`] || ""} onChange={(e) => handleChange(`press${i}_source`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold" placeholder="Örn: Forbes" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Logo URL (Opsiyonel)</label>
                                        <input value={settings[`press${i}_logo`] || ""} onChange={(e) => handleChange(`press${i}_logo`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-mono text-[10px]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alıntı Cümlesi</label>
                                    <textarea value={settings[`press${i}_quote`] || ""} onChange={(e) => handleChange(`press${i}_quote`, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border bg-white text-xs italic" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. PARALLAX STORY SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">6. Parallax Hikaye (Alt Bölüm)</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase">Hikaye Sloganı</label>
                            <textarea
                                value={settings.parallax_title || ""}
                                onChange={(e) => handleChange("parallax_title", e.target.value)}
                                rows={3}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-serif text-xl"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Buton Metni</label>
                                <input value={settings.parallax_btn_text || ""} onChange={(e) => handleChange("parallax_btn_text", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Arka Plan Görsel URL</label>
                                <input value={settings.parallax_image || ""} onChange={(e) => handleChange("parallax_image", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-mono text-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. VISIT US SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                            <Home className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">7. Bizi Ziyaret Et Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Başlık</label>
                                <input value={settings.visit_title || ""} onChange={(e) => handleChange("visit_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Açıklama Metni</label>
                                <textarea value={settings.visit_description || ""} onChange={(e) => handleChange("visit_description", e.target.value)} rows={4} className="w-full px-5 py-4 rounded-2xl border border-slate-200" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Buton Yazısı</label>
                                    <input value={settings.visit_btn_text || ""} onChange={(e) => handleChange("visit_btn_text", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Buton Link</label>
                                    <input value={settings.visit_btn_link || ""} onChange={(e) => handleChange("visit_btn_link", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-xs" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Büyük Görsel URL (Sol)</label>
                                <input value={settings.visit_img_large || ""} onChange={(e) => handleChange("visit_img_large", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-mono text-sm" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-400 uppercase">Küçük Görsel URL (Sağ Alt)</label>
                                <input value={settings.visit_img_small || ""} onChange={(e) => handleChange("visit_img_small", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-mono text-sm" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
