import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mock post detailed content
const MOCK_POSTS_DETAIL = {
  "yapay-zeka-musteri-temsilcileri-satis-artirma": {
    title: "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma Yolları",
    publishedAt: "2026-06-25",
    authorName: "Era Dijital Ekibi",
    mainImageUrl: "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
    excerpt: "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.",
    contentHtml: `
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
  "isletmelerde-otomasyon-yapilmasi-gereken-darbogazlar": {
    title: "İşletmenizde Otomasyon Yapmanız Gereken 5 Darboğaz Süreç",
    publishedAt: "2026-06-20",
    authorName: "Era Dijital Ekibi",
    mainImageUrl: "/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp",
    excerpt: "Sürekli kopyala-yapıştır yaptığınız, randevuları onaylarken zaman kaybettiğiniz süreçleri nasıl otomatikleştirebilirsiniz?",
    contentHtml: `
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
  "dijital-donusum-nedir-nereden-baslanmali": {
    title: "Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır?",
    publishedAt: "2026-06-15",
    authorName: "Era Dijital Ekibi",
    mainImageUrl: "/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp",
    excerpt: "Maliyetlerinizi düşürüp verimliliğinizi artıracak doğru dijitalleşme stratejileri.",
    contentHtml: `
      <p>Dijital dönüşüm sadece sunucuları buluta taşımak veya yeni bir bilgisayar almak değildir. Dönüşüm, işletmenizin süreçlerini teknoloji yardımıyla kökten değiştirerek verimlilik ve müşteri memnuniyeti yaratma çabasıdır.</p>
      
      <h3>Nereden Başlanmalı?</h3>
      <p><strong>1. Kültür ve Farkındalık:</strong> Ekibinizin yeni teknolojileri benimsemesi en kritik adımdır. Otomasyonun onların işini ellerinden alacağını değil, onları angarya işlerden kurtaracağını anlatmalısınız.</p>
      <p><strong>2. Süreç Analizi:</strong> En çok zaman alan ve hata yapılan 3 süreci listeleyin. Dönüşüme buralardan başlamak en hızlı verimi almanızı sağlar.</p>
      <p><strong>3. Doğru Araç Seçimi:</strong> Büyük bütçeli, karmaşık yazılımlar yerine ihtiyaçlarınızı tam karşılayan esnek ve entegre edilebilir API dostu sistemleri tercih edin.</p>

      <p>Era Dijital olarak dönüşüm sürecinizde size yol göstermek ve en verimli AI altyapısını kurmak için yanınızdayız.</p>
    `
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(() => MOCK_POSTS_DETAIL[slug] || null);
  const [loading, setLoading] = useState(() => !MOCK_POSTS_DETAIL[slug]);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_PROJECT_ID !== 'dummy_id') {
          const query = `*[_type == "post" && slug.current == $slug][0] {
            title,
            publishedAt,
            "authorName": author->name,
            mainImage,
            excerpt,
            body
          }`;
          const sanityPost = await client.fetch(query, { slug });
          if (sanityPost) {
            setPost(sanityPost);
            setLoading(false);
          }
        }
      } catch (err) {
        console.warn("Sanity detail fetch failed. Using local mock data.", err);
      }
    };

    getPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="max-w-xl mx-auto text-center py-40 space-y-6">
          <h2 className="text-2xl font-bold text-white">Yazı Bulunamadı</h2>
          <p className="text-slate-400">Aradığınız makale mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/blog" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bloga geri dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageSrc = post.mainImage ? urlFor(post.mainImage).url() : post.mainImageUrl;
  const dateStr = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEO
        title={`${post.title} | Era Dijital Blog`}
        description={post.excerpt}
      />

      <Header />

      <article className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm Yazılar
        </Link>

        {/* Post Header */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4.5 h-4.5 text-primary" />
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>{post.authorName || 'Era Dijital'}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-slate-900 border border-white/5 rounded-3xl">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 text-base sm:text-lg">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          )}
        </div>
      </article>

      <Footer />
    </>
  );
};

export default BlogPostPage;
