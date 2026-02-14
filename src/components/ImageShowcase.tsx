"use client";

import { useState } from "react";

interface ShowcaseItem {
    image: string;
    title: string;
    subtitle: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageShowcase({ settings }: { settings?: any }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const showcaseItems: ShowcaseItem[] = [
        {
            image: settings?.showcase1_image || "/images/varlik1.png",
            title: settings?.showcase1_title || "Doğru Teknikler",
            subtitle: settings?.showcase1_subtitle || "",
        },
        {
            image: settings?.showcase2_image || "/images/varlik2.png",
            title: settings?.showcase2_title || "Doğru Ekipmanlar",
            subtitle: settings?.showcase2_subtitle || "",
        },
        {
            image: settings?.showcase3_image || "/images/varlik4.png",
            title: settings?.showcase3_title || "Bilgiyle Yönetilen Süreçler",
            subtitle: settings?.showcase3_subtitle || "",
        },
        {
            image: settings?.showcase4_image || "/images/varlik3.png",
            title: settings?.showcase4_title || "Amaç en iyi sonucu elde etmektir",
            subtitle: settings?.showcase4_subtitle || "",
        },
    ];

    return (
        <section className="w-full relative overflow-hidden">
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
            <div className="relative z-10 grid grid-cols-2">
                {showcaseItems.map((item, index) => (
                    <div
                        key={index}
                        className="showcase-card group relative overflow-hidden cursor-pointer"
                        style={{ aspectRatio: "4 / 3" }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Image - using img tag to avoid Next.js remote pattern issues */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${hoveredIndex === index ? "scale-110" : "scale-100"
                                }`}
                        />

                        {/* Gradient Overlay */}
                        <div
                            className={`absolute inset-0 transition-all duration-500 ease-out ${hoveredIndex === index
                                ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
                                : "bg-gradient-to-t from-black/80 via-black/35 to-black/10"
                                }`}
                        />

                        {/* Decorative top line on hover */}
                        <div
                            className={`absolute top-0 left-0 right-0 h-[2px] bg-[#C8A97E] transition-all duration-500 ease-out ${hoveredIndex === index
                                ? "opacity-100 scale-x-100"
                                : "opacity-0 scale-x-0"
                                }`}
                        />

                        {/* Text Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
                            {/* Divider line */}
                            <div
                                className={`w-8 h-[1px] bg-[#C8A97E] mb-3 transition-all duration-500 ease-out ${hoveredIndex === index
                                    ? "w-12 opacity-100"
                                    : "w-8 opacity-70"
                                    }`}
                            />

                            {/* Title */}
                            <h3
                                className={`font-serif text-white text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-wide transition-all duration-500 ease-out ${hoveredIndex === index
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-1 opacity-90"
                                    }`}
                            >
                                {item.title}
                            </h3>

                            {/* Subtitle */}
                            <p
                                className={`text-white/80 text-xs md:text-sm mt-2 font-light tracking-wider transition-all duration-500 ease-out ${hoveredIndex === index
                                    ? "translate-y-0 opacity-100 max-h-20"
                                    : "translate-y-2 opacity-0 max-h-0"
                                    } overflow-hidden`}
                            >
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div
                            className={`absolute top-4 right-4 w-3 h-3 border-t border-r border-[#C8A97E] transition-all duration-500 ${hoveredIndex === index
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                                }`}
                        />
                        <div
                            className={`absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#C8A97E] transition-all duration-500 ${hoveredIndex === index
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                                }`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
