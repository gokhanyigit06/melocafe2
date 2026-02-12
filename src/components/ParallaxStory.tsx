"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParallaxStory({ settings }: { settings?: any }) {
    const title = settings?.parallax_title || "Melo Kahve, anlık hazlara yavaş bir bakış açısıdır. Günlük fincanınız için düşünceli demlemeler, nadir lezzet profilleri ve özenli detaylar.";
    const imageUrl = settings?.parallax_image || "/images/coffee-shop-exterior.png";
    const btnText = settings?.parallax_btn_text || "Hikayemiz";
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.3, 1, 0.3]);
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] md:aspect-[17/6] overflow-hidden bg-black"
        >
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div className="relative w-full h-full">
                    <Image
                        src={imageUrl}
                        alt="Melo Kahve Dükkanı"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </motion.div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                <motion.h2
                    style={{ opacity: textOpacity }}
                    className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-medium max-w-5xl leading-tight drop-shadow-lg transition-opacity duration-300"
                >
                    {title}
                </motion.h2>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-12 px-8 py-3 bg-transparent border border-white text-white rounded-full text-sm font-medium tracking-widest hover:bg-white hover:text-black transition-colors uppercase"
                >
                    {btnText}
                </motion.button>
            </div>
        </section>
    );
}
