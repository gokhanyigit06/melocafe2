"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-[#F5F2EA] text-black">

            {/* Intro Section: Born in Bermondsey - Moved to Top */}
            <section className="pt-48 pb-24 px-6 md:px-12">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-helvetica text-6xl md:text-7xl font-bold leading-none tracking-tight"
                        >
                            Born in Bermondsey,<br />discovered worldwide.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="font-causten text-lg text-gray-700 leading-relaxed max-w-md"
                        >
                            From humble beginnings in South London, we're building a local community far and wide. Approachable, considered, full of quality and provenance; thoughtful products and paraphernalia for your daily cup. Our House or yours.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src="/images/story-barista-working.png"
                            alt="Barista Working"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Hero Section - Moved Here */}
            <section className="relative h-screen w-full overflow-hidden">
                <Image
                    src="/images/story-hero-latte.png"
                    alt="Latte Art"
                    fill
                    className="object-cover brightness-75"
                    priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-helvetica text-5xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl leading-tight tracking-tight mb-12"
                    >
                        Pourers of the world’s best coffees and providers of the tools and
                        techniques that make it yours.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            href="/locations"
                            className="bg-[#F5F2EA] text-black px-8 py-3 rounded-full text-xs font-bold tracking-widest hover:bg-white transition-colors uppercase"
                        >
                            Visit Us
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* History Section: 25 Square Meters */}
            <section className="py-24 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-helvetica text-4xl md:text-5xl font-bold leading-tight"
                        >
                            25 square meters on London’s famous Bermondsey Street was all it took to conceive Melo and lay the foundations of everything to come.
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src="/images/story-small-shop.png"
                                alt="Original Shop"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 md:pt-12"
                        >
                            <p className="text-sm font-causten leading-relaxed text-gray-600">
                                Historically a shelter for men guarding the graveyard of St Mary Magdalen’s Church, today we honour its former role by providing a contemporary sanctuary to our customers. This tiny building became our namesake and the original home of the Modern Coffee ambition: to offer the community quality coffee, food and service, in carefully considered and beautifully designed spaces.
                            </p>
                            <p className="text-sm font-causten leading-relaxed text-gray-600">
                                Our vision has continued to grow, leading us to new spaces, an expanded offering and many great community & industry relationships. As we look to the future, we hope to continue to build on what we started back in 2014; distinctive spaces remain at the heart of our development, and Modern Coffee at the heart of what we do.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-helvetica text-6xl md:text-7xl font-bold tracking-tight"
                        >
                            Our approach.
                        </motion.h2>
                        <div className="max-w-md space-y-6">
                            <p className="text-xs text-gray-600 leading-relaxed font-bold">
                                A home to those who value craft and quality; our aspiration is to be the local hero of choice. Dedicated to transparent, ethical coffee and food supply chains, we source seasonally from the best producers around the world.
                            </p>
                            <button className="px-6 py-2 border border-black rounded-full text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-colors uppercase">
                                See our houses
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/images/story-approach-barista.png"
                                alt="Barista Pouring"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden mt-0 md:mt-32"
                        >
                            <Image
                                src="/images/story-approach-counter.png"
                                alt="Coffee Counter"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
