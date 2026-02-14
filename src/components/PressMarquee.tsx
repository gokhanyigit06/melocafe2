"use client";

import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PressMarquee({ settings }: { settings?: any }) {
    const marqueeItems = [
        {
            source: settings?.press1_source || "Forbes",
            quote: settings?.press1_quote || "Melo'nun ustalıkla hazırlanmış kahvesi, temel ihtiyaçlar listenizin zirvesine yerleşebilir.",
            logo: settings?.press1_logo || null
        },
        {
            source: settings?.press2_source || "VOGUE",
            quote: settings?.press2_quote || "Her bir şubesindeki yiyecekler ve atmosfer tek kelimeyle mükemmel.",
            logo: settings?.press2_logo || null
        },
        {
            source: settings?.press3_source || "Wallpaper*",
            quote: settings?.press3_quote || "Avrupa'nın En İyi Bağımsız Kahve Dükkanı Ödülü.",
            logo: settings?.press3_logo || null
        },
        {
            source: settings?.press4_source || "GQ",
            quote: settings?.press4_quote || "Şehrin en iyi espresso deneyimi için tek adres.",
            logo: settings?.press4_logo || null
        },
    ];

    return (
        <section className="bg-[#EFECE4] py-16 overflow-hidden border-t border-b border-black/5 flex">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                }}
                className="flex flex-shrink-0"
            >
                {/* Duplicate for seamless loop */}
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                    <div key={index} className="flex items-center gap-10 mx-16 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex-shrink-0">
                            {item.logo ? (
                                <div className="relative h-12 w-32 flex items-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.logo} alt={item.source} className="h-full w-full object-contain grayscale" />
                                </div>
                            ) : (
                                <span className="font-serif text-4xl font-bold tracking-tight text-black">
                                    {item.source}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-light text-gray-700 w-72 leading-snug italic">
                            &quot;{item.quote}&quot;
                        </span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
