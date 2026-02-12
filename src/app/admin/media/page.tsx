import { db } from "@/lib/db";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
    let media = [];
    try {
        const result = await db.query('SELECT * FROM media ORDER BY created_at DESC');
        media = result.rows;
    } catch (error) {
        console.error("Failed to fetch media:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Media Library</h1>
                <ImageUploader />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {media.map((item: any) => (
                    <div key={item.id} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <Image
                            src={item.url}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 p-2">
                            <div className="text-white text-xs text-center break-all">
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
                {media.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No media found. Upload your first image.
                    </div>
                )}
            </div>
        </div>
    );
}
