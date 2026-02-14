import Link from "next/link";
import { db } from "@/lib/db";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
    let services = [];
    try {
        const result = await db.query('SELECT * FROM services ORDER BY created_at DESC');
        services = result.rows;
    } catch (error) {
        console.error("Failed to fetch services:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Services</h1>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Service
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-800">Title</th>
                            <th className="px-6 py-4 font-bold text-slate-800">Price</th>
                            <th className="px-6 py-4 font-bold text-slate-800">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-800 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {services.map((service: any) => (
                            <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{service.title}</div>
                                    <div className="text-xs text-slate-500 truncate max-w-xs">{service.description}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {service.price ? `₺${service.price}` : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {service.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="text-slate-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    No services found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
