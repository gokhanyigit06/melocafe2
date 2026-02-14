"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
}

export default function Journal({ posts = [], settings }: { posts?: Post[], settings?: any }) {
    // Statik yedek içerikler (Admin panelinden veri gelmezse görünecek olanlar)
    const defaultPosts: Post[] = [
        {
            id: "default-1",
            title: "WatchHouse x NOMAD.",
            slug: "watchhouse-x-nomad",
            content: "",
            excerpt: "A Barcelona guest. A London roast. For this year&apos;s London Coffee Festival, we've partnered with NOMAD Coffee on a one-off...",
            coverImage: "/images/journal-featured.png"
        },
        {
            id: "default-2",
            title: "Introducing: matcha.",
            slug: "introducing-matcha",
            content: "",
            excerpt: "Three drinks. Two matchas. No shortcuts. At Melo, every ingredient we serve is carefully chosen, not just for what...",
            coverImage: "/images/journal-matcha.png"
        },
        {
            id: "default-3",
            title: "Origin: Colombia.",
            slug: "origin-colombia",
            content: "",
            excerpt: "Think of spectacular of coffee, and Colombia is the origin that comes to mind. With its dramatic landscapes, diverse mi...",
            coverImage: "/images/journal-landscape.png"
        }
    ];

    // Eğer dışarıdan post gelirse onları kullan, yoksa statikleri kullan
    const displayPosts = posts.length > 0 ? posts : defaultPosts;
    const featuredPost = displayPosts[0];
    const secondaryPost = displayPosts[1];
    const tertiaryPost = displayPosts[2];

    return (
        <section className="relative py-24 px-6 text-white overflow-hidden font-causten">
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
            <div className="container mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-helvetica text-6xl md:text-8xl font-bold leading-none tracking-tight"
                    >
                        {settings?.journal_title || "Highlights."}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <p className="text-lg leading-relaxed text-white/80 max-w-xl">
                            {settings?.journal_description || "25 square metres on London's famous Bermondsey Street was all it took to conceive WatchHouse and lay the foundations of everything to come. Historically a shelter for men guarding the graveyard of St Mary Magdalen's Church."}
                        </p>
                        <Link
                            href="/highlights"
                            className="inline-block px-10 py-3 border border-white rounded-full text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-[#0a1628] transition-all uppercase"
                        >
                            {settings?.journal_btn_text || "Explore Highlights"}
                        </Link>
                    </motion.div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT: Featured Post (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative group h-full"
                    >
                        <Link href={`/highlights/${featuredPost.slug}`} className="block h-full">
                            <div className="relative aspect-[4/5] lg:aspect-square w-full overflow-hidden rounded-3xl group">
                                <Image
                                    src={featuredPost.coverImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                <div className="absolute bottom-10 left-10 right-10 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="font-helvetica text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                        {featuredPost.title}
                                    </h3>
                                    <div className="flex justify-between items-end border-t border-white/30 pt-6">
                                        <span className="text-xs font-bold tracking-widest uppercase opacity-80">Spotlight.</span>
                                        <p className="text-sm font-light opacity-90 max-w-[60%] line-clamp-2 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* RIGHT: Secondary Stack */}
                    <div className="flex flex-col gap-16 lg:gap-24">

                        {/* Secondary Post: Text Left, Image Right */}
                        {secondaryPost && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="group"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="md:w-3/5 space-y-6 order-2 md:order-1">
                                        <div className="w-full h-px bg-white/10 mb-8" />
                                        <span className="text-xs font-bold tracking-widest uppercase block text-white/60">Spotlight.</span>
                                        <h4 className="text-2xl font-bold font-helvetica uppercase tracking-tight">{secondaryPost.title}</h4>
                                        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                            {secondaryPost.excerpt}
                                        </p>
                                        <Link href={`/highlights/${secondaryPost.slug}`} className="inline-block text-xs font-bold border-b border-white pb-1 hover:opacity-60 transition-opacity uppercase tracking-tighter">
                                            Read more.
                                        </Link>
                                    </div>
                                    <div className="md:w-2/5 aspect-square relative rounded-2xl overflow-hidden order-1 md:order-2">
                                        <Image
                                            src={secondaryPost.coverImage}
                                            alt={secondaryPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Tertiary Post: Image Left, Text Right */}
                        {tertiaryPost && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="group"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="md:w-2/5 aspect-square relative rounded-2xl overflow-hidden">
                                        <Image
                                            src={tertiaryPost.coverImage}
                                            alt={tertiaryPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="md:w-3/5 space-y-6">
                                        <div className="w-full h-px bg-white/10 mb-8" />
                                        <span className="text-xs font-bold tracking-widest uppercase block text-white/60">Spotlight.</span>
                                        <h4 className="text-2xl font-bold font-helvetica uppercase tracking-tight">{tertiaryPost.title}</h4>
                                        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                            {tertiaryPost.excerpt}
                                        </p>
                                        <Link href={`/highlights/${tertiaryPost.slug}`} className="inline-block text-xs font-bold border-b border-white pb-1 hover:opacity-60 transition-opacity uppercase tracking-tighter">
                                            Read more.
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
