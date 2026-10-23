import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ALL_BLOG_POSTS } from "@/lib/data/all-blog-posts";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
    title: "Blog & Sağlık Rehberi | City in Health",
    description: "Evde sağlık, bakım ve hemşirelik hakkında uzman bilgileri, rehberler ve güncel makaleler. City in Health blog.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Blog & Sağlık Rehberi | City in Health",
        description: "Evde sağlık, bakım ve hemşirelik hakkında uzman bilgileri, rehberler ve güncel makaleler. City in Health blog.",
        url: "https://www.cityinhealth.com/blog",
        type: "website",
    },
};

export default function BlogPage() {
    return (
        <>
            <SchemaMarkup 
                type="MedicalOrganization" 
                pageName="Blog & Sağlık Rehberi" 
                pageUrl="https://www.cityinhealth.com/blog" 
                breadcrumbs={[
                    { name: "Ana Sayfa", url: "/" },
                    { name: "Blog", url: "/blog" },
                ]}
            />
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary-dark py-14 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                        <span>/</span>
                        <span className="text-white/80">Blog</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        Blog & Sağlık Rehberi
                    </h1>
                    <p className="text-lg text-white/70 max-w-3xl">
                        Evde sağlık hizmetleri hakkında uzman bilgileri, ipuçları ve kapsamlı rehberler.
                        <strong className="text-white"> {ALL_BLOG_POSTS.length} makale</strong> sizi bekliyor.
                    </p>
                </div>
            </section>

            {/* Interactive Blog List with Category Filtering & Search */}
            <Suspense fallback={
                <div className="py-20 text-center text-muted">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-3" />
                    <p>Yazılar yükleniyor...</p>
                </div>
            }>
                <BlogListClient posts={ALL_BLOG_POSTS} />
            </Suspense>
        </>
    );
}

