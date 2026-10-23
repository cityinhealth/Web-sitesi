import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES, SITE_CONFIG, ISTANBUL_DISTRICTS } from "@/lib/data/seed-data";
import { ALL_BLOG_POSTS } from "@/lib/data/all-blog-posts";
import LeadForm from "@/components/ui/LeadForm";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export function generateStaticParams() {
    const params: { category: string; service: string }[] = [];
    SERVICE_CATEGORIES.forEach((cat) => {
        cat.services.forEach((svc) => {
            params.push({ category: cat.slug, service: svc.slug });
        });
    });
    return params;
}

export function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
    return params.then(({ category, service }) => {
        const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
        const svc = cat?.services.find((s) => s.slug === service);
        if (!svc) return { title: "Hizmet Bulunamadı" };
        const title = svc.meta_title || `${svc.title} | İstanbul Evde Sağlık`;
        const description = svc.meta_description || `${svc.title} hizmeti İstanbul'un 39 ilçesinde 7/24. ${svc.short_description} Profesyonel ekibimizle evinizde güvenli sağlık hizmeti. Hemen arayın!`;
        return {
            title,
            description,
            alternates: { canonical: `/hizmetler/${category}/${service}` },
            openGraph: { title, description, url: `/hizmetler/${category}/${service}` },
        };
    });
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
    const { category, service } = await params;
    const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
    const svc = cat?.services.find((s) => s.slug === service);
    if (!cat || !svc) notFound();

    const coverImage = (svc as { cover_image?: string }).cover_image || cat.cover_image || "/images/evde_serum.png";
    const contentHtml = (svc as { content_html?: string }).content_html || "";

    const faqs = [
        { question: `${svc.title} hizmeti nasıl çalışır?`, answer: `Randevu aldıktan sonra uzman ekibimiz belirlenen saatte evinize gelir ve ${svc.title.toLowerCase()} hizmetini gerçekleştirir. Tüm işlemler CE sertifikalı tek kullanımlık steril malzemelerle, hijyenik koşullarda yapılır. Hizmet öncesi detaylı bilgilendirme yapılır.` },
        { question: `${svc.title} fiyatları nedir?`, answer: `Fiyatlarımız hizmetin kapsamına, seans sayısına ve lokasyona göre değişmektedir. Güncel fiyat bilgisi ve ücretsiz danışmanlık için ${SITE_CONFIG.phone} numaralı telefondan veya WhatsApp üzerinden bize ulaşabilirsiniz.` },
        { question: `${svc.title} hangi ilçelerde sunuluyor?`, answer: `İstanbul'un 39 ilçesinin tamamında 7/24 ${svc.title.toLowerCase()} hizmeti veriyoruz. Avrupa ve Anadolu yakasındaki tüm lokasyonlara ulaşıyoruz.` },
        { question: `Ekibinizin nitelikleri nelerdir?`, answer: `Tüm personelimiz lisanslı, sertifikalı ve en az 5 yıl deneyimli sağlık profesyonelleridir. Düzenli eğitim programları ile bilgi ve becerilerini güncel tutarlar. Hasta güvenliği ve memnuniyeti en önemli önceliğimizdir.` },
        { question: `${svc.title} için randevu nasıl alırım?`, answer: `${SITE_CONFIG.phone} numaralı telefondan arayarak veya WhatsApp üzerinden mesaj göndererek randevu alabilirsiniz. Ayrıca web sitemizdeki iletişim formunu doldurarak da talepte bulunabilirsiniz. Sağlık danışmanlarımız en kısa sürede sizinle iletişime geçecektir.` },
    ];

    const categoryServices = cat.services;

    // Find related blog posts based on category name keywords
    const categoryKeywords = cat.name.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const serviceKeywords = svc.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const allKeywords = [...new Set([...categoryKeywords, ...serviceKeywords])];
    const relatedPosts = ALL_BLOG_POSTS
        .filter(post => {
            const titleLower = post.title.toLowerCase();
            const excerptLower = post.excerpt.toLowerCase();
            return allKeywords.some(kw => titleLower.includes(kw) || excerptLower.includes(kw));
        })
        .slice(0, 3);

    // Pick 8 random districts for cross-linking
    const popularDistricts = ISTANBUL_DISTRICTS
        .filter((_, i) => i % 5 === 0 || i < 8)
        .slice(0, 8);

    return (
        <>
            <SchemaMarkup 
                type="MedicalOrganization" 
                pageName={svc.title} 
                pageUrl={`https://www.cityinhealth.com/hizmetler/${category}/${service}`} 
                faqItems={faqs} 
                breadcrumbs={[
                    { name: "Ana Sayfa", url: "/" },
                    { name: cat.name, url: `/hizmetler/${cat.slug}` },
                    { name: svc.title, url: `/hizmetler/${cat.slug}/${svc.slug}` },
                ]}
            />
            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted flex-wrap">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <Link href={`/hizmetler/${cat.slug}`} className="hover:text-primary transition-colors">{cat.name}</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">{svc.title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-10 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2">
                            {/* Top Section: Photo + Title side by side like reference */}
                            <div className="flex flex-col md:flex-row gap-6 mb-8">
                                {/* Photo - shown fully, no cropping */}
                                <div className="flex-shrink-0 w-full md:w-[280px]">
                                    <div className="rounded-xl overflow-hidden card-shadow bg-white">
                                        <Image
                                            src={coverImage}
                                            alt={`${svc.title} İstanbul | City in Health`}
                                            width={280}
                                            height={210}
                                            className="w-full h-auto"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 280px"
                                        />
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div className="flex-1">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary mb-4 leading-tight">
                                        {svc.title}
                                    </h1>
                                    <p className="text-muted leading-relaxed mb-4">
                                        {svc.short_description}
                                    </p>

                                    <p className="text-sm text-muted mb-6">
                                        Kategori: <Link href={`/hizmetler/${cat.slug}`} className="text-primary font-semibold hover:text-primary-dark transition-colors">{cat.name}</Link>
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary-dark transition-all text-sm uppercase tracking-wide">
                                            Şimdi Ara
                                        </a>
                                        <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border-2 border-whatsapp text-whatsapp font-bold rounded-lg hover:bg-whatsapp hover:text-white transition-all text-sm uppercase tracking-wide">
                                            WhatsApp İletişim
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Content */}
                            {contentHtml ? (
                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-secondary mb-4">{svc.title} Hakkında</h2>
                                    <p className="text-muted leading-relaxed mb-4">{svc.meta_description || svc.short_description}</p>
                                    <p className="text-muted leading-relaxed mb-8">City in Health olarak, {svc.title.toLowerCase()} hizmetini İstanbul&apos;un 39 ilçesinde, sertifikalı sağlık profesyonellerimizle sunuyoruz.</p>
                                </>
                            )}

                            {/* Why Us */}
                            <div className="mt-12 bg-background-alt rounded-2xl p-8 border border-border">
                                <h3 className="text-xl font-bold text-secondary mb-6">
                                    Neden City in Health?
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Sertifikalı ve 5+ yıl deneyimli profesyoneller",
                                        "7/24 randevu imkanı, tatil günleri dahil",
                                        "İstanbul 39 ilçede kapsamlı hizmet ağı",
                                        "CE sertifikalı tek kullanımlık steril malzemeler",
                                        "Hasta memnuniyet takip sistemi",
                                        "Şeffaf ve uygun fiyat politikası",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            <span className="text-sm text-muted">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ */}
                            <h2 className="text-2xl font-bold text-secondary mb-6 mt-12">Sık Sorulan Sorular</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <details key={i} className="group bg-white rounded-xl border border-border p-5 card-shadow">
                                        <summary className="flex items-center justify-between cursor-pointer list-none">
                                            <h3 className="text-base font-semibold text-secondary pr-4">{faq.question}</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </summary>
                                        <p className="mt-3 text-sm text-muted leading-relaxed">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>

                            {/* Related Blog Posts - SEO Internal Linking */}
                            {relatedPosts.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-secondary mb-6">İlgili Blog Yazıları</h2>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {relatedPosts.map((post) => (
                                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-border p-4 card-shadow hover:card-shadow-hover transition-all hover:-translate-y-0.5">
                                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
                                                <h3 className="text-sm font-bold text-secondary mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                                <p className="text-xs text-muted line-clamp-2">{post.excerpt}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* District Cross-Links - SEO Geographic Linking */}
                            <div className="mt-12">
                                <h2 className="text-xl font-bold text-secondary mb-4">Bu Hizmeti Sunduğumuz Popüler İlçeler</h2>
                                <p className="text-sm text-muted mb-4">{svc.title} hizmetimizi İstanbul&apos;un 39 ilçesinde sunuyoruz.</p>
                                <div className="flex flex-wrap gap-2">
                                    {popularDistricts.map((d) => (
                                        <Link key={d.slug} href={`/istanbul-evde-saglik/${d.slug}`} className="px-3 py-1.5 bg-white rounded-lg border border-border text-xs text-secondary hover:text-primary hover:border-primary/20 transition-all card-shadow">
                                            {d.district_name}
                                        </Link>
                                    ))}
                                    <Link href="/istanbul-evde-saglik" className="px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20 text-xs text-primary font-semibold hover:bg-primary/20 transition-all">
                                        Tüm 39 İlçe →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-white rounded-xl border border-border p-5 card-shadow">
                                    <h3 className="font-bold text-secondary mb-4">
                                        {cat.name}
                                    </h3>
                                    <nav className="space-y-1">
                                        {categoryServices.map((s) => {
                                            const isActive = s.slug === svc.slug;
                                            return (
                                                <Link
                                                    key={s.slug}
                                                    href={`/hizmetler/${cat.slug}/${s.slug}`}
                                                    className={`block px-3 py-2 text-sm rounded-lg transition-all ${isActive
                                                        ? "bg-primary text-white font-semibold"
                                                        : "text-muted hover:text-primary hover:bg-primary/5"
                                                        }`}
                                                >
                                                    {s.title}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>

                                <LeadForm variant="sidebar" sourcePage={`service-${svc.slug}`} />

                                <div className="bg-secondary rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-bold mb-3">Hızlı İletişim</h3>
                                    <p className="text-sm text-white/60 mb-4">Hemen arayın, size en uygun planı oluşturalım.</p>
                                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all">
                                        {SITE_CONFIG.phone}
                                    </a>
                                    <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all mt-3">
                                        WhatsApp ile Yazın
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-secondary to-secondary-dark relative overflow-hidden">
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">{svc.title} İçin Hemen Arayın</h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Profesyonel sağlık ekibimiz evinizin konforunda size en kaliteli {svc.title.toLowerCase()} hizmetini sunmak için hazır.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl hover:scale-[1.02] text-lg">
                            {SITE_CONFIG.phone}
                        </a>
                        <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all shadow-xl hover:scale-[1.02] text-lg">
                            WhatsApp ile Yazın
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
