# 📋 Sanity CMS Şema Dokümantasyonu — Era Dijital

## Sanity Proje Bilgileri

```
Project ID : 838qjxmr
Org ID     : oJdxlYoGW  
Dataset    : production
API Ver.   : 2024-01-01
```

---

## Gerekli Döküman Tipleri

Blog sistemi için Sanity Studio'da aşağıdaki şemaların tanımlanması gerekir.

---

### 1. `post` — Blog Yazısı

```javascript
// sanity-studio/schemaTypes/post.js
export default {
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Adresi (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Yazar',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'categories',
      title: 'Kategoriler',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Özet (Kart Açıklaması)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'body',
      title: 'İçerik',
      type: 'blockContent'  // blockContent şeması aşağıda
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `Yazar: ${author}` : '' }
    }
  }
}
```

---

### 2. `author` — Yazar

```javascript
// sanity-studio/schemaTypes/author.js
export default {
  name: 'author',
  title: 'Yazar',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      title: 'Hakkında',
      type: 'text'
    }
  ]
}
```

---

### 3. `category` — Kategori

```javascript
// sanity-studio/schemaTypes/category.js
export default {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Kategori Adı',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text'
    }
  ]
}
```

---

### 4. `blockContent` — Zengin Metin Editörü

```javascript
// sanity-studio/schemaTypes/blockContent.js
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Alıntı', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Kalın', value: 'strong' },
          { title: 'İtalik', value: 'em' },
          { title: 'Kod', value: 'code' }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true }
    }
  ]
}
```

---

## GROQ Sorguları (Kullanılan)

### Blog Listesi (`BlogPage.jsx`)
```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "authorName": author->name,
  mainImage
}
```

### Tek Blog Yazısı (`BlogPostPage.jsx`)
```groq
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "authorName": author->name,
  mainImage,
  body
}
```

---

## Sanity Studio Kurulum (Opsiyonel — Yerel)

Eğer Sanity Studio'yu lokalde kurmak isterseniz:

```bash
# Proje klasöründe yeni terminal aç
npm create sanity@latest -- \
  --project 838qjxmr \
  --dataset production \
  --output-path ./sanity-studio \
  --template clean

cd sanity-studio
npm run dev
# → http://localhost:3333
```

---

## CORS Ayarı (Zorunlu)

**URL:** https://sanity.io/manage/project/838qjxmr/api

Şu origin'leri ekleyin:

| Origin | Credentials |
|---|---|
| `http://localhost:5173` | Kapalı |
| `http://localhost:5174` | Kapalı |
| `https://eradijital.com` | Kapalı |
| `https://www.eradijital.com` | Kapalı |
