"use client";

import Link from "next/link";
import { Instagram, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ settings }: { settings?: any }) {
    const [email, setEmail] = useState("");
    const [language, setLanguage] = useState("TR");
    const [isLangOpen, setIsLangOpen] = useState(false);

    const bigText = settings?.footer_big_text || "Londra'nın ünlü Bermondsey Caddesi'ndeki eski bir 19. yüzyıl saat evinden gururla doğdu.";
    const newsletterTitle = settings?.footer_newsletter_title || "Bültenimize Abone Olun.";
    const newsletterDesc = settings?.footer_newsletter_description || "Abone olun ve ilk siparişinizde %10 indirim kazanın, ayrıca en havalı kahve çekirdeklerine hala soğumadan erişim sağlayın.";

    const socialLinks = {
        instagram: settings?.social_instagram || "#"
    };

    // Animation variants for the big text
    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.03,
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <footer className="bg-[#0a2b4e] text-white pt-24 pb-12 px-6 border-t border-white/10 font-causten">
            <div className="container mx-auto">
                {/* Top Section: Animated Text & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
                    <div className="lg:w-3/5">
                        <motion.h2
                            className="font-helvetica text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#EFECE4]"
                            variants={sentence}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {bigText.split("").map((char: string, index: number) => (
                                <motion.span key={char + "-" + index} variants={letter}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>
                    </div>

                    <div className="lg:w-1/3">
                        <h3 className="font-helvetica text-2xl font-bold mb-4">
                            {newsletterTitle}
                        </h3>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            {newsletterDesc}
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="E-posta adresinizi girin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-white/20 rounded-full py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-16"></div>

                {/* Links Grid */}


                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-gray-500 uppercase tracking-wider">
                    {/* Socials */}
                    <div className="flex gap-6">
                        <Link href={socialLinks.instagram} className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                    </div>

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:border-white transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="text-white">{language === "TR" ? "TR - TRY (₺)" : "EN - GBP (£)"}</span>
                        </button>
                        {/* Dropdown */}
                        {isLangOpen && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-[#0a2b4e] border border-white/10 rounded-lg overflow-hidden z-20">
                                <button
                                    onClick={() => { setLanguage("TR"); setIsLangOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors"
                                >
                                    TR - TRY (₺)
                                </button>
                                <button
                                    onClick={() => { setLanguage("EN"); setIsLangOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors"
                                >
                                    EN - GBP (£)
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Legal */}
                    <div className="flex gap-6">
                        <span>2026</span>
                        <Link href="#" className="hover:text-white transition-colors">ŞARTLAR</Link>
                        <Link href="#" className="hover:text-white transition-colors">GİZLİLİK</Link>
                        <Link href="#" className="hover:text-white transition-colors">ÇEREZLER</Link>
                    </div>
                </div>
            </div >
        </footer >
    );
}
