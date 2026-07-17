# 🏗️ Mimari Diyagramı — Era Dijital Web

## Klasör Yapısı

```
eradijital-web/
│
├── .ai/                        # 🤖 AI proje hafızası (bu klasör)
│   ├── memory.md               # Proje bağlamı, servis bilgileri
│   ├── .cursorrules            # Cursor AI kod standartları
│   ├── progress.md             # İlerleme takibi
│   ├── architecture.md         # Bu dosya
│   └── sanity-schema.md        # Sanity CMS şema dokümantasyonu
│
├── public/                     # Statik dosyalar (build'e doğrudan kopyalanır)
│   └── favicon.svg
│
├── src/
│   ├── assets/                 # Import edilen statik dosyalar
│   │
│   ├── components/             # Paylaşılan UI bileşenleri
│   │   ├── Header.jsx          # Sticky navbar
│   │   ├── Footer.jsx          # Alt bilgi
│   │   ├── SEO.jsx             # Meta tag yönetimi
│   │   ├── ChatBot.jsx         # n8n chat bubble (CDN)
│   │   └── ScrollToTop.jsx     # Route-based scroll reset
│   │
│   ├── lib/                    # Harici servis istemcileri
│   │   └── sanity.js           # Sanity client + urlFor()
│   │
│   ├── pages/                  # Sayfa bileşenleri
│   │   ├── HomePage.jsx        # /
│   │   ├── HakkimizdaPage.jsx  # /hakkimizda
│   │   ├── HizmetlerPage.jsx   # /hizmetler
│   │   ├── BlogPage.jsx        # /blog
│   │   ├── BlogPostPage.jsx    # /blog/:slug
│   │   ├── OnAnalizPage.jsx    # /on-analiz
│   │   └── IletisimPage.jsx    # /iletisim
│   │
│   ├── App.jsx                 # Router + Route tanımları
│   ├── main.jsx                # ReactDOM.createRoot entry point
│   └── index.css               # Tailwind + global utility sınıfları
│
├── .env                        # 🔐 Ortam değişkenleri (git'e push etme!)
├── .gitignore
├── index.html                  # Vite HTML şablonu
├── package.json
├── tailwind.config.js          # Tailwind yapılandırması
├── postcss.config.js
└── vite.config.js              # Vite yapılandırması
```

---

## Veri Akışı

```
Kullanıcı Tarayıcısı
       │
       ▼
  React Router (App.jsx)
       │
       ├──► /              → HomePage.jsx
       ├──► /hakkimizda   → HakkimizdaPage.jsx
       ├──► /hizmetler    → HizmetlerPage.jsx
       ├──► /blog          → BlogPage.jsx ──► Sanity API (client.fetch)
       ├──► /blog/:slug    → BlogPostPage.jsx ──► Sanity API
       ├──► /on-analiz    → OnAnalizPage.jsx
       └──► /iletisim     → IletisimPage.jsx

Tüm sayfalarda:
  └── Header + Footer + SEO + ScrollToTop
  
Global (App seviyesinde):
  └── ChatBot (n8n bubble — CDN yüklemeli)
```

---

## Sanity Veri Akışı

```
Sanity Studio (sanity.io/manage)
       │  (içerik editörü blog yazısı ekler)
       ▼
Sanity Content Lake (bulut veritabanı)
       │  (GROQ sorgusu)
       ▼
src/lib/sanity.js (client.fetch)
       │
       ▼
BlogPage.jsx / BlogPostPage.jsx
       │
       ▼
Kullanıcı tarayıcısı
```

---

## Build Çıktısı

```
dist/
├── index.html                           (~0.87 kB)
└── assets/
    ├── index-[hash].css                 (~25 kB gzip: 5 kB)
    ├── index-[hash].js                  (~539 kB gzip: 168 kB)  ← Code splitting önerilir
    ├── browser-[hash].js                (~12 kB)
    └── stegaEncodeSourceMap-[hash].js   (~7 kB)
```

> `dist/` klasörü Hostinger'daki `public_html` klasörüne yüklenir.
> SPA için `.htaccess` veya hosting ayarlarında URL rewrite gerekebilir.

---

## Bağımlılık Grafiği

```
React 19
  ├── react-router-dom 7     (routing)
  ├── framer-motion 12       (animasyonlar)
  ├── lucide-react 1         (ikonlar)
  └── @portabletext/react 6  (blog body render)

@sanity/client 7             (CMS veri çekme)
@sanity/image-url 2          (görsel URL builder)

Tailwind CSS 3               (stillendirme)
  ├── autoprefixer
  └── postcss

Vite 8                       (build tool)
  └── @vitejs/plugin-react 6
```

---

## Ortam Yapılandırması

| Değişken | Geliştirme | Production |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | `838qjxmr` | `838qjxmr` |
| `VITE_SANITY_DATASET` | `production` | `production` |
| Host | `localhost:5173` | `eradijital.com` |
| Sanity CDN | Açık | Açık |
