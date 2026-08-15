/**
 * blogPosts.js — Era Dijital Blog Veri Deposu & Yönetim Katmanı
 * 
 * Bu dosya:
 * 1. Varsayılan (orijinal) blog yazılarını barındırır.
 * 2. Tarayıcı hafızası (localStorage) ile entegre çalışır.
 * 3. Yeni yazı ekleme / düzenleme / silme fonksiyonlarını sağlar.
 * 4. React AdminModal üzerinden yapılan değişiklikleri anında sayfalara iletir.
 */

const STORAGE_KEY = 'era_blog_posts';

export const DEFAULT_POSTS = [
  {
    id: 4,
    title: "2026'da İşletmenizi Büyütecek Otonom AI Ajanları ve İş Akışı Otomasyonları Rehberi",
    slug: "otonom-ai-ajanlari-ve-is-akisi-otomasyonlari-rehberi",
    excerpt: "Geleneksel chatbotların ötesine geçerek müşteri bulma, randevu oluşturma ve satış kapatma süreçlerini 7/24 otonom yöneten yeni nesil AI ajanları ile tanışın.",
    author_name: "Era Dijital Ekibi",
    published_at: "2026-08-15",
    featured_image: "/resimler/blog/otonom-ai-ajanlari-rehberi-hero.jpg",
    seo_title: "Otonom AI Ajanları ve İş Akışı Otomasyonları Rehberi | Era Dijital",
    seo_description: "İşletmenizde satış, CRM ve müşteri desteği süreçlerini 7/24 otonom yürüten yapay zeka ajanları ve otomasyon stratejileri.",
    content: `
      <p>2026 yılı itibarıyla dijital dünyada rekabet kuralları baştan yazılıyor. Eskiden sadece önceden tanımlanmış kurallara göre cevap veren basit botlar kullanılırken, bugün <strong>Geniş Dil Modelleri (LLM)</strong> ve <strong>Otonom AI Ajanları</strong> işletmelerin satış, pazarlama ve müşteri ilişkileri süreçlerini baştan uca tek başlarına yönetebiliyor.</p>

      <h2>Otonom AI Ajanı Nedir ve Geleneksel Botlardan Farkı Nedir?</h2>
      <p>Geleneksel botlar sadece "1'e basınız, 2'ye basınız" mantığında katı menüler sunarken; bir <strong>Era Dijital Otonom AI Ajanı</strong>, firmanızın kurumsal kimliğini, ürün kataloğunu, stok durumunu ve satış politikalarını derinlemesine öğrenir. Müşterinin yazdığı karmaşık soruları doğal bir dille anlar ve gerçek bir uzman gibi konuşmayı yönlendirir.</p>

      <figure class="my-8">
        <img src="/resimler/blog/ai-entegrasyon-surecleri.jpg" alt="Era Dijital Çok Kanallı AI Entegrasyon Süreci" class="rounded-3xl w-full object-cover border border-white/10 shadow-2xl" />
        <figcaption class="text-xs text-center text-slate-400 mt-2.5 font-medium">Şekil 1: WhatsApp, Instagram ve CRM sistemleri arasında uçtan uca otonom veri akışı</figcaption>
      </figure>

      <h2>İşletmenizi Dönüştürecek 4 Temel AI Otomasyon Alanı</h2>

      <h3>1. 7/24 Omnichannel Satış Temsilcisi (WhatsApp & Instagram)</h3>
      <p>Potansiyel müşteriniz gece saat 01:00'de Instagram reklamınızdan veya WhatsApp hattınızdan size yazdığında, AI temsilciniz saniyeler içinde devreye girer. Müşterinin ihtiyacını analiz eder, ürün/hizmet tavsiyesi verir ve doğrudan randevu takviminize (Google Calendar, Cal.com vb.) rezervasyonu işler.</p>

      <h3>2. Uçtan Uca CRM & Lead Otomasyonu</h3>
      <p>Görüşme sırasında müşterinin isim, telefon, e-posta, talep ettiği hizmet ve bütçe bilgileri otomatik olarak yapılandırılır ve CRM sisteminize (Hubspot, Salesforce veya yerel veri tabanınıza) anında <em>"Sıcak Müşteri Adayı"</em> olarak kaydedilir.</p>

      <h3>3. Dinamik Teklif ve Fatura Hazırlama</h3>
      <p>Tekrarlayan fiyatlandırma hesaplamaları veya standart teklif mektupları AI ajanları tarafından saniyeler içinde PDF formatında oluşturulup müşteriye iletilebilir. Ekibiniz operasyonel angaryalardan kurtularak stratejik kararlara odaklanır.</p>

      <h3>4. Akıllı Veri Analitiği ve Haftalık Raporlama</h3>
      <p>En çok hangi saatlerde talep geliyor? Müşterilerin en sık itiraz ettiği noktalar neler? AI ajanı tüm konuşma geçmişlerini periyodik olarak özetleyerek yöneticilere aksiyon odaklı içgörüler sunar.</p>

      <blockquote>
        "Yapay zeka operasyonlarınızı devraldığında çalışanlarınızın işini elinden almaz; onları rutin ve yorucu işlerden kurtararak işletmenizin büyümesine doğrudan katkı sağlamalarını mümkün kılar."
      </blockquote>

      <h2>Era Dijital ile Dönüşüme Nereden Başlamalısınız?</h2>
      <p>Dijital dönüşümde en sık yapılan hata tüm süreçleri aynı anda otomatikleştirmeye çalışmaktır. Era Dijital olarak işletmenizi analiz ediyor, <strong>en çok zaman ve ciro kaybına sebep olan 1-2 kritik darboğazı</strong> tespit ederek ilk 14 gün içinde çalışan AI prototipinizi devreye alıyoruz.</p>

      <p>İşletmenizin yapay zeka potansiyelini keşfetmek ve ücretsiz süreç analizi randevusu almak için bizimle iletişime geçebilirsiniz.</p>
    `
  },
  {
    id: 1,
    title: "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma Yolları",
    slug: "yapay-zeka-musteri-temsilcileri-satis-artirma",
    excerpt: "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri ve en iyi senaryolar.",
    author_name: "Era Dijital Ekibi",
    published_at: "2026-06-25",
    featured_image: "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
    seo_title: "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma | Era Dijital",
    seo_description: "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.",
    content: `
      <p>Günümüzde tüketiciler her zamankinden daha sabırsız. Yapılan araştırmalara göre, bir mesajlaşma kanalından gelen müşteri talebine ilk 5 dakika içinde yanıt verilmediğinde, satış kapatma ihtimali <strong>%80 oranında düşüyor</strong>. İşte bu noktada yapay zeka destekli müşteri temsilcileri devreye giriyor.</p>
      
      <h3>1. 7/24 Kesintisiz Yanıt Hızı</h3>
      <p>Müşterileriniz genellikle akşam saatlerinde, hafta sonları veya tatillerde sosyal medyada gezinirken size ulaşır. Ekibiniz mesai dışındayken gelen mesajlara yapay zeka saniyeler içinde doğal bir dille yanıt vererek randevu oluşturabilir veya sipariş talebi toplayabilir.</p>

      <h3>2. Doğal ve Kişiselleştirilmiş İletişim</h3>
      <p>Eski nesil 'seçenek seçiniz' mantığındaki botlar yerine, güncel geniş dil modelleri (LLM) ile beslenen yapay zeka ajanları, müşterinin yazdığı serbest metinleri mükemmel şekilde anlar. İşletmenizin kurallarına göre müşteriye özel indirimler sunabilir, stok bilgisini sorgulayabilir.</p>

      <h3>3. CRM ve Satış Kanalları Entegrasyonu</h3>
      <p>Yapay zeka temsilcileri konuşma esnasında müşterinin isim, telefon, e-posta gibi bilgilerini toplayıp doğrudan CRM veri tabanınıza (Hubspot, Salesforce, yerel sistemler vb.) kaydeder. Böylece satış ekibiniz mesaiye başladığında hazır ve ısınmış lead'lerle karşılaşır.</p>

      <p>İşletmenizi yapay zeka entegrasyonlarıyla güçlendirmek ve satış kaçırmayı durdurmak için bizimle iletişime geçip ücretsiz ön analiz alabilirsiniz.</p>
    `
  },
  {
    id: 2,
    title: "İşletmenizde Otomasyon Yapmanız Gereken 5 Darboğaz Süreç",
    slug: "isletmelerde-otomasyon-yapilmasi-gereken-darbogazlar",
    excerpt: "Sürekli kopyala-yapıştır yaptığınız, randevuları onaylarken zaman kaybettiğiniz ve rapor hazırlamakta zorlandığınız süreçleri nasıl otomatikleştirebilirsiniz?",
    author_name: "Era Dijital Ekibi",
    published_at: "2026-06-20",
    featured_image: "/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp",
    seo_title: "İşletmelerde Otomasyon Yapılması Gereken 5 Darboğaz | Era Dijital",
    seo_description: "Sürekli kopyala-yapıştır yaptığınız süreçleri nasıl otomatikleştirebilirsiniz?",
    content: `
      <p>Bir işletmenin büyümesinin önündeki en büyük engeller, tekrarlayan manuel iş yükleridir. Çalışanlarınız zamanlarını rutin işlere harcadıklarında stratejik büyüme adımlarına odaklanamazlar. İşte otomatikleştirebileceğiniz en kritik 5 alan:</p>
      
      <h3>1. WhatsApp & Instagram DM Cevaplama</h3>
      <p>Aynı sorulara ('Fiyat nedir?', 'Adresiniz neresi?', 'Çalışma saatleriniz nedir?') yüzlerce kez el ile cevap yazmak yerine, bu akışı yapay zekaya devredebilirsiniz.</p>

      <h3>2. Randevu & Rezervasyon Takibi</h3>
      <p>Güzellik merkezleri, klinikler veya danışmanlık firmalarında randevu almak, saat teyit etmek ve hatırlatma mesajları göndermek tamamen otonom akışlarla (örneğin Google Calendar veya Cal.com entegrasyonları ile) çözülebilir.</p>

      <h3>3. Lead (Müşteri Adayı) Toplama ve CRM Kaydı</h3>
      <p>Web sitenizden, sosyal medyalardan gelen form verilerinin tek tek elle CRM sistemine girilmesi zaman kaybıdır. Otomatik entegrasyonlarla veriler milisaniyeler içinde senkronize edilir.</p>

      <h3>4. Fatura ve Teklif Süreçleri</h3>
      <p>Onaylanan siparişlerin muhasebe sistemine aktarılması ve faturaların kesilmesi otomatik tetikleyicilerle insansız yürütülebilir.</p>

      <h3>5. Düzenli Haftalık/Aylık Raporlama</h3>
      <p>Satış veya reklam verilerini Excel tablolarında birleştirmek yerine, n8n veya Make gibi otomasyon araçlarıyla otomatik paneller (dashboard) hazırlayabilirsiniz.</p>
    `
  },
  {
    id: 3,
    title: "Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır?",
    slug: "dijital-donusum-nedir-nereden-baslanmali",
    excerpt: "Dijital dönüşüm sadece yazılım satın almak değildir. Doğru bir strateji ile maliyetlerinizi düşürüp operasyonunuzu nasıl büyütebilirsiniz?",
    author_name: "Era Dijital Ekibi",
    published_at: "2026-06-15",
    featured_image: "/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp",
    seo_title: "Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır? | Era Dijital",
    seo_description: "Maliyetlerinizi düşürüp verimliliğinizi artıracak doğru dijitalleşme stratejileri.",
    content: `
      <p>Dijital dönüşüm sadece sunucuları buluta taşımak veya yeni bir bilgisayar almak değildir. Dönüşüm, işletmenizin süreçlerini teknoloji yardımıyla kökten değiştirerek verimlilik ve müşteri memnuniyeti yaratma çabasıdır.</p>
      
      <h3>Nereden Başlanmalı?</h3>
      <p><strong>1. Kültür ve Farkındalık:</strong> Ekibinizin yeni teknolojileri benimsemesi en kritik adımdır. Otomasyonun onların işini ellerinden alacağını değil, onları angarya işlerden kurtaracağını anlatmalısınız.</p>
      <p><strong>2. Süreç Analizi:</strong> En çok zaman alan ve hata yapılan 3 süreci listeleyin. Dönüşüme buralardan başlamak en hızlı verimi almanızı sağlar.</p>
      <p><strong>3. Doğru Araç Seçimi:</strong> Büyük bütçeli, karmaşık yazılımlar yerine ihtiyaçlarınızı tam karşılayan esnek ve entegre edilebilir API dostu sistemleri tercih edin.</p>

      <p>Era Dijital olarak dönüşüm sürecinizde size yol göstermek ve en verimli AI altyapısını kurmak için yanınızdayız.</p>
    `
  }
];

