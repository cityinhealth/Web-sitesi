import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
    title: "Hakkımızda | City in Health - İstanbul Evde Sağlık Hizmetleri",
    description: "City in Health olarak İstanbul genelinde 15 yılı aşkın deneyimimizle evde sağlık hizmetleri sunuyoruz. Sertifikalı ekibimiz ve profesyonel yaklaşımımızla tanışın.",
    alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
    return (
        <>
            <SchemaMarkup type="MedicalOrganization" pageName="Hakkımızda" pageUrl="https://www.cityinhealth.com/hakkimizda" />

            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">Hakkımızda</span>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <section className="py-12 bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-6">
                                Hakkımızda
                            </h1>
                            <p className="text-lg text-muted leading-relaxed mb-6">
                                City in Health olarak, İstanbul genelinde 15 yılı aşkın süredir profesyonel evde sağlık hizmetleri sunuyoruz.
                                Sertifikalı sağlık ekibimiz ve modern tıbbi ekipmanlarımızla hastalarımızın yaşam kalitesini artırmayı hedefliyoruz.
                            </p>
                            <p className="text-muted leading-relaxed mb-6">
                                Evde serum tedavisinden fizyoterapiye, yaşlı bakımından hemşirelik hizmetlerine kadar geniş bir yelpazede
                                hizmet veren ekibimiz, her hastamıza özel ve dikkatli bir yaklaşım sergilemektedir.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Misyonumuz, sağlık hizmetlerini evinizin konforuna taşıyarak, hastane ortamının stresinden uzak,
                                güvenli ve hijyenik bir tedavi süreci sunmaktır.
                            </p>
                        </div>
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-shadow bg-white">
                            <Image
                                src="/images/teyze.png"
                                alt="City in Health profesyonel sağlık ekibi"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-secondary mb-10 text-center">Değerlerimiz</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Profesyonellik", desc: "Tüm ekibimiz lisanslı, sertifikalı ve minimum 5 yıl deneyimli sağlık profesyonellerinden oluşmaktadır." },
                            { title: "Güvenilirlik", desc: "CE sertifikalı tek kullanımlık malzemeler ve steril uygulama prosedürleri ile hastalarımızın güvenliğini ön planda tutarız." },
                            { title: "Ulaşılabilirlik", desc: "7/24 kesintisiz hizmet anlayışımızla İstanbul'un 39 ilçesinde hastalarımızın yanındayız." },
                            { title: "Empati", desc: "Her hastamızı ailemizin bir ferdi olarak görür, tedavi sürecinde fiziksel ve duygusal destek sağlarız." },
                        ].map((val, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-border card-shadow">
                                <h3 className="text-lg font-bold text-secondary mb-3">{val.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "15+", label: "Yıllık Deneyim" },
                            { value: "39", label: "İlçede Hizmet" },
                            { value: "10.000+", label: "Mutlu Hasta" },
                            { value: "7/24", label: "Kesintisiz Hizmet" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                                <div className="text-sm text-white/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-background">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-secondary mb-4">Hemen İletişime Geçin</h2>
                    <p className="text-muted mb-8">Sağlık ihtiyaçlarınız için profesyonel ekibimiz her zaman yanınızda.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg text-lg">
                            Hemen Ara
                        </a>
                        <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all shadow-lg text-lg">
                            WhatsApp ile Yazın
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
