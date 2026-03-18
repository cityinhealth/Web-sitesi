import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ALL_BLOG_POSTS, getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data/all-blog-posts";
import { SITE_CONFIG } from "@/lib/data/seed-data";
import LeadForm from "@/components/ui/LeadForm";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    return params.then(({ slug }) => {
        const post = getBlogPostBySlug(slug);
        if (!post) return { title: "Yazı Bulunamadı" };
        return {
            title: post.meta_title || post.title,
            description: post.meta_description,
            alternates: { canonical: `/blog/${slug}` },
            openGraph: { title: post.meta_title, description: post.meta_description, url: `/blog/${slug}`, type: "article", images: [{ url: post.coverImage, width: 1200, height: 630 }] },
        };
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    // Get related posts (same category, different slug)
    const related = ALL_BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

    return (
        <>
            <SchemaMarkup type="MedicalOrganization" pageName={post.title} pageUrl={`https://www.cityinhealth.com/blog/${slug}`} />

            {/* Hero */}
            <section className="relative">
                <div className="relative h-[350px] sm:h-[420px] overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                        <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <span>/</span>
                            <span className="text-white/80 truncate max-w-[200px]">{post.title}</span>
                        </nav>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-medium text-primary bg-primary/20 px-3 py-1 rounded-full backdrop-blur-sm">{post.category}</span>
                            <span className="text-xs text-white/60">{post.date}</span>
                            <span className="text-xs text-white/60">• {post.readTime} okuma</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Article */}
                        <article className="lg:col-span-2">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs text-muted bg-background-alt px-3 py-1.5 rounded-lg border border-border">#{tag}</span>
                                ))}
                            </div>

                            {/* Render content as HTML-like markdown */}
                            <div
                                className="prose prose-lg max-w-none
                  prose-headings:text-secondary prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted prose-p:leading-relaxed
                  prose-li:text-muted
                  prose-strong:text-secondary
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                  prose-table:text-sm prose-table:w-full prose-table:border-collapse prose-table:my-8
                  prose-th:bg-secondary prose-th:text-white prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold
                  prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-border prose-td:text-muted"
                                dangerouslySetInnerHTML={{
                                    __html: (function parseMarkdown(content: string) {
                                        let html = content;

                                        // 1. Handle Tables First (most complex)
                                        const tableRegex = /^\|(.+)\|\n\|( *:?-+ ?:?\|)+\n(\|(.+)\|\n?)+/gm;
                                        html = html.replace(tableRegex, (table) => {
                                            const lines = table.trim().split('\n');
                                            const headerLine = lines[0];
                                            const rows = lines.slice(2); // Skip header and separator

                                            const renderRow = (row: string, tag: 'td' | 'th') => {
                                                const cells = row.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1);
                                                return `<tr>${cells.map(c => `<${tag}>${c.trim()
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
                                                    }</${tag}>`).join('')}</tr>`;
                                            };

                                            return `<div class="overflow-x-auto my-8 border rounded-xl shadow-sm">
                                                <table class="min-w-full">
                                                  <thead>${renderRow(headerLine, 'th')}</thead>
                                                  <tbody>${rows.map(r => renderRow(r, 'td')).join('')}</tbody>
                                                </table>
                                              </div>`;
                                        });

                                        // 2. Headings & Basic Formatting
                                        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
                                        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
                                        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
                                        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

                                        // 3. Lists (Simple)
                                        html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
                                        html = html.replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>');

                                        // 4. Paragraphs (Ensure we don't wrap tables again)
                                        const blocks = html.split('\n\n');
                                        return blocks.map(block => {
                                            if (block.startsWith('<div') || block.startsWith('<h') || block.startsWith('<li')) return block;
                                            return `<p>${block}</p>`;
                                        }).join('');
                                    })(post.content)
                                }}
                            />

                            {/* CTA */}
                            <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/10">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-secondary mb-2">Bu konuda profesyonel destek mi arıyorsunuz?</h3>
                                        <p className="text-muted">Uzman sağlık ekibimiz İstanbul genelinde 7/24 hizmet vermektedir.</p>
                                    </div>
                                    <div className="flex gap-3 flex-shrink-0">
                                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                            📞 Hemen Ara
                                        </a>
                                        <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-whatsapp text-white font-bold rounded-xl hover:bg-whatsapp/90 transition-all">
                                            💬 WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Related Posts */}
                            {related.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-secondary mb-6">İlgili Yazılar</h2>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {related.map((r) => (
                                            <Link key={r.slug} href={`/blog/${r.slug}`} className="group bg-white rounded-xl border border-border card-shadow hover:card-shadow-hover transition-all overflow-hidden">
                                                <div className="relative h-32 overflow-hidden">
                                                    <Image src={r.coverImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                                                </div>
                                                <div className="p-4">
                                                    <span className="text-xs text-primary font-medium">{r.category}</span>
                                                    <h3 className="text-sm font-bold text-secondary mt-1 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                <LeadForm variant="sidebar" sourcePage={`blog-${slug}`} />

                                <div className="bg-white rounded-xl border border-border p-5 card-shadow">
                                    <h3 className="font-bold text-secondary mb-4">📚 Kategoriler</h3>
                                    <div className="space-y-2">
                                        {[...new Set(ALL_BLOG_POSTS.map((p) => p.category))].map((cat) => (
                                            <div key={cat} className="flex items-center justify-between text-sm text-muted hover:text-primary transition-colors cursor-pointer py-1">
                                                <span>{cat}</span>
                                                <span className="text-xs bg-background-alt px-2 py-0.5 rounded-full">{ALL_BLOG_POSTS.filter((p) => p.category === cat).length}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-secondary rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-bold mb-3">Hızlı İletişim</h3>
                                    <p className="text-sm text-white/60 mb-4">Sağlık ihtiyaçlarınız için hemen ulaşın.</p>
                                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all">
                                        📞 {SITE_CONFIG.phone}
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
