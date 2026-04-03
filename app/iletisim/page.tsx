import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";
import LeadForm from "@/components/ui/LeadForm";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
    title: "İletişim | City in Health - Bize Ulaşın",
    description: "City in Health ile iletişime geçin. Telefon, WhatsApp veya form aracılığıyla 7/24 ulaşabilirsiniz. İstanbul genelinde evde sağlık hizmeti.",
    alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
    return (
        <>
            <SchemaMarkup type="MedicalOrganization" pageName="İletişim" pageUrl="https://www.cityinhealth.com/iletisim" />

            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">İletişim</span>
                    </nav>
                </div>
            </div>

            {/* Contact Header */}
            <section className="py-12 bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                        İletişim
                    </h1>
                    <p className="text-lg text-muted max-w-2xl">
                        Sağlık ihtiyaçlarınız için bizimle 7/24 iletişime geçebilirsiniz.
                        Sağlık danışmanlarımız size en uygun hizmet planını oluşturmak için hazır.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Phone */}
                            <div className="bg-white rounded-xl p-6 border border-border card-shadow">
                                <h3 className="font-bold text-secondary mb-3">Telefon</h3>
                                <a
                                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                                    className="text-lg font-semibold text-primary hover:text-primary-dark transition-colors"
                                >
                                    {SITE_CONFIG.phone}
                                </a>
                                <p className="text-sm text-muted mt-2">7/24 ulaşabilirsiniz</p>
                            </div>

                            {/* WhatsApp */}
                            <div className="bg-white rounded-xl p-6 border border-border card-shadow">
                                <h3 className="font-bold text-secondary mb-3">WhatsApp</h3>
                                <a
                                    href={SITE_CONFIG.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-lg font-semibold text-whatsapp hover:text-whatsapp/80 transition-colors"
                                >
                                    WhatsApp ile Yazın
                                </a>
                                <p className="text-sm text-muted mt-2">Hızlı yanıt garantisi</p>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-xl p-6 border border-border card-shadow">
                                <h3 className="font-bold text-secondary mb-3">E-posta</h3>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="text-lg font-semibold text-primary hover:text-primary-dark transition-colors"
                                >
                                    {SITE_CONFIG.email}
                                </a>
                                <p className="text-sm text-muted mt-2">Detaylı bilgi ve randevu talebi</p>
                            </div>

                            {/* Address */}
                            <div className="bg-white rounded-xl p-6 border border-border card-shadow">
                                <h3 className="font-bold text-secondary mb-3">Adres</h3>
                                <p className="text-muted">{SITE_CONFIG.address}</p>
                                <p className="text-sm text-muted mt-2">İstanbul&apos;un 39 ilçesinde hizmet veriyoruz</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl border border-border p-8 card-shadow">
                                <h2 className="text-2xl font-bold text-secondary mb-2">Bize Ulaşın</h2>
                                <p className="text-muted mb-8">Formu doldurun, sağlık danışmanlarımız en kısa sürede sizi arasın.</p>
                                <LeadForm variant="hero" sourcePage="iletisim" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
