"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/data/seed-data";
import { ALL_SERVICE_CATEGORIES } from "@/lib/data/services";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [regionsMenuOpen, setRegionsMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const megaButtonRef = useRef<HTMLButtonElement>(null);
    const regionsMenuRef = useRef<HTMLDivElement>(null);
    const regionsButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                megaMenuRef.current &&
                !megaMenuRef.current.contains(event.target as Node) &&
                megaButtonRef.current &&
                !megaButtonRef.current.contains(event.target as Node) &&
                regionsMenuRef.current &&
                !regionsMenuRef.current.contains(event.target as Node) &&
                regionsButtonRef.current &&
                !regionsButtonRef.current.contains(event.target as Node)
            ) {
                setMegaMenuOpen(false);
                setRegionsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">

            {/* Main Nav */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center group flex-shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="City In Health Logo"
                            width={160}
                            height={50}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link href="/" className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200">
                            Ana Sayfa
                        </Link>

                        {/* Hizmetler Mega Menu */}
                        <div className="relative">
                            <button
                                ref={megaButtonRef}
                                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                                onMouseEnter={() => {
                                    setMegaMenuOpen(true);
                                    setRegionsMenuOpen(false);
                                }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${megaMenuOpen ? "text-primary bg-primary/5" : "text-secondary hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                Hizmetler
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Bölgeler Mega Menu */}
                        <div className="relative">
                            <button
                                ref={regionsButtonRef}
                                onClick={() => setRegionsMenuOpen(!regionsMenuOpen)}
                                onMouseEnter={() => {
                                    setRegionsMenuOpen(true);
                                    setMegaMenuOpen(false);
                                }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${regionsMenuOpen ? "text-primary bg-primary/5" : "text-secondary hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                Bölgelerimiz
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${regionsMenuOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <Link 
                            href="/hakkimizda" 
                            onMouseEnter={() => { setMegaMenuOpen(false); setRegionsMenuOpen(false); }}
                            className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
                        >
                            Hakkımızda
                        </Link>

                        <Link 
                            href="/blog" 
                            onMouseEnter={() => { setMegaMenuOpen(false); setRegionsMenuOpen(false); }}
                            className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
                        >
                            Blog
                        </Link>

                        <Link 
                            href="/iletisim" 
                            onMouseEnter={() => { setMegaMenuOpen(false); setRegionsMenuOpen(false); }}
                            className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
                        >
                            İletişim
                        </Link>
                    </nav>

                    {/* CTA Button Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Hemen Ara
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-secondary hover:bg-secondary/5 transition-colors"
                        aria-label="Menü"
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
                <div
                    ref={megaMenuRef}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                    className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b-2 border-primary/20 shadow-2xl animate-mega-open z-50"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
                            {ALL_SERVICE_CATEGORIES.map((cat) => (
                                <div key={cat.slug}>
                                    <Link
                                        href={`/hizmetler/${cat.slug}`}
                                        className="text-primary font-bold text-sm mb-3 hover:text-primary-dark transition-colors block"
                                        onClick={() => setMegaMenuOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>
                                    <ul className="space-y-1.5">
                                        {cat.services.slice(0, 6).map((svc) => (
                                            <li key={svc.slug}>
                                                <Link
                                                    href={`/hizmetler/${cat.slug}/${svc.slug}`}
                                                    className="text-sm text-muted hover:text-primary transition-colors block py-0.5"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                >
                                                    {svc.title}
                                                </Link>
                                            </li>
                                        ))}
                                        {cat.services.length > 6 && (
                                            <li>
                                                <Link
                                                    href={`/hizmetler/${cat.slug}`}
                                                    className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1 mt-1"
                                                    onClick={() => setMegaMenuOpen(false)}
                                                >
                                                    Devamını Gör →
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bölgelerimiz Mega Menu Dropdown */}
            {regionsMenuOpen && (
                <div
                    ref={regionsMenuRef}
                    onMouseLeave={() => setRegionsMenuOpen(false)}
                    className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b-2 border-primary/20 shadow-2xl animate-mega-open z-50"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
                            <div>
                                <h3 className="font-bold text-primary border-b pb-2 mb-3">Avrupa Yakası</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <Link href="/istanbul-evde-saglik/besiktas" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Beşiktaş</Link>
                                    <Link href="/istanbul-evde-saglik/sisli" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Şişli</Link>
                                    <Link href="/istanbul-evde-saglik/beyoglu" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Beyoğlu</Link>
                                    <Link href="/istanbul-evde-saglik/bakirkoy" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Bakırköy</Link>
                                    <Link href="/istanbul-evde-saglik/zeytinburnu" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Zeytinburnu</Link>
                                    <Link href="/istanbul-evde-saglik/fatih" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Fatih</Link>
                                    <Link href="/istanbul-evde-saglik/avcilar" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Avcılar</Link>
                                    <Link href="/istanbul-evde-saglik/beylikduzu" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Beylikdüzü</Link>
                                    <Link href="/istanbul-evde-saglik/bahcelievler" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Bahçelievler</Link>
                                    <Link href="/istanbul-evde-saglik" className="text-sm font-semibold text-primary mt-1 hover:underline" onClick={() => setRegionsMenuOpen(false)}>Tümünü Gör →</Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary border-b pb-2 mb-3">Anadolu Yakası</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <Link href="/istanbul-evde-saglik/kadikoy" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Kadıköy</Link>
                                    <Link href="/istanbul-evde-saglik/uskudar" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Üsküdar</Link>
                                    <Link href="/istanbul-evde-saglik/atasehir" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Ataşehir</Link>
                                    <Link href="/istanbul-evde-saglik/maltepe" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Maltepe</Link>
                                    <Link href="/istanbul-evde-saglik/kartal" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Kartal</Link>
                                    <Link href="/istanbul-evde-saglik/pendik" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Pendik</Link>
                                    <Link href="/istanbul-evde-saglik/umraniye" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Ümraniye</Link>
                                    <Link href="/istanbul-evde-saglik/beykoz" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Beykoz</Link>
                                    <Link href="/istanbul-evde-saglik/tuzla" className="text-sm text-secondary hover:text-primary transition-colors" onClick={() => setRegionsMenuOpen(false)}>Tuzla</Link>
                                    <Link href="/istanbul-evde-saglik" className="text-sm font-semibold text-primary mt-1 hover:underline" onClick={() => setRegionsMenuOpen(false)}>Tümünü Gör →</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-border bg-white animate-slide-up max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-3 space-y-1">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
                            Ana Sayfa
                        </Link>

                        {/* Mobile Hizmetler Accordion */}
                        <div>
                            <button
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                            >
                                <span>Hizmetler</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {mobileServicesOpen && (
                                <div className="pl-4 space-y-3 py-2">
                                    {ALL_SERVICE_CATEGORIES.map((cat) => (
                                        <div key={cat.slug}>
                                            <Link href={`/hizmetler/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-primary mb-1 block">
                                                {cat.name}
                                            </Link>
                                            <div className="pl-4 space-y-1">
                                                {cat.services.slice(0, 4).map((svc) => (
                                                    <Link key={svc.slug} href={`/hizmetler/${cat.slug}/${svc.slug}`} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-muted hover:text-primary py-0.5">
                                                        {svc.title}
                                                    </Link>
                                                ))}
                                                {cat.services.length > 4 && (
                                                    <Link href={`/hizmetler/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-xs text-primary font-semibold">
                                                        + {cat.services.length - 4} daha →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Bölgelerimiz Link */}
                        <Link href="/istanbul-evde-saglik" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
                            Bölgelerimiz
                        </Link>

                        <Link href="/hakkimizda" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
                            Hakkımızda
                        </Link>

                        <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
                            Blog
                        </Link>

                        <Link href="/iletisim" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-secondary hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
                            İletişim
                        </Link>

                        <div className="pt-3 border-t border-border">
                            <a
                                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all"
                            >
                                Hemen Ara
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
