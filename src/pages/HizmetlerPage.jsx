import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Check, Cpu, MessageSquare, LineChart, Layers, HelpCircle, UserCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HizmetlerPage = () => {
  return (
    <>
      <SEO
        title="Hizmetlerimiz | Era Dijital"
        description="AI Otomasyon Sistemleri, Dijital Dönüşüm Danışmanlığı ve Performans Odaklı Dijital Pazarlama hizmetlerimizin detayları."
      />

      <Header />

      {/* Services Hero */}
      <section className="relative py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-secondary/5 blur-[180px] rounded-full pointer-events-none -z-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold tracking-wider uppercase"
          >
            <Cpu className="w-4 h-4" />
            <span>Hizmet Kapsamı</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white"
          >
            AI Otomasyon & Dönüşüm Çözümleri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Tekrarlayan işleri yapay zekâya bırakın. Era Dijital, operasyon yükünüzü hafifleten akıllı senaryolar ve entegre sistemler kurar.
          </motion.p>
        </div>
      </section>

      {/* Service 1: Dijital Dönüşüm Danışmanlığı */}
      <section className="py-24 border-b border-white/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span>Modül 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Dijital Dönüşüm Danışmanlığı
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Dijital dönüşüm; sadece yeni bir yazılım kurmak değil, süreçleri yeniden tasarlamaktır. İşletmenizin tüm iş akışlarını derinlemesine inceliyor, verimsiz noktaları tespit ediyor ve dijital çağa uygun olarak yeniden tasarlıyoruz.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm">Sunulan Çözümler:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-sm">
                {["Manuel süreç analizi", "Operasyonel tasarım", "Dijital iş akışları kurulumu", "Talep & kayıt takip sistemleri", "Müşteri yolculuğu optimizasyonu", "KVKK uyumlu güvenli altyapı"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-3xl -z-10"></div>
            <img 
              src="/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp" 
              alt="İstanbul Bahçeşehir Dijital Dönüşüm ve Süreç Analizi Danışmanlığı - Era Dijital" 
              title="Dijital Dönüşüm Danışmanlığı İstanbul"
              className="rounded-3xl border border-white/10 shadow-2xl max-h-[450px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Service 2: AI Otomasyon Sistemleri */}
      <section className="py-24 border-b border-white/5 bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative flex justify-center">
            <div className="absolute inset-0 bg-secondary/10 blur-[40px] rounded-3xl -z-10"></div>
            <img 
              src="/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp" 
              alt="Yapay Zekâ ve WhatsApp Ajanı Entegrasyonu İstanbul - Era Dijital AI Otomasyon" 
              title="Yapay Zekâ Otomasyon Sistemleri"
              className="rounded-3xl border border-white/10 shadow-2xl max-h-[450px] w-full object-cover"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold">
              <span>Modül 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              AI Otomasyon Sistemleri (WhatsApp & Instagram)
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Tekrarlanan müşteri mesajlarını yönetmek için hazır botlar değil, işletme veri tabanınız ve kurallarınızla beslenen akıllı yapay zeka ajanları kuruyoruz. 7/24 kesintisiz, insan gibi sohbet edebilen akışlar tasarlıyoruz.
            </p>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm">Otomatikleştirdiğimiz Süreçler:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-sm">
                {["Instagram DM & WhatsApp yanıtları", "Sık sorulan sorular (SSS)", "Randevu & sipariş alma akışları", "Teklif talebi toplama", "CRM'e otomatik müşteri kaydı", "Satış sonrası takip & anket"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-secondary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Dijital Pazarlama Hizmetleri */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold">
              <span>Modül 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Performans Odaklı Dijital Pazarlama
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Yapay zeka otomasyon sistemlerimizle doğrudan entegre çalışan reklam kampanyaları kurguluyoruz. Reklamdan gelen trafiğin saniyeler içinde AI tarafından karşılanması sayesinde bütçenizi boşa harcamıyor, satışlarınızı artırıyoruz.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl h-fit">
                  <LineChart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Sosyal Medya Reklam Yönetimi</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Meta (Facebook/Instagram), TikTok ve Google Ads üzerinde işletmenize özel performans odaklı reklam kurguları.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl h-fit">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Yeniden Hedefleme (Retargeting)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Sitenizi veya sosyal medya hesaplarınızı ziyaret etmiş ancak alışveriş yapmamış kitleleri akıllı reklamlarla yakalama.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-accent/10 blur-[40px] rounded-3xl -z-10"></div>
            <img 
              src="/resimler/hizmetler/performans-odakli-dijital-pazarlama.webp" 
              alt="Sosyal Medya ve Google Performans Reklam Yönetimi Türkiye - Era Dijital Pazarlama" 
              title="Performans Odaklı Dijital Pazarlama"
              className="max-h-[450px] w-auto object-contain animate-float"
            />
          </div>
        </div>
      </section>

      {/* Services Call to Action */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">İşletmenize En Uygun Çözümü Birlikte Seçelim</h2>
          <p className="text-slate-300 leading-relaxed">
            Hangi süreçlerinizi otomatik hale getirebileceğinizi öğrenmek için ücretsiz bir ön analiz görüşmesi ayarlayabilirsiniz.
          </p>
          <div className="pt-4">
            <Link
              to="/on-analiz"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-block"
            >
              Ücretsiz Ön Analiz Talep Edin
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HizmetlerPage;
