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

function ServiceCard({
    service,
    catSlug,
    coverImage,
    index,
}: {
    service: { title: string; slug: string; short_description: string; cover_image?: string };
    catSlug: string;
    coverImage: string;
    index: number;
}) {
    const imgSrc = service.cover_image || coverImage;
    return (
        <Link
            href={`/hizmetler/${catSlug}/${service.slug}`}
            className="group bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden hover:border-primary/20 flex flex-col min-w-0"
        >
            <div className="relative w-full overflow-hidden bg-background-alt">
                <Image
                    src={imgSrc}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                />
            </div>
            <div className="p-2 sm:p-3 flex flex-col flex-1 min-w-0">
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

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
    if (!cat) notFound();

    const coverImage = cat.cover_image || "/images/evde_serum.png";
    const allServices = cat.services as { title: string; slug: string; short_description: string; cover_image?: string }[];

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

            {/* Services - Full Width Grid */}
            <section className="py-8 sm:py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {allServices.map((service, index) => (
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
            </section>
        </>
    );
}
