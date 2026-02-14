"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Video, Type, Home, Sparkles, Star, Quote, Layout, Eye, Image as ImageIcon, CheckCircle2, XCircle, Newspaper, MapPin, MousePointer2 } from "lucide-react";
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

    const VisibilityToggle = ({ label, settingKey }: { label: string, settingKey: string }) => {
        const isVisible = settings[settingKey] !== "false";
        return (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">{label}</span>
                <button
                    onClick={() => handleChange(settingKey, isVisible ? "false" : "true")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${isVisible
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                >
                    {isVisible ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {isVisible ? "GÖSTERİLİYOR" : "GİZLİ"}
                </button>
            </div>
        );
    };

    if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>;

    const sections = [
        { id: "hero", label: "Giriş (Hero)", icon: Video, color: "blue" },
        { id: "showcase", label: "Varlık Vitrini", icon: Layout, color: "teal" },
        { id: "features", label: "Özellikler", icon: Sparkles, color: "emerald" },
        { id: "favorites", label: "Favoriler", icon: Star, color: "amber" },
        { id: "scroll", label: "Scroll Reveal", icon: Eye, color: "indigo" },
        { id: "nitro", label: "Nitro Brew", icon: Type, color: "orange" },
        { id: "press", label: "Basın / Marquee", icon: Quote, color: "pink" },
        { id: "journal", label: "Gelişmeler (Highlights)", icon: Newspaper, color: "purple" },
        { id: "parallax", label: "Parallax Hikaye", icon: Sparkles, color: "violet" },
        { id: "locations", label: "Şubeler Section", icon: MapPin, color: "rose" },
        { id: "visit", label: "Bizi Ziyaret Et", icon: Home, color: "cyan" },
        { id: "gallery", label: "Galeri Grid", icon: ImageIcon, color: "sky" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            <div className="flex items-center justify-between border-b border-slate-200 pb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md z-30 pt-4 px-2">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ana Sayfa Yönetimi</h1>
                    <p className="text-slate-700 mt-1 font-bold italic underline decoration-blue-500/30">Melo Coffee Shop - Modern Kahve Deneyimi</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all font-black shadow-lg shadow-blue-500/25 border-b-4 border-blue-800"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    AYARLARI KAYDET
                </button>
            </div>

            {/* Quick Layout Manager */}
            <section className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-xl space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                        <Layout className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">Sayfa Düzeni ve Görünürlük</h2>
                        <p className="text-slate-500 text-sm font-bold">Hangi bölümlerin ana sayfada görüneceğini buradan hızlıca seçin.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sections.map(s => (
                        <VisibilityToggle key={s.id} label={`${sections.indexOf(s) + 1}. ${s.label}`} settingKey={`section_${s.id}_visible`} />
                    ))}
                </div>
            </section>

            {/* Hızlı Erişim Menüsü */}
            <div className="flex flex-wrap gap-2 p-2 bg-slate-200/50 rounded-2xl backdrop-blur-sm sticky top-28 z-20 overflow-x-auto border border-white/50 shadow-inner">
                {sections.map(s => (
                    <a
                        key={s.id}
                        href={`#section-${s.id}`}
                        className="px-4 py-2 bg-white/80 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase transition-all shadow-sm border border-slate-300"
                    >
                        {s.label}
                    </a>
                ))}
            </div>

            <div className="space-y-16">
                {/* 1. HERO SECTION */}
                <section id="section-hero" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-blue-300">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Video className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase">1. Hero (Giriş) Bölümü</h2>
                        </div>
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

                {/* 2. GÖRSEL VİTRİN */}
                <section id="section-showcase" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-teal-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">2. Varlık Vitrini (Dinamik Alanlar)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <h3 className="text-sm font-black text-teal-600 uppercase italic underline decoration-2">Varlık {i}</h3>
                                <div className="space-y-3">
                                    <ImageUpload
                                        label="Görsel"
                                        value={settings[`showcase${i}_image`] || ""}
                                        onChange={(url) => handleChange(`showcase${i}_image`, url)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Başlık</label>
                                    <input value={settings[`showcase${i}_title`] || ""} onChange={(e) => handleChange(`showcase${i}_title`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-950" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Alt Başlık (Opsiyonel)</label>
                                    <input value={settings[`showcase${i}_subtitle`] || ""} onChange={(e) => handleChange(`showcase${i}_subtitle`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-950" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. ÖZELLİKLER SECTION */}
                <section id="section-features" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-emerald-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">3. Özellikler (Features) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-6 pt-4 border-t md:border-t-0 md:pt-0">
                                <h3 className="text-sm font-black text-emerald-600 uppercase italic underline decoration-2">Özellik {i}</h3>
                                <div className="space-y-3">
                                    <ImageUpload
                                        label="İkon/Görsel"
                                        value={settings[`feature${i}_icon`] || ""}
                                        onChange={(url) => handleChange(`feature${i}_icon`, url)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Başlık</label>
                                    <input value={settings[`feature${i}_title`] || ""} onChange={(e) => handleChange(`feature${i}_title`, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-950" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Açıklama</label>
                                    <textarea value={settings[`feature${i}_description`] || ""} onChange={(e) => handleChange(`feature${i}_description`, e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-950 text-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. FAVORİLER SECTION */}
                <section id="section-favorites" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-amber-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                            <Star className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">4. Favori Ürünler</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3 max-w-md">
                            <label className="text-xs font-black text-slate-600 uppercase">Bölüm Ana Başlığı</label>
                            <input value={settings.favorites_title || ""} onChange={(e) => handleChange("favorites_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-serif text-2xl font-bold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Ürün Görseli"
                                            value={settings[`fav${i}_image`] || ""}
                                            onChange={(url) => handleChange(`fav${i}_image`, url)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Ürün Adı</label>
                                        <input value={settings[`fav${i}_title`] || ""} onChange={(e) => handleChange(`fav${i}_title`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-950 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Kısa Açıklama</label>
                                        <textarea value={settings[`fav${i}_description`] || ""} onChange={(e) => handleChange(`fav${i}_description`, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-950 text-xs" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. SCROLL REVEAL SECTION */}
                <section id="section-scroll" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-indigo-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">5. Scroll Reveal (Metin Efekti)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Merkezi Metin</label>
                                <textarea
                                    value={settings.scroll_reveal_text || ""}
                                    onChange={(e) => handleChange("scroll_reveal_text", e.target.value)}
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-serif text-lg"
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
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Buton Hedef Link</label>
                                <input
                                    value={settings.scroll_reveal_btn_link || ""}
                                    onChange={(e) => handleChange("scroll_reveal_btn_link", e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-mono text-xs"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <ImageUpload
                                label="Bölüm Arka Plan Görseli"
                                value={settings.scroll_reveal_image || ""}
                                onChange={(url) => handleChange("scroll_reveal_image", url)}
                            />
                        </div>
                    </div>
                </section>

                {/* 6. NITRO BREW SECTION */}
                <section id="section-nitro" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-orange-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                            <Type className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">6. Nitro Brew Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Bölüm Başlığı</label>
                                <input value={settings.nitro_title || ""} onChange={(e) => handleChange("nitro_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-black text-lg uppercase" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Tanımlayıcı Metin</label>
                                <textarea value={settings.nitro_description || ""} onChange={(e) => handleChange("nitro_description", e.target.value)} rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <ImageUpload
                                label="Görsel 1 (Ürün)"
                                value={settings.nitro_img1 || ""}
                                onChange={(url) => handleChange("nitro_img1", url)}
                            />
                            <ImageUpload
                                label="Görsel 2 (Konsept)"
                                value={settings.nitro_img2 || ""}
                                onChange={(url) => handleChange("nitro_img2", url)}
                            />
                        </div>
                    </div>
                </section>

                {/* 7. PRESS MARQUEE SECTION */}
                <section id="section-press" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-pink-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                            <Quote className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">7. Basın & Alıntılar (Akış)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase">Kaynak Adı</label>
                                        <input value={settings[`press${i}_source`] || ""} onChange={(e) => handleChange(`press${i}_source`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-950" placeholder="Örn: Forbes" />
                                    </div>
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Logo (Opsiyonel)"
                                            value={settings[`press${i}_logo`] || ""}
                                            onChange={(url) => handleChange(`press${i}_logo`, url)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Alıntı Metni</label>
                                    <textarea value={settings[`press${i}_quote`] || ""} onChange={(e) => handleChange(`press${i}_quote`, e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-950 text-xs italic" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. JOURNAL / HIGHLIGHTS SECTION */}
                <section id="section-journal" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-purple-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">8. Highlights (Journal) Bölümü</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Bölüm Başlığı</label>
                                <input value={settings.journal_title || ""} onChange={(e) => handleChange("journal_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-black text-2xl uppercase" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Açıklama Metni</label>
                                <textarea value={settings.journal_description || ""} onChange={(e) => handleChange("journal_description", e.target.value)} rows={4} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Buton Metni</label>
                                <input value={settings.journal_btn_text || ""} onChange={(e) => handleChange("journal_btn_text", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold" />
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <p className="text-xs font-bold text-slate-500 italic">Not: Bu bölümde en son yayınlanan 3 blog yazısı otomatik olarak listelenir.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. PARALLAX STORY SECTION */}
                <section id="section-parallax" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-violet-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">9. Parallax Hikaye (Alt Plan)</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Vurucu Slogan</label>
                                <textarea value={settings.parallax_title || ""} onChange={(e) => handleChange("parallax_title", e.target.value)} rows={3} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-serif text-xl" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Yazı Boyutu</label>
                                <select value={settings.parallax_title_size || "large"} onChange={(e) => handleChange("parallax_title_size", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold bg-white">
                                    <option value="large">Büyük (Standart)</option>
                                    <option value="medium">Orta</option>
                                    <option value="small">Küçük</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <ImageUpload
                                label="Arka Plan Medyası"
                                value={settings.parallax_image || ""}
                                onChange={(url) => handleChange("parallax_image", url)}
                                accept="image/*,video/*"
                            />
                        </div>
                    </div>
                </section>

                {/* 10. LOCATIONS SECTION - SADECE GÖRÜNÜRLÜK */}
                <section id="section-locations" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-rose-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">10. Şubeler Section (Otomatik)</h2>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <p className="text-slate-600 font-bold">Bu bölüm, aktif şubelerinizi otomatik olarak gösterir. Şubeleri düzenlemek için <a href="/admin/locations" className="text-blue-600 underline">Şubeler Yönetimi</a> sayfasını kullanın.</p>
                    </div>
                </section>

                {/* 11. VISIT US SECTION */}
                <section id="section-visit" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-cyan-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                            <Home className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">11. Bizi Ziyaret Et</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Başlık</label>
                                <input value={settings.visit_title || ""} onChange={(e) => handleChange("visit_title", e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950 font-bold" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-600 uppercase">Açıklama Metni</label>
                                <textarea value={settings.visit_description || ""} onChange={(e) => handleChange("visit_description", e.target.value)} rows={4} className="w-full px-5 py-4 rounded-2xl border border-slate-300 text-slate-950" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-600 uppercase tracking-widest text-xs">Buton Yazısı</label>
                                    <input value={settings.visit_btn_text || ""} onChange={(e) => handleChange("visit_btn_text", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-950 text-sm" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-600 uppercase tracking-widest text-xs">Buton Hedef Link</label>
                                    <input value={settings.visit_btn_link || ""} onChange={(e) => handleChange("visit_btn_link", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-950" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <ImageUpload label="Ana Görsel" value={settings.visit_img_large || ""} onChange={(url) => handleChange("visit_img_large", url)} />
                            <ImageUpload label="Detay Görsel" value={settings.visit_img_small || ""} onChange={(url) => handleChange("visit_img_small", url)} />
                        </div>
                    </div>
                </section>

                {/* 12. GALLERY GRID SECTION */}
                <section id="section-gallery" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 scroll-mt-44 transition-all hover:border-sky-300">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase">12. Galeri Grid / Slider</h2>
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
                                    <label className="text-[10px] font-black text-slate-600 uppercase">Alt Metin</label>
                                    <input value={settings[`gallery_alt_${i}`] || ""} onChange={(e) => handleChange(`gallery_alt_${i}`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-950 text-sm" placeholder="Melo Coffee" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
