"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

// Dummy data for development/preview
const DUMMY_LOCATIONS = [
    {
        id: "dummy-1",
        title: "Northcote.",
        address: "Unit 3, 12-16 Northcote Road, London SW11 1NX",
        image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
        tag: "Coming soon",
        directions_url: "#"
    },
    {
        id: "dummy-2",
        title: "Park Ave South.",
        address: "287 Park Ave South, New York, NY 10010",
        image_url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1000",
        tag: "Coming soon",
        directions_url: "#"
    },
    {
        id: "dummy-3",
        title: "Saadiyat Horn.",
        address: "Saadiyat Cultural District, Abu Dhabi, UAE",
        image_url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000",
        tag: "Brunch",
        directions_url: "#"
    },
    {
        id: "dummy-4",
        title: "Equestrian Club.",
        address: "Unit 12, Galleria AlMaryah Island, Abu Dhabi",
        image_url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000",
        tag: "Coming soon",
        directions_url: "#"
    }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LocationsSection({ locations }: { locations: any[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Use actual locations if available, otherwise fallback to dummy data
    const displayLocations = locations.length > 0 ? locations : DUMMY_LOCATIONS;

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#F5F2EA] text-black pl-6 md:pl-12 py-24 overflow-hidden">
            <div className="container mx-auto pr-6 md:pr-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <h2 className="font-helvetica text-6xl font-bold tracking-tight">Şubeler.</h2>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:flex gap-4">
                    <button onClick={scrollLeft} className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={scrollRight} className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Controls (Mobile) */}
            <div className="flex gap-4 mb-8 px-6 md:hidden">
                <button onClick={scrollLeft} className="p-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors"><ArrowLeft size={20} /></button>
                <button onClick={scrollRight} className="p-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors"><ArrowRight size={20} /></button>
            </div>

            {/* Draggable/Scrollable Row */}
            <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto pb-16 scrollbar-hide snap-x snap-mandatory pr-12"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {displayLocations.map((loc: any, index: number) => (
                    <motion.div
                        key={loc.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="min-w-[85vw] md:min-w-[400px] lg:min-w-[500px] snap-center flex-shrink-0 group cursor-pointer"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl mb-6">
                            {loc.image_url ? (
                                <Image
                                    src={loc.image_url}
                                    alt={loc.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Görsel Yok</div>
                            )}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {loc.tag && (
                                    <span className="bg-[#F5F2EA] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {loc.tag}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 border-t border-black/10 pt-4">
                            <h3 className="font-helvetica text-2xl font-bold">{loc.title}</h3>
                            <p className="font-causten text-sm text-gray-600">{loc.address}</p>
                            {loc.directions_url && (
                                <Link href={loc.directions_url} target="_blank" className="inline-block text-xs font-bold underline mt-2 hover:text-gray-500 uppercase tracking-widest">
                                    Yol Tarifi Al.
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}

                {/* Empty State (Only if both real and dummy data are empty - unlikely with dummy data constant) */}
                {displayLocations.length === 0 && (
                    <div className="py-20 text-center w-full text-gray-400 uppercase tracking-widest font-bold">
                        Henüz şube bulunmuyor.
                    </div>
                )}

                {/* Spacer for right padding */}
                <div className="min-w-[5vw]"></div>
            </div>
        </section>
    );
}
