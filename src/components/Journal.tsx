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

export default function Journal({ posts = [] }: { posts?: Post[] }) {
    // Statik yedek içerikler (Admin panelinden veri gelmezse görünecek olanlar)
    const defaultPosts: Post[] = [
        {
            id: "default-1",
            title: "WatchHouse x NOMAD.",
            slug: "watchhouse-x-nomad",
            content: "",
            excerpt: "A Barcelona guest. A London roast. For this year's London Coffee Festival, we've partnered with NOMAD Coffee on a one-off...",
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
        <section className="bg-[#F5F2EA] py-24 px-6 text-black border-t border-black/5 font-causten">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-helvetica text-6xl md:text-8xl font-bold leading-none tracking-tight"
                    >
                        Highlights.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <p className="text-lg leading-relaxed text-gray-800 max-w-xl">
                            25 square metres on London's famous Bermondsey Street was all it took to conceive
                            WatchHouse and lay the foundations of everything to come. Historically a shelter for men
                            guarding the graveyard of St Mary Magdalen's Church.
                        </p>
                        <Link
                            href="/highlights"
                            className="inline-block px-10 py-3 border border-black rounded-full text-xs font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all uppercase"
                        >
                            Explore Highlights
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
                                        <div className="w-full h-px bg-black/10 mb-8" />
                                        <span className="text-xs font-bold tracking-widest uppercase block">Spotlight.</span>
                                        <h4 className="text-2xl font-bold font-helvetica uppercase tracking-tight">{secondaryPost.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {secondaryPost.excerpt}
                                        </p>
                                        <Link href={`/highlights/${secondaryPost.slug}`} className="inline-block text-xs font-bold border-b border-black pb-1 hover:opacity-60 transition-opacity uppercase tracking-tighter">
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
                                        <div className="w-full h-px bg-black/10 mb-8" />
                                        <span className="text-xs font-bold tracking-widest uppercase block">Spotlight.</span>
                                        <h4 className="text-2xl font-bold font-helvetica uppercase tracking-tight">{tertiaryPost.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {tertiaryPost.excerpt}
                                        </p>
                                        <Link href={`/highlights/${tertiaryPost.slug}`} className="inline-block text-xs font-bold border-b border-black pb-1 hover:opacity-60 transition-opacity uppercase tracking-tighter">
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
