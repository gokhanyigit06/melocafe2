"use client";

import Image from "next/image";

export default function Favorites({ settings }: { settings?: any }) {
    const favoritesData = [
        {
            image: settings?.fav1_image || "/images/kinto-tumbler.png",
            title: settings?.fav1_title || "Kinto Seyahat Termosu.",
            description: settings?.fav1_description || "Çift duvarlı paslanmaz çelik vakumlu termos, sıcak veya soğuk demlemeler için mükemmel (6 saate kadar).",
        },
        {
            image: settings?.fav2_image || "/images/coffee-set-tumbler.png",
            title: settings?.fav2_title || "Melo Espresso x Kinto Termos Seti.",
            description: settings?.fav2_description || "Melo favorisi Espresso, yeni seyahat arkadaşınızla eşleştirildi.",
        },
        {
            image: settings?.fav3_image || "/images/coffee-set-mug.png",
            title: settings?.fav3_title || "Melo Espresso x Seramik Kupa Seti.",
            description: settings?.fav3_description || "Melo favorisi Espresso ve günlük kullanım için el yapımı seramik kupa.",
        },
    ];

    const mainTitle = settings?.favorites_title || "Favorilerimiz.";

    return (
        <section className="bg-[#F5F2EA] py-20 px-6 text-black">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="font-serif text-5xl font-bold tracking-tight">
                        {mainTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {favoritesData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="relative w-full aspect-square mb-8 transition-transform duration-300 group-hover:scale-[1.02]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain mix-blend-multiply"
                                />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
