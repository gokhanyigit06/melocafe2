"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParallaxStory({ settings }: { settings?: any }) {
    const heading = settings?.parallax_title || "a coffee experience beyond time";
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [60, 0, 0, -60]);

    const paragraphs = [
        settings?.parallax_p1 || "Melo Coffee, kahve kültürünü klasik kalıpların dışına taşıyan, içecek ve yemeği bir deneyim olarak ele alan modern bir şehir markasıdır.",
        settings?.parallax_p2 || "Özenle seçilmiş çekirdeklerle hazırlanan kahveleri; bar teknikleriyle geliştirilen yenilikçi reçeteler ve sağlıklı, dengeli yiyeceklerle bir araya getirir.",
        settings?.parallax_p3 || "Melo, her şubesinde aynı kalite anlayışını korurken, bulunduğu lokasyona göre şekillenen esnek bir hizmet modeliyle sektöre yeni bir soluk getirmeyi hedefler.",
    ].filter(p => p.trim() !== "");

    const bgImage = settings?.parallax_image || "";

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{ minHeight: "55vh" }}
        >
            {/* Background Image or Video or Gradient */}
            {bgImage ? (
                <>
                    {bgImage.match(/\.(mp4|webm|mov)$/) ? (
                        <video
                            src={bgImage}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={bgImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50" />
                </>
            ) : (
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 120% 80% at 20% 20%, rgba(15, 45, 75, 0.9) 0%, transparent 60%),
                            radial-gradient(ellipse 100% 100% at 80% 80%, rgba(10, 30, 55, 0.95) 0%, transparent 50%),
                            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(20, 60, 90, 0.4) 0%, transparent 50%),
                            linear-gradient(160deg, #0a1a2e 0%, #0d2a45 25%, #0f3555 45%, #0b2640 65%, #071a30 100%)
                        `,
                    }}
                />
            )}

            {/* Subtle light streaks for fabric/curtain effect */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    background: `
                        linear-gradient(100deg, transparent 20%, rgba(120, 180, 220, 0.3) 30%, transparent 40%),
                        linear-gradient(95deg, transparent 50%, rgba(100, 160, 200, 0.2) 60%, transparent 70%),
                        linear-gradient(105deg, transparent 65%, rgba(80, 140, 180, 0.15) 75%, transparent 85%)
                    `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 py-14 md:py-20 lg:py-24" style={{ minHeight: "55vh" }}>
                {/* Heading */}
                <motion.h2
                    style={{ opacity: textOpacity, y: textY }}
                    className="font-serif text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-3xl leading-snug mb-10 md:mb-14"
                >
                    {heading}
                </motion.h2>

                {/* Paragraphs */}
                <div className="flex flex-col gap-8 md:gap-10 max-w-2xl">
                    {paragraphs.map((text, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="text-white/85 text-base md:text-lg lg:text-xl leading-relaxed font-light tracking-wide"
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    );
}
