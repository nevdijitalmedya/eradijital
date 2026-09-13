import { useState } from 'react';
import SEO from '../components/SEO';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, ClipboardList } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OnAnalizPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    employees: '1-5',
    bottleneck: '',
    software: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Ücretsiz Ön Analiz Talep Formu | Era Dijital"
        description="İşletmenize özel dijital dönüşüm ve AI otomasyon ihtiyaçlarını belirlemek için 15 dakikalık ücretsiz ön analiz formumuzu doldurun."
      />

      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-20 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="mono-tag">[DİJİTAL CHECK-UP // SIFIR MALİYET]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Ücretsiz Süreç & Otomasyon Ön Analizi
              </h1>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                İşletmenizin mesajlaşma trafiğini, CRM yapısını ve tekrarlayan manuel işlerini inceliyor; size özel bir otomasyon mimarisi ve yol haritası sunuyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Content & Form Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-primary font-semibold block">[ANALİZ KAPSAMI]</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink">
                    15 Dakikada Neleri Ortaya Çıkarıyoruz?
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="tech-panel p-5 space-y-2">
                    <span className="font-mono text-xs text-primary font-semibold">[01 // DARBOĞAZ TESPİTİ]</span>
                    <h3 className="text-sm font-bold text-ink">Manuel Zaman Kayıpları</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Ekibinizin gün içinde en çok hangi soruları manuel yazdığını ve hangi veri kopyalama işlemlerinde vakit kaybettiğini hesaplıyoruz.
                    </p>
                  </div>

                  <div className="tech-panel p-5 space-y-2">
                    <span className="font-mono text-xs text-signal-emerald font-semibold">[02 // SİSTEM UYUMLULUĞU]</span>
                    <h3 className="text-sm font-bold text-ink">Entegrasyon Mimarisi</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Kullandığınız muhasebe, CRM, e-ticaret veya randevu yazılımlarının yapay zekâ webhook köprülerine nasıl bağlanacağını belirliyoruz.
                    </p>
                  </div>

                  <div className="tech-panel p-5 space-y-2">
                    <span className="font-mono text-xs text-signal-blue font-semibold">[03 // TAHMİNİ ROI VE GETİRİ]</span>
                    <h3 className="text-sm font-bold text-ink">Yatırım ve Tasarruf Raporu</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Otomasyonun devreye alınması durumunda kaç personellik iş yükünün hafifleyeceğini ve yanıt hızının ne kadar artacağını projelendiriyoruz.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-[#0e1320] border border-border/80 flex items-center gap-3 text-xs text-ink-muted">
                  <ShieldCheck className="w-5 h-5 text-signal-emerald shrink-0" />
                  <span>Ön analiz tamamen ücretsizdir ve herhangi bir satın alma zorunluluğu içermez.</span>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                <div className="tech-panel p-6 sm:p-8">
                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-signal-emerald/10 border border-signal-emerald/30 text-signal-emerald mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-ink">Ön Analiz Talebiniz Alındı</h3>
                      <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
                        Verdiğiniz bilgiler doğrultusunda ön raporunuz hazırlanıyor. Teknik danışmanımız 24 saat içinde sizinle iletişime geçecektir.
                      </p>
                      <div className="pt-2 font-mono text-xs text-ink-faint">
                        Takip Numarası: #ANALYSIS-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="border-b border-border pb-3 mb-4">
                        <span className="font-mono text-xs text-primary font-semibold">[FORM // 15 DAKİKALIK CHECK-UP]</span>
                        <h3 className="text-lg font-bold text-ink mt-1">İşletme Bilgilerinizi Giriniz</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">Ad Soyad *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Örn. Zeynep Kaya"
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">Şirket / Marka Adı *</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Örn. ABC Lojistik A.Ş."
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">E-Posta *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="zeynep@sirketiniz.com"
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">Telefon *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="05XX XXX XX XX"
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">Çalışan Sayısı</label>
                          <select
                            name="employees"
                            value={formData.employees}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          >
                            <option value="1-5">1 - 5 Kişi</option>
                            <option value="6-20">6 - 20 Kişi</option>
                            <option value="21-50">21 - 50 Kişi</option>
                            <option value="50+">50+ Kişi</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">Kullandığınız Sistemler (Varsa)</label>
                          <input
                            type="text"
                            name="software"
                            value={formData.software}
                            onChange={handleChange}
                            placeholder="Örn. HubSpot, Paraşüt, Shopify vb."
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-ink-muted">En Çok Zaman Kaybettiren Darboğaz</label>
                        <textarea
                          name="bottleneck"
                          rows={3}
                          value={formData.bottleneck}
                          onChange={handleChange}
                          placeholder="Örn: WhatsApp'ta aynı fiyat ve randevu sorularını yazmaktan ekibimiz yetişemiyor..."
                          className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary w-full py-3 text-xs sm:text-sm justify-center"
                        >
                          {loading ? 'Rapor Hazırlanıyor...' : 'Ücretsiz Ön Analiz Talebini Gönder'}
                        </button>
                      </div>

                      <p className="text-[11px] font-mono text-ink-faint text-center pt-2">
                        Tüm verileriniz gizlilik sözleşmesi kapsamında korunur.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}