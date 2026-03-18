import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/lib/data/seed-data";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export function generateStaticParams() {
    return SERVICE_CATEGORIES.map((cat) => ({
        category: cat.slug,
    }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    return params.then(({ category }) => {
        const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
        if (!cat) return { title: "Hizmet Bulunamadı" };
        return {
            title: cat.meta_title || cat.name,
            description: cat.meta_description || cat.description,
            alternates: { canonical: `/hizmetler/${cat.slug}` },
            openGraph: {
                title: cat.meta_title || cat.name,
                description: cat.description || undefined,
                url: `/hizmetler/${cat.slug}`,
            },
        };
    });
}

// No-photo B vitamins (B3, B4, B5, B6) go to compact list; everything else gets cards
const NO_PHOTO_SLUGS = new Set([
    "b-complex-serum-tedavisi",
    "b12-vitamin-metilkobalamin-serum-tedavisi",
    "b3-vitamin-niyasin-serum-tedavisi",
    "b4-vitamin-choline-chloride-serum-tedavisi",
    "b5-vitamin-pantotenik-asit-serum-tedavisi",
    "b6-vitamin-piridoksin-serum-tedavisi",
]);

function groupServices(services: { title: string; slug: string; short_description: string; cover_image?: string }[]) {
    const withPhotos: typeof services = [];
    const noPhotoBVitamins: typeof services = [];

    for (const svc of services) {
        if (NO_PHOTO_SLUGS.has(svc.slug)) {
            noPhotoBVitamins.push(svc);
        } else {
            withPhotos.push(svc);
        }
    }

    return { withPhotos, noPhotoBVitamins };
}

function ServiceCard({ service, catSlug, coverImage, index }: { service: { title: string; slug: string; short_description: string; cover_image?: string }; catSlug: string; coverImage: string; index: number }) {
    const svcImage = service.cover_image || coverImage;
    return (
        <Link
            key={service.slug}
            href={`/hizmetler/${catSlug}/${service.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-border hover:border-primary/20 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 min-w-0"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="bg-gray-50">
                <Image
                    src={svcImage}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>
            <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-bold text-secondary mb-1 group-hover:text-primary transition-colors line-clamp-2 break-words">
                    {service.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted leading-relaxed mb-1.5 line-clamp-2 break-words">
                    {service.short_description}
                </p>
                <span className="text-primary font-semibold text-[11px] sm:text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detaylı Bilgi →
                </span>
            </div>
        </Link>
    );
}

function CompactServiceItem({ service, catSlug }: { service: { title: string; slug: string; short_description: string }; catSlug: string }) {
    return (
        <Link
            href={`/hizmetler/${catSlug}/${service.slug}`}
            className="group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-border hover:border-primary/20 card-shadow hover:card-shadow-hover transition-all min-w-0"
        >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
                <h4 className="text-xs sm:text-sm font-semibold text-secondary group-hover:text-primary transition-colors truncate">
                    {service.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-muted truncate">{service.short_description}</p>
            </div>
        </Link>
    );
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
    if (!cat) notFound();

    const coverImage = cat.cover_image || "/images/evde_serum.png";
    const isSerumCategory = cat.slug === "evde-serum-tedavi";
    const { withPhotos, noPhotoBVitamins } = isSerumCategory
        ? groupServices(cat.services as { title: string; slug: string; short_description: string; cover_image?: string }[])
        : { withPhotos: cat.services as { title: string; slug: string; short_description: string; cover_image?: string }[], noPhotoBVitamins: [] };

    return (
        <>
            <SchemaMarkup
                type="MedicalOrganization"
                pageName={cat.name}
                pageDescription={cat.description || undefined}
                pageUrl={`https://www.cityinhealth.com/hizmetler/${cat.slug}`}
            />

            {/* Breadcrumb */}
            <div className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-border">/</span>
                        <span className="text-secondary font-medium">{cat.name}</span>
                    </nav>
                </div>
            </div>

            {/* Category Title */}
            <section className="py-8 sm:py-10 bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary mb-2 text-center">
                        {cat.name}
                    </h1>
                    <p className="text-sm sm:text-base text-muted text-center max-w-2xl mx-auto">{cat.description}</p>
                </div>
            </section>

            {/* Services - Full Width, No Sidebar */}
            <section className="py-8 sm:py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 overflow-hidden">
                    {/* Main Services Grid with photos */}
                    <div>
                        {isSerumCategory && (
                            <h2 className="text-lg sm:text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                Serum ve Vitamin Tedavileri
                            </h2>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                            {withPhotos.map((service, index) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    catSlug={cat.slug}
                                    coverImage={coverImage}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* No-photo B Vitamins - Compact List at the bottom */}
                    {noPhotoBVitamins.length > 0 && (
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                Diğer B Vitamini Serumları
                            </h2>
                            <p className="text-xs sm:text-sm text-muted mb-4">Her bir B vitamini için ayrı IV tedavi protokollerimiz mevcuttur.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                {noPhotoBVitamins.map((svc) => (
                                    <CompactServiceItem key={svc.slug} service={svc} catSlug={cat.slug} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
