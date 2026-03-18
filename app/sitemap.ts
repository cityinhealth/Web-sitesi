import { MetadataRoute } from "next";
import { SERVICE_CATEGORIES, ISTANBUL_DISTRICTS, getAllServiceSlugs, SITE_CONFIG } from "@/lib/data/seed-data";
import { getAllBlogSlugs } from "@/lib/data/all-blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url;

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/istanbul-evde-saglik`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/kvkk`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];

    const categoryPages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map((cat) => ({
        url: `${baseUrl}/hizmetler/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map(({ categorySlug, serviceSlug }) => ({
        url: `${baseUrl}/hizmetler/${categorySlug}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const districtPages: MetadataRoute.Sitemap = ISTANBUL_DISTRICTS.map((d) => ({
        url: `${baseUrl}/istanbul-evde-saglik/${d.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...servicePages, ...districtPages, ...blogPages];
}
