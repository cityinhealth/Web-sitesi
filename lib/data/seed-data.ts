// =============================================
// Seed Data - Istanbul Districts & Service Categories
// =============================================
import { ALL_SERVICE_CATEGORIES } from "./services";
import { ServiceCategoryData, ServiceDataItem } from "@/lib/types";


export const ISTANBUL_DISTRICTS = [
    { district_name: "Adalar", slug: "adalar" },
    { district_name: "Arnavutköy", slug: "arnavutkoy" },
    { district_name: "Ataşehir", slug: "atasehir" },
    { district_name: "Avcılar", slug: "avcilar" },
    { district_name: "Bağcılar", slug: "bagcilar" },
    { district_name: "Bahçelievler", slug: "bahcelievler" },
    { district_name: "Bakırköy", slug: "bakirkoy" },
    { district_name: "Başakşehir", slug: "basaksehir" },
    { district_name: "Bayrampaşa", slug: "bayrampasa" },
    { district_name: "Beşiktaş", slug: "besiktas" },
    { district_name: "Beykoz", slug: "beykoz" },
    { district_name: "Beylikdüzü", slug: "beylikduzu" },
    { district_name: "Beyoğlu", slug: "beyoglu" },
    { district_name: "Büyükçekmece", slug: "buyukcekmece" },
    { district_name: "Çatalca", slug: "catalca" },
    { district_name: "Çekmeköy", slug: "cekmekoy" },
    { district_name: "Esenler", slug: "esenler" },
    { district_name: "Esenyurt", slug: "esenyurt" },
    { district_name: "Eyüpsultan", slug: "eyupsultan" },
    { district_name: "Fatih", slug: "fatih" },
    { district_name: "Gaziosmanpaşa", slug: "gaziosmanpasa" },
    { district_name: "Güngören", slug: "gungoren" },
    { district_name: "Kadıköy", slug: "kadikoy" },
    { district_name: "Kağıthane", slug: "kagithane" },
    { district_name: "Kartal", slug: "kartal" },
    { district_name: "Küçükçekmece", slug: "kucukcekmece" },
    { district_name: "Maltepe", slug: "maltepe" },
    { district_name: "Pendik", slug: "pendik" },
    { district_name: "Sancaktepe", slug: "sancaktepe" },
    { district_name: "Sarıyer", slug: "sariyer" },
    { district_name: "Şile", slug: "sile" },
    { district_name: "Silivri", slug: "silivri" },
    { district_name: "Şişli", slug: "sisli" },
    { district_name: "Sultanbeyli", slug: "sultanbeyli" },
    { district_name: "Sultangazi", slug: "sultangazi" },
    { district_name: "Tuzla", slug: "tuzla" },
    { district_name: "Ümraniye", slug: "umraniye" },
    { district_name: "Üsküdar", slug: "uskudar" },
    { district_name: "Zeytinburnu", slug: "zeytinburnu" },
];

// Re-export service categories from new modular structure
export const SERVICE_CATEGORIES: ServiceCategoryData[] = ALL_SERVICE_CATEGORIES;

// Helper: Get all service slugs for sitemap generation
export function getAllServiceSlugs() {
    const slugs: { categorySlug: string; serviceSlug: string }[] = [];
    SERVICE_CATEGORIES.forEach((cat: ServiceCategoryData) => {
        cat.services.forEach((svc: ServiceDataItem) => {
            slugs.push({ categorySlug: cat.slug, serviceSlug: svc.slug });
        });
    });
    return slugs;
}

// Site-wide constants
export const SITE_CONFIG = {
    name: "City In Health",
    tagline: "İstanbul Evde Sağlık ve Bakım Hizmetleri",
    phone: "0216 606 34 12",
    whatsapp: "905418650865",
    whatsappLink: "https://wa.me/905418650865?text=Merhaba,%20bilgi%20almak%20istiyorum.",
    email: "info@cityinhealth.com",
    address: "İstanbul, Türkiye",
    url: "https://www.cityinhealth.com",
    description:
        "İstanbul genelinde 7/24 evde sağlık hizmeti. Evde serum, hemşirelik, yaşlı bakımı, fizyoterapi ve daha fazlası. Profesyonel ekibimizle yanınızdayız.",
};
