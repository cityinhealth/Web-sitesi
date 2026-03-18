// =============================================
// Blog Posts Data - Template System
// Her blog yazısını bu şablona göre ekleyebilirsiniz
// =============================================

export interface BlogPostData {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    coverImage: string;
    meta_title: string;
    meta_description: string;
    tags: string[];
    content: string;
}

/**
 * BLOG YAZISI EKLEME REHBERİ
 * ===========================
 * 
 * Yeni bir blog yazısı eklemek için aşağıdaki şablonu kopyalayıp
 * BLOG_POSTS dizisine ekleyin:
 * 
 * {
 *     slug: "blog-yazisi-url-adi",               // URL'de görünecek (Türkçe karakter kullanmayın)
 *     title: "Blog Yazısı Başlığı",               // Sayfada görünecek başlık
 *     excerpt: "Kısa özet...",                     // Anasayfa/listelerde görünecek özet (max 160 karakter)
 *     category: "Hemşirelik",                      // Kategori adı
 *     date: "2025-03-01",                          // Yayın tarihi (YYYY-MM-DD)
 *     readTime: "8 dk",                            // Tahmini okuma süresi
 *     coverImage: "/images/evde_serum.png",         // Kapak fotoğrafı (public/images/ altında)
 *     meta_title: "SEO Başlığı | City In Health",  // Google'da görünecek başlık (max 60 karakter)
 *     meta_description: "SEO açıklama...",          // Google'da görünecek açıklama (max 155 karakter)
 *     tags: ["tag1", "tag2", "tag3"],               // Etiketler
 *     content: `
 *         ## Alt Başlık
 *         
 *         Paragraf metni burada yazılır. **Kalın yazı** için çift yıldız kullanın.
 *         
 *         ### Daha küçük başlık
 *         
 *         - Liste maddesi 1
 *         - Liste maddesi 2
 *         - Liste maddesi 3
 *         
 *         | Kolon 1 | Kolon 2 | Kolon 3 |
 *         |---------|---------|---------|
 *         | Değer 1 | Değer 2 | Değer 3 |
 *     `,
 * }
 * 
 * NOT: İçerik kısmında Markdown formatı kullanabilirsiniz.
 *      ## = Büyük başlık
 *      ### = Küçük başlık
 *      **metin** = Kalın
 *      - madde = Liste
 *      [metin](url) = Link
 *      ![açıklama](resim-yolu) = Resim
 */

export const BLOG_POSTS: BlogPostData[] = [
    // ====================================
    // Aşağıdaki örnek yazıyı referans olarak kullanabilirsiniz.
    // Yeni yazılarınızı bu diziye ekleyin.
    // ====================================
    {
        slug: "evde-saglik-hizmeti-rehberi",
        title: "Evde Sağlık Hizmeti Rehberi: Bilmeniz Gereken Her Şey",
        excerpt: "Evde sağlık hizmeti nedir, nasıl alınır ve nelere dikkat edilmelidir? Kapsamlı rehberimizle tüm sorularınıza cevap bulun.",
        category: "Genel",
        date: "2025-03-01",
        readTime: "5 dk",
        coverImage: "/images/evde-serum.png",
        meta_title: "Evde Sağlık Hizmeti Rehberi 2025 | City In Health",
        meta_description: "Evde sağlık hizmeti hakkında merak ettiğiniz her şey. Hizmet çeşitleri, süreç ve dikkat edilmesi gerekenler.",
        tags: ["evde sağlık", "rehber"],
        content: `
## Evde Sağlık Hizmeti Nedir?

Evde sağlık hizmeti, hastanın kendi evinde profesyonel sağlık personeli tarafından sunulan tıbbi bakım ve tedavi hizmetidir.

**Bu yazı bir şablon yazıdır.** İçeriği dilediğiniz gibi değiştirebilirsiniz.

## Hizmet Çeşitleri

- Evde serum tedavisi
- Evde hemşirelik
- Evde yara bakımı
- Evde yaşlı bakımı
- Evde fizyoterapi
- Evde doktor hizmeti

## Nasıl Randevu Alınır?

1. Bizi arayın veya WhatsApp'tan yazın
2. Sağlık danışmanımız ihtiyacınızı değerlendirir
3. Size uygun hizmet planı oluşturulur
4. Ekibimiz belirlenen saatte evinize gelir

---

*Bu yazıyı düzenlemek için lib/data/blog-posts.ts dosyasını açın.*
        `,
    },
];
