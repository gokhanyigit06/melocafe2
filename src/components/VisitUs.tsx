"use client";


import Link from "next/link";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VisitUs({ settings }: { settings?: any }) {
    const title = settings?.visit_title || "Bizi ziyaret et.";
    const description = settings?.visit_description || "Londra'nın ünlü Bermondsey Caddesi'ndeki 25 metrekarelik alan, WatchHouse'u tasarlamak ve gelecek her şeyin temellerini atmak için yeterliydi.";
    const imgLarge = settings?.visit_img_large || "/images/coffee-shop-exterior.png";
    const imgSmall = settings?.visit_img_small || "/images/coffee-shop-small.png";

    const btnText = settings?.visit_btn_text || "Şubelerimiz";
    const btnLink = settings?.visit_btn_link || "/subeler";

    return (
        <section className="relative py-24 px-6 text-white overflow-hidden">
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
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-start relative z-10">
                {/* Left Column: Large Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-xl"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imgLarge}
                        alt="Melo Coffee Shop Exterior"
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>

                {/* Right Column: Text + Small Image */}
                <div className="flex flex-col h-full justify-between gap-12 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            {title}
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed max-w-md">
                            {description}
                        </p>
                        <Link
                            href={btnLink}
                            className="inline-block px-8 py-3 border border-white rounded-full text-sm font-medium tracking-widest hover:bg-white hover:text-[#0a1628] transition-all uppercase"
                        >
                            {btnText}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full aspect-[4/3] max-w-md overflow-hidden rounded-lg shadow-lg mt-auto"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imgSmall}
                            alt="Melo Coffee Shop Detail"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
