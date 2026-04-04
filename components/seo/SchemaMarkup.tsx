import { SITE_CONFIG } from "@/lib/data/seed-data";

interface SchemaMarkupProps {
    type?: "LocalBusiness" | "MedicalOrganization" | "FAQPage";
    faqItems?: { question: string; answer: string }[];
    pageName?: string;
    pageDescription?: string;
    pageUrl?: string;
}

export default function SchemaMarkup({
    type = "MedicalOrganization",
    faqItems,
    pageName,
    pageDescription,
    pageUrl,
}: SchemaMarkupProps) {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type === "LocalBusiness" ? "LocalBusiness" : "MedicalOrganization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: ["City in Health", "cityinhealth", "City in Health Evde Sağlık"],
        description: pageDescription || SITE_CONFIG.description,
        url: pageUrl || SITE_CONFIG.url,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.url}/images/logo.png`,
            width: 200,
            height: 200,
        },
        image: `${SITE_CONFIG.url}/images/logo.png`,
        address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressRegion: "İstanbul",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "41.0082",
            longitude: "28.9784",
        },
        areaServed: {
            "@type": "City",
            name: "İstanbul",
        },
        sameAs: [
            "https://www.cityinhealth.com",
        ],
        knowsAbout: [
            "Evde Serum Tedavisi",
            "Evde Hemşirelik Hizmetleri",
            "Evde Doktor Hizmeti",
            "Evde Fizyoterapi",
            "Evde Kan Alma ve Tahlil",
            "Evde Yaşlı Bakımı",
            "Evde Yara Bakımı",
            "Evde EKG Çekimi",
            "Evde Röntgen",
            "Hacamat",
            "Akupunktur",
        ],
        medicalSpecialty: [
            "Evde Serum",
            "Evde Hemşirelik",
            "Evde Bakım",
            "Evde Fizyoterapi",
            "Evde Doktor",
            "Evde Kan Alma",
        ],
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
        priceRange: "₺₺",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Evde Sağlık Hizmetleri",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "MedicalProcedure",
                        name: "Evde Serum Tedavisi",
                        description: "Vitamin serum, glutatyon, ozon tedavisi ve daha fazlası evinizde.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "MedicalProcedure",
                        name: "Evde Hemşirelik Hizmeti",
                        description: "Enjeksiyon, sonda, tansiyon ölçümü, trakeostomi ve PEG bakımı.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "MedicalProcedure",
                        name: "Evde Doktor Muayenesi",
                        description: "Kardiyoloji, dahiliye ve nöroloji uzmanları evinizde.",
                    },
                },
            ],
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        name: "City in Health",
        alternateName: "City in Health Evde Sağlık",
        url: SITE_CONFIG.url,
        publisher: {
            "@id": `${SITE_CONFIG.url}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    const faqSchema =
        faqItems && faqItems.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer,
                    },
                })),
            }
            : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
