import { useState } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, HeartHandshake } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IletisimPage = () => {
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
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
        title="İletişim | Era Dijital"
        description="Yapay zekâ otomasyon ve dijital pazarlama süreçlerimiz hakkında soru sormak veya görüşme ayarlamak için bizimle iletişime geçin."
      />

      <Header />

      <section className="py-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>İletişim</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white">Bizimle İletişime Geçin</h1>
            <p className="text-slate-400">
              Yapay zeka dönüşüm süreçlerimiz, hizmetlerimiz veya otomasyon çözümlerimizle ilgili her türlü sorunuz için buradayız.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Phone Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Bizi Arayın</h4>
                  <a href="tel:+905433619239" className="text-sm text-slate-400 hover:text-white transition-colors">
                    +90 543 361 92 39
                  </a>
                  <p className="text-xs text-slate-500 mt-1">Pazartesi - Cumartesi: 09:00 - 19:00</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">E-posta Gönderin</h4>
                  <a href="mailto:info@eradijital.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                    info@eradijital.com
                  </a>
                  <p className="text-xs text-slate-500 mt-1">Sorularınız için 7/24 yazabilirsiniz.</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Adresimiz</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Esenkent Mah. Cemalpaşa Cad. No.30/C Bahçeşehir / İstanbul
                  </p>
                </div>
              </div>

              {/* Static / Interactive map container */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/5 bg-slate-900">
                <iframe
                  title="Era Dijital Adres Haritası"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.3845012543956!2d28.6791!3d41.0667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzAwLjEiTiAyOMKwNDAnNDQuOCJF!5e0!3m2!1str!2str!4v1600000000000!5m2!1str!2str"
                  className="w-full h-full border-0 grayscale opacity-80 contrast-125"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Mesaj Gönderin</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">Adınız Soyadınız *</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Can Demir"
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-300 uppercase">Telefon Numarası</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0532 999 88 77"
                            className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">E-posta Adresi *</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="can@example.com"
                          className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">Konu *</label>
                        <input
                          type="text"
                          required
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="AI Otomasyon hakkında bilgi almak istiyorum"
                          className="w-full px-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 uppercase">Mesajınız *</label>
                        <textarea
                          required
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="İşletmemizin süreçlerini otomatikleştirmek için randevu talep etmek istiyoruz..."
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
                            <span>Mesajı Gönder</span>
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
                      <div className="p-4 bg-primary/10 text-primary border border-primary/20 rounded-full">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">Mesajınız Ulaştı!</h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Mesajınız başarıyla iletilmiştir. Era Dijital ekibi en kısa sürede e-posta adresiniz üzerinden sizinle irtibata geçecektir.
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

export default IletisimPage;
