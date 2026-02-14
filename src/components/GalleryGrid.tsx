"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryGrid({ settings }: { settings?: any }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const images = [
        {
            src: settings?.gallery_image_1 || "/images/varlik1.png",
            alt: settings?.gallery_alt_1 || "Melo Coffee",
            span: "col-span-2 row-span-2",
        },
        {
            src: settings?.gallery_image_2 || "/images/varlik2.png",
            alt: settings?.gallery_alt_2 || "Melo Coffee",
            span: "col-span-1 row-span-1",
        },
        {
            src: settings?.gallery_image_3 || "/images/varlik3.png",
            alt: settings?.gallery_alt_3 || "Melo Coffee",
            span: "col-span-1 row-span-1",
        },
        {
            src: settings?.gallery_image_4 || "/images/varlik4.png",
            alt: settings?.gallery_alt_4 || "Melo Coffee",
            span: "col-span-1 row-span-2",
        },
        {
            src: settings?.gallery_image_5 || "/images/varlik1.png",
            alt: settings?.gallery_alt_5 || "Melo Coffee",
            span: "col-span-1 row-span-1",
        },
        {
            src: settings?.gallery_image_6 || "/images/varlik2.png",
            alt: settings?.gallery_alt_6 || "Melo Coffee",
            span: "col-span-2 row-span-1",
        },
    ];

    const goNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % images.length);
    }, [selectedIndex, images.length]);

    const goPrev = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }, [selectedIndex, images.length]);

    const close = useCallback(() => setSelectedIndex(null), []);

    // Keyboard navigation
    useEffect(() => {
        if (selectedIndex === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [selectedIndex, close, goNext, goPrev]);

    return (
        <>
            <section className="relative w-full overflow-hidden">
                {/* Dark blue gradient background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 120% 80% at 20% 20%, rgba(15, 45, 75, 0.9) 0%, transparent 60%),
                            radial-gradient(ellipse 100% 100% at 80% 80%, rgba(10, 30, 55, 0.95) 0%, transparent 50%),
                            linear-gradient(160deg, #0a1a2e 0%, #0d2a45 25%, #0f3555 45%, #0b2640 65%, #071a30 100%)
                        `,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 md:py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4 max-w-7xl mx-auto">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className={`${image.span} relative rounded-xl overflow-hidden group cursor-pointer`}
                                onClick={() => setSelectedIndex(index)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 scale-0 group-hover:scale-100">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Slider */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center"
                        onClick={close}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

                        {/* Close button */}
                        <button
                            onClick={close}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Counter */}
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-mono tracking-widest">
                            {selectedIndex + 1} / {images.length}
                        </div>

                        {/* Previous button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 max-w-[90vw] max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={images[selectedIndex].src}
                                alt={images[selectedIndex].alt}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
