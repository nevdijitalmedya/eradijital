import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Check, Cpu, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FiyatlarPage() {
  const [activeTab, setActiveTab] = useState('asistan');

  const asistanCozumleri = [
    {
      title: "Sosyal Medya Platformları",
      code: "AI-PKG-01",
      setup: "18.000 TL",
      monthly: "6.000 TL / Ay",
      extra: "Her ekstra platform +6.000 TL",
      desc: "WhatsApp, Instagram veya Telegram kanallarında 7/24 aktif akıllı müşteri temsilcisi.",
      features: [
        "Temel soru-cevap ve şirket bilgi bankası",
        "Sosyal medya entegrasyonu (DM & Yorumlar)",
        "Hazır şablon yanıt ve ön eleme akışları",
        "Aylık chatbot performans ve etkileşim raporu"
      ]
    },
    {
      title: "Web Sitesi Asistanı",
      code: "AI-PKG-02",
      setup: "18.000 TL",
      monthly: "6.000 TL / Ay",
      desc: "Web sitenize özel, gelen ziyaretçileri karşılayan ve iletişim bilgilerini toplayan akıllı widget.",
      features: [
        "Web sitesi canlı sohbet entegrasyonu",
        "Müşteri bilgisi toplama ve anlık e-posta / SMS bildirimi",
        "Hizmet ve ürün tanıtım modülleri",
        "Kullanıcı dostu arayüz ve marka renk uyarlaması"
      ]
    },
    {
      title: "Web + Tüm Sosyal Medya",
      code: "AI-PKG-03 // ÖNERİLEN",
      setup: "60.000 TL",
      monthly: "18.000 TL / Ay",
      desc: "Tüm dijital kanallarınızı birbirine bağlayan ve tek merkezden yönetilen hibrit AI altyapısı.",
      features: [
        "Çoklu kanal (Omnichannel WhatsApp + IG + Web) entegrasyonu",
        "Merkezi ortak bilgi bankası (RAG) paylaşımı",
        "Gelişmiş konuşma ve temsilciye yönlendirme kuralları",
        "Öncelikli teknik destek ve 1.5s yanıt SLA garantisi"
      ],
      popular: true
    }
  ];

  const webDinusumPaketleri = [
    {
      title: "Landing Page",
      price: "12.000 TL",
      desc: "Yüksek dönüşüm oranı hedefleyen tek sayfalık özel açılış sayfası.",
      features: [
        "Tek sayfalık modern ve mobil uyumlu tasarım",
        "Hızlı yükleme ve teknik SEO optimizasyonu",
        "İletişim formları ve doğrudan WhatsApp butonları",
        "Google Analytics ve Meta Pixel entegrasyonu"
      ]
    },
    {
      title: "AI Mini Paket",
      price: "24.000 TL",
      desc: "Esnaflar ve butik işletmeler için yapay zekâ destekli kurumsal site.",
      features: [
        "3-5 Sayfaya kadar kurumsal tasarım",
        "Yapay zekâ destekli içerik ve metin hazırlığı",
        "Mobil ve tablet uyumlu altyapı",
        "Temel yönetim paneli (Admin Panel)"
      ]
    },
    {
      title: "AI KOBİ Paket",
      price: "72.000 TL",
      desc: "KOBİ'ler için ölçeklenebilir ve kurumsal web sitesi çözümleri.",
      features: [
        "Sınırsız sayfa ekleme ve gelişmiş yönetim paneli",
        "Yapay zekâ destekli blog ve içerik üretici modülü",
        "Çoklu dil altyapısı desteği",
        "Gelişmiş teknik SEO ve hız optimizasyonu",
        "1 yıllık ücretsiz hosting ve SSL sertifikası"
      ]
    },
    {
      title: "AI Eko Paket",
      price: "144.000 TL",
      desc: "Müşteri deneyimi ve otomasyon odaklı kapsamlı kurumsal platform.",
      features: [
        "Özel UI/UX tasarım ve dinamik içerik yapısı",
        "E-ticaret veya randevu / rezervasyon entegrasyonu",
        "Temel yapay zekâ asistan entegrasyonu",
        "Müşteri paneli ve CRM entegrasyon köprüleri",
        "Haftalık performans ve trafik raporlamaları"
      ]
    },
    {
      title: "AI Pro Paket",
      price: "288.000 TL",
      popular: true,
      desc: "Uçtan uca otomasyon ve özel yazılım altyapısı gerektiren işletmeler için.",
      features: [
        "Uçtan uca özel yazılım ve mimari tasarım",
        "Gelişmiş AI otomasyon sistemleri ve webhook köprüsü",
        "WhatsApp ve Instagram AI Ajanı tam entegrasyonu",
        "Tam otomatik CRM ve ERP çift yönlü veri aktarımı",
        "Özel SLA desteği ve sürekli danışmanlık hizmeti"
      ]
    }
  ];

  const dijitalPazarlama = [
    {
      title: "SEO - GEO Optimizasyonu",
      price: "18.000 TL / Ay",
      desc: "Site içi arama motoru ve bölgesel harita aramalarında yüksek organik görünürlük.",
      features: [
        "Ayrıntılı anahtar kelime ve rakip açığı analizi",
        "Site içi teknik SEO ve Core Web Vitals optimizasyonu",
        "Google İşletme Profili ve haritalar optimizasyonu",
        "Aylık sıralama ve organik trafik raporu"
      ]
    },
    {
      title: "Sosyal Medya İçerik Yönetimi",
      price: "24.000 TL / Ay",
      desc: "Markaya özel stratejik ve yapay zekâ destekli içerik üretimi.",
      features: [
        "Haftalık 1 adet masaüstü AI tanıtım kurgusu",
        "Haftalık 2 adet profesyonel post / carousel tasarımı",
        "Özel açıklama (caption) ve hashtag stratejisi",
        "Sosyal medya hesap yönetimi ve zamanlama"
      ]
    },
    {
      title: "Sosyal Medya Reklam Yönetimi",
      price: "24.000 TL / Ay",
      desc: "Hedef kitleye yönelik profesyonel reklam ve ROAS optimizasyonu.",
      features: [
        "Meta (Instagram & Facebook) ve Google reklam kurgusu",
        "A/B testleri ve dinamik hedef kitle segmentasyonu",
        "AI otomasyon karşılama akışları ile reklam entegrasyonu",
        "Ayrıntılı ROAS, CAC ve dönüşüm analiz raporları"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Paketler & Fiyatlandırma | Era Dijital"
        description="Yapay zekâ otomasyonları, web dönüşüm paketleri, SEO ve sosyal medya reklam hizmetlerimizin şeffaf ve güncel fiyat detayları."
      />

      <Header />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-16 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="mono-tag">[ŞEFFAF MİMARİ VE FİYATLANDIRMA]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Hizmet Paketleri ve Yatırım Tablosu
              </h1>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Gizli maliyetler yok. İşletmenizin büyüklüğüne ve iletişim hacmine en uygun otomasyon ve geliştirme paketlerini inceleyin.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('asistan')}
                className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                  activeTab === 'asistan'
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-surface border border-border text-ink-muted hover:text-ink'
                }`}
              >
                01 // AI ASİSTAN VE OTOMASYON
              </button>
              <button
                onClick={() => setActiveTab('web')}
                className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                  activeTab === 'web'
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-surface border border-border text-ink-muted hover:text-ink'
                }`}
              >
                02 // WEB DÖNÜŞÜM PAKETLERİ
              </button>
              <button
                onClick={() => setActiveTab('pazarlama')}
                className={`font-mono text-xs px-4 py-2 rounded transition-colors ${
                  activeTab === 'pazarlama'
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-surface border border-border text-ink-muted hover:text-ink'
                }`}
              >
                03 // DİJİTAL PAZARLAMA VE BÜYÜME
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 1: AI ASİSTAN VE OTOMASYON */}
        {(activeTab === 'asistan' || activeTab === 'all') && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">[KATALOG 01]</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink">Dijital Asistan & Otomasyon Çözümleri</h2>
              </div>
              <span className="font-mono text-xs text-ink-faint hidden sm:inline-block">
                Tüm paketlerde bilgi bankası eğitimi dahildir.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {asistanCozumleri.map((pkg, idx) => (
                <div 
                  key={idx}
                  className={`tech-panel p-6 flex flex-col justify-between space-y-6 relative ${
                    pkg.popular ? 'border-primary/50 bg-[#0c1220]' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-primary font-semibold">
                        {pkg.code}
                      </span>
                      {pkg.popular && (
                        <span className="mono-tag mono-tag-active text-[10px]">ÖNERİLEN ÇÖZÜM</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-ink">{pkg.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">{pkg.desc}</p>

                    <div className="pt-3 border-t border-border/70 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-bold text-ink">{pkg.setup}</span>
                        <span className="font-mono text-xs text-ink-faint">Kurulum</span>
                      </div>
                      <div className="font-mono text-xs text-slate-300">
                        + {pkg.monthly} bakım & model kotası
                      </div>
                      {pkg.extra && (
                        <div className="font-mono text-[11px] text-ink-faint">({pkg.extra})</div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border/70">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block mb-2.5">
                        [PAKET KAPSAMI]
                      </span>
                      <ul className="space-y-2 text-xs text-slate-200">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-signal-emerald shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <Link to="/on-analiz" className={pkg.popular ? "btn-primary w-full text-xs justify-center" : "btn-secondary w-full text-xs justify-center"}>
                      <span>Bu Paketi Seç ve Başla</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: WEB DÖNÜŞÜM PAKETLERİ */}
        {(activeTab === 'web' || activeTab === 'all') && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">[KATALOG 02]</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink">Web Geliştirme & Dönüşüm Paketleri</h2>
              </div>
              <span className="font-mono text-xs text-ink-faint hidden sm:inline-block">
                Modern mimari, sıfır kod yükü, yüksek hız puanı.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webDinusumPaketleri.map((pkg, idx) => (
                <div 
                  key={idx}
                  className={`tech-panel p-6 flex flex-col justify-between space-y-6 ${
                    pkg.popular ? 'border-primary/50 bg-[#0c1220]' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-primary font-semibold">
                        [WEB-{idx + 1}]
                      </span>
                      {pkg.popular && (
                        <span className="mono-tag mono-tag-active text-[10px]">TAM DONANIM</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-ink">{pkg.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">{pkg.desc}</p>

                    <div className="pt-3 border-t border-border/70">
                      <span className="font-mono text-2xl font-bold text-ink">{pkg.price}</span>
                      <span className="font-mono text-xs text-ink-faint block mt-0.5">Tek Seferlik Kurulum</span>
                    </div>

                    <div className="pt-3 border-t border-border/70">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block mb-2.5">
                        [ÖZELLİKLER]
                      </span>
                      <ul className="space-y-2 text-xs text-slate-200">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-signal-emerald shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <Link to="/on-analiz" className={pkg.popular ? "btn-primary w-full text-xs justify-center" : "btn-secondary w-full text-xs justify-center"}>
                      <span>Teklif Al</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: DİJİTAL PAZARLAMA VE BÜYÜME */}
        {(activeTab === 'pazarlama' || activeTab === 'all') && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs text-primary font-semibold">[KATALOG 03]</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink">Dijital Pazarlama & Büyüme Paketleri</h2>
              </div>
              <span className="font-mono text-xs text-ink-faint hidden sm:inline-block">
                Yapay zekâ otomasyonlarıyla entegre çalışan reklam ve SEO yönetimi.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {dijitalPazarlama.map((pkg, idx) => (
                <div key={idx} className="tech-panel p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-primary font-semibold">
                      [GROWTH-{idx + 1}]
                    </span>
                    <h3 className="text-lg font-bold text-ink">{pkg.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">{pkg.desc}</p>

                    <div className="pt-3 border-t border-border/70">
                      <span className="font-mono text-2xl font-bold text-ink">{pkg.price}</span>
                      <span className="font-mono text-xs text-ink-faint block mt-0.5">Düzenli Yönetim</span>
                    </div>

                    <div className="pt-3 border-t border-border/70">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block mb-2.5">
                        [KAPSAM]
                      </span>
                      <ul className="space-y-2 text-xs text-slate-200">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-signal-emerald shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <Link to="/on-analiz" className="btn-secondary w-full text-xs justify-center">
                      <span>Bilgi Al</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM FAQ CALLOUT */}
        <section className="py-20 hairline-t bg-surface/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="mono-tag">[ÖZEL İHTİYAÇLAR]</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              Standart paketlerin dışında özel bir entegrasyona mı ihtiyacınız var?
            </h2>
            <p className="text-sm text-ink-muted max-w-xl mx-auto">
              Şirket içi ERP, SAP veya özel veri tabanlarınıza bağlanacak hibrit çözümler için özel mimari hazırlayabiliriz.
            </p>
            <div className="pt-2 flex justify-center">
              <Link to="/iletisim" className="btn-primary">
                <span>Teknik Ekibimizle Görüşün</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}