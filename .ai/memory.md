# 🧠 Proje Hafızası — Era Dijital Web

## Proje Kimliği

| Alan | Değer |
|---|---|
| **Proje Adı** | Era Dijital Web Sitesi |
| **Domain** | https://eradijital.com |
| **Yerel Geliştirme** | http://localhost:5173 |
| **Proje Klasörü** | `E:\PROJECT\web\eradijital-web` |
| **Referans Site** | https://eradijital.com (WordPress kaynak) |

---

## Teknoloji Yığını

| Katman | Teknoloji | Versiyon |
|---|---|---|
| **Framework** | React | 19.x |
| **Build Tool** | Vite | 8.x |
| **Stil** | Tailwind CSS | 3.x |
| **Animasyon** | Framer Motion | 12.x |
| **İkonlar** | Lucide React | 1.x |
| **Router** | React Router DOM | 7.x |
| **CMS** | Sanity.io | Headless CMS |
| **Chatbot** | n8n Chat Widget | CDN üzerinden |

---

## Sanity CMS Bilgileri

```
Project ID  : 838qjxmr
Org ID      : oJdxlYoGW
Dataset     : production
Studio URL  : https://sanity.io/manage/project/838qjxmr
```

**.env dosyasında bulunması gerekenler:**
```
VITE_SANITY_PROJECT_ID=838qjxmr
VITE_SANITY_DATASET=production
```

**⚠️ CORS Ayarı:** `https://sanity.io/manage/project/838qjxmr/api` adresinde şu origin'lerin ekli olması gerekir:
- `http://localhost:5173`
- `https://eradijital.com`

---

## Renk Paleti (Tasarım Sistemi)

```css
background : #030712  /* Derin gece */
surface    : #0b0f19  /* Kart yüzeyi */
primary    : #6366f1  /* Indigo — CTA, aktif elementler */
secondary  : #06b6d4  /* Cyan — vurgu, badge */
accent     : #a855f7  /* Mor — 3. renk vurgu */
muted      : #94a3b8  /* Soluk gri metin */
```

**Font:** `Outfit` (başlıklar) + `Inter` (metin) — Google Fonts

---

## Sayfa Haritası

| Route | Dosya | Açıklama |
|---|---|---|
| `/` | `HomePage.jsx` | Ana sayfa, hero + pain points + features |
| `/hakkimizda` | `HakkimizdaPage.jsx` | Vizyon, misyon, sektörler |
| `/hizmetler` | `HizmetlerPage.jsx` | 3 ana hizmet modülü |
| `/blog` | `BlogPage.jsx` | Blog listesi — Sanity veya mock |
| `/blog/:slug` | `BlogPostPage.jsx` | Tek blog yazısı |
| `/on-analiz` | `OnAnalizPage.jsx` | Ücretsiz analiz formu |
| `/iletisim` | `IletisimPage.jsx` | İletişim formu |

---

## Bileşen Haritası

```
src/
├── components/
│   ├── Header.jsx       # Sticky nav, mobile menu, aktif link göstergesi
│   ├── Footer.jsx       # Alt bilgi, sosyal linkler
│   ├── SEO.jsx          # react-helmet benzeri meta tag yönetimi
│   ├── ChatBot.jsx      # n8n Chat Bubble (CDN ile dinamik yükleme)
│   └── ScrollToTop.jsx  # Route değişimde sayfa başına kaydırma
└── lib/
    └── sanity.js        # Sanity client + urlFor() yardımcı fonksiyonu
```

---

## CSS Utility Sınıfları (Özel)

```css
.glass              /* Tam opak glassmorphism arka plan */
.glass-card         /* Kartlar için hafif glassmorphism */
.glass-card-hover   /* Hover geçiş animasyonu */
.text-glow-indigo   /* İndigo parlama efekti */
.text-glow-cyan     /* Cyan parlama efekti */
.glow-border        /* Hover'da kenarlık parlaması */
```

**Tailwind Animasyonlar:**
- `animate-pulse-slow` — 4s yavaş pulse
- `animate-float` — 6s yukarı-aşağı yüzme

---

## Chatbot (n8n)

**Webhook URL:** `https://fragrance-n8n.nevdijital.com/webhook/b1ad8b29-f61a-4f8a-a94f-11ed0cb4931e/chat`
- Mode: `bubble`
- Dil: Türkçe
- İlk mesaj: "Merhaba! 👋 Ben Era Dijital asistanıyım."

---

## Görseller

Şu an harici URL kullanılıyor (WordPress kaynak):
```
Hero Image   : https://eradijital.com/wp-content/uploads/2025/12/ai-006.jpg
Hizmet 1     : https://eradijital.com/wp-content/uploads/2025/12/ai-004.png
Hizmet 2     : https://eradijital.com/wp-content/uploads/2025/12/ai-003.png
Hizmet 3     : https://eradijital.com/wp-content/uploads/2025/12/AI-Illustrations_05.png
Hakkımızda   : https://eradijital.com/wp-content/uploads/2025/12/AI-Illustrations_06.png
```
> Yerel görseller kullanmak için `public/images/` klasörüne taşıyın ve `src="/images/dosya.jpg"` ile referans verin.

---

## Blog — Sanity Şeması

Blog sayfası `VITE_SANITY_PROJECT_ID` env değişkeni ayarlıysa Sanity'den çeker, yoksa mock verileri gösterir.

**Beklenen Sanity döküman tipi:** `post`
```javascript
// Sanity'de beklenen alan yapısı:
{
  _type: 'post',
  title: string,
  slug: { current: string },
  excerpt: string,
  publishedAt: datetime,
  author: reference,   // author->name
  mainImage: image,    // @sanity/image-url ile işlenir
  body: portableText   // @portabletext/react ile render edilir
}
```
