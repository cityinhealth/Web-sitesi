import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, SERVICE_CATEGORIES, ISTANBUL_DISTRICTS } from "@/lib/data/seed-data";

export default function Footer() {
    const popularDistricts = ISTANBUL_DISTRICTS.filter((d) =>
        ["kadikoy", "besiktas", "uskudar", "bakirkoy", "sisli", "atasehir", "pendik", "maltepe"].includes(d.slug)
    );

    return (
        <footer className="bg-secondary text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Image
                            src="/images/logo.png"
                            alt="City In Health Logo"
                            width={180}
                            height={56}
                            className="h-12 w-auto object-contain brightness-0 invert mb-4"
                        />
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            İstanbul genelinde 7/24 profesyonel evde sağlık ve bakım hizmetleri. Sağlığınız bizim önceliğimiz.
                        </p>
                        <div className="space-y-2 text-sm">
                            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {SITE_CONFIG.phone}
                            </a>
                            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {SITE_CONFIG.email}
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
                            Hizmetlerimiz
                        </h3>
                        <ul className="space-y-2">
                            {SERVICE_CATEGORIES.map((cat) => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/hizmetler/${cat.slug}`}
                                        className="text-sm text-white/60 hover:text-primary-light transition-colors"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
                            Hizmet Bölgeleri
                        </h3>
                        <ul className="space-y-2">
                            {popularDistricts.map((d) => (
                                <li key={d.slug}>
                                    <Link
                                        href={`/istanbul-evde-saglik/${d.slug}`}
                                        className="text-sm text-white/60 hover:text-primary-light transition-colors"
                                    >
                                        {d.district_name} Evde Sağlık
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/istanbul-evde-saglik"
                                    className="text-sm text-primary-light hover:text-primary transition-colors font-medium"
                                >
                                    Tüm İlçeler →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
                            Hızlı Erişim
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm text-white/60 hover:text-primary-light transition-colors">Ana Sayfa</Link></li>
                            <li><Link href="/hakkimizda" className="text-sm text-white/60 hover:text-primary-light transition-colors">Hakkımızda</Link></li>
                            <li><Link href="/blog" className="text-sm text-white/60 hover:text-primary-light transition-colors">Blog & Rehber</Link></li>
                            <li><Link href="/iletisim" className="text-sm text-white/60 hover:text-primary-light transition-colors">İletişim</Link></li>
                        </ul>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mt-6 mb-4">
                            Bizi Takip Edin
                        </h3>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} City In Health. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                        <Link href="/gizlilik-politikasi" className="hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/kullanim-kosullari" className="hover:text-white/60 transition-colors">Kullanım Koşulları</Link>
                        <Link href="/kvkk" className="hover:text-white/60 transition-colors">KVKK</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
