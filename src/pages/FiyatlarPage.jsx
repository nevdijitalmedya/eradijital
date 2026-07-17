import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Check, 
  HelpCircle, 
  Cpu, 
  Globe, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  DollarSign
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FiyatlarPage = () => {
  const asistanCozumleri = [
    {
      title: "Sosyal Medya Platformları",
      setup: "18.000 TL",
      monthly: "6.000 TL",
      extra: "Her ekstra platform +6.000 TL",
      desc: "WhatsApp, Instagram veya Telegram gibi sosyal kanallarda 7/24 aktif akıllı asistan.",
      features: [
        "Temel soru-cevap ve bilgi bankası",
        "Sosyal medya entegrasyonu (DM/Yorum)",
        "Hazır şablon yanıt akışları",
        "Aylık chatbot performans izleme raporu"
      ]
    },
    {
      title: "Web Sitesi Asistanı",
      setup: "18.000 TL",
      monthly: "6.000 TL",
      desc: "Web sitenize özel, ziyaretçilerinizi karşılayan ve lead toplayan akıllı asistan.",
      features: [
        "Web sitesi canlı sohbet entegrasyonu",
        "Müşteri bilgisi toplama ve mail bildirimi",
        "Hizmet ve ürün tanıtım modülleri",
        "Kullanıcı dostu arayüz özelleştirmesi"
      ]
    },
    {
      title: "Web + Tüm Sosyal Medya",
      setup: "60.000 TL",
      monthly: "18.000 TL",
      desc: "Tüm dijital kanallarınızı birbirine bağlayan ve tek merkezden yönetilen hibrit AI asistan çözümü.",
      features: [
        "Çoklu kanal (Omnichannel) entegrasyonu",
        "Ortak bilgi bankası paylaşımı",
        "Gelişmiş konuşma yönlendirme kuralları",
        "Öncelikli teknik destek ve SLA garantisi"
      ],
      popular: true
    }
  ];

  const webDinusumPaketleri = [
    {
      title: "Landing Page",
      price: "12.000 TL",
      desc: "Yüksek dönüşüm oranı hedefleyen özel açılış (landing) sayfaları.",
      features: [
        "Tek sayfalık modern & mobil uyumlu tasarım",
        "Hızlı yükleme ve SEO optimizasyonu",
        "İletişim formları ve WhatsApp butonları",
        "Analiz kodları kurulumu (Google Analytics, Pixel)"
      ]
    },
    {
      title: "AI Mini Paket",
      price: "24.000 TL",
      desc: "Esnaflar ve butik çalışmalar için yapay zeka destekli web sitesi çözümü.",
      features: [
        "3-5 Sayfaya kadar kurumsal tasarım",
        "AI destekli içerik taslakları",
        "Mobil & Tablet uyumlu altyapı",
        "Temel yönetim paneli (Admin Panel)"
      ]
    },
    {
      title: "AI Kobi Paket",
      price: "72.000 TL",
      desc: "KOBİ'ler için modern ve standart web sitesi çözümleri.",
      features: [
        "Sınırsız sayfa ekleme ve gelişmiş panel",
        "AI destekli blog ve sayfa içerik üretici",
        "Çoklu dil altyapısı (Opsiyonel)",
        "Gelişmiş SEO ve hız optimizasyonu",
        "Yıllık ücretsiz hosting ve domain desteği"
      ]
    },
    {
      title: "AI Eko Paket",
      price: "144.000 TL",
      desc: "KOBİ'ler için müşteri deneyimi ve otomasyon odaklı kapsamlı çözüm.",
      features: [
        "Özel tasarım ve dinamik içerik yapıları",
        "E-ticaret veya rezervasyon altyapısı entegrasyonu",
        "Yapay zeka asistan temel entegrasyonu",
        "Müşteri paneli ve CRM entegrasyon modülleri",
        "Haftalık performans ve trafik raporlamaları"
      ]
    },
    {
      title: "AI Pro Paket",
      price: "288.000 TL",
      desc: "KOBİ'ler için müşteri ilişkileri otomasyon odaklı premium çözüm.",
      features: [
        "Uçtan uca özel yazılım ve arayüz tasarımı",
        "Gelişmiş AI otomasyon sistemleri entegrasyonu",
        "WhatsApp / Instagram AI Ajanı entegrasyonu",
        "Tam otomatik CRM ve ERP veri aktarımı",
        "Özel SLA desteği ve danışmanlık hizmeti"
      ],
      popular: true
    }
  ];

  const dijitalPazarlama = [
    {
      title: "SEO - GEO",
      price: "18.000 TL / Aylık",
      desc: "Mevcut site içi arama motoru ve coğrafi arama optimizasyonu ile yüksek organik görünürlük.",
      features: [
        "Ayrıntılı anahtar kelime ve rakip analizi",
        "Site içi teknik SEO optimizasyonu",
        "Google Haritalar ve lokal optimizasyon",
        "Aylık gelişim ve sıralama raporları"
      ]
    },
    {
      title: "Sosyal Medya İçerik",
      price: "24.000 TL / Aylık",
      desc: "Markaya özel stratejik içerik yönetimi.",
      features: [
        "Haftalık 1 adet masaüstü AI film (15 sn)",
        "Haftalık 2 adet profesyonel post tasarımı",
        "Özel açıklama (caption) ve hashtag çalışmaları",
        "Sosyal medya hesap yönetimi ve planlama"
      ]
    },
    {
      title: "Sosyal Medya Reklam",
      price: "24.000 TL / Aylık",
      desc: "Hedef kitleye yönelik profesyonel reklam kampanyası yönetimi.",
      features: [
        "Meta (Instagram/Facebook) & Google reklam kurulumu",
        "A/B testleri ve hedef kitle optimizasyonları",
        "AI otomasyon akışları ile reklam entegrasyonu",
        "Detaylı ROI ve dönüşüm analiz raporları"
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Hizmet Paketleri ve Fiyatlandırma | Era Dijital"
        description="Yapay zeka otomasyonları, web tasarım, SEO ve sosyal medya reklam hizmetlerimizin güncel paket ve fiyat detayları."
      />

      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
            <DollarSign className="w-4 h-4" />
            <span>Şeffaf Fiyatlandırma</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white">
            Hizmet Paketleri & Fiyatlandırma
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            İşletmenizin ölçeğine ve ihtiyaçlarına en uygun yapay zeka, web ve dijital pazarlama çözümlerimizi inceleyin.
          </p>
        </div>
      </section>

      {/* 1. Dijital Asistan & Otomasyon */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-2.5 text-primary">
              <Cpu className="w-6 h-6" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">1. Dijital Asistan & Otomasyon Çözümleri</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Müşteri etkileşimini otomatize eden 7/24 aktif akıllı asistan kurulum ve yönetim çözümleri.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {asistanCozumleri.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative border ${
                pkg.popular ? 'border-primary/45 shadow-lg shadow-primary/5' : 'border-white/5'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md">
                  En Çok Tercih Edilen
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                </div>

                <div className="py-6 border-y border-white/5 space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-white">{pkg.setup}</span>
                    <span className="text-xs text-slate-400">/ Kurulum</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-secondary">{pkg.monthly}</span>
                    <span className="text-xs text-slate-400">/ Aylık Yönetim</span>
                  </div>
                  {pkg.extra && <span className="text-[11px] text-accent block font-medium mt-1">{pkg.extra}</span>}
                </div>

                <ul className="space-y-3.5">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-slate-300 text-xs">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/on-analiz"
                  className={`block w-full py-3.5 text-center text-xs font-bold rounded-xl transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/30'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  Ön Analiz Alarak Başla
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* AI Yazılım & Otomasyon Çözümleri Notu */}
        <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-surface/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Yazılım & Otomasyon Çözümleri
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              İşletmenize özel yapay zeka tabanlı yazılım ve iş süreçleri otomasyon çözümleri. Fiyatlandırma proje kapsamına ve ihtiyacınıza göre belirlenmektedir.
            </p>
          </div>
          <Link
            to="/iletisim"
            className="shrink-0 inline-flex items-center text-xs font-bold text-primary hover:text-secondary group transition-colors"
          >
            <span>Detaylı Bilgi Al</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 2. Web Sitesi & Dönüşüm Çözümleri */}
      <section className="py-24 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-2xl mb-12">
            <div className="flex items-center space-x-2.5 text-secondary">
              <Globe className="w-6 h-6" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">2. Web Sitesi & Dönüşüm Çözümleri</h2>
            </div>
            <p className="text-slate-400 text-sm">
              İşletme ölçeğinize uygun, yapay zeka destekli, modern ve yüksek dönüşüm hedefli altyapılar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webDinusumPaketleri.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative border ${
                  pkg.popular ? 'border-primary/45 shadow-lg shadow-primary/5' : 'border-white/5'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md">
                    Önerilen Premium Çözüm
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <div className="py-6 border-y border-white/5 flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-white">{pkg.price}</span>
                    <span className="text-xs text-slate-400">/ Başlangıç</span>
                  </div>

                  <ul className="space-y-3.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-slate-300 text-xs">
                        <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/on-analiz"
                    className={`block w-full py-3.5 text-center text-xs font-bold rounded-xl transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/30'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    Hemen Başvur
                  </Link>
                </div>
              </div>
            ))}

            {/* Business Yazılım Çözümleri Kartı (Pro Paket Altında) */}
            <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-accent/40 bg-accent/5 relative">
              <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-md">
                Kurumsal Özel Çözüm
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Business Yazılım Çözümleri</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    İşletmenizin özel iş süreçleri, veri tabanları ve ihtiyaçlarına yönelik uçtan uca yazılım çözümleri.
                  </p>
                </div>

                <div className="py-6 border-y border-white/5">
                  <span className="text-xl font-extrabold text-accent">Fiyat almak için lütfen danışın</span>
                </div>

                <ul className="space-y-3.5">
                  <li className="flex items-start space-x-3 text-slate-300 text-xs">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Tamamen firmanıza özel mimari ve kodlama</span>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300 text-xs">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Mevcut kurumsal sistemler ile tam API entegrasyonu</span>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300 text-xs">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Şirket içi özel AI modelleri ve bilgi tabanları</span>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300 text-xs">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Kapsamlı test, kurulum ve bakım süreçleri</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/iletisim"
                  className="block w-full py-3.5 text-center text-xs font-bold rounded-xl bg-accent text-white shadow-lg hover:shadow-accent/30 transition-all"
                >
                  Fiyat Teklifi Al / Danışın
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Görünürlük & Dijital Pazarlama */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 max-w-2xl mb-12">
          <div className="flex items-center space-x-2.5 text-accent">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">3. Görünürlük & Dijital Pazarlama Yönetimi</h2>
          </div>
          <p className="text-slate-400 text-sm">
            Markanızın dijital görünürlüğünü artıran ve performansı en üst seviyeye çıkaran stratejik pazarlama yönetimi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dijitalPazarlama.map((pkg, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/5">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                </div>

                <div className="py-6 border-y border-white/5 flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-white">{pkg.price}</span>
                </div>

                <ul className="space-y-3.5">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-slate-300 text-xs">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/on-analiz"
                  className="block w-full py-3.5 text-center text-xs font-bold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                >
                  Detaylı Analiz İstiyorum
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Informative / FAQ Banner */}
      <section className="py-16 bg-surface/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Önemli Bilgilendirmeler
            </h3>
            <ul className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5"></span>
                <span>Yukarıda listelenen fiyatlar <strong>minimum başlangıç</strong> fiyatlarıdır. Projenin kapsamına, teknik detaylarına ve spesifik iş yüküne göre yukarı yönlü revizyonlar yapılabilir.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5"></span>
                <span>İhtiyaçlarınıza yönelik birden fazla paket veya modül satın alınması durumunda, sözleşme şartlarına bağlı olarak markanıza özel <strong>promosyonlar veya iskonto</strong> imkanları sağlanmaktadır.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5"></span>
                <span>Tüm fiyatlarımıza KDV dahil değildir. Ödeme vadeleri ve planları sözleşme esnasında tarafların mutabakatı ile belirlenir.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FiyatlarPage;
