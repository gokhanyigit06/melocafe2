"use client";


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
        <section className="relative text-white pl-6 md:pl-12 py-24 overflow-hidden">
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
            <div className="container mx-auto pr-6 md:pr-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
                <h2 className="font-helvetica text-6xl font-bold tracking-tight">Şubeleri Gör</h2>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:flex gap-4">
                    <button onClick={scrollLeft} className="p-4 bg-white text-[#0a1628] rounded-full hover:bg-white/90 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={scrollRight} className="p-4 bg-white text-[#0a1628] rounded-full hover:bg-white/90 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Controls (Mobile) */}
            <div className="flex gap-4 mb-8 px-6 md:hidden">
                <button onClick={scrollLeft} className="p-3 border border-white rounded-full hover:bg-white hover:text-[#0a1628] transition-colors"><ArrowLeft size={20} /></button>
                <button onClick={scrollRight} className="p-3 border border-white rounded-full hover:bg-white hover:text-[#0a1628] transition-colors"><ArrowRight size={20} /></button>
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
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={loc.image_url}
                                    alt={loc.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Görsel Yok</div>
                            )}

                        </div>
                        <div className="space-y-2 border-t border-white/10 pt-4 relative z-10">
                            <h3 className="font-helvetica text-2xl font-bold">{loc.title}</h3>
                            <p className="font-causten text-sm text-white/70">{loc.address}</p>
                            {loc.directions_url && (
                                <Link href={loc.directions_url} target="_blank" className="inline-block text-xs font-bold underline mt-2 hover:text-white/60 uppercase tracking-widest text-white">
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
