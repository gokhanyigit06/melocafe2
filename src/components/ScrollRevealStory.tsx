"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ScrollRevealStory({ settings }: { settings?: any }) {
    const sectionRef = useRef<HTMLElement>(null);

    const text = settings?.scroll_reveal_text ||
        "Melo, anlık tatminin yavaş bir yorumudur. Özenli demlemeler, nadir lezzet profilleri ve günlük kahveniz için gereken her şey.";
    const bgImage = settings?.scroll_reveal_image || "/images/varlik1.png";
    const btnText = settings?.scroll_reveal_btn_text || "HİKAYEMİZ";
    const btnLink = settings?.scroll_reveal_btn_link || "/hikayemiz";
    const textSize = settings?.scroll_reveal_text_size || "large";

    const sizeClasses: Record<string, string> = {
        small: "text-lg md:text-2xl lg:text-3xl",
        medium: "text-xl md:text-3xl lg:text-4xl",
        large: "text-2xl md:text-3xl lg:text-4xl",
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Split text into words for better wrapping
    const words = text.split(" ");

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ minHeight: "45vh" }}
        >
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Subtle Overlay - much lighter than before */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[45vh] px-8 md:px-16 lg:px-24 py-16">
                {/* Text with character-by-character scroll reveal */}
                <h2
                    className={`font-serif font-bold text-center leading-[1.15] tracking-tight max-w-4xl mb-10 ${sizeClasses[textSize] || sizeClasses.large}`}
                >
                    {words.map((word: string, wordIndex: number) => (
                        <span key={wordIndex} className="inline-block mr-[0.3em]">
                            {word.split("").map((char: string, charIndex: number) => {
                                // Calculate global character index
                                let globalIndex = 0;
                                for (let w = 0; w < wordIndex; w++) {
                                    globalIndex += words[w].length + 1; // +1 for space
                                }
                                globalIndex += charIndex;
                                const totalChars = text.length;

                                return (
                                    <CharReveal
                                        key={charIndex}
                                        char={char}
                                        index={globalIndex}
                                        total={totalChars}
                                        scrollYProgress={scrollYProgress}
                                    />
                                );
                            })}
                        </span>
                    ))}
                </h2>

                {/* Button */}
                <Link
                    href={btnLink}
                    className="px-8 py-3 border border-white/50 rounded-full text-[10px] font-bold tracking-[0.3em] text-white/70 hover:bg-white hover:text-black transition-all duration-500 uppercase backdrop-blur-sm"
                >
                    {btnText}
                </Link>
            </div>
        </section>
    );
}

function CharReveal({
    char,
    index,
    total,
    scrollYProgress,
}: {
    char: string;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Each character reveals based on its position in the text
    const start = (index / total) * 0.45;
    const end = start + 0.06;

    // Revealed = white, unrevealed = semi-transparent warm tone
    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
    const color = useTransform(
        scrollYProgress,
        [start, end],
        ["rgba(200, 190, 170, 0.4)", "rgba(255, 255, 255, 1)"]
    );

    return (
        <motion.span style={{ opacity, color }}>
            {char}
        </motion.span>
    );
}
