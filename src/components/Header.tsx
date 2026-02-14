"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Instagram, Search, Menu, X } from "lucide-react";

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
    const isBlueBgPage = ["/subeler", "/iletisim", "/hikayemiz", "/blog", "/highlights", "/locations", "/story", "/contact"].includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`w-full z-40 transition-all duration-700 ease-in-out ${isScrolled
                    ? "fixed top-0 bg-gradient-to-r from-[#0a1628] via-[#0a2b4e] to-[#0f3d5c] backdrop-blur-md text-white shadow-sm py-4"
                    : `${isBlueBgPage ? "relative bg-gradient-to-r from-[#0a1628] via-[#0a2b4e] to-[#0f3d5c]" : "absolute top-0 bg-transparent"} py-6 ${isHomePage || isBlueBgPage ? "text-white" : "text-black"}`
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Left Navigation (Desktop) */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide items-center w-5/12">
                        <Link href="/" className="hover:opacity-75 transition-opacity">
                            Anasayfa
                        </Link>
                        <Link href="/subeler" className="hover:opacity-75 transition-opacity">
                            Şubeler
                        </Link>
                        <Link href="/hikayemiz" className="hover:opacity-75 transition-opacity">
                            Hikayemiz
                        </Link>
                        <Link href="/iletisim" className="hover:opacity-75 transition-opacity">
                            İletişim
                        </Link>
                        <Link href="/blog" className="hover:opacity-75 transition-opacity">
                            Öne Çıkanlar
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
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                        <Link href="/" className="block relative w-48 h-[60px] flex items-center justify-center">
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
                    <div className="hidden md:flex items-center justify-end space-x-6 w-5/12">
                        <a href="https://www.instagram.com/melokahve" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <button aria-label="Search" className="hover:text-gray-300 transition-colors">
                            <Search size={20} />
                        </button>
                        <Link href="/">
                            <Image
                                src="/images/logo2.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-[#0a2b4e] text-white z-50 flex flex-col items-center justify-center gap-8 md:hidden">
                        <button
                            className="absolute top-8 right-8"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <nav className="flex flex-col items-center gap-6 text-2xl font-serif">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                Anasayfa
                            </Link>
                            <Link href="/subeler" onClick={() => setIsMobileMenuOpen(false)}>
                                Şubeler
                            </Link>
                            <Link href="/hikayemiz" onClick={() => setIsMobileMenuOpen(false)}>
                                Hikayemiz
                            </Link>
                            <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>
                                İletişim
                            </Link>
                            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                                Öne Çıkanlar
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
