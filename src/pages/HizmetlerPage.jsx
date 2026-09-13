import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Cpu, 
  MessageSquare, 
  LineChart, 
  Layers, 
  ArrowRight, 
  Network,
  Workflow,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HizmetlerPage() {
  const modules = [
    {
      code: "MODÜL 01",
      tag: "STRATEJİ & MİMARİ",
      title: "Dijital Dönüşüm Danışmanlığı",
      desc: "Dijital dönüşüm sadece yeni bir yazılım satın almak değildir; iş süreçlerini baştan tasarlamaktır. İşletmenizin tüm iş akışlarını derinlemesine inceliyor, verimsiz darboğazları tespit ediyor ve dijital çağa uygun olarak yeniden modelliyoruz.",
      features: [
        "Mevcut iş akışlarının ve zaman kayıplarının haritalandırılması",
        "Departmanlar arası iletişim kopukluklarının giderilmesi",
        "Doğru yazılım, CRM ve bulut araçlarının seçimi ve entegrasyonu",
        "Ekip içi kullanım eğitimleri ve adaptasyon takibi"
      ],
      img: "/resimler/hizmetler/dijital-donusum-danismanligi.webp",
      alt: "Dijital Dönüşüm Danışmanlığı ve Süreç Mimarisi - Era Dijital"
    },
    {
      code: "MODÜL 02",
      tag: "OTONOM İLETİŞİM",
      title: "Yapay Zekâ ve Otomasyon Sistemleri",
      desc: "Tekrarlayan müşteri yazışmalarını ve veri girişlerini yapay zekâya devredin. Era Dijital; WhatsApp, Instagram ve web sitenizi şirketinizin bilgi tabanına bağlayarak müşterilerinize 7/24 anında, kişiselleştirilmiş yanıtlar sunar.",
      features: [
        "WhatsApp Business API ve Instagram DM akıllı yapay zekâ asistanı",
        "Otomatik randevu, ön rezervasyon ve sipariş toplama kurguları",
        "CRM (HubSpot, Airtable) ve e-ticaret sistemleriyle iki yönlü veri eşitleme",
        "7/24 kesintisiz müşteri ön eleme ve lead skorlama"
      ],
      img: "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
      alt: "Yapay Zeka ve Otomasyon Sistemleri Çözümleri - Era Dijital"
    },
    {
      code: "MODÜL 03",
      tag: "VERİ ODAKLI BÜYÜME",
      title: "Performans Odaklı Dijital Pazarlama",
      desc: "Yapay zekâ otomasyonlarımızla doğrudan entegre çalışan reklam kampanyaları kurguluyoruz. Reklamdan gelen trafiğin saniyeler içinde AI tarafından karşılanması sayesinde bütçenizi boşa harcamıyor, dönüşüm oranlarını maksimize ediyoruz.",
      features: [
        "Meta (Instagram & Facebook), TikTok ve Google Ads optimizasyonu",
        "Reklam tıklandığında anında WhatsApp'a yönlendiren AI karşılama akışları",
        "Akıllı yeniden hedefleme (Retargeting) ve dinamik kitle segmentasyonu",
        "Gerçek zamanlı ROAS ve dönüşüm performansı raporlaması"
      ],
      img: "/resimler/hizmetler/performans-odakli-dijital-pazarlama.webp",
      alt: "Performans Odaklı Dijital Pazarlama ve Reklam Yönetimi - Era Dijital"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Hizmetlerimiz & Modüller | Era Dijital"
        description="Yapay Zekâ Otomasyon Sistemleri, Dijital Dönüşüm Danışmanlığı ve Performans Odaklı Dijital Pazarlama modüllerimizle işletmenizi ölçeklendirin."
      />

      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-20 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="mono-tag">[HİZMET MİMARİSİ // 3 TEMEL DİREK]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Yapay Zekâ Otomasyonu & Dönüşüm Çözümleri
              </h1>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Tekrarlayan işleri ve müşteri mesaj kuyruklarını otonom sistemlere devredin. Operasyon yükünüzü hafifleten, CRM'inize bağlanan ve ölçülebilir sonuç üreten modüler altyapı.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail List */}
        <section className="py-16 space-y-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {modules.map((m, idx) => (
              <div 
                key={m.code}
                className="tech-panel p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Text Specs Column */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="mono-tag font-semibold text-primary">{m.code}</span>
                    <span className="font-mono text-xs text-ink-faint">{m.tag}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                    {m.title}
                  </h2>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {m.desc}
                  </p>

                  <div className="pt-2 border-t border-border/80">
                    <span className="font-mono text-xs text-ink-faint uppercase block mb-3">
                      [KAPSAM DAHİLİNDEKİ MİMARİ ADIMLAR]
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {m.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-signal-emerald shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Link to="/on-analiz" className="btn-primary text-xs">
                      <span>Bu Modül İçin Ön Analiz İste</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Figure Column */}
                <div className={`lg:col-span-5 flex justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <figure className="tech-panel p-2 bg-[#0d121c] border border-border/80 max-w-md w-full">
                    <img 
                      src={m.img} 
                      alt={m.alt}
                      className="w-full h-auto object-contain rounded max-h-[380px]"
                    />
                    <figcaption className="mt-2 text-[11px] font-mono text-center text-ink-faint">
                      {m.code} // Altyapı Şeması
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Bottom Banner */}
        <section className="py-20 hairline-t bg-surface/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="mono-tag">[SONRAKİ ADIM]</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              İşletmenize en uygun modülü birlikte seçelim.
            </h2>
            <p className="text-sm text-ink-muted max-w-xl mx-auto">
              Hangi süreçlerinizi otomatik hale getirebileceğinizi öğrenmek için 15 dakikalık ücretsiz bir ön analiz görüşmesi ayarlayabilirsiniz.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/on-analiz" className="btn-primary">
                <span>Ücretsiz Ön Analiz Talep Edin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/fiyatlar" className="btn-secondary">
                <span>Paket ve Fiyatları İncele</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}