/**
 * Tüm blog yazılarını getirir (önce localStorage, yoksa varsayılanlar)
 */
export function getBlogPosts() {
  if (typeof window === 'undefined') return DEFAULT_POSTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage okuma hatası:', e);
  }
  return DEFAULT_POSTS;
}

/**
 * Slug değerine göre tekil yazı getirir
 */
export function getBlogPostBySlug(slug) {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug) || null;
}

/**
 * Yazı listesini localStorage'a kaydeder ve sayfaları tetikler
 */
export function saveBlogPosts(posts) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('era_blog_updated', { detail: posts }));
  } catch (e) {
    console.error('LocalStorage kaydetme hatası:', e);
  }
}

/**
 * Yeni blog yazısı ekler
 */
export function addBlogPost(postData) {
  const posts = getBlogPosts();
  const newPost = {
    id: Date.now(),
    title: postData.title || 'Başlıksız Yazı',
    slug: postData.slug || slugify(postData.title),
    excerpt: postData.excerpt || '',
    content: postData.content || '',
    author_name: postData.author_name || 'Era Dijital Ekibi',
    published_at: postData.published_at || new Date().toISOString().split('T')[0],
    featured_image: postData.featured_image || '/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp',
    seo_title: postData.seo_title || postData.title,
    seo_description: postData.seo_description || postData.excerpt
  };

  const updated = [newPost, ...posts];
  saveBlogPosts(updated);
  return newPost;
}

