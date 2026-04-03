import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | City in Health",
    description: "City in Health gizlilik politikası. Kişisel bilgilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgi.",
    alternates: { canonical: "/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">Gizlilik Politikası</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-8">
                        Gizlilik Politikası
                    </h1>

                    <div className="prose max-w-none">
                        <p className="text-sm text-muted mb-6"><strong>Son Güncelleme:</strong> 18 Mart 2026</p>

                        <p>
                            {SITE_CONFIG.name} olarak, gizliliğinize saygı duyuyor ve kişisel verilerinizin 
                            korunmasını en önemli sorumluluklarımızdan biri olarak kabul ediyoruz. Bu gizlilik 
                            politikası, web sitemizi kullanırken toplanan bilgilerin nasıl kullanıldığını açıklamaktadır.
                        </p>

                        <h2>1. Toplanan Bilgiler</h2>
                        <h3>1.1 Kişisel Bilgiler</h3>
                        <p>Sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                        <ul>
                            <li>Ad ve soyad</li>
                            <li>Telefon numarası</li>
                            <li>Talep edilen hizmet bilgisi</li>
                        </ul>
                        <p>Bu bilgiler yalnızca siz iletişim formlarımızı doldurduğunuzda veya bize doğrudan ulaştığınızda toplanır.</p>

                        <h3>1.2 Otomatik Toplanan Bilgiler</h3>
                        <p>Sitemizi ziyaret ettiğinizde aşağıdaki bilgiler otomatik olarak toplanabilir:</p>
                        <ul>
                            <li>IP adresi</li>
                            <li>Tarayıcı türü ve sürümü</li>
                            <li>Cihaz bilgileri</li>
                            <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                            <li>Yönlendiren URL</li>
                        </ul>

                        <h2>2. Bilgilerin Kullanım Amaçları</h2>
                        <p>Topladığımız bilgiler aşağıdaki amaçlarla kullanılmaktadır:</p>
                        <ul>
                            <li>Evde sağlık hizmetleri talebinizi değerlendirmek ve sizinle iletişime geçmek</li>
                            <li>Hizmet kalitemizi ölçmek ve iyileştirmek</li>
                            <li>Web sitemizin performansını analiz etmek ve geliştirmek</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                        </ul>

                        <h2>3. Çerezler (Cookies)</h2>
                        <p>
                            Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanabilir. 
                            Çerezler, tarayıcınız tarafından cihazınıza depolanan küçük metin dosyalarıdır. 
                            Tarayıcı ayarlarınız aracılığıyla çerezleri devre dışı bırakabilirsiniz; ancak bu 
                            durumda sitenin bazı özellikleri düzgün çalışmayabilir.
                        </p>

                        <h2>4. Bilgi Güvenliği</h2>
                        <p>
                            Kişisel bilgilerinizi korumak için uygun teknik ve organizasyonel güvenlik 
                            önlemlerini almaktayız. Verileriniz SSL/TLS şifreleme ile korunmaktadır. 
                            Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğu garanti edilemez.
                        </p>

                        <h2>5. Üçüncü Taraflarla Paylaşım</h2>
                        <p>
                            Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. 
                            Hizmet sunumu için gerekli olan durumlarda (sağlık personeli ataması vb.) 
                            yalnızca ilgili sağlık profesyonelleri ile paylaşılabilir.
                        </p>

                        <h2>6. Haklarınız</h2>
                        <p>
                            Kişisel verilerinize ilişkin haklarınız hakkında detaylı bilgi için{" "}
                            <Link href="/kvkk" className="text-primary hover:underline">KVKK Aydınlatma Metni</Link> sayfamızı 
                            inceleyebilirsiniz.
                        </p>

                        <h2>7. Politika Değişiklikleri</h2>
                        <p>
                            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada 
                            yayınlandığı anda yürürlüğe girer. Önemli değişiklikler olması durumunda 
                            kullanıcılarımızı bilgilendirmek için makul çaba göstereceğiz.
                        </p>

                        <h2>8. İletişim</h2>
                        <p>Gizlilik politikamızla ilgili sorularınız için:</p>
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
