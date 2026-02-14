"use client";

import Image from "next/image";
import { useState } from "react";

interface ShowcaseItem {
    image: string;
    title: string;
    subtitle: string;
}

const showcaseItems: ShowcaseItem[] = [
    {
        image: "/images/varlik1.png",
        title: "Doğru Teknikler",
        subtitle: "",
    },
    {
        image: "/images/varlik2.png",
        title: "Doğru Ekipmanlar",
        subtitle: "",
    },
    {
        image: "/images/varlik4.png",
        title: "Bilgiyle Yönetilen Süreçler",
        subtitle: "",
    },
    {
        image: "/images/varlik3.png",
        title: "Amaç en iyi sonucu elde etmektir",
        subtitle: "",
    },
];

export default function ImageShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-[#F5F2EA]">
            <div className="grid grid-cols-2">
                {showcaseItems.map((item, index) => (
                    <div
                        key={index}
                        className="showcase-card group relative overflow-hidden cursor-pointer"
                        style={{ aspectRatio: "3 / 4" }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Image */}
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className={`object-cover transition-transform duration-700 ease-out ${hoveredIndex === index ? "scale-110" : "scale-100"
                                }`}
                            sizes="(max-width: 768px) 50vw, 25vw"
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
