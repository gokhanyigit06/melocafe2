"use client";

import { Globe, Coffee, Store } from "lucide-react";
import Image from "next/image";

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
        <section className="bg-[#F5F2EA] py-24 px-6 text-black border-y border-black/5">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
                {featureData.map((feature, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                            {feature.icon ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <feature.defaultIcon strokeWidth={1} className="w-12 h-12 text-black" />
                            )}
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl font-bold leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed max-w-xs mx-auto md:mx-0">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
