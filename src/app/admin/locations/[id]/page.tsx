"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, MapPin, Tag, Link as LinkIcon, AlignLeft, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import UploadableImageField from "@/components/admin/UploadableImageField";

export default function EditLocationPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        image_url: "",
        directions_url: "",
        tag: "",
        is_active: true
    });

    useEffect(() => {
        fetch(`/api/locations/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    ...data,
                    is_active: data.is_active === 1 || data.is_active === true
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("Veri yüklenemedi.");
            });
    }, [id]);

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch(`/api/locations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update location");

            router.push("/admin/locations");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Bu şubeyi silmek istediğinize emin misiniz?")) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            router.push("/admin/locations");
            router.refresh();
        } catch (error) {
            alert("Silme başarısız.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/locations"
                            className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 uppercase">Şubeyi Düzenle</h1>
                            <p className="text-slate-500 text-sm">{formData.title} detaylarını güncelleyin.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-all font-bold text-xs"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            SİL
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all font-bold shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            GÜNCELLE
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        {/* Main Info */}
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <MapPin className="w-3 h-3" /> Şube Adı
                                </label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <AlignLeft className="w-3 h-3" /> Adres
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    rows={3}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                    Açıklama / Kısa Not
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    rows={2}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </section>

                        {/* Directions & Meta */}
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <LinkIcon className="w-3 h-3" /> Yol Tarifi Linki (Google Maps)
                                    </label>
                                    <input
                                        value={formData.directions_url}
                                        onChange={(e) => handleChange("directions_url", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <Tag className="w-3 h-3" /> Etiket (Tag)
                                    </label>
                                    <input
                                        value={formData.tag}
                                        onChange={(e) => handleChange("tag", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold uppercase tracking-widest text-xs"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        {/* Sidebar: Media & Status */}
                        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Görsel & Durum</h3>

                            <UploadableImageField
                                label="Şube Görseli"
                                value={formData.image_url}
                                onChange={(val) => handleChange("image_url", val)}
                                description="Yenisiyle değiştirin"
                            />

                            <div className="pt-4 border-t border-slate-50">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active}
                                            onChange={(e) => handleChange("is_active", e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-12 h-6 rounded-full transition-colors ${formData.is_active ? "bg-green-500" : "bg-slate-200"}`} />
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.is_active ? "translate-x-6" : ""}`} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Şube Aktif</span>
                                </label>
                            </div>
                        </section>

                        {/* Preview Card */}
                        <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Önizleme</h4>
                            <div className="aspect-square rounded-2xl bg-slate-800 overflow-hidden relative">
                                {formData.image_url ? (
                                    <img src={formData.image_url} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-slate-700" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="font-black uppercase tracking-widest text-sm">{formData.title || "Şube Adı"}</h5>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 line-clamp-1">{formData.address || "Adres..."}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
