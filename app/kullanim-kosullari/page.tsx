import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | City in Health",
    description: "City in Health web sitesi kullanım koşulları. Site kullanımıyla ilgili kurallar, sorumluluklar ve yasal bilgiler.",
    alternates: { canonical: "/kullanim-kosullari" },
};

export default function KullanimKosullariPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">Kullanım Koşulları</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-8">
                        Kullanım Koşulları
                    </h1>

                    <div className="prose max-w-none">
                        <p className="text-sm text-muted mb-6"><strong>Son Güncelleme:</strong> 18 Mart 2026</p>

                        <p>
                            {SITE_CONFIG.name} web sitesini (&quot;Site&quot;) kullanarak aşağıdaki koşulları 
                            kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.
                        </p>

                        <h2>1. Hizmet Tanımı</h2>
                        <p>
                            {SITE_CONFIG.name}, İstanbul genelinde evde sağlık hizmetleri sunan bir sağlık 
                            kuruluşudur. Web sitemiz, sunduğumuz hizmetler hakkında bilgi vermek, hasta 
                            adaylarıyla iletişim kurmak ve sağlık ile ilgili bilgilendirici içerikler paylaşmak 
                            amacıyla faaliyet göstermektedir.
                        </p>

                        <h2>2. Site Kullanımı</h2>
                        <ul>
                            <li>Siteyi yalnızca yasal amaçlarla ve bu koşullara uygun şekilde kullanabilirsiniz.</li>
                            <li>Sitedeki içerikleri izinsiz olarak kopyalayamaz, çoğaltamaz veya dağıtamazsınız.</li>
                            <li>Siteye zarar verecek, siteyi devre dışı bırakacak veya aşırı yüklenecek herhangi bir işlem yapamazsınız.</li>
                            <li>İletişim formlarında doğru ve eksiksiz bilgi sağlamak sizin sorumluluğunuzdadır.</li>
                        </ul>

                        <h2>3. Sağlık Bilgilendirmesi</h2>
                        <p>
                            Web sitemizde yer alan sağlık ile ilgili içerikler yalnızca bilgilendirme amaçlıdır 
                            ve profesyonel tıbbi tavsiye, teşhis veya tedavi yerine geçmez. Herhangi bir sağlık 
                            sorunu yaşadığınızda mutlaka nitelikli bir sağlık profesyoneline başvurunuz.
                        </p>

                        <h2>4. Fikri Mülkiyet Hakları</h2>
                        <p>
                            Bu sitedeki tüm içerikler (metin, görsel, logo, tasarım vb.) {SITE_CONFIG.name}&apos;e 
                            aittir veya lisanslıdır. Telif hakkı yasaları ile korunmaktadır. İçeriklerin izinsiz 
                            kullanımı yasal işlem başlatılmasına sebep olabilir.
                        </p>

                        <h2>5. İletişim Formu ve Randevu</h2>
                        <p>
                            Web sitemizdeki iletişim formunu doldurmanız, otomatik olarak hizmet sözleşmesi 
                            oluşturmaz. Form gönderimi, talebinizin değerlendirilmesi sürecini başlatır. 
                            Hizmet sözleşmesi, tarafların karşılıklı anlaşması ile oluşur.
                        </p>

                        <h2>6. Sorumluluk Sınırlandırması</h2>
                        <ul>
                            <li>{SITE_CONFIG.name}, sitede yer alan bilgilerin her zaman doğru, eksiksiz ve güncel olacağını garanti etmez.</li>
                            <li>Sitedeki dış bağlantılardan (varsa) sorumlu değiliz.</li>
                            <li>Teknik aksaklıklardan kaynaklanan zararlardan sorumlu tutulamayız.</li>
                        </ul>

                        <h2>7. Değişiklikler</h2>
                        <p>
                            Bu kullanım koşullarını herhangi bir zamanda güncelleme hakkını saklı tutarız. 
                            Değişiklikler bu sayfada yayınlandığı tarihten itibaren geçerlidir.
                        </p>

                        <h2>8. Uygulanacak Hukuk</h2>
                        <p>
                            Bu kullanım koşulları Türkiye Cumhuriyeti kanunlarına tabi olup, uyuşmazlıklarda 
                            İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                        </p>

                        <h2>9. İletişim</h2>
                        <p>Kullanım koşullarıyla ilgili sorularınız için:</p>
                        <ul>
                            <li><strong>E-posta:</strong> {SITE_CONFIG.email}</li>
                            <li><strong>Telefon:</strong> {SITE_CONFIG.phone}</li>
                            <li><strong>Adres:</strong> {SITE_CONFIG.address}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
