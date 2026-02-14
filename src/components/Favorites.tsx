"use client";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <section className="relative py-20 px-6 text-white overflow-hidden">
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
                <div className="flex justify-between items-center mb-16">
                    <h2 className="font-serif text-5xl font-bold tracking-tight">
                        {mainTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {favoritesData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="relative w-full aspect-square mb-8 transition-transform duration-300 group-hover:scale-[1.02]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">
                                {item.title}
                            </h3>
                            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
