import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ISTANBUL_DISTRICTS, SERVICE_CATEGORIES, SITE_CONFIG } from "@/lib/data/seed-data";
import LeadForm from "@/components/ui/LeadForm";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export function generateStaticParams() {
    return ISTANBUL_DISTRICTS.map((d) => ({ ilce: d.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ ilce: string }> }): Promise<Metadata> {
    return params.then(({ ilce }) => {
        const district = ISTANBUL_DISTRICTS.find((d) => d.slug === ilce);
        if (!district) return { title: "İlçe Bulunamadı" };
        const title = `${district.district_name} Evde Sağlık Hizmetleri | Evde Serum, Hemşire, Doktor`;
        const desc = `${district.district_name} evde sağlık hizmeti ✓ Evde serum takma ✓ Evde hemşirelik ✓ Yaşlı bakımı ✓ Evde fizyoterapi ✓ Evde doktor. 7/24 ${district.district_name}'de profesyonel sağlık ekibimizle yanınızdayız. Hemen arayın!`;
        return {
            title,
            description: desc,
            alternates: { canonical: `/istanbul-evde-saglik/${ilce}` },
            openGraph: { title, description: desc, url: `/istanbul-evde-saglik/${ilce}` },
        };
    });
}

// Service images mapped to categories for visual richness
const SERVICE_IMAGES: Record<string, string> = {
    "evde-serum-tedavi": "/images/evd-serum.png",
    "evde-hemsirelik": "/images/evde-hemsirelik-hizmetleri.png",
    "evde-yara-bakim": "/images/evde-yara-bakim.png",
    "evde-kan-alma": "/images/evde-kan-tahlili.png",
    "evde-bakim": "/images/evde-bakim-hizmetleri.png",
    "evde-doktor": "/images/evde-doktor-hizmetleri.png",
    "evde-fizik-tedavi": "/images/evde-fizik-tedavi-hizmetleri.png",
};

export default async function DistrictPage({ params }: { params: Promise<{ ilce: string }> }) {
    const { ilce } = await params;
    const district = ISTANBUL_DISTRICTS.find((d) => d.slug === ilce);
    if (!district) notFound();

    const dn = district.district_name; // shorthand

    const faqs = [
        {
            question: `${dn}'de evde sağlık hizmeti alabilir miyim?`,
            answer: `Evet, City In Health olarak ${dn} bölgesinde 7/24 evde sağlık hizmeti sunuyoruz. Evde serum, hemşirelik, fizyoterapi, yaşlı bakımı, doktor muayenesi ve daha birçok hizmetimizle ${dn}'nin her mahallesine ulaşıyoruz.`
        },
        {
            question: `${dn}'de evde serum takma hizmeti var mı?`,
            answer: `Evet, ${dn}'de evde serum takma hizmetimiz mevcuttur. Uzman hemşirelerimiz gerekli tüm steril malzemeleri yanında getirerek evinize gelir. Vitamin serumları, antibiyotik serumları, ozon tedavisi ve daha birçok IV tedavi ${dn}'de uygulanabilmektedir.`
        },
        {
            question: `${dn} evde bakım hizmeti fiyatları nelerdir?`,
            answer: `Fiyatlar hizmet türüne, süresine ve uygulama sıklığına göre değişmektedir. ${dn} için güncel fiyat bilgisi almak için ${SITE_CONFIG.phone} numaralı telefondan bizi arayabilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz. İlk danışmanlık ücretsizdir.`
        },
        {
            question: `${dn}'de evde fizyoterapi yapılıyor mu?`,
            answer: `Evet, ${dn}'de evde fizyoterapi hizmetimiz bulunmaktadır. Ortopedik rehabilitasyon, nörolojik rehabilitasyon (felç sonrası), geriatrik fizyoterapi gibi birçok alanda uzman fizyoterapistlerimiz evinize gelerek tedavi uygular.`
        },
        {
            question: `${dn}'de evde doktor hizmeti mevcut mu?`,
            answer: `Evet, ${dn}'ye evde doktor hizmeti sunuyoruz. Genel muayene, EKG çekimi, reçete yazımı, check-up ve sağlık kontrolü gibi hizmetlerimizle doktorlarımız evinize gelir.`
        },
        {
            question: `${dn}'de evde hemşire hizmeti alabilir miyim?`,
            answer: `Evet, ${dn} bölgesinde evde hemşirelik hizmeti veriyoruz. Serum takma, enjeksiyon, sonda takma, pansuman, tansiyon ve şeker ölçümü gibi tüm hemşirelik hizmetlerini evinizde sunuyoruz.`
        },
        {
            question: `Ekibiniz ${dn}'ye ne kadar sürede ulaşır?`,
            answer: `${dn} bölgesindeki hizmet taleplerinize genellikle 1-3 saat içinde yanıt veriyoruz. Acil durumlar için en kısa sürede ekibimizi yönlendiriyoruz. Randevu planlaması ile istediğiniz saat ve güne göre hizmet alabilirsiniz.`
        },
    ];

    return (
        <>
            <SchemaMarkup type="LocalBusiness" pageName={`${dn} Evde Sağlık`} pageUrl={`https://www.cityinhealth.com/istanbul-evde-saglik/${ilce}`} faqItems={faqs} />

            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary-dark py-14 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                        <span>/</span>
                        <Link href="/istanbul-evde-saglik" className="hover:text-white transition-colors">Bölgelerimiz</Link>
                        <span>/</span>
                        <span className="text-white/80">{dn}</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                            {dn} <span className="text-primary">Evde Sağlık</span> Hizmetleri
                        </h1>
                    </div>
                    <p className="text-lg text-white/70 max-w-3xl mt-4">
                        {dn} ve çevresinde 7/24 profesyonel evde sağlık hizmeti. Evde serum, hemşirelik, yaşlı bakımı, fizyoterapi, yara bakımı ve doktor hizmetleri ile {dn}&apos;de yanınızdayız.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30">
                            📞 Hemen Ara
                        </a>
                        <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all shadow-xl shadow-whatsapp/20">
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2">
                            {/* Services Heading */}
                            <h2 className="text-2xl font-bold text-secondary mb-4">
                                {dn}&apos;de Sunduğumuz Evde Sağlık Hizmetleri
                            </h2>
                            <p className="text-muted leading-relaxed mb-8">
                                City In Health olarak {dn} bölgesinde kapsamlı evde sağlık hizmetleri sunuyoruz. Deneyimli ve sertifikalı sağlık profesyonellerimiz, evinizin konforunda en kaliteli bakımı sağlamak için {dn}&apos;nin her mahallesine ulaşır. Tüm hizmetlerimiz CE sertifikalı tek kullanımlık steril malzemelerle gerçekleştirilir.
                            </p>

                            {/* Services Grid with Images */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                {SERVICE_CATEGORIES.map((cat) => (
                                    <Link key={cat.slug} href={`/hizmetler/${cat.slug}`} className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/20 card-shadow hover:card-shadow-hover transition-all">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                                            <Image
                                                src={SERVICE_IMAGES[cat.slug] || "/images/evde_serum_genel.png"}
                                                alt={`${dn} ${cat.name}`}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{dn} {cat.name}</h3>
                                            <p className="text-xs text-muted mt-0.5">{cat.services.length} farklı hizmet</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Detailed Localized Content - SEO Rich */}
                            <h2 className="text-2xl font-bold text-secondary mb-4">{dn} Evde Sağlık Hizmeti Rehberi</h2>
                            <div className="prose max-w-none text-muted leading-relaxed space-y-4 mb-12">
                                <p>
                                    <strong>{dn}</strong>, İstanbul&apos;un en önemli ilçelerinden biridir. <strong>City In Health</strong> olarak {dn} sakinlerine evde hemşirelik, evde serum takma, yaşlı bakımı, hasta bakımı, evde fizyoterapi ve evde doktor muayenesi gibi geniş kapsamlı sağlık hizmetleri sunuyoruz.
                                </p>
                                <p>
                                    {dn}&apos;de evde sağlık hizmeti almak çok kolay. Tek yapmanız gereken bizi <strong>{SITE_CONFIG.phone}</strong> numaralı telefondan aramak veya WhatsApp üzerinden iletişime geçmektir. Sağlık danışmanlarımız ihtiyacınıza en uygun hizmet planını oluşturacak ve en kısa sürede uzman ekibimizi evinize yönlendirecektir.
                                </p>

                                <h3>Neden {dn}&apos;de City In Health?</h3>
                                <ul>
                                    <li><strong>7/24 Kesintisiz Hizmet:</strong> Hafta sonu ve resmi tatiller dahil her gün {dn}&apos;de hizmetinizdeyiz.</li>
                                    <li><strong>Sertifikalı Ekip:</strong> Tüm sağlık personelimiz lisanslı, sertifikalı ve minimum 5 yıl deneyimlidir.</li>
                                    <li><strong>Steril Malzemeler:</strong> CE sertifikalı, tek kullanımlık steril malzemeler kullanıyoruz.</li>
                                    <li><strong>Hızlı Ulaşım:</strong> {dn}&apos;deki ekibimiz talebinize en kısa sürede yanıt verir.</li>
                                    <li><strong>Şeffaf Fiyatlandırma:</strong> Gizli maliyet yok, hizmet öncesi fiyat bilgisi verilir.</li>
                                </ul>

                                <h3>{dn}&apos;de En Çok Talep Edilen Evde Sağlık Hizmetleri</h3>
                                <p>
                                    {dn} bölgesinde en çok talep edilen hizmetlerimiz arasında <strong>evde serum tedavisi</strong>, <strong>evde kan alma ve tahlil</strong>, <strong>evde pansuman ve yara bakımı</strong>, <strong>yaşlı bakımı</strong> ve <strong>evde fizyoterapi</strong> yer almaktadır. Özellikle kronik hastalık takibi, ameliyat sonrası bakım ve geriatrik hizmetlerde uzmanlaşmış ekibimiz, {dn} halkına en yüksek kalitede hizmet sunmaktadır.
                                </p>

                                <h3>{dn}&apos;de Evde Serum Tedavisi</h3>
                                <p>
                                    {dn} bölgesinde evde serum hizmeti sunuyoruz. Vitamin serumları (C vitamini, B12, Multivitamin), antibiyotik serumları, ozon tedavisi, glutasyon, Myers kokteyli ve daha birçok IV tedaviyi evinizde uyguluyoruz. Tüm serum uygulamaları uzman hemşirelerimiz tarafından steril koşullarda gerçekleştirilir.
                                </p>

                                <h3>{dn}&apos;de Evde Hemşirelik Hizmeti</h3>
                                <p>
                                    {dn} genelinde evde hemşirelik hizmeti kapsamında; enjeksiyon yapılması, serum takılması, sonda takma ve değiştirme, pansuman, tansiyon-şeker ölçümü ve ilaç takibi gibi hizmetler sunulmaktadır. Hemşirelerimiz tüm işlemleri hijyenik ve profesyonel koşullarda gerçekleştirir.
                                </p>
                            </div>

                            {/* FAQ */}
                            <h2 className="text-2xl font-bold text-secondary mb-6">{dn} Evde Sağlık - Sık Sorulan Sorular</h2>
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

                            {/* CTA Banner */}
                            <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/10">
                                <h3 className="text-xl font-bold text-secondary mb-2">{dn}&apos;de Evde Sağlık Hizmeti Almak İster Misiniz?</h3>
                                <p className="text-muted mb-4">Profesyonel ekibimiz {dn} genelinde 7/24 hizmet vermektedir. Ücretsiz danışmanlık için hemen arayın.</p>
                                <div className="flex flex-wrap gap-3">
                                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                        📞 {SITE_CONFIG.phone}
                                    </a>
                                    <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all">
                                        💬 WhatsApp ile Yazın
                                    </a>
                                </div>
                            </div>

                            {/* Nearby Districts */}
                            <h2 className="text-2xl font-bold text-secondary mb-6 mt-12">Yakın İlçelerde Evde Sağlık</h2>
                            <p className="text-sm text-muted mb-4">{dn} dışındaki ilçelerimizde de 7/24 evde sağlık hizmeti sunuyoruz.</p>
                            <div className="flex flex-wrap gap-2">
                                {ISTANBUL_DISTRICTS.filter((d) => d.slug !== ilce).slice(0, 15).map((d) => (
                                    <Link key={d.slug} href={`/istanbul-evde-saglik/${d.slug}`} className="px-4 py-2 bg-white rounded-lg border border-border text-sm text-secondary hover:text-primary hover:border-primary/20 transition-all card-shadow">
                                        {d.district_name}
                                    </Link>
                                ))}
                                <Link href="/istanbul-evde-saglik" className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 text-sm text-primary font-semibold hover:bg-primary/20 transition-all">
                                    Tüm 39 İlçe →
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                <LeadForm variant="sidebar" sourcePage={`district-${ilce}`} />
                                <div className="bg-secondary rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-bold mb-3">📍 {dn} Evde Sağlık</h3>
                                    <p className="text-sm text-white/60 mb-4">{dn}&apos;de 7/24 evde sağlık hizmeti için hemen arayın.</p>
                                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all">
                                        📞 {SITE_CONFIG.phone}
                                    </a>
                                    <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all mt-3">
                                        💬 WhatsApp ile Yazın
                                    </a>
                                </div>

                                {/* Quick Service Links */}
                                <div className="bg-white rounded-xl p-5 border border-border card-shadow">
                                    <h3 className="font-bold text-secondary mb-3">🏥 {dn} Hizmetlerimiz</h3>
                                    <div className="space-y-2">
                                        {SERVICE_CATEGORIES.map((cat) => (
                                            <Link key={cat.slug} href={`/hizmetler/${cat.slug}`} className="block text-sm text-muted hover:text-primary transition-colors py-1">
                                                → {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
