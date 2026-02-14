import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, Edit2, MapPin } from "lucide-react";
import LocationsPageSettings from "./LocationsPageSettings";
import DeleteLocationButton from "./DeleteLocationButton";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getLocations() {
    try {
        const result = await db.query('SELECT * FROM locations ORDER BY created_at DESC');
        return result.rows;
    } catch {
        return [];
    }
}

async function getSettings() {
    try {
        const result = await db.query("SELECT key, value FROM settings");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result.rows.reduce((acc: any, row: any) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
    } catch {
        return {};
    }
}

export default async function LocationsPage() {
    const locations = await getLocations();
    const settings = await getSettings();

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Şubeler Yönetimi</h1>
                    <p className="text-slate-500 mt-1 font-medium">Şubelerinizi ve Şubeler sayfasının genel içeriğini buradan yönetin.</p>
                </div>
                <Link
                    href="/admin/locations/new"
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    YENİ ŞUBE EKLE
                </Link>
            </div>

            {/* Global Page Settings */}
            <LocationsPageSettings initialSettings={settings} />

            <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <MapPin className="w-6 h-6 text-slate-400" />
                    <h2 className="text-xl font-bold text-slate-800">Mevcut Şubeler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {locations.map((loc: any) => (
                        <div key={loc.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                            {loc.image_url && (
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={loc.image_url}
                                        alt={loc.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {loc.tag && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                            {loc.tag}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">{loc.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-2 mt-1">{loc.address}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/locations/${loc.id}`}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Link>
                                        <DeleteLocationButton id={loc.id} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${loc.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                                        {loc.is_active ? "AKTİF" : "PASİF"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {locations.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Henüz şube eklenmemiş</h3>
                            <p className="text-slate-500 mt-1 mb-6">İlk şubenizi ekleyerek başlayın.</p>
                            <Link
                                href="/admin/locations/new"
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-black transition-all font-bold text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                İLK ŞUBEYİ EKLE
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
