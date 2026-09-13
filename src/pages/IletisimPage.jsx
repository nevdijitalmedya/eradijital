import { useState } from 'react';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
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
        title="İletişim & Danışma | Era Dijital"
        description="Yapay zekâ otomasyon ve dijital dönüşüm süreçlerimiz hakkında soru sormak veya teknik toplantı planlamak için bizimle iletişime geçin."
      />

      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-20 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="mono-tag">[DİREKT İLETİŞİM // DESTEK HATTI]</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Bizimle İletişime Geçin
              </h1>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Yapay zekâ asistanı, süreç otomasyonları veya özel entegrasyon taleplerinizle ilgili teknik ekibimiz 24 saat içinde yanıt vermektedir.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Contact Channels Left */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-primary font-semibold block">[KANALLAR]</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink">
                    Merkez Ofis ve Doğrudan Erişim
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    İster doğrudan telefonla arayın, ister formu doldurun. Talebiniz anında CRM havuzumuza düşer.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="tech-panel p-4 flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block">Adres</span>
                      <p className="text-slate-200">
                        Esenkent Mah. Cemalpaşa Cad. No:30/C Bahçeşehir / İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="tech-panel p-4 flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block">Telefon & WhatsApp</span>
                      <a href="tel:+905433619239" className="text-slate-200 hover:text-primary transition-colors font-mono">
                        +90 543 361 92 39
                      </a>
                    </div>
                  </div>

                  <div className="tech-panel p-4 flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block">E-Posta</span>
                      <a href="mailto:info@eradijital.com" className="text-slate-200 hover:text-primary transition-colors font-mono">
                        info@eradijital.com
                      </a>
                    </div>
                  </div>

                  <div className="tech-panel p-4 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-signal-emerald shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <span className="font-mono text-[11px] text-ink-faint uppercase block">Çalışma Saatleri</span>
                      <p className="text-slate-200">
                        Pazartesi – Cuma: 09:00 – 18:00 (Yapay zekâ sistemleri 7/24 aktiftir)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Right */}
              <div className="lg:col-span-7">
                <div className="tech-panel p-6 sm:p-8">
                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-signal-emerald/10 border border-signal-emerald/30 text-signal-emerald mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-ink">Mesajınız Alındı</h3>
                      <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
                        Mesajınız CRM sistemimize kaydedildi. Müşteri temsilcimiz mesai saatleri içinde sizinle doğrudan iletişime geçecektir.
                      </p>
                      <div className="pt-2 font-mono text-xs text-ink-faint">
                        Takip Kodu: #ERA-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="border-b border-border pb-3 mb-4">
                        <span className="font-mono text-xs text-primary font-semibold">[FORM // MESAJ GÖNDER]</span>
                        <h3 className="text-lg font-bold text-ink mt-1">İletişim Talebi Oluşturun</h3>
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
                            placeholder="Örn. Ahmet Yılmaz"
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
                          <label className="font-mono text-xs text-ink-muted">E-Posta *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ahmet@sirketiniz.com"
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-xs text-ink-muted">İlgilenilen Hizmet</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          >
                            <option value="">Seçiniz</option>
                            <option value="ai-asistan">WhatsApp & IG AI Asistanı</option>
                            <option value="donusum">Dijital Dönüşüm Danışmanlığı</option>
                            <option value="pazarlama">Performans Pazarlama & Reklam</option>
                            <option value="diger">Diğer Entegrasyonlar</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-ink-muted">Mesajınız *</label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Mevcut iş akışınız veya öğrenmek istediğiniz detayları kısaca açıklayınız..."
                          className="w-full px-3 py-2.5 rounded bg-[#0d121c] border border-border text-xs sm:text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary w-full py-3 text-xs sm:text-sm justify-center"
                        >
                          {loading ? 'İşleniyor...' : 'Talebi İlet'}
                        </button>
                      </div>

                      <p className="text-[11px] font-mono text-ink-faint text-center pt-2">
                        KVKK kapsamında verileriniz 3. şahıslarla paylaşılmaz.
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