/**
 * Mevcut blog yazısını günceller
 */
export function updateBlogPost(id, updatedFields) {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedFields };
    saveBlogPosts([...posts]);
    return posts[index];
  }
  return null;
}

/**
 * Blog yazısını siler
 */
export function deleteBlogPost(id) {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  saveBlogPosts(filtered);
}

/**
 * Fabrika ayarlarına (orijinal 3 yazıya) döndürür
 */
export function resetBlogPosts() {
  saveBlogPosts(DEFAULT_POSTS);
}

/**
 * Sunucuyla (Hostinger /api/blog.php) senkronize eder
 */
export async function syncPostsWithServer(posts, password = 'admin') {
  try {
    const res = await fetch('/api/blog.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': password
      },
      body: JSON.stringify({
        action: 'save_posts',
        password: password,
        posts: posts
      })
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }
  } catch (err) {
    console.warn('Sunucu senkronizasyon hatası (yerel hafıza kullanılıyor):', err);
  }
  return { success: false };
}

/**
 * Sunucudaki /uploads klasörüne görsel yükler ve URL döner
 */
export async function uploadImageToServer(base64Data, password = 'admin') {
  try {
    const res = await fetch('/api/blog.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': password
      },
      body: JSON.stringify({
        action: 'upload_image',
        password: password,
        image_base64: base64Data
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch (err) {
    console.warn('Görsel sunucuya yüklenemedi:', err);
  }
  return base64Data; // Sunucu yanıt vermezse base64 olarak koru
}

/**
 * Sunucudan en güncel yazıları çeker
 */
export async function fetchPostsFromServer() {
  try {
    const res = await fetch('/api/blog.php');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveBlogPosts(data);
        return data;
      }
    }
  } catch (err) {
    // API yoksa sessizce yerel verileri kullan
  }
  return getBlogPosts();
}

/**
 * Türkçe başlığı URL slug formatına dönüştürür
 */
export function slugify(text) {
  if (!text) return '';
  const trMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
  };
  let result = text;
  for (const [tr, en] of Object.entries(trMap)) {
    result = result.split(tr).join(en);
  }
  return result
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
