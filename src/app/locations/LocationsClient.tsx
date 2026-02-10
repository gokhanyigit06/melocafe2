"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

export default function LocationsClient({ initialLocations, settings }: { initialLocations: any[], settings: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    const pageTitle = settings.locations_page_title || "Visit Us.";
    const pageDescription = settings.locations_page_desc || "Each of our locations are designed to play a contemporary role in the Modern Coffee experience, while also preserving their unique history in the community.";

    return (
        <main className="min-h-screen bg-[#F5F2EA] text-black pt-32 pb-24">
            {/* Header Section */}
            <section className="px-6 md:px-12 mb-32">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-8 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-bold tracking-widest uppercase text-gray-500"
                        >
                            Find our locations
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-helvetica text-7xl md:text-8xl font-bold tracking-tight"
                        >
                            {pageTitle}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-causten text-lg text-gray-700 leading-relaxed max-w-2xl"
                        >
                            {pageDescription}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Locations Carousel Section */}
            <section className="pl-6 md:pl-12 border-t border-black/10 pt-24 overflow-hidden">
                <div className="container mx-auto pr-6 md:pr-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
                    <h2 className="font-helvetica text-6xl font-bold tracking-tight">Locations.</h2>
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
                    {initialLocations.map((loc: any, index: number) => (
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
                                        View directions.
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State */}
                    {initialLocations.length === 0 && (
                        <div className="py-20 text-center w-full text-gray-400 uppercase tracking-widest font-bold">
                            Henüz şube bulunmuyor.
                        </div>
                    )}

                    {/* Spacer for right padding */}
                    <div className="min-w-[5vw]"></div>
                </div>

                {/* Desktop Navigation Arrows */}
                {initialLocations.length > 0 && (
                    <div className="hidden md:flex justify-end gap-4 pr-12">
                        <button onClick={scrollLeft} className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button onClick={scrollRight} className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
