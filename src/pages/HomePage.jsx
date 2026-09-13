import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  Layers, 
  Calendar, 
  BarChart3, 
  MessageSquareCode, 
  Network,
  Cpu,
  Clock,
  ShieldCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveAutomationFlow from '../components/LiveAutomationFlow';

export default function HomePage() {
  const capabilities = [
    {
      index: "01",
      title: "WhatsApp & Instagram AI Asistanı",
      tag: "OMNICHANNEL NLP",
      desc: "Sosyal medya ve WhatsApp üzerinden gelen müşteri taleplerini şirketinizin bilgi tabanına göre 7/24 saniyeler içinde karşılayan akıllı konuşma motoru."
    },
    {
      index: "02",
      title: "Otomatik Randevu & Sipariş Akışları",
      tag: "DIRECT BOOKING",
      desc: "Müşterinin takvim müsaitliğini sorgulayan, randevuyu kilitleyen ve Google Calendar / CRM sisteminize anında işleyen pürüzsüz akışlar."
    },
    {
      index: "03",
      title: "CRM & Webhook Entegrasyon Köprüleri",
      tag: "DATA PIPELINE",
      desc: "HubSpot, Airtable, Paraşüt, Ticimax veya özel veritabanlarınızla çift yönlü veri senkronizasyonu. Manuel veri kopyalamayı sıfırlayın."
    },
    {
      index: "04",
      title: "Semantik Analiz & Günlük Özet Raporları",
      tag: "EXECUTIVE INTEL",
      desc: "Tüm müşteri konuşmalarından trendleri çıkaran, kayıp nedenlerini analiz eden ve yönetici paneline anlık iş zekâsı sunan raporlama."
    }
  ];

  const onboardingSteps = [
    {
      step: "01 // KEŞİF",
      title: "İş Akışı ve Tıkanıklık Analizi",
      desc: "Ekibinizin en çok vakit kaybettiği tekrarlı soruları, formları ve manuel süreçleri haritalandırıyoruz."
    },
    {
      step: "02 // MİMARİ",
      title: "Bilgi Tabanı & Senaryo Tasarımı",
      desc: "Şirketinize özel dokümanlar, ürün listeleri ve kurumsal yanıt tonuyla yapay zekâ modelini eğitiyoruz."
    },
    {
      step: "03 // BAĞLANTI",
      title: "API & Webhook Entegrasyonu",
      desc: "WhatsApp Business API, CRM, takvim ve e-ticaret altyapınız arasında güvenli veri hatları kuruyoruz."
    },
    {
      step: "04 // CANLI",
      title: "SLA Güvencesiyle Devreye Alma",
      desc: "Test aşamalarının ardından sistemi canlıya alıyor, 7/24 çalışma ve yanıt sürelerini izliyoruz."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Yapay Zekâ Destekli Dijital Dönüşüm & Otomasyon | Era Dijital"
        description="Era Dijital, işletmelerin manuel iş yükünü azaltan, WhatsApp ve web iletişimini hızlandıran ve operasyonları otomatik yöneten yapay zeka otomasyon sistemleri kurar."
      />

      <Header />

      <main className="flex-1">
        {/* HERO SECTION - Hallmark Asymmetric Workbench */}
        <section className="py-12 lg:py-20 hairline-b relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Hero Left Lede */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="mono-tag mono-tag-active">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-blue animate-pulse"></span>
                    ERA OTOMASYON ALTYAPISI v2.4
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15]">
                  Manuel operasyonları <br />
                  <span className="text-primary font-semibold">otonom sistemlere</span> dönüştürün.
                </h1>

                <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
                  Era Dijital; WhatsApp, Instagram ve web kanallarından gelen müşteri taleplerini yapay zekâ ile anında karşılayan, CRM ve muhasebe sistemlerinize otomatik işleyen kurumsal otomasyon mimarileri kurar.
                </p>

                {/* Proof & Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link to="/on-analiz" className="btn-primary">
                    <span>Ücretsiz Ön Analiz Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/hizmetler" className="btn-secondary">
                    <span>Modülleri İncele</span>
                  </Link>
                </div>

                {/* Hallmark Operational Fact Row */}
                <div className="pt-4 border-t border-border grid grid-cols-3 gap-4 font-mono text-xs text-ink-faint">
                  <div>
                    <span className="block text-ink font-semibold text-sm">&lt; 2 saniye</span>
                    <span>Ortalama Yanıt</span>
                  </div>
                  <div>
                    <span className="block text-ink font-semibold text-sm">%100 Entegre</span>
                    <span>CRM & Webhook</span>
                  </div>
                  <div>
                    <span className="block text-ink font-semibold text-sm">7 / 24</span>
                    <span>Kesintisiz Akış</span>
                  </div>
                </div>
              </div>

              {/* Hero Right: Live Interactive Visualizer */}
              <div className="lg:col-span-7">
                <LiveAutomationFlow />
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM & ARCHITECTURE COMPARISON */}
        <section className="py-20 hairline-b bg-surface/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="mono-tag mb-3">[OPERASYONEL TIKANIKLIK // ÇÖZÜM]</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                Sorun yetersiz müşteri değil; gelen taleplerin manuel kuyrukta kaybolması.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conventional Flaw Box */}
              <div className="tech-panel p-6 border-red-500/20 bg-red-950/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-red-500/10">
                  <span className="font-mono text-xs text-red-400 font-semibold">[KLASİK YÖNTEM // VERİMSİZLİK]</span>
                  <span className="font-mono text-[11px] text-red-400/80">Yüksek Maliyet</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-red-200/80">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-mono">✕</span>
                    <span>WhatsApp ve Instagram DM'lerinde biriken mesajlar saatlerce, bazen günlerce yanıtsız kalır.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-mono">✕</span>
                    <span>Aynı ürün, fiyat ve adres soruları manuel olarak kopyala-yapıştır yapılarak personelin saatlerini tüketir.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-mono">✕</span>
                    <span>Mesaj atan potansiyel müşteri 5 dakika içinde yanıt alamadığında rakip firmaya geçer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-mono">✕</span>
                    <span>Mesajlaşmadaki veriler CRM'e işlenmediği için kimin satın aldığı veya neden vazgeçtiği izlenemez.</span>
                  </li>
                </ul>
              </div>

              {/* Engineered Fix Box */}
              <div className="tech-panel p-6 border-primary/30 bg-[#0d1322] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="font-mono text-xs text-primary font-semibold">[ERA OTOMASYON // MİMARİ]</span>
                  <span className="font-mono text-[11px] text-signal-emerald">Otonom Akış</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-emerald shrink-0 mt-0.5" />
                    <span>Yapay zekâ asistanı gelen mesajı 1.2 saniyede şirket dokümanlarınıza göre hatasız yanıtlar.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-emerald shrink-0 mt-0.5" />
                    <span>Nitelikli müşteri adayı tespit edildiğinde anında telefon ve e-posta alınıp CRM'e aktarılır.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-emerald shrink-0 mt-0.5" />
                    <span>Müşteri temsilciniz sadece satışı kapatmak veya karmaşık soruları çözmek için devreye girer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-emerald shrink-0 mt-0.5" />
                    <span>Haftalık konuşma analizleriyle müşterilerinizin en çok neyi merak ettiği raporlanır.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4 CAPABILITIES ARCHITECTURE */}
        <section className="py-20 hairline-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="mono-tag mb-3">[YAPILANDIRILABİLİR MODÜLLER]</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Kurumsal Yapay Zekâ ve Veri Modülleri
                </h2>
              </div>
              <Link to="/hizmetler" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
                Tüm modül detaylarını gör →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((c) => (
                <div key={c.index} className="tech-panel-interactive p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-primary font-semibold">[{c.index}]</span>
                      <span className="font-mono text-[10px] text-ink-faint">{c.tag}</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-ink-faint">
                    <span>SLA Dahil</span>
                    <span className="text-signal-emerald">● Aktif</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-STEP ONBOARDING PIPELINE */}
        <section className="py-20 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="mono-tag mb-3">[UYGULAMA SÜRECİ]</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                3 ila 5 iş gününde canlıya alınan mimari.
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-2">
                Aylarca süren karmaşık yazılım projeleri yerine, modüler ve test edilmiş şablonlarla hızla devreye alıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onboardingSteps.map((s, idx) => (
                <div key={idx} className="p-5 tech-panel space-y-3 relative">
                  <span className="font-mono text-xs text-primary font-medium block">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION - Hallmark Honest Bottom Unit */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="mono-tag">[BAŞLANGIÇ ADIMI]</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              İşletmeniz için hangi otomasyonun en yüksek geri dönüşü sağlayacağını belirleyelim.
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-xl mx-auto leading-relaxed">
              Mevcut mesajlaşma hacminizi ve iş akışınızı 15 dakikalık ücretsiz ön analiz görüşmesinde inceleyip size özel mimari planı hazırlıyoruz.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/on-analiz" className="btn-primary px-6 py-3">
                <span>Ücretsiz Ön Analiz Formunu Doldur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/fiyatlar" className="btn-secondary px-6 py-3">
                <span>Paket Fiyatlarını Gör</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}