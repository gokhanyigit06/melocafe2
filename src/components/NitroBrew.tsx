"use client";


import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NitroBrew({ settings }: { settings: any }) {
    const title = settings?.nitro_title || "Nitro ile güçlendirildi. Keyfe hazır.";
    const description = settings?.nitro_description || "Etiyopya'nın Bensa yaylalarından, berraklığı ve karakteriyle bilinen doğal işlenmiş bir kahve geliyor. Yavaşça demliyoruz, ardından temiz, kremsi bir doku ve hafif bir köpük için nitrojenle şarj ediyoruz.";

    const img1 = settings?.nitro_img1 || "/images/cold-brew-single.png";
    const img2 = settings?.nitro_img2 || "/images/cold-brew-pack.png";

    return (
        <section className="relative py-20 px-6 text-white border-t border-white/10 overflow-hidden">
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
                <div className="flex flex-col items-center text-center mb-20 gap-8 max-w-4xl mx-auto">
                    {/* Animated Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight uppercase">
                            {title}
                        </h2>
                    </motion.div>

                    {/* Description Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <p className="text-white/85 leading-relaxed text-xl md:text-2xl whitespace-pre-line font-light">
                            {description}
                        </p>
                    </motion.div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img1}
                            alt="Melo Nitro Cold Brew Can"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm md:mt-12"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img2}
                            alt="Melo Nitro Cold Brew Pack"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
