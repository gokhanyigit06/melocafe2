"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Dummy data for blog posts template
const DUMMY_BLOG_POSTS = [
    {
        id: 1,
        title: "Kahve Kavurma Sanatı",
        category: "KAHVE",
        excerpt: "Mükemmel bir fincan kahve için çekirdeklerin yolculuğu ve kavurma tekniklerinin incelikleri.",
        image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
        large: true
    },
    {
        id: 2,
        title: "Evde Barista Olmanın Yolları",
        category: "EĞİTİM",
        excerpt: "Kendi mutfağınızda profesyonel kalitede kahve demlemek için ipuçları ve ekipman önerileri.",
        image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
        large: false
    },
    {
        id: 3,
        title: "Sürdürülebilir Kahve Tarımı",
        category: "SÜRDÜRÜLEBİLİRLİK",
        excerpt: "Kahve üreticilerini destekleyen ve doğayı koruyan sürdürülebilir tarım uygulamaları.",
        image_url: "https://images.unsplash.com/photo-1511537609-855a5dd8c51e?auto=format&fit=crop&q=80&w=1000",
        large: false
    },
    {
        id: 4,
        title: "Yeni Sezon Çekirdeklerimiz",
        category: "ÜRÜNLER",
        excerpt: "Etiyopya ve Kolombiya'dan gelen yeni hasat çekirdeklerimizin tat profilleri.",
        image_url: "https://images.unsplash.com/photo-1611854779393-1b2ae54a1985?auto=format&fit=crop&q=80&w=1000",
        large: true
    },
    {
        id: 5,
        title: "Kahve ve Tasarım",
        category: "TASARIM",
        excerpt: "Kahve dükkanlarının atmosferini belirleyen iç mekan tasarımı ve estetik detaylar.",
        image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000",
        large: false
    },
    {
        id: 6,
        title: "Melo Ekibiyle Tanışın",
        category: "EKİP",
        excerpt: "Kahvelerinizin arkasındaki tutkulu barista ve kavurucu ekibimiz.",
        image_url: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000",
        large: false
    }
];

const TOPICS = [
    "KAHVE",
    "TASARIM",
    "EĞİTİM",
    "MEKANLAR",
    "SÜRDÜRÜLEBİLİRLİK",
    "EKİP",
];

export default function BlogPage() {
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
                        Blog.
                    </motion.h1>
                    <p className="font-causten text-lg text-gray-600 mb-8 max-w-2xl">
                        Melo dünyasından en son haberler, kahve üzerine düşünceler ve kaynak hikayeleri.
                    </p>
                    <div className="flex flex-wrap gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
                        <span className="text-black">Konular:</span>
                        {TOPICS.map((topic) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-24">
                    {DUMMY_BLOG_POSTS.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group cursor-pointer flex flex-col ${post.large ? "md:col-span-2 lg:col-span-2" : ""}`}
                        >
                            <div className={`relative w-full overflow-hidden rounded-xl mb-6 ${post.large ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                                <Image
                                    src={post.image_url}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {post.large && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                                        <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{post.category}</span>
                                        <h2 className="font-helvetica text-3xl md:text-5xl font-bold leading-tight">
                                            {post.title}
                                        </h2>
                                    </div>
                                )}
                            </div>

                            {!post.large && (
                                <div className="flex flex-col flex-grow">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{post.category}</span>
                                    <h3 className="font-helvetica text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">{post.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-xs font-bold underline mt-auto group-hover:text-gray-600">Devamını oku.</span>
                                </div>
                            )}

                            {post.large && (
                                <div className="flex justify-between items-baseline pt-2">
                                    <p className="text-sm text-gray-600 max-w-xl">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-xs font-bold underline group-hover:text-gray-600">Devamını oku.</span>
                                </div>
                            )}

                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="bg-[#EFECE4] rounded-3xl p-12 md:p-24 text-center mb-24 relative overflow-hidden">
                    {/* Decorative background element if needed */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        {/* pattern or texture could go here */}
                    </div>

                    <h2 className="font-helvetica text-4xl md:text-6xl font-bold mb-8 tracking-tight relative z-10">
                        Bültenimize<br />Abone Olun.
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto relative z-10">
                        Abone olun ve ilk siparişinizde %10 indirim kazanın, ayrıca en taze kahve haberlerine ilk siz ulaşın.
                    </p>
                    <div className="relative max-w-md mx-auto z-10">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            className="w-full bg-white/50 backdrop-blur-sm border border-black/10 rounded-full py-4 px-6 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-all"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-6 text-sm font-bold">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Önceki
                    </button>
                    <div className="flex gap-4">
                        <button className="text-black border-b-2 border-black pb-1">1</button>
                        <button className="text-gray-400 hover:text-black transition-colors">2</button>
                        <button className="text-gray-400 hover:text-black transition-colors">3</button>
                    </div>
                    <button className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
                        Sonraki <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </main>
    );
}
