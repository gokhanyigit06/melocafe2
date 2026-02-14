"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Video, Type, Home, Sparkles, Star, Quote, Layout, Eye, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
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
                    <p className="text-slate-700 mt-1">Sitenin ana yüzündeki tüm bölümleri ve içerikleri buradan yönetin.</p>
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
                            <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Ana Slogan (Hero Title)</label>
                            <textarea
                                value={settings.hero_title || ""}
                                onChange={(e) => handleChange("hero_title", e.target.value)}
                                rows={2}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-serif text-2xl font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Alt Başlık (Hero Subtitle)</label>
                            <textarea
                                value={settings.hero_subtitle || ""}
                                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                                rows={2}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-light text-sm"
                            />

                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Buton Yazısı</label>
                            <input
                                value={settings.hero_button_text || ""}
                                onChange={(e) => handleChange("hero_button_text", e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageUpload
                                label="Arka Plan Videosu"
                                value={settings.hero_video_url || ""}
                                onChange={(url) => handleChange("hero_video_url", url)}
                                accept="video/*"
                            />
                        </div>
                    </div>
                </section>

                {/* 2. GÖRSEL VİTRİN (IMAGE SHOWCASE) SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">2. Görsel Vitrin (4&apos;lü Alan)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <h3 className="text-sm font-black text-teal-600 uppercase italic underline decoration-2">Görsel {i}</h3>
                                <div className="space-y-3">
                                    <ImageUpload
                                        label="Görsel"
                                        value={settings[`showcase${i}_image`] || ""}
                                        onChange={(url) => handleChange(`showcase${i}_image`, url)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Başlık</label>
                                    <input value={settings[`showcase${i}_title`] || ""} onChange={(e) => handleChange(`showcase${i}_title`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Alt Başlık (Opsiyonel)</label>
                                    <input value={settings[`showcase${i}_subtitle`] || ""} onChange={(e) => handleChange(`showcase${i}_subtitle`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. GALERİ GRİD (GALLERY GRID / SLIDER) SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">3. Galeri Grid / Slider Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <h3 className="text-sm font-black text-sky-600 uppercase italic underline decoration-2">Galeri Görseli {i}</h3>
                                <div className="space-y-3">
                                    <ImageUpload
                                        label="Görsel"
                                        value={settings[`gallery_image_${i}`] || ""}
                                        onChange={(url) => handleChange(`gallery_image_${i}`, url)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Alt Metin (Açıklama)</label>
                                    <input value={settings[`gallery_alt_${i}`] || ""} onChange={(e) => handleChange(`gallery_alt_${i}`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold text-sm" placeholder="Melo Coffee" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. SCROLL REVEAL STORY SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">4. Scroll Reveal (Yazı Efektli Bölüm)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Metin</label>
                                <textarea
                                    value={settings.scroll_reveal_text || ""}
                                    onChange={(e) => handleChange("scroll_reveal_text", e.target.value)}
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-serif text-lg"
                                    placeholder="Melo, anlık tatminin yavaş bir yorumudur..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-600 uppercase">Yazı Boyutu</label>
                                    <select
                                        value={settings.scroll_reveal_text_size || "large"}
                                        onChange={(e) => handleChange("scroll_reveal_text_size", e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold bg-white"
                                    >
                                        <option value="large">Büyük (Standart)</option>
                                        <option value="medium">Orta</option>
                                        <option value="small">Küçük</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-600 uppercase">Buton Yazısı</label>
                                    <input
                                        value={settings.scroll_reveal_btn_text || ""}
                                        onChange={(e) => handleChange("scroll_reveal_btn_text", e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold"
                                        placeholder="HİKAYEMİZ"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Buton Link</label>
                                <input
                                    value={settings.scroll_reveal_btn_link || ""}
                                    onChange={(e) => handleChange("scroll_reveal_btn_link", e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-mono text-sm"
                                    placeholder="/hikayemiz"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <ImageUpload
                                label="Arka Plan Görseli"
                                value={settings.scroll_reveal_image || ""}
                                onChange={(url) => handleChange("scroll_reveal_image", url)}
                            />
                        </div>
                    </div>
                </section>

                {/* 4. FEATURES SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">5. Özellikler (Features) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-6 pt-4 border-t md:border-t-0 md:pt-0">
                                <h3 className="text-sm font-black text-emerald-600 uppercase italic underline decoration-2">Özellik {i}</h3>
                                <div className="space-y-3">
                                    <div className="space-y-3">
                                        <ImageUpload
                                            label="İkon/Görsel URL"
                                            value={settings[`feature${i}_icon`] || ""}
                                            onChange={(url) => handleChange(`feature${i}_icon`, url)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Başlık</label>
                                    <input value={settings[`feature${i}_title`] || ""} onChange={(e) => handleChange(`feature${i}_title`, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Açıklama</label>
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
                        <h2 className="text-2xl font-black text-slate-900 uppercase">6. Favoriler Bölümü</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3 max-w-md">
                            <label className="text-xs font-black text-slate-600 uppercase">Bölüm Başlığı</label>
                            <input value={settings.favorites_title || ""} onChange={(e) => handleChange("favorites_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-serif text-2xl font-bold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <ImageUpload
                                                label="Ürün Görseli"
                                                value={settings[`fav${i}_image`] || ""}
                                                onChange={(url) => handleChange(`fav${i}_image`, url)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Ürün Adı</label>
                                        <input value={settings[`fav${i}_title`] || ""} onChange={(e) => handleChange(`fav${i}_title`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Açıklama</label>
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
                        <h2 className="text-2xl font-black text-slate-900 uppercase">7. Nitro Brew Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Başlık</label>
                                <input value={settings.nitro_title || ""} onChange={(e) => handleChange("nitro_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Açıklama Metni</label>
                                <textarea value={settings.nitro_description || ""} onChange={(e) => handleChange("nitro_description", e.target.value)} rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-4">
                                <div className="space-y-2">
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Görsel 1 (Tek Kutu)"
                                            value={settings.nitro_img1 || ""}
                                            onChange={(url) => handleChange("nitro_img1", url)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Görsel 2 (Paket/Kutu)"
                                            value={settings.nitro_img2 || ""}
                                            onChange={(url) => handleChange("nitro_img2", url)}
                                        />
                                    </div>
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
                        <h2 className="text-2xl font-black text-slate-900 uppercase">8. Basın / Yorumlar (Marquee)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Kaynak Adı</label>
                                        <input value={settings[`press${i}_source`] || ""} onChange={(e) => handleChange(`press${i}_source`, e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white font-bold" placeholder="Örn: Forbes" />
                                    </div>
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Logo URL (Opsiyonel)"
                                            value={settings[`press${i}_logo`] || ""}
                                            onChange={(url) => handleChange(`press${i}_logo`, url)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Alıntı Cümlesi</label>
                                    <textarea value={settings[`press${i}_quote`] || ""} onChange={(e) => handleChange(`press${i}_quote`, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border bg-white text-xs italic" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9. PARALLAX STORY SECTION */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">9. Parallax Hikaye (Alt Bölüm)</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-600 uppercase">Hikaye Sloganı (Büyük Başlık)</label>
                                    <textarea
                                        value={settings.parallax_title || ""}
                                        onChange={(e) => handleChange("parallax_title", e.target.value)}
                                        rows={3}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-serif text-xl"
                                        placeholder="Kahve, bar disiplininden ilham aldığında..."
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-50">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Paragraf 1</label>
                                        <textarea value={settings.parallax_p1 || ""} onChange={(e) => handleChange("parallax_p1", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Paragraf 2</label>
                                        <textarea value={settings.parallax_p2 || ""} onChange={(e) => handleChange("parallax_p2", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Paragraf 3</label>
                                        <textarea value={settings.parallax_p3 || ""} onChange={(e) => handleChange("parallax_p3", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <ImageUpload
                                    label="Arka Plan Görseli veya Videosu"
                                    value={settings.parallax_image || ""}
                                    onChange={(url) => handleChange("parallax_image", url)}
                                    accept="image/*,video/*"
                                />
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Yazı Boyutu</label>
                                        <select
                                            value={settings.parallax_title_size || "large"}
                                            onChange={(e) => handleChange("parallax_title_size", e.target.value)}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold bg-white"
                                        >
                                            <option value="large">Büyük (Standart)</option>
                                            <option value="medium">Orta</option>
                                            <option value="small">Küçük</option>
                                        </select>
                                    </div>
                                </div>
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
                        <h2 className="text-2xl font-black text-slate-900 uppercase">10. Bizi Ziyaret Et Bölümü</h2>
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
                                <ImageUpload
                                    label="Büyük Görsel URL (Sol)"
                                    value={settings.visit_img_large || ""}
                                    onChange={(url) => handleChange("visit_img_large", url)}
                                />
                            </div>
                            <div className="space-y-3">
                                <ImageUpload
                                    label="Küçük Görsel URL (Sağ Alt)"
                                    value={settings.visit_img_small || ""}
                                    onChange={(url) => handleChange("visit_img_small", url)}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
