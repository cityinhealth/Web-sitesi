import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | City In Health",
    description: "City In Health Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni. Kişisel verilerinizin nasıl işlendiğini öğrenin.",
    alternates: { canonical: "/kvkk" },
};

export default function KVKKPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">KVKK Aydınlatma Metni</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-8">
                        KVKK Aydınlatma Metni
                    </h1>

                    <div className="prose max-w-none">
                        <p className="text-sm text-muted mb-6"><strong>Son Güncelleme:</strong> 18 Mart 2026</p>

                        <h2>1. Veri Sorumlusu</h2>
                        <p>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz; 
                            veri sorumlusu olarak <strong>{SITE_CONFIG.name}</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                        </p>

                        <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
                        <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                        <ul>
                            <li>Evde sağlık hizmeti taleplerinin alınması ve değerlendirilmesi</li>
                            <li>Sağlık danışmanlığı hizmetinin sunulması</li>
                            <li>Randevu oluşturulması ve yönetimi</li>
                            <li>Hasta kayıt ve takip işlemlerinin yapılması</li>
                            <li>Hizmet kalitesinin ölçülmesi ve iyileştirilmesi</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                            <li>İletişim faaliyetlerinin yürütülmesi</li>
                        </ul>

                        <h2>3. İşlenen Kişisel Veriler</h2>
                        <p>Web sitemiz üzerinden aşağıdaki kişisel veriler toplanmaktadır:</p>
                        <ul>
                            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                            <li><strong>İletişim Bilgileri:</strong> Telefon numarası</li>
                            <li><strong>Hizmet Bilgileri:</strong> Talep edilen sağlık hizmeti türü</li>
                            <li><strong>İşlem Güvenliği:</strong> IP adresi, tarayıcı bilgisi, site kullanım verileri</li>
                        </ul>

                        <h2>4. Kişisel Verilerin Aktarılması</h2>
                        <p>
                            Kişisel verileriniz, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme 
                            şartları ve amaçları çerçevesinde aşağıdaki taraflara aktarılabilir:
                        </p>
                        <ul>
                            <li>Sağlık hizmeti sunumunda görevli sağlık profesyonelleri</li>
                            <li>Yasal düzenlemeler gereği yetkili kamu kurum ve kuruluşları</li>
                            <li>Hizmet altyapısı sağlayıcıları (sunucu, hosting, vb.)</li>
                        </ul>

                        <h2>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
                        <p>
                            Kişisel verileriniz; web sitemizdeki iletişim formları, telefon görüşmeleri ve 
                            WhatsApp iletişimi aracılığıyla toplanmaktadır. Bu veriler KVKK&apos;nın 5. maddesinde 
                            belirtilen &quot;bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması&quot; ve 
                            &quot;ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun 
                            meşru menfaatleri için veri işlenmesinin zorunlu olması&quot; hukuki sebeplerine 
                            dayanılarak işlenmektedir.
                        </p>

                        <h2>6. Kişisel Veri Sahibinin Hakları</h2>
                        <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                        <ul>
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                            <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                            <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhine bir sonuç çıkmasına itiraz etme</li>
                            <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğranması halinde zararın giderilmesini talep etme</li>
                        </ul>

                        <h2>7. İletişim</h2>
                        <p>
                            KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:
                        </p>
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
