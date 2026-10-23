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
                            alt="City in Health Logo"
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
                        {/* Sosyal medya hesaplarınız olduğunda buraya ekleyin */}
                    </div>
                </div>

                {/* Popular Serum Treatments & Guides SEO Internal Linking */}
                <div className="border-t border-white/10 mt-12 pt-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3">
                                Popüler Serum Tedavileri (İstanbul 7/24)
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
                                <Link href="/hizmetler/evde-serum-tedavi/demir-eksikligi-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Evde Demir Eksikliği Serumu
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/vitamin-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Evde Vitamin Serum Tedavisi
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/glutatyon-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Glutatyon Serum Tedavisi
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/ozon-tedavisi" className="hover:text-primary-light transition-colors">
                                    Evde Ozon Tedavisi
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/myers-kokteyli-tedavisi" className="hover:text-primary-light transition-colors">
                                    Myers Kokteyli (Atom Serum)
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/nad-plus-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    NAD+ Hücresel Serum
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/b12-vitamin-metilkobalamin-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    B12 Vitamini Serumu
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/biotin-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Biotin Saç Serumu
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/alfa-lipoik-asit-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Alfa Lipoik Asit (ALA)
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/b1-vitamin-thiamine-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    B1 Vitamini (Tiamin) Serumu
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/cinko-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Çinko Serumu
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-serum-tedavi/multivitamin-serum-tedavisi" className="hover:text-primary-light transition-colors">
                                    Multivitamin (Todavit) Serumu
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3">
                                Sağlık Rehberi & Öne Çıkan Başlıklar
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
                                <Link href="/blog/zor-damara-evde-serum" className="hover:text-primary-light transition-colors">
                                    Zor Damarlı Hastaya Evde Serum Nasıl Takılır?
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/blog/yuksek-tansiyon-evde-ne-yapmali" className="hover:text-primary-light transition-colors">
                                    Yüksek Tansiyon Krizinde Evde Ne Yapmalı?
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-hemsirelik" className="hover:text-primary-light transition-colors">
                                    Evde Hemşirelik Hizmetleri
                                </Link>
                                <span className="text-white/20">•</span>
                                <Link href="/hizmetler/evde-doktor" className="hover:text-primary-light transition-colors">
                                    Evde Doktor Muayenesi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} City in Health. Tüm hakları saklıdır.
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
