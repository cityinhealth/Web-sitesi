import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES, ISTANBUL_DISTRICTS, SITE_CONFIG } from "@/lib/data/seed-data";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export function generateStaticParams() {
    return SERVICE_CATEGORIES.map((cat) => ({
        category: cat.slug,
    }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    return params.then(({ category }) => {
        const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
        if (!cat) return { title: "Hizmet Bulunamadı" };
        return {
            title: cat.meta_title || `${cat.name} | İstanbul Evde Sağlık`,
            description: cat.meta_description || cat.description,
            alternates: { canonical: `/hizmetler/${cat.slug}` },
            openGraph: {
                title: cat.meta_title || cat.name,
                description: cat.description || undefined,
                url: `/hizmetler/${cat.slug}`,
            },
        };
    });
}

function ServiceCard({
    service,
    catSlug,
    coverImage,
    index,
}: {
    service: { title: string; slug: string; short_description: string; cover_image?: string };
    catSlug: string;
    coverImage: string;
    index: number;
}) {
    const imgSrc = service.cover_image || coverImage;
    return (
        <Link
            href={`/hizmetler/${catSlug}/${service.slug}`}
            className="group bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden hover:border-primary/20 flex flex-col min-w-0"
        >
            <div className="relative w-full overflow-hidden bg-background-alt">
                <Image
                    src={imgSrc}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                />
            </div>
            <div className="p-2 sm:p-3 flex flex-col flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-secondary mb-1 group-hover:text-primary transition-colors line-clamp-2 break-words">
                    {service.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted leading-relaxed mb-1.5 line-clamp-2 break-words">
                    {service.short_description}
                </p>
                <span className="text-primary font-semibold text-[11px] sm:text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detaylı Bilgi →
                </span>
            </div>
        </Link>
    );
}

const SERUM_FAQS = [
    {
        question: "Evde serum takma hizmeti nedir ve nasıl alınır?",
        answer: "Evde serum takma hizmeti; hastaneye gitmeye gerek kalmadan, uzman hemşirelerimizin evinize veya iş yerinize gelerek reçeteli ya da destekleyici serum tedavilerini steril koşullarda damar yoluyla uygulamasıdır. Telefonla arayarak veya WhatsApp hattımızdan konum paylaşarak 30-60 dakika içinde mobil hemşire çağırabilirsiniz.",
    },
    {
        question: "Evde serum fiyatları ne kadar?",
        answer: "Evde serum fiyatları hastanın ihtiyacı olan serum içeriğine (atom/sarı serum, ağrı kesici ve bulantı serumu, vitamin ve mineral takviyesi, glutatyon, ozon, demir veya antibiyotik) ve lokasyona göre belirlenir. Şeffaf fiyatlandırma politikamız gereği randevu öncesinde net fiyat bilgisi verilir, sürpriz ek ücret talep edilmez.",
    },
    {
        question: "Evde atom serum (sarı serum) nedir, ne işe yarar?",
        answer: "Halk arasında sarı serum olarak bilinen atom serum; yüksek doz C vitamini, B grubu vitaminler (B1, B6, B12), magnezyum ve hastanın şikayetine göre eklenen mide koruyucu/ağrı kesici bileşenlerin dengeli bir izotonik solüsyonda birleştirilmesidir. Grip, soğuk algınlığı, ağır halsizlik ve bitkinlikte vücut direncini çok hızlı toparlar.",
    },
    {
        question: "Evde serum taktırmak için reçete gerekli mi?",
        answer: "Antibiyotik, kemoterapi destek ve bazı medikal ilaç infüzyonları için hekim reçetesi zorunludur. Ancak dehidrasyon (sıvı kaybı) giderici elektrolit serumlar, bağışıklık güçlendirici vitamin ve multivitamin serumları uzman sağlık danışmanlarımızın değerlendirmesiyle reçetesiz olarak da güvenle uygulanabilir.",
    },
    {
        question: "İstanbul'un her ilçesine eve hemşire geliyor mu?",
        answer: "Evet, City in Health olarak İstanbul'un 39 ilçesinde (Kadıköy, Beşiktaş, Şişli, Çekmeköy, Ümraniye, Bakırköy, Beylikdüzü, Pendik vb.) mobil sağlık ekiplerimizle haftanın 7 günü 24 saat kesintisiz evde serum takma hizmeti sunmaktayız.",
    },
    {
        question: "Evde serum uygulaması ne kadar sürer?",
        answer: "Damar yolunun açılması ve serumun infüzyon hızı hastanın damar yapısına ve serumun türüne göre değişir. Standart bir vitamin veya atom serum uygulaması ortalama 30 ile 50 dakika arasında tamamlanır. Hemşiremiz işlem bitene kadar hastanın yanında kalarak tansiyon ve nabız takibi yapar.",
    },
];

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
    if (!cat) notFound();

    const isSerum = cat.slug === "evde-serum-tedavi";
    const coverImage = cat.cover_image || "/images/evde_serum.png";
    const allServices = cat.services as { title: string; slug: string; short_description: string; cover_image?: string }[];

    return (
        <>
            <SchemaMarkup
                type="MedicalOrganization"
                pageName={cat.name}
                pageDescription={cat.description || undefined}
                pageUrl={`https://www.cityinhealth.com/hizmetler/${cat.slug}`}
                faqItems={isSerum ? SERUM_FAQS : undefined}
                breadcrumbs={[
                    { name: "Ana Sayfa", url: "/" },
                    { name: "Hizmetlerimiz", url: "/#hizmetler" },
                    { name: cat.name, url: `/hizmetler/${cat.slug}` },
                ]}
            />

            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">{cat.name}</span>
                    </nav>
                </div>
            </div>

            {/* Category Title */}
            <section className="py-8 sm:py-10 bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary mb-3 text-center">
                        {isSerum ? "İstanbul 7/24 Evde Serum Takma ve Tedavi Hizmetleri" : cat.name}
                    </h1>
                    <p className="text-sm sm:text-base text-muted text-center max-w-3xl mx-auto leading-relaxed">
                        {isSerum 
                            ? "İstanbul'un 39 ilçesinde 30-60 dakika içinde kapınızda! Atom serum, sarı serum, ağrı kesici ve vitamin serumları uzman hemşirelerimiz tarafından evinizin konforunda uygulanır."
                            : cat.description}
                    </p>
                    {isSerum && (
                        <div className="flex justify-center gap-3 mt-6">
                            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
                                📞 Hemen Serum Çağır ({SITE_CONFIG.phone})
                            </a>
                            <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all shadow-lg shadow-whatsapp/20">
                                💬 WhatsApp ile Yazın
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Services - Full Width Grid */}
            <section className="py-8 sm:py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                            {isSerum ? "Evde Uyguladığımız Serum Tedavisi Çeşitleri" : `${cat.name} Kapsamındaki Hizmetlerimiz`}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted mt-1">İhtiyacınıza uygun serumu seçerek detaylı bilgi ve randevu alabilirsiniz.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {allServices.map((service, index) => (
                            <ServiceCard
                                key={service.slug}
                                service={service}
                                catSlug={cat.slug}
                                coverImage={coverImage}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Comprehensive SEO Content for Evde Serum */}
            {isSerum ? (
                <section className="py-12 sm:py-16 bg-white border-t border-border">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary mb-6">
                            İstanbul Evde Serum Takma Hizmeti: Neden ve Nasıl Tercih Edilmelidir?
                        </h2>
                        
                        <div className="prose prose-blue max-w-none text-muted space-y-4 leading-relaxed">
                            <p>
                                Günümüzün yoğun temposunda veya beklenmeyen hastalık durumlarında hastane acil servislerinde saatlerce beklemek, bağışıklığı zayıflamış hastalar için hem yorucu hem de enfeksiyon riski taşır. <strong>City in Health</strong> olarak geliştirdiğimiz <strong>7/24 İstanbul evde serum hizmeti</strong> ile hastane standartlarındaki serum tedavisini evinizin huzuruna getiriyoruz.
                            </p>

                            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">Hangi Durumlarda Evde Serum Takılır?</h3>
                            <ul>
                                <li><strong>Grip, Nezle ve Soğuk Algınlığı:</strong> Şiddetli halsizlik, eklem ağrısı ve ateşle seyreden viral enfeksiyonlarda hızlı toparlanma sağlayan atom serum infüzyonları.</li>
                                <li><strong>Mide Bulantısı, Kusma ve Sıvı Kaybı:</strong> Gıda zehirlenmesi, rota virüsü veya ishal kaynaklı dehidrasyon durumlarında damar içi elektrolit desteği.</li>
                                <li><strong>Kronik Yorgunluk ve Tükenmişlik Sendromu:</strong> Yoğun iş temposu veya sınav dönemlerinde vücut direncini artıran Myers kokteyli ve B-kompleks serumları.</li>
                                <li><strong>Demir Eksikliği Anemisi:</strong> Oral demir haplarının mideye dokunduğu durumlarda tek seansta depoları dolduran IV demir infüzyonları.</li>
                                <li><strong>Detoks ve Anti-Aging İhtiyaçları:</strong> Karaciğer arındırması ve hücresel gençleşme sağlayan Glutatyon, Ozon ve Alfa Lipoik Asit kürleri.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">3 Adımda Evde Serum Süreci</h3>
                            <ol>
                                <li><strong>Çağrı ve Triyaj:</strong> Telefon veya WhatsApp ile şikayetinizi belirtirsiniz; sağlık danışmanlarımız size en uygun serum planını oluşturur.</li>
                                <li><strong>Hızlı Hemşire Ulaşımı:</strong> İstanbul genelindeki mobil hemşire ağımız sayesinde 30-60 dakika içerisinde adresinize gelinir.</li>
                                <li><strong>Steril Uygulama ve Takip:</strong> CE sertifikalı tek kullanımlık malzemelerle damar yolu açılarak serum başlatılır; vital bulgularınız kontrol edilerek işlem güvenle tamamlanır.</li>
                            </ol>
                        </div>

                        {/* District Links for Local SEO */}
                        <div className="mt-12 p-6 bg-background-alt rounded-2xl border border-border">
                            <h3 className="text-lg font-bold text-secondary mb-2">📍 İstanbul&apos;un 39 İlçesinde Evde Serum Hizmeti</h3>
                            <p className="text-xs text-muted mb-4">Aşağıdan ilçenizi seçerek size en yakın evde serum ekibimizin detaylarını görüntüleyebilirsiniz:</p>
                            <div className="flex flex-wrap gap-2">
                                {ISTANBUL_DISTRICTS.map((d) => (
                                    <Link 
                                        key={d.slug} 
                                        href={`/istanbul-evde-saglik/${d.slug}`}
                                        className="px-3 py-1.5 bg-white rounded-lg border border-border text-xs text-secondary hover:text-primary hover:border-primary/30 transition-all card-shadow"
                                    >
                                        {d.district_name} Evde Serum
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* FAQs Section */}
                        <div className="mt-14">
                            <h2 className="text-2xl font-bold text-secondary mb-6">Evde Serum Hakkında Sıkça Sorulan Sorular</h2>
                            <div className="space-y-4">
                                {SERUM_FAQS.map((faq, i) => (
                                    <details key={i} className="group bg-white rounded-xl border border-border p-5 card-shadow">
                                        <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-secondary">
                                            <span>{faq.question}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </summary>
                                        <p className="mt-3 text-sm text-muted leading-relaxed">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="mt-12 p-8 bg-gradient-to-r from-secondary to-secondary-dark rounded-2xl text-white text-center">
                            <h3 className="text-2xl font-extrabold mb-3">Hemen Evde Serum Randevusu Alın</h3>
                            <p className="text-sm text-white/80 max-w-xl mx-auto mb-6">İstanbul genelinde 7/24 uzman mobil sağlık ekibimiz kapınıza gelsin. Ağrısız ve hijyenik serum tedavisi için bizi arayın.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm">
                                    📞 {SITE_CONFIG.phone} Hemen Ara
                                </a>
                                <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all text-sm">
                                    💬 WhatsApp ile Yazın
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                /* Fallback SEO Content Block for other categories */
                <section className="py-12 sm:py-16 bg-white border-t border-border">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-secondary mb-6">İstanbul {cat.name} Çözümleri</h2>
                        <div className="prose prose-blue max-w-none text-muted">
                            <p>
                                City in Health olarak, İstanbul'un 39 ilçesinde 7/24 kesintisiz <strong>{cat.name.toLowerCase()}</strong> sunuyoruz. 
                                Uzman ve sertifikalı sağlık kadromuz, evinize kadar gelerek hastane konforunu ve güvenliğini yaşam alanınıza taşır.
                            </p>
                            <p className="mt-4">
                                {cat.description}
                            </p>
                            <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                            <ul>
                                <li><strong>Hızlı ve Güvenilir:</strong> Çağrınızdan itibaren en kısa sürede adresinize ulaşıyoruz.</li>
                                <li><strong>Sertifikalı Personel:</strong> Tüm işlemler alanında uzman hekim ve hemşireler tarafından uygulanır.</li>
                                <li><strong>Steril Malzemeler:</strong> Uygulamalarda CE sertifikalı, tek kullanımlık steril medikal ürünler kullanılır.</li>
                                <li><strong>7/24 Ulaşılabilirlik:</strong> Hafta sonları ve resmi tatiller dahil kesintisiz hizmet.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
