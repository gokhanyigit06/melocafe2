export default function Hero({ settings }: { settings: any }) {
    const videoUrl = settings?.hero_video_url || "/hero-video.mp4";
    const title = settings?.hero_title || "Modern Kahve.";
    const buttonText = settings?.hero_button_text || "SHOP NOW";

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
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
                {buttonText && (
                    <button className="mt-4 px-8 py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all font-bold tracking-widest uppercase text-sm">
                        {buttonText}
                    </button>
                )}
            </div>
        </section>
    );
}
