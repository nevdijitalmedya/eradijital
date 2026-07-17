import { useState } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, ClipboardCheck, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OnAnalizPage = () => {
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO
        title="Ücretsiz Ön Analiz Talep Formu | Era Dijital"
        description="İşletmenize özel dijital dönüşüm ve AI otomasyon ihtiyaçlarını belirlemek için ücretsiz ön analiz formumuzu doldurun."
      />

      <Header />

      <section className="py-20 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase">
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Ön Analiz</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white leading-tight">
                  Ücretsiz Dijital Dönüşüm Ön Analizi
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  İş yükünüzü azaltmak, müşteri iletişimini hızlandırmak ve operasyonu daha verimli hale getirmek için işletmenize özel bir ön analiz hazırlıyoruz.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Analiz Sonucunda Ne Kazanacaksınız?</h3>
                <div className="space-y-4">
                  {[
                    "İşletmenize özel dijital dönüşüm raporu",
                    "Hemen uygulanabilir AI otomasyon önerileri",
                    "Verimlilik kazanımlarının ROI hesabı",
                    "Entegrasyon ihtiyaçları analizi ve yol haritası"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 text-slate-300">
                      <div className="p-1 bg-primary/10 text-primary rounded-lg shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-surface/50 text-xs text-slate-500 leading-relaxed">
                Bu analiz tamamen <strong>ücretsizdir</strong> ve hiçbir yükümlülük içermez. Paylaştığınız tüm bilgiler KVKK kapsamında güvence altındadır.
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">Analiz Talep Formu</h3>
                    <p className="text-xs text-slate-400 mb-6">Lütfen aşağıdaki alanları eksiksiz doldurun. Ekibimiz en geç 24 saat içinde dönüş sağlayacaktır.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">Ad Soyad *</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ahmet Yılmaz"
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">Firma Adı *</label>
                          <input
                            type="text"
                            required
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Era Dijital A.Ş."
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">E-posta Adresi *</label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ahmet@firma.com"
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">Telefon Numarası *</label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0532 123 45 67"
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">Çalışan Sayısı</label>
                        <select
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                        >
                          <option value="1-5">1 - 5 Çalışan</option>
                          <option value="5-20">5 - 20 Çalışan</option>
                          <option value="20-50">20 - 50 Çalışan</option>
                          <option value="50+">50+ Çalışan</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">En Çok Zaman Alan Darboğaz Süreç *</label>
                        <textarea
                          required
                          name="bottleneck"
                          rows={3}
                          value={formData.bottleneck}
                          onChange={handleChange}
                          placeholder="Müşterilerin sorduğu benzer soruları cevaplamak, randevuları teyit etmek, verileri excel'e el ile girmek..."
                          className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">Kullandığınız Yazılımlar / CRM Sistemleri</label>
                        <textarea
                          name="software"
                          rows={2}
                          value={formData.software}
                          onChange={handleChange}
                          placeholder="Paraşüt, Hubspot, Trello, Shopify..."
                          className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span>Ön Analiz Talebini Gönder</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 rounded-3xl border border-primary/20 bg-primary/5 text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="p-4 bg-primary/10 text-primary border border-primary/20 rounded-full animate-bounce">
                        <CheckCircle className="w-12 h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">Talebiniz Alındı!</h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Sayın {formData.name}, {formData.company} firması için ön analiz talebiniz başarıyla kaydedilmiştir. Uzmanlarımız 24 saat içerisinde sizinle iletişime geçecektir.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OnAnalizPage;
