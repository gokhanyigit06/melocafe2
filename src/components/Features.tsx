"use client";

import { Globe, Coffee, Store } from "lucide-react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Features({ settings }: { settings?: any }) {
    const featureData = [
        {
            title: settings?.feature1_title || "Dünyadan tedarik edildi. Yerelde işlendi.",
            description: settings?.feature1_description || "Kahve Laboratuvarımızda test edildi, geliştirildi ve özenle kavruldu.",
            icon: settings?.feature1_icon || null,
            defaultIcon: Globe
        },
        {
            title: settings?.feature2_title || "Modern Kahve. Bütüncül yaklaşım.",
            description: settings?.feature2_description || "Detaylara, yaratıcılığa, kökene ve kaliteye odaklanmayı kapsar.",
            icon: settings?.feature2_icon || null,
            defaultIcon: Coffee
        },
        {
            title: settings?.feature3_title || "Hiçbir şube birbirinin aynısı değil.",
            description: settings?.feature3_description || "Her şubemiz, Modern Kahve deneyiminde benzersiz bir rol oynayacak şekilde tasarlandı.",
            icon: settings?.feature3_icon || null,
            defaultIcon: Store
        }
    ];

    return (
        <section className="relative py-24 px-6 text-white border-y border-white/10 overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 120% 80% at 20% 20%, rgba(15, 45, 75, 0.9) 0%, transparent 60%),
                        radial-gradient(ellipse 100% 100% at 80% 80%, rgba(10, 30, 55, 0.95) 0%, transparent 50%),
                        linear-gradient(160deg, #0a1a2e 0%, #0d2a45 25%, #0f3555 45%, #0b2640 65%, #071a30 100%)
                    `,
                }}
            />
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left relative z-10">
                {featureData.map((feature, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                            {feature.icon ? (
                                <div className="relative w-full h-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <feature.defaultIcon strokeWidth={1} className="w-12 h-12 text-white" />
                            )}
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl font-bold leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto md:mx-0">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
