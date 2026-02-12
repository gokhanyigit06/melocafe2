"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HighlightsPage() {
    const topics = [
        "COFFEE",
        "DESIGN",
        "EDUCATION",
        "HOUSES",
        "SUSTAINABILITY",
        "TEAMS",
    ];

    return (
        <main className="min-h-screen bg-[#F5F2EA] text-black pt-32 pb-24 px-6 md:px-12">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-16 border-b border-black/10 pb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-helvetica text-6xl md:text-8xl font-bold mb-6 tracking-tight"
                    >
                        Öne Çıkanlar.
                    </motion.h1>
                    <p className="font-causten text-lg text-gray-600 mb-8 max-w-2xl">
                        Latest news, coffee musings and sourcing stories from the world of Melo.
                    </p>
                    <div className="flex flex-wrap gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
                        <span className="text-black">Topics:</span>
                        {topics.map((topic) => (
                            <button
                                key={topic}
                                className="hover:text-black transition-colors underline-offset-4 hover:underline"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24">

                    {/* Item 1: Large Feature (Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-6">
                            <Image
                                src="/images/highlight-gift-box.png"
                                alt="Melo x NOMAD"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                                <h2 className="font-helvetica text-4xl md:text-5xl font-bold leading-tight mb-2">
                                    Melo x NOMAD.
                                </h2>
                            </div>
                        </div>
                        <div className="flex justify-between items-baseline border-t border-black/10 pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Spotlight.</span>
                            <p className="text-sm text-gray-600 max-w-xs text-right">
                                A Barcelona guest. A London roast. For this year&apos;s seasonal special.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column Stack */}
                    <div className="flex flex-col gap-16">
                        {/* Item 2: Text + Image (Small) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                        >
                            <div className="space-y-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-black">Spotlight.</span>
                                <h3 className="font-helvetica text-2xl font-bold">Introducing: matcha.</h3>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    Three drinks. Two matchas. No shortcuts. At Melo, every ingredient we serve is carefully chosen.
                                </p>
                                <span className="text-xs font-bold underline">Read more.</span>
                            </div>
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                                <Image
                                    src="/images/journal-matcha.png"
                                    alt="Matcha"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </motion.div>

                        {/* Item 3: Image + Text (Stacked) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group cursor-pointer"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-black block mb-4">Origin: Colombia.</span>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
                                <Image
                                    src="/images/journal-landscape.png"
                                    alt="Colombia Origin"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-helvetica text-2xl font-bold mb-2">Think of spectacular coffee.</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Think of Colombia. With its dramatic landscapes and diverse microclimates...
                            </p>
                            <span className="text-xs font-bold underline">Read more.</span>
                        </motion.div>
                    </div>

                    {/* Item 4: Large Feature (Full Width variant within grid flow) - using Col Span if needed, but keeping grid uniform for now */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#EAE6DC] p-8 md:p-12 rounded-xl"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                            <Image
                                src="/images/highlight-grinder.png"
                                alt="Gift Guide"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="font-helvetica text-5xl text-white text-center drop-shadow-lg p-4">
                                    Our Modern Coffee<br /><span className="italic font-serif">gift guide.</span>
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-black">Spotlight.</span>
                            <h3 className="font-helvetica text-3xl font-bold">Europe&apos;s Best Coffee Shop Chain.</h3>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Celebrating our tenth anniversary year, Melo is honoured to be named Europe&apos;s Best Coffee Shop Chain at the 2024 European Coffee Awards.
                            </p>
                            <span className="text-xs font-bold underline">Read more.</span>

                            <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image
                                    src="/images/highlight-barista.png"
                                    alt="Awards Team"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Item 5: Small Text Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer border-t border-black/10 pt-6"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-black mb-2 block">Eugenioides.</span>
                        <p className="text-sm text-gray-600 mb-4">
                            At Melo, our pursuit of the exceptional takes us to some of the most remarkable producers in the world.
                        </p>
                        <span className="text-xs font-bold underline">Read more.</span>
                    </motion.div>

                    {/* Item 6: Image Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer border-t border-black/10 pt-6 flex gap-6"
                    >
                        <div className="flex-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-black mb-2 block">Nikol Novotná.</span>
                            <p className="text-sm text-gray-600 mb-4">
                                Head Roaster at Melo. We take pride in the exceptional talent driving our craft.
                            </p>
                            <span className="text-xs font-bold underline">Read more.</span>
                        </div>
                        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                            <Image
                                src="/images/highlight-barista.png" // reusing
                                alt="Roaster"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                </div>

                {/* Newsletter Section */}
                <div className="bg-[#EFECE4] rounded-2xl p-12 md:p-24 text-center mb-24">
                    <h2 className="font-helvetica text-5xl md:text-6xl font-bold mb-12 tracking-tight">
                        Get these sent to<br />your inbox.
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Become a subscriber and enjoy 10% off your first order plus access to the hottest coffee beans while they&apos;re still cooling.
                    </p>
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full bg-transparent border border-black/20 rounded-full py-4 px-6 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 text-sm font-medium">
                    <button className="text-gray-400 hover:text-black">{'<'}</button>
                    <button className="text-black border-b border-black">1</button>
                    <button className="text-gray-500 hover:text-black">2</button>
                    <button className="text-gray-500 hover:text-black">3</button>
                    <span className="text-gray-400">...</span>
                    <button className="text-gray-500 hover:text-black">6</button>
                    <button className="text-black hover:text-gray-600">{'>'}</button>
                </div>

            </div>
        </main>
    );
}
