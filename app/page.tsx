import Link from "next/link";
import Image from "next/image";
import LeadForm from "@/components/ui/LeadForm";
import IstanbulMap from "@/components/ui/IstanbulMap";
import { SERVICE_CATEGORIES, ISTANBUL_DISTRICTS, SITE_CONFIG } from "@/lib/data/seed-data";
import { ALL_BLOG_POSTS } from "@/lib/data/all-blog-posts";
import { ALL_SERVICE_CATEGORIES } from "@/lib/data/services";

const TEAM_IMAGE = "/images/teyze.png";
const CARE_IMAGE = "/images/evdepansuman.png";

export default function HomePage() {
  const latestPosts = ALL_BLOG_POSTS.slice(0, 3);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-6 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                7/24 İstanbul Genelinde Hizmet
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight mb-6">
                Evinizde{" "}
                <span className="text-primary">Profesyonel</span>{" "}
                Sağlık Hizmeti
              </h1>
              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-xl">
                Evde serum, hemşirelik, yaşlı bakımı, fizyoterapi ve doktor hizmetleri ile
                İstanbul&apos;un 39 ilçesinde yanınızdayız.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg">
                  Hemen Ara
                </a>
                <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all duration-200 shadow-xl shadow-whatsapp/20 hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 mt-8 sm:mt-10 text-muted text-xs sm:text-sm">
                <span>Sertifikalı Ekip</span>
                <span>15+ Yıl Deneyim</span>
                <span>39 İlçede Hizmet</span>
              </div>
            </div>
            <div className="animate-slide-up lg:animate-slide-right order-2">
              <LeadForm variant="hero" sourcePage="homepage-hero" />
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Yıllık Deneyim" },
              { value: "39", label: "İlçede Hizmet" },
              { value: "10.000+", label: "Mutlu Hasta" },
              { value: "7/24", label: "Kesintisiz Hizmet" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION with actual photos ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Hizmetlerimiz</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">Kapsamlı Evde Sağlık Çözümleri</h2>
            <p className="text-muted max-w-2xl mx-auto">Hemşirelikten fizyoterapiye, yaşlı bakımından medikal ekipmana kadar tüm ihtiyaçlarınız için.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {ALL_SERVICE_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/hizmetler/${cat.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Full photo - shown in natural size, no cropping */}
                <div className="bg-gray-50">
                  <Image
                    src={cat.cover_image || "/images/evde_serum.png"}
                    alt={cat.name}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-secondary mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted leading-relaxed line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">Nasıl Çalışır?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">3 Adımda Evde Sağlık Hizmeti</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Bizi Arayın", desc: "Telefon veya WhatsApp üzerinden sağlık danışmanlarımıza ihtiyacınızı anlatın. Size en uygun hizmet planını oluşturalım." },
              { step: "02", title: "Ekip Gelsin", desc: "Uzman sağlık profesyonellerimiz belirlenen saatte evinize gelir. Tüm steril malzemeler ekibimiz tarafından getirilir." },
              { step: "03", title: "Sağlığınız Güvende", desc: "Profesyonel hizmet sonrası takip ve raporlama yapılır. Sağlığınız sürekli gözetim altındadır." },
            ].map((item, i) => (
              <div key={i} className="relative text-center p-8 bg-white rounded-2xl border border-border card-shadow">
                <div className="absolute top-4 right-4 text-6xl font-extrabold text-primary/10">{item.step}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                {i < 2 && <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary text-2xl z-10">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / TRUST SECTION ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-shadow bg-white">
                <Image src={TEAM_IMAGE} alt="City In Health profesyonel ekip" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Neden Biz?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-6">Güvenilir Sağlık Hizmetleri</h2>
              <p className="text-muted leading-relaxed mb-6">City In Health olarak, İstanbul&apos;un her köşesine profesyonel evde sağlık hizmeti ulaştırıyoruz. Sertifikalı ekibimiz ve modern ekipmanlarımızla sağlığınızı güvence altına alıyoruz.</p>
              <div className="space-y-4">
                {[
                  "Sertifikalı ve deneyimli sağlık profesyonelleri",
                  "7/24 kesintisiz hizmet, hafta sonu ve tatil dahil",
                  "Tek kullanımlık, CE sertifikalı steril malzemeler",
                  "Hasta memnuniyet takip sistemi",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Hasta Yorumları</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">Hastalarımız Ne Diyor?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ayşe K.", district: "Kadıköy", text: "Annem için evde serum hizmeti aldık. Hemşire hanım çok ilgili ve profesyoneldi. Tüm işlemler hijyenik bir şekilde yapıldı. Çok teşekkür ederiz.", rating: 5 },
              { name: "Mehmet D.", district: "Beşiktaş", text: "Babamın kalça protezi sonrası evde fizyoterapi aldık. 3 ayda inanılmaz ilerleme kaydetti. Fizyoterapist bey gerçekten uzman birisi.", rating: 5 },
              { name: "Fatma Y.", district: "Üsküdar", text: "Yaşlı bakımı hizmetinden çok memnunuz. Bakıcımız hem şefkatli hem de işini çok iyi biliyor. Ailemizin büyük yükünü aldılar.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-secondary">{t.name}</div>
                    <div className="text-xs text-muted">{t.district}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DISTRICTS - Interactive Istanbul Map ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Hizmet Bölgelerimiz</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">İstanbul&apos;un 39 İlçesinde Yanınızdayız</h2>
            <p className="text-muted max-w-2xl mx-auto">Haritada ilçenizin üzerine gelerek sunduğumuz hizmetleri görüntüleyin. Tıklayarak ilçenize özel sağlık hizmetleri sayfasına ulaşın.</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-4 sm:p-8 card-shadow">
            <IstanbulMap />
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOG ===== */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-background-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Blog</span>
                <h2 className="text-3xl font-extrabold text-secondary">Sağlık Rehberi</h2>
              </div>
              <Link href="/blog" className="text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1">
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-muted">{post.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src={CARE_IMAGE} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Sağlığınız İçin Hemen Arayın</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">Profesyonel sağlık ekibimiz evinizin konforunda size en kaliteli hizmeti sunmak için hazır. İlk görüşme ücretsizdir.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl hover:scale-[1.02] text-lg">
              {SITE_CONFIG.phone}
            </a>
            <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all shadow-xl hover:scale-[1.02] text-lg">
              WhatsApp ile Yazın
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
