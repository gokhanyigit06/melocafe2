"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

import { useState, useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        if (!isAdminPage) {
            fetch("/api/settings")
                .then(res => res.json())
                .then(setSettings)
                .catch(err => console.error("Failed to fetch settings:", err));
        }
    }, [isAdminPage]);

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <SmoothScroll>
            <Header settings={settings} />
            {children}
            <Footer settings={settings} />
        </SmoothScroll>
    );
}
