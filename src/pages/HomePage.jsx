import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, AlertCircle, MessageSquare, Clock, Zap, ShieldCheck, TrendingUp, BarChart2, MessageCircle, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const painPoints = [
    { text: "WhatsApp mesajları günlerce birikiyor" },
    { text: "Instagram DM'leri zamanında yanıtlanamıyor" },
    { text: "Aynı sorular tekrar tekrar yazılıyor ve vakit kaybettiriyor" },
    { text: "Destek ekibi yoruluyor, müşteri beklemekten vazgeçiyor" },
  ];

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Randevu & Sipariş Akışları",
      desc: "Müşteri talepleri otomatik alınır, anında işlenir ve ilgili birimlere saniyeler içinde yönlendirilir."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-secondary" />,
      title: "Raporlama & Analiz",
      desc: "Yapay zeka tüm müşteri konuşmalarını analiz eder, trendleri çıkarır ve size anlık iş raporu sunar."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-accent" />,
      title: "AI Müşteri İletişimi",
      desc: "WhatsApp ve Instagram üzerinden gelen mesajları akıllı promptlar ve bilgi tabanıyla 7/24 yönetir."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Uçtan Uca Entegrasyonlar",
      desc: "Mevcut CRM, e-ticaret, muhasebe ve pazarlama sistemlerinizle tam entegre çalışır."
    }
  ];

  return (
    <>
      <SEO
        title="Yapay Zekâ Destekli Dijital Dönüşüm & Otomasyon | Era Dijital"
        description="Era Dijital, işletmelerin manuel iş yükünü azaltan, müşteri iletişimini hızlandıran ve operasyonları otomatik yöneten yapay zeka otomasyon sistemleri kurar."
      />

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/15 blur-[150px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                <Zap className="w-4 h-4" />
                <span>Yapay Zekâ Devrimi</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                Yapay Zekâ Destekli <br />
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Dijital Dönüşüm
                </span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                AI otomasyonlarıyla işlerinizi hızlandırın, sadeleştirin ve ölçeklendirin. Manuel iş yükünü azaltarak müşterilerinize 7/24 anında yanıt verin.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/on-analiz"
                  className="w-full sm:w-auto px-8 py-4 text-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Ücretsiz Ön Analiz Al
                </Link>
                <Link
                  to="/hizmetler"
                  className="w-full sm:w-auto px-8 py-4 text-center rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold transition-all hover:bg-white/10"
                >
                  Çözümlerimizi İncele
                </Link>
              </div>
            </motion.div>

            {/* Hero Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative group max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-30 blur-[40px] rounded-3xl group-hover:opacity-40 transition-opacity -z-10"></div>
                <img
                  src="https://eradijital.com/wp-content/uploads/2025/12/ai-006.jpg"
                  alt="İstanbul Yapay Zekâ ve Otomasyon Sistemleri Çözümleri - Era Dijital"
                  title="Yapay Zekâ ve Otomasyon Sistemleri İstanbul"
                  className="rounded-3xl border border-white/10 shadow-2xl w-full object-cover aspect-[4/5] max-h-[500px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-24 border-y border-white/5 relative bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                Sorun Daha Fazla Müşteri Değil, Gelen Talepleri Yönetememek
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Reklam yatırımları yapıp binlerce müşteri trafiği çekiyor olabilirsiniz. Ancak gelen mesajlara geç yanıt verdiğinizde potansiyel müşterilerinizi rakiplerinize kaptırırsınız. 
              </p>
              <div className="space-y-4">
                {painPoints.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3.5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 relative">
              <div className="absolute top-0 right-0 p-4 bg-primary/10 text-primary rounded-bl-3xl border-l border-b border-white/5">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Era Dijital Çözümü</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                İşletmenize özel entegre ettiğimiz AI sistemleri, tüm sosyal medya ve iletişim kanallarından gelen mesajları tek merkezden saniyeler içinde yanıtlar. Müşteriyi bekletmez, satış kaçırmaz ve ekibinizin üzerinden %90'a varan iş yükünü alır.
              </p>
              <Link
                to="/on-analiz"
                className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary group transition-colors"
              >
                <span>Hemen Analiz Başlat</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Neler Yapıyoruz?</h2>
            <p className="text-slate-400">
              Operasyonel süreçlerinizi yapay zeka ile otomatikleştirerek işletmenizi büyütüyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Process Section */}
      <section className="py-24 bg-surface/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Dijital Dönüşüm Sürecimiz</h2>
            <p className="text-slate-400">
              Süreçlerinizi baştan sona inceleyip adım adım AI altyapısına geçiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Progress lines (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 -translate-y-12 -z-10"></div>

            {[
              { step: "01", title: "Süreç Analizi", desc: "İş akışlarınızı inceliyor, darboğazları ve AI ile çözülebilecek süreçleri ekiplerinizle belirliyoruz.", image: "/resimler/dijital-donusum-surecimiz/surec-analizi.webp", alt: "Era Dijital İş Akışı ve Süreç Analizi - İstanbul Bahçeşehir" },
              { step: "02", title: "Akış Tasarımı", desc: "Müşteri yolculuklarını, cevap şablonlarını ve entegrasyon şemalarını projelendiriyoruz.", image: "/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp", alt: "Müşteri Yolculuğu ve Yapay Zeka Akış Tasarımı - Türkiye" },
              { step: "03", title: "AI Kurulumu", desc: "Prompt mühendisliği ve yazılım entegrasyonları ile sistemleri güvenle hayata geçiriyoruz.", image: "/resimler/dijital-donusum-surecimiz/ai-kurulumu.webp", alt: "Yapay Zeka Ajanı Kurulumu ve Prompt Mühendisliği - Era Dijital" },
              { step: "04", title: "Optimizasyon", desc: "Çalışan sistemleri canlı verilerle izleyip sürekli eğitiyor, performanslarını optimize ediyoruz.", image: "/resimler/dijital-donusum-surecimiz/optimizasyon.webp", alt: "Yapay Zeka Performans Optimizasyonu ve Model Eğitimi" }
            ].map((step, index) => (
              <div key={index} className="glass-card p-6 rounded-3xl relative flex flex-col justify-between overflow-hidden group">
                <div className="space-y-4">
                  <span className="text-5xl font-black bg-gradient-to-br from-primary/40 to-secondary/10 bg-clip-text text-transparent block">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mt-6 border border-white/5">
                  <img src={step.image} alt={step.alt} title={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30 blur-[100px] -z-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            İş Yükünü Azaltmak, Operasyonu AI ile Ölçeklemek İster misiniz?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Era Dijital, işletmenize özel 7/24 çalışan otomasyon sistemleri kurar. Bugün başlayan işletmeler yarından kazanır.
          </p>
          <div className="pt-4">
            <Link
              to="/on-analiz"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0 text-lg"
            >
              <span>Ücretsiz Ön Analiz Talep Et</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
