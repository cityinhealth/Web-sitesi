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
        name: SITE_CONFIG.name,
        description: pageDescription || SITE_CONFIG.description,
        url: pageUrl || SITE_CONFIG.url,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressCountry: "TR",
        },
        areaServed: {
            "@type": "City",
            name: "İstanbul",
        },
        medicalSpecialty: [
            "Evde Hemşirelik",
            "Evde Bakım",
            "Evde Fizyoterapi",
            "Evde Doktor",
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
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
