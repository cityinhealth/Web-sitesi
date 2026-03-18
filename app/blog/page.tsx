import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ALL_BLOG_POSTS } from "@/lib/data/all-blog-posts";

export const metadata: Metadata = {
    title: "Blog & Sağlık Rehberi",
    description: "Evde sağlık, bakım ve hemşirelik hakkında uzman bilgileri, rehberler ve güncel makaleler. City In Health blog.",
    alternates: { canonical: "/blog" },
};

export default function BlogPage() {
    const categories = [...new Set(ALL_BLOG_POSTS.map((p) => p.category))];

    return (
        <>
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

            {/* Category Filter */}
            <section className="bg-background-alt border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <span className="text-sm font-medium text-secondary/60 flex-shrink-0">Kategori:</span>
                        <span className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full flex-shrink-0">
                            Tümü ({ALL_BLOG_POSTS.length})
                        </span>
                        {categories.map((cat) => (
                            <span key={cat} className="px-4 py-1.5 bg-white text-secondary/70 text-sm font-medium rounded-full border border-border hover:border-primary/30 hover:text-primary transition-all cursor-pointer flex-shrink-0">
                                {cat} ({ALL_BLOG_POSTS.filter((p) => p.category === cat).length})
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href={`/blog/${ALL_BLOG_POSTS[0].slug}`} className="group block bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="relative h-64 md:h-full min-h-[280px] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                                <Image
                                    src={ALL_BLOG_POSTS[0].coverImage}
                                    alt={ALL_BLOG_POSTS[0].title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                        ÖNE ÇIKAN
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{ALL_BLOG_POSTS[0].category}</span>
                                    <span className="text-xs text-muted">{ALL_BLOG_POSTS[0].date}</span>
                                    <span className="text-xs text-muted">• {ALL_BLOG_POSTS[0].readTime}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{ALL_BLOG_POSTS[0].title}</h2>
                                <p className="text-muted leading-relaxed mb-4">{ALL_BLOG_POSTS[0].excerpt}</p>
                                <div className="flex flex-wrap gap-2">
                                    {ALL_BLOG_POSTS[0].tags.map((tag) => (
                                        <span key={tag} className="text-xs text-muted bg-background-alt px-2 py-1 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="py-12 bg-background-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-secondary mb-8">Tüm Yazılar</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ALL_BLOG_POSTS.slice(1).map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                                        <span className="text-xs text-muted">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs text-muted">{post.date}</span>
                                        <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Oku →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
