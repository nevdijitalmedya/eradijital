import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Zap, 
  Workflow, 
  Layers 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HakkimizdaPage() {
  const benefits = [
    { 
      index: "01",
      title: "Müşteri Yanıt Hızını İvmelendirir", 
      desc: "WhatsApp ve Instagram üzerinde ilk yanıt süresini 1.5 saniyenin altına indirerek potansiyel müşterilerin dikkatini sıcak tutar." 
    },
    { 
      index: "02",
      title: "Operasyonel Sabit Maliyeti Düşürür", 
      desc: "Büyüyen mesaj hacmine karşılık sürekli ek personel istihdam etmek yerine, tekrarlı soruları otonom altyapıya devreder." 
    },
    { 
      index: "03",
      title: "Ekibi Stratejik Görevlere Yönlendirir", 
      desc: "Müşteri temsilcileriniz gün boyu kopyala-yapıştır adres veya fiyat yazmak yerine doğrudan satış kapatmaya odaklanır." 
    },
    { 
      index: "04",
      title: "Reklam Dönüşüm Oranını (ROAS) Katlar", 
      desc: "Reklamlardan gelen trafik anında karşılandığı ve lead bilgileri kaybolmadan CRM'e işlendiği için reklam bütçesi maksimum getiri sağlar." 
    },
    { 
      index: "05",
      title: "Manuel Hataları Sıfırlar", 
      desc: "Eksik bilgi kaydı, unutulan randevu veya gözden kaçan mesaj gibi insani hataları standart webhook kurgularıyla ortadan kaldırır." 
    },
  ];

  const targetSectors = [
    "E-Ticaret & D2C Markaları",
    "Özel Klinikler & Sağlık Merkezleri",
    "Güzellik & Estetik Merkezleri",
    "Teknik Servis & Saha Operasyonları",
    "B2B Hizmet & Danışmanlık Firmaları",
    "Yoğun Mesaj Kuyruğu Olan Çağrı Merkezleri"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Hakkımızda & Yaklaşımımız | Era Dijital"
        description="Era Dijital, dijital medya tecrübesini kurumsal yapay zekâ altyapısıyla birleştirerek işletmelere özel otonom operasyon sistemleri kurar."
      />

      <Header />

      <main className="flex-1">
        {/* Intro Section */}
        <section className="py-16 sm:py-20 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="mono-tag">[BİZ KİMİZ // ERA DİJİTAL]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Yapay Zekâ ile Operasyonel Geleceği İnşa Ediyoruz
              </h1>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Era Dijital olarak uzun yıllara dayanan dijital medya, performans pazarlaması ve yazılım tecrübemizi; günümüzün en büyük dönüşümü olan yapay zekâ ve otonom iş akışlarıyla birleştiriyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Blueprint */}
        <section className="py-16 hairline-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="tech-panel p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary font-semibold">[01 // VİZYON]</span>
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-ink">Ölçülebilir & Hızlı Sistemler</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Türkiye'de ve bölgede kurumsal yapay zekâ otomasyonları denildiğinde güvenilirlik, hız ve yüksek entegrasyon kabiliyetiyle ilk akla gelen teknoloji partneri olmak. Boşa giden mesaileri değil, büyüyen işletmeleri tasarlıyoruz.
              </p>
            </div>

            <div className="tech-panel p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-signal-emerald font-semibold">[02 // MİSYON]</span>
                <ShieldCheck className="w-5 h-5 text-signal-emerald" />
              </div>
              <h3 className="text-xl font-bold text-ink">İnsanı Tekrarlı Yükten Özgürleştirmek</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                İşletmelerin her gün aynı soruları cevaplayarak veya manuel veri kopyalayarak harcadığı yüzlerce saati otonom altyapıya devretmek. İnsan aklını stratejiye, yaratıcılığa ve değer üretmeye odaklamak.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Serve / Target Sectors */}
        <section className="py-16 hairline-b bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="mono-tag mb-3">[SEKTÖREL MİMARİ]</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                    Kiminle ve Hangi Sektörlerle Çalışıyoruz?
                  </h2>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Günde onlarca veya yüzlerce müşteri mesajı alan, randevu takvimini yönetmekte zorlanan ya da reklam bütçesinin geri dönüşünü artırmak isteyen tüm ölçeklerdeki işletmelerle çalışıyoruz.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {targetSectors.map((sector, sIdx) => (
                    <div key={sIdx} className="p-3 tech-panel flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-signal-emerald shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-200">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <figure className="tech-panel p-2 bg-[#0c1018] border border-border max-w-sm w-full">
                  <img 
                    src="/resimler/dijital-donusum-surecimiz/ai-kurulumu.webp" 
                    alt="Era Dijital Kurulum ve Entegrasyon Aşamaları" 
                    className="w-full h-auto object-contain rounded"
                  />
                  <figcaption className="mt-2 text-[11px] font-mono text-center text-ink-faint">
                    Kurulum & Doğrulama Mimarisi
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits List */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="mono-tag mb-3">[OPERASYONEL KAZANIMLAR]</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                İşletmenizi Güçlendiren 5 Temel Çıktı
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.index} className="tech-panel p-6 space-y-3">
                  <span className="font-mono text-xs text-primary font-bold">[{b.index}]</span>
                  <h3 className="text-base font-semibold text-ink">{b.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center pt-8 border-t border-border">
              <Link to="/on-analiz" className="btn-primary">
                <span>İşletmeniz İçin Ön Analiz Başlatın</span>
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