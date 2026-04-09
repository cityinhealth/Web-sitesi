import { ISTANBUL_MAP_DATA } from "@/lib/data/istanbul-map-data";
import Link from "next/link";
import { Metadata } from "next";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { SITE_CONFIG } from "@/lib/data/seed-data";

export const metadata: Metadata = {
  title: "İstanbul Evde Sağlık Hizmeti Bölgelerimiz | 39 İlçede 7/24 Hizmet",
  description: "City in Health olarak İstanbul'un 39 ilçesinde evde sağlık hizmeti veriyoruz. Evde serum, hemşirelik, fizyoterapi, yaşlı bakımı, doktor hizmeti. Avrupa ve Anadolu yakasında 7/24 profesyonel ekip.",
  alternates: { canonical: "/istanbul-evde-saglik" },
};

const FAQ_ITEMS = [
  { question: "İstanbul'un hangi ilçelerinde hizmet veriyorsunuz?", answer: "İstanbul'un 39 ilçesinin tamamında 7/24 evde sağlık hizmeti sunuyoruz." },
  { question: "Evde sağlık hizmeti almak için ne yapmalıyım?", answer: `${SITE_CONFIG.phone} numaralı telefondan bizi arayabilir veya WhatsApp üzerinden iletişime geçebilirsiniz. Sağlık danışmanlarımız size en uygun hizmet planını oluşturur.` },
  { question: "Hizmet ekibiniz ne kadar sürede geliyor?", answer: "Bulunduğunuz ilçeye göre genellikle 1-3 saat içinde ekibimiz evinize ulaşır. Randevu planlaması ile istediğiniz saat ve güne göre hizmet alabilirsiniz." },
];

export default function HizmetBolgeleriPage() {
  const avrupaYakasi = ISTANBUL_MAP_DATA.filter(
    d => ["besiktas", "sisli", "beyoglu", "fatih", "zeytinburnu", "bakirkoy", "bahcelievler", "gungoren", "esenler", "bayrampasa", "gaziosmanpasa", "kucukcekmece", "avcilar", "beylikduzu", "esenyurt", "buyukcekmece", "silivri", "catalca", "arnavutkoy", "basaksehir", "eyupsultan", "kagithane", "sariyer", "sultangazi"].includes(d.slug)
  ).sort((a,b) => a.name.localeCompare(b.name, 'tr'));

  const anadoluYakasi = ISTANBUL_MAP_DATA.filter(
    d => !["besiktas", "sisli", "beyoglu", "fatih", "zeytinburnu", "bakirkoy", "bahcelievler", "gungoren", "esenler", "bayrampasa", "gaziosmanpasa", "kucukcekmece", "avcilar", "beylikduzu", "esenyurt", "buyukcekmece", "silivri", "catalca", "arnavutkoy", "basaksehir", "eyupsultan", "kagithane", "sariyer", "sultangazi"].includes(d.slug)
  ).sort((a,b) => a.name.localeCompare(b.name, 'tr'));

  return (
    <>
      <SchemaMarkup type="MedicalOrganization" pageName="İstanbul Evde Sağlık Hizmeti Bölgeleri" pageUrl="https://www.cityinhealth.com/istanbul-evde-saglik" faqItems={FAQ_ITEMS} />

      {/* Breadcrumb */}
      <div className="bg-background-alt border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="text-border">/</span>
            <span className="text-secondary font-medium">Hizmet Bölgelerimiz</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] py-16 relative overflow-hidden">
        {/* Decorative backdrop blobs */}
        <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block py-1.5 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 tracking-wide uppercase">
              Geniş Hizmet Ağı
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B2A4A] mb-4 leading-tight tracking-tight">
              İstanbul&apos;un Tüm İlçelerinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Yanınızdayız</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              39 ilçeye 7/24 kesintisiz evde sağlık, doktor, hemşirelik, serum, fizyoterapi ve yara bakımı hizmeti ulaştırıyoruz.
            </p>
          </div>

          {/* Yakalar Container */}
          <div className="space-y-12">
            
            {/* Avrupa Yakası */}
            <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none transition-transform group-hover:scale-110 duration-700" />
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 pb-3 border-b-2 border-slate-100 flex items-center gap-3 relative z-10">
                <span className="text-blue-600">📍</span>
                Avrupa Yakası Evde Sağlık Hizmetleri
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 relative z-10">
                {avrupaYakasi.map((ilce) => (
                  <Link 
                    key={ilce.slug} 
                    href={`/istanbul-evde-saglik/${ilce.slug}`}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all font-medium text-slate-700 hover:text-[#D32F2F] group/link text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/link:bg-[#D32F2F] transition-colors" />
                    {ilce.name} Evde Sağlık
                  </Link>
                ))}
              </div>
            </section>

            {/* Anadolu Yakası */}
            <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none transition-transform group-hover:scale-110 duration-700" />
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 pb-3 border-b-2 border-slate-100 flex items-center gap-3 relative z-10">
                <span className="text-[#D32F2F]">📍</span>
                Anadolu Yakası Evde Sağlık Hizmetleri
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 relative z-10">
                {anadoluYakasi.map((ilce) => (
                  <Link 
                    key={ilce.slug} 
                    href={`/istanbul-evde-saglik/${ilce.slug}`}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all font-medium text-slate-700 hover:text-[#D32F2F] group/link text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/link:bg-[#D32F2F] transition-colors" />
                    {ilce.name} Evde Sağlık
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* SEO Rich Content */}
          <div className="mt-16 bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">İstanbul Genelinde Evde Sağlık Hizmeti</h2>
            <div className="prose max-w-none text-muted leading-relaxed space-y-4">
              <p>
                <strong>City in Health</strong>, İstanbul&apos;un <strong>39 ilçesinin tamamında</strong> 7/24 kesintisiz evde sağlık hizmeti sunan güvenilir bir sağlık kuruluşudur. 15 yılı aşkın deneyimimiz ve sertifikalı sağlık profesyonellerimizle, evinizin konforunda en kaliteli sağlık hizmetini almanızı sağlıyoruz.
              </p>
              <p>
                <strong>Evde serum tedavisi</strong>, <strong>evde hemşirelik</strong>, <strong>evde fizyoterapi</strong>, <strong>evde doktor muayenesi</strong>, <strong>evde kan alma ve tahlil</strong>, <strong>evde yara bakımı</strong> ve <strong>yaşlı-engelli bakımı</strong> başta olmak üzere geniş bir hizmet yelpazesiyle İstanbul&apos;un Avrupa ve Anadolu yakasındaki tüm ilçelerde faaliyet gösteriyoruz.
              </p>
              <p>
                Sağlık personelimiz CE sertifikalı tek kullanımlık steril malzemelerle çalışır. Her hizmet sonrası müşteri memnuniyet takibi yapılır. Amacımız, hastane ortamının stresinden uzak, güvenli ve hijyenik bir tedavi süreci sunmaktır.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 text-center">Sık Sorulan Sorular</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-100 p-5 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-base font-semibold text-[#1B2A4A] pr-4">{faq.question}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
