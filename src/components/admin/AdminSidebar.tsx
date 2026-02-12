"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    LogOut,
    Package,
    Menu,
    Home,
    Layout,
    Phone,
    Coffee,
    Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Coffee, label: "Blog Yazıları", href: "/admin/posts" },
    { icon: Package, label: "Servisler (Menü)", href: "/admin/services" },
    { icon: Store, label: "Mağazalar", href: "/admin/locations" },
    { icon: ImageIcon, label: "Medya Kütüphanesi", href: "/admin/media" },
    { type: "divider", label: "Sayfa Ayarları" },
    { icon: Home, label: "Ana Sayfa", href: "/admin/settings/homepage" },
    { icon: FileText, label: "Hikayemiz", href: "/admin/settings/story" },
    { icon: Phone, label: "İletişim", href: "/admin/settings/contact" },
    { icon: Menu, label: "Header Ayarları", href: "/admin/settings/header" },
    { icon: Layout, label: "Footer Ayarları", href: "/admin/settings/footer" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow-lg border border-slate-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu className="w-6 h-6 text-slate-600" />
            </button>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-[#0F172A] text-white transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-white/5",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-20 items-center px-8 border-b border-white/5 bg-[#1E293B]/20">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 font-black text-xs">M</div>
                    <h1 className="text-sm font-black tracking-[0.2em] text-white uppercase">Melo Admin</h1>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
                    {menuItems.map((item, index) => {
                        if (item.type === "divider") {
                            return (
                                <div key={index} className="pt-6 pb-2 px-4">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        }

                        const Icon = item.icon!;
                        const isActive = item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href!);

                        return (
                            <Link
                                key={item.href}
                                href={item.href!}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold group",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                                )} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 bg-[#1E293B]/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-bold group">
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
