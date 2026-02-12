"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { User, Search, Menu, X } from "lucide-react";

import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ settings }: { settings?: any }) {
    const announcementText = settings?.announcement_text || "Subscribe & save 10%, with free UK shipping";
    const logoUrl = settings?.logo_url || "/images/varlik3.png";
    const siteName = settings?.site_name || "Melo Kahve";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            // If we scroll past the top bar (approx 40px), make the header sticky/fixed at top 0 with background
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Warning/Info Bar - Scrolls away with the page */}
            <div className="bg-[#0a2b4e] text-white text-xs py-2.5 text-center font-medium tracking-wide relative z-50">
                <p>{announcementText}</p>
            </div>

            <header
                className={`w-full z-40 transition-all duration-700 ease-in-out ${isScrolled
                    ? "fixed top-0 bg-[#0a2b4e]/95 backdrop-blur-md text-white shadow-sm py-4"
                    : `absolute top-[40px] bg-transparent py-6 ${isHomePage ? "text-white" : "text-black"}`
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Left Navigation (Desktop) */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                        <Link href="/" className="hover:opacity-75 transition-opacity">
                            Anasayfa.
                        </Link>
                        <Link href="/locations" className="hover:opacity-75 transition-opacity">
                            Mağazalar.
                        </Link>
                        <Link href="/story" className="hover:opacity-75 transition-opacity">
                            Hikayemiz.
                        </Link>
                        <Link href="/contact" className="hover:opacity-75 transition-opacity">
                            İletişim.
                        </Link>
                        <Link href="/highlights" className="hover:opacity-75 transition-opacity">
                            Öne Çıkanlar.
                        </Link>
                    </nav>

                    {/* Mobile Menu Button (Left) */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo (Center) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" className="block relative w-48 h-[72px] flex items-center justify-center">
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={siteName}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            ) : (
                                <span className="font-serif text-2xl font-bold tracking-tighter uppercase whitespace-nowrap">
                                    {siteName}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Right Actions (Icon Buttons) */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button aria-label="Account" className="hover:text-gray-300 transition-colors">
                            <User size={20} />
                        </button>
                        <button aria-label="Search" className="hover:text-gray-300 transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-[#0a2b4e]/95 text-white z-50 flex flex-col items-center justify-center gap-8 md:hidden">
                        <button
                            className="absolute top-8 right-8"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <nav className="flex flex-col items-center gap-6 text-2xl font-serif">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                Anasayfa.
                            </Link>
                            <Link href="/locations" onClick={() => setIsMobileMenuOpen(false)}>
                                Mağazalar.
                            </Link>
                            <Link href="/story" onClick={() => setIsMobileMenuOpen(false)}>
                                Hikayemiz.
                            </Link>
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                İletişim.
                            </Link>
                            <Link href="/highlights" onClick={() => setIsMobileMenuOpen(false)}>
                                Öne Çıkanlar.
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
