"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function ContactClient({ settings }: { settings: any }) {
    return (
        <main className="min-h-screen bg-[#F5F2EA] text-black pt-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden mb-24">
                <Image
                    src={settings.contact_hero_image || "/images/contact-hero.png"}
                    alt="Melo Coffee Contact Hero"
                    fill
                    className="object-cover brightness-50"
                    priority
                />

                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
                    <div className="max-w-4xl text-white pt-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-helvetica text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
                        >
                            {settings.contact_hero_title || "Talk to us."}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl font-light opacity-80 max-w-xl leading-relaxed font-causten"
                        >
                            {settings.contact_hero_desc || "Uzmanlarımız Modern Kahve sorularınız için burada, doğru yerdesiniz."}
                        </motion.p>
                        <div className="flex gap-4 mt-12">
                            <button className="px-8 py-3 border border-white/30 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all uppercase backdrop-blur-sm">
                                {settings.contact_hero_btn1_text || "FAQs"}
                            </button>
                            <button className="px-8 py-3 border border-white/30 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all uppercase backdrop-blur-sm">
                                {settings.contact_hero_btn2_text || "Feedback"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                {/* Contact Info Column (Left) */}
                <div className="space-y-16">
                    {/* Address */}
                    <div className="border-t border-black/10 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <h3 className="font-helvetica text-2xl font-bold">{settings.contact_addr_label || "Address."}</h3>
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-causten text-gray-800">{settings.contact_addr_value || "36 Maltby Street, London, SE1 3PA"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Online Orders */}
                    <div className="border-t border-black/10 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <h3 className="font-helvetica text-2xl font-bold">{settings.contact_online_label || "Online Orders."}</h3>
                            <div className="md:col-span-2 space-y-4">
                                <p className="font-causten text-gray-800 text-sm whitespace-pre-line">
                                    {settings.contact_online_value || "Hours of operation: Sunday - Thursday,\n8AM-4PM GMT\n\nhello@melocoffee.com"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Office */}
                    <div className="border-t border-black/10 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <h3 className="font-helvetica text-2xl font-bold">{settings.contact_support_label || "Support Office."}</h3>
                            <div className="md:col-span-2 space-y-4">
                                <p className="font-causten text-gray-800 text-sm whitespace-pre-line">
                                    {settings.contact_support_value || "Hours of operation:\nMonday–Friday, 8AM–4PM GMT\n(excluding public holidays)\n\nhello@melocoffee.com"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Marketing */}
                    <div className="border-t border-black/10 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <h3 className="font-helvetica text-2xl font-bold">{settings.contact_marketing_label || "Marketing."}</h3>
                            <div className="md:col-span-2 space-y-4">
                                <p className="font-causten text-gray-800 text-sm whitespace-pre-line">
                                    {settings.contact_marketing_value || "Hours of operation:\nMonday–Friday, 8AM–4PM GMT\n(excluding public holidays)\n\nmarketing@melocoffee.com"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Socials - Reusing global socials if needed, but keeping local for now as per design */}
                    <div className="flex gap-6 pt-4">
                        <Facebook className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
                        <Instagram className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
                    </div>

                </div>

                {/* Contact Form Column (Right) */}
                <div>
                    <div className="bg-[#F0EBE0] p-12 rounded-xl sticky top-32">
                        <h2 className="font-helvetica text-5xl font-bold mb-12 text-center tracking-tight">
                            {settings.contact_form_title || "Send us a message."}
                        </h2>
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">First Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">Last Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest">Email</label>
                                <input type="email" className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest">Reason for Contacting *</label>
                                <select className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 transition-colors appearance-none">
                                    <option>General Enquiry</option>
                                    <option>Order Support</option>
                                    <option>Franchise</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest">Message <span className="text-gray-500 normal-case tracking-normal">(optional)</span></label>
                                <textarea rows={4} className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none py-2 transition-colors resize-none"></textarea>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button className="bg-black text-white px-12 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase">
                                    Send Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
