// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Hero({ settings }: { settings: any }) {
    const videoUrl = settings?.hero_video_url || "/hero-video.mp4";
    const title = settings?.hero_title || "Modern Kahve.";
    const subtitle = settings?.hero_subtitle || "Pourers of the world's best coffees and providers of the tools and techniques from our House to yours.";


    return (
        <section className="relative aspect-square md:h-screen md:aspect-auto w-full overflow-hidden bg-black">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={settings?.hero_poster_url}
                className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.8]"
                key={videoUrl} // Force re-render on URL change
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight drop-shadow-2xl max-w-4xl uppercase">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-light text-lg md:text-xl max-w-3xl drop-shadow-lg tracking-wide opacity-90">
                        {subtitle}
                    </p>
                )}

            </div>
        </section>
    );
}
