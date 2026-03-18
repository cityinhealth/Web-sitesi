---
description: Yeni blog yazısı ekleme adımları
---

# 📝 Yeni Blog Yazısı Ekleme Rehberi

## Adım 1: İçeriği Hazırlayın
Blog yazısını Markdown formatında hazırlayın. Başka bir AI'ya yazdırabilirsiniz.

## Adım 2: Doğru Dosyayı Açın
`lib/data/blog-posts-6.ts` dosyasını açın (veya en son hangi dosyaya eklendiyse o dosya).

## Adım 3: Yeni Blog Yazısını Ekleyin
Dosyanın içindeki dizi `[]` kapanmadan önce, son blog yazısından sonra virgül ekleyip yeni yazıyı yapıştırın:

```typescript
    {
        slug: "blog-url-adi",                    // URL'de görünecek (Türkçe karakter YOK)
        title: "Blog Yazısı Başlığı",
        excerpt: "Kısa özet... (max 160 karakter)",
        category: "Evde Hemşirelik",             // Mevcut kategoriler: Evde Tedavi İşlemleri, Evde Hemşirelik, Evde Bakım, Fizik Tedavi, Laboratuvar, Evde Doktor, Genel
        date: "2026-04-01",                      // YYYY-MM-DD formatı
        readTime: "10 dk",
        coverImage: "/images/gorsel-adi.png",    // public/images/ altına koyduğunuz görsel
        meta_title: "SEO Başlığı | City In Health",
        meta_description: "Google'da görünecek açıklama (max 155 karakter)",
        tags: ["etiket1", "etiket2"],
        content: `
## Markdown İçerik Buraya

Paragraf metni...

### Alt başlık

- Liste maddesi
- Liste maddesi

| Kolon 1 | Kolon 2 |
|---------|---------|
| Değer 1 | Değer 2 |
        `,
    },
```

## Adım 4: Kapak Görseli Ekleyin
Görsel dosyasını `public/images/` klasörüne koyun.

## Adım 5: Test Edin
```bash
npm run dev
```
Tarayıcıda `http://localhost:3000/blog/blog-url-adi` adresini açarak kontrol edin.

## Adım 6: GitHub'a Push Edin
```bash
git add .
git commit -m "blog: yeni blog yazısı eklendi"
git push
```
Vercel otomatik olarak yeni versiyonu yayınlayacak.

## ⚠️ DİKKAT
- `slug` alanında Türkçe karakter kullanmayın (ş→s, ı→i, ö→o, ü→u, ç→c, ğ→g)
- `content` alanını backtick (\`) ile sarın, normal tırnak değil
- İçerik Markdown formatında olmalı (## başlık, **kalın**, - liste)
- Görseller public/images/ altında olmalı
