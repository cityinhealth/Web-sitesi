"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostData } from "@/lib/data/all-blog-posts";

export default function BlogListClient({ posts }: { posts: BlogPostData[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const urlCategory = searchParams.get("kategori");

    const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || "all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (urlCategory) {
            setSelectedCategory(urlCategory);
        } else {
            setSelectedCategory("all");
        }
    }, [urlCategory]);

    const handleSelectCategory = (cat: string) => {
        setSelectedCategory(cat);
        if (cat === "all") {
            router.push("/blog", { scroll: false });
        } else {
            router.push(`/blog?kategori=${encodeURIComponent(cat)}`, { scroll: false });
        }
    };

    const categories = Array.from(new Set(posts.map((p) => p.category)));

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        const matchesSearch = !searchQuery.trim() ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const isFeaturedVisible = selectedCategory === "all" && !searchQuery.trim() && filteredPosts.length > 0;
    const featuredPost = isFeaturedVisible ? filteredPosts[0] : null;
    const listPosts = isFeaturedVisible ? filteredPosts.slice(1) : filteredPosts;

    return (
        <div>
            {/* Category Filter & Search Bar */}
            <section className="bg-background-alt border-b border-border sticky top-16 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Categories scrollable pill list */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            <button
                                onClick={() => handleSelectCategory("all")}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                                    selectedCategory === "all"
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "bg-white text-secondary/80 border border-border hover:border-primary/40 hover:text-primary"
                                }`}
                            >
                                Tümü ({posts.length})
                            </button>
                            {categories.map((cat) => {
                                const count = posts.filter((p) => p.category === cat).length;
                                const isSelected = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => handleSelectCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                                            isSelected
                                                ? "bg-primary text-white shadow-md shadow-primary/25"
                                                : "bg-white text-secondary/80 border border-border hover:border-primary/40 hover:text-primary"
                                        }`}
                                    >
                                        {cat} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative flex-shrink-0 w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Yazılarda ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white rounded-full border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted/60"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post (only on "Tümü" and when no search) */}
            {featuredPost && (
                <section className="py-10 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="group block bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all overflow-hidden"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative h-64 md:h-full min-h-[280px] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                                    <Image
                                        src={featuredPost.coverImage}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-md">
                                            ÖNE ÇIKAN REHBER
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{featuredPost.category}</span>
                                        <span className="text-xs text-muted">{featuredPost.date}</span>
                                        <span className="text-xs text-muted">• {featuredPost.readTime}</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors leading-snug">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-muted leading-relaxed text-sm mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {featuredPost.tags.slice(0, 4).map((tag) => (
                                            <span key={tag} className="text-xs text-muted bg-background-alt px-2.5 py-0.5 rounded-full border border-border">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="py-12 bg-background-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-secondary">
                                {selectedCategory === "all" ? "Tüm Yazılar" : `${selectedCategory} Yazıları`}
                            </h2>
                            <p className="text-xs sm:text-sm text-muted mt-1">
                                {filteredPosts.length} makale listeleniyor
                            </p>
                        </div>

                        {selectedCategory !== "all" && (
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className="text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer"
                            >
                                Filtreyi Temizle (Tümünü Göster) →
                            </button>
                        )}
                    </div>

                    {listPosts.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl border border-border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-muted">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="pt-3 border-t border-border flex items-center justify-between mt-auto">
                                            <span className="text-xs text-muted">{post.date}</span>
                                            <span className="text-primary font-semibold text-xs sm:text-sm flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                                Makaleyi Oku →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-border card-shadow p-8">
                            <span className="text-4xl block mb-3">🔍</span>
                            <h3 className="text-lg font-bold text-secondary mb-2">Aradığınız Kriterde Makale Bulunamadı</h3>
                            <p className="text-sm text-muted mb-6">Farklı bir kategori seçebilir veya arama terimini temizleyebilirsiniz.</p>
                            <button
                                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all text-sm cursor-pointer"
                            >
                                Tüm Yazıları Göster
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
