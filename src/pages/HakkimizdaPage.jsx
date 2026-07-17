import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HakkimizdaPage = () => {
  const benefits = [
    { title: "Müşteri İletişim Hızını Artırır", desc: "WhatsApp ve Instagram'da yanıt süreleri 10 saniyenin altına düşer, müşteriler anında yanıt alır." },
    { title: "Operasyon Maliyetini Düşürür", desc: "Büyüyen mesaj trafiğinize ek müşteri temsilcisi istihdam etmek yerine otomasyonla tasarruf sağlarsınız." },
    { title: "Ekibi Stratejik İşlere Yönlendirir", desc: "Temsilcileriniz tekrar eden kopyala-yapıştır sorulardan kurtulur, doğrudan satış odaklı işlere yönelir." },
    { title: "Pazarlama Performansını Yükseltir", desc: "Reklamlardan gelen trafik anında karşılandığı için dönüşüm oranları ve ROI belirgin şekilde artar." },
    { title: "Manuel İş Yükünü %60-%90 Azaltır", desc: "Tüm sık sorulan sorular, randevu akışları ve ön kayıtlar insan müdahalesi olmadan tamamlanır." },
  ];

  return (
    <>
      <SEO
        title="Hakkımızda | Era Dijital"
        description="Era Dijital, uzun yıllara dayanan dijital pazarlama tecrübesi ile yapay zekâ teknolojisini birleştirerek işletmelere özel AI operasyon sistemleri kurar."
      />

      <Header />

      {/* Intro Hero */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-10 left-1/2 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold text-white"
          >
            Yapay Zekâ ile Geleceği Tasarlıyoruz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Era Dijital olarak uzun yıllara dayanan dijital medya ve pazarlama tecrübemizi; bugün iş dünyasının en büyük devrimi olan <strong>Yapay Zekâ (AI)</strong> ile birleştiriyoruz.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6">
          <div className="p-3.5 bg-primary/10 text-primary rounded-2xl w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Vizyonumuz</h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            Türkiye'de ve globalde, yapay zekâ tabanlı operasyon sistemleri denildiğinde akla gelen ilk dönüşüm partneri olmak. Daha akıllı, daha hızlı ve daha verimli işletmelerin geleceğini tasarlamak.
          </p>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6">
          <div className="p-3.5 bg-secondary/10 text-secondary rounded-2xl w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Misyonumuz</h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            İşletmelerin tekrarlayan, manuel ve yorucu süreçlerini yapay zeka entegrasyonlarıyla otomatik hale getirmek. İnsan kaynağını daha stratejik, yaratıcı ve yüksek katma değerli alanlara kaydırmalarını sağlamak.
          </p>
        </div>
      </section>

      {/* Target Audience Sektörler */}
      <section className="py-24 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Kiminle Çalışıyoruz?</h2>
              <p className="text-slate-400 leading-relaxed">
                Yoğun mesaj trafiği olan, operasyon yükü artan ve müşteri iletişimini hızlandırmak isteyen tüm işletmeler ile çalışıyoruz.
              </p>
              <p className="text-sm font-semibold text-slate-300">En çok fayda sağladığımız sektörler:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "E-ticaret Firmaları",
                  "Güzellik Merkezleri",
                  "Özel Klinikler",
                  "Teknik Servisler",
                  "Hizmet Odaklı Markalar",
                  "Çağrı Merkezi Yükü Yüksek İşletmeler"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-primary/15 blur-[40px] rounded-3xl -z-10"></div>
              <img 
                src="https://eradijital.com/wp-content/uploads/2025/12/AI-Illustrations_06.png" 
                alt="Era Dijital İllüstrasyon" 
                className="max-h-[400px] w-auto object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / İş Modeli */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Sizi Güçlendiren Dijital İş Modeli</h2>
          <p className="text-slate-400">
            Era Dijital otomasyon altyapısına geçen işletmelerin elde ettiği kazanımlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-card glass-card-hover p-8 rounded-3xl space-y-4">
              <span className="text-primary font-bold text-sm tracking-wide block uppercase">
                Fayda #{index + 1}
              </span>
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
          
          {/* CTA Box inside Grid */}
          <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Hazır mısınız?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                İşletmenizi yapay zekâ entegrasyonlarıyla geleceğe taşımak için bugün ilk adımı atın.
              </p>
            </div>
            <Link
              to="/on-analiz"
              className="inline-flex items-center px-6 py-3.5 mt-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg hover:shadow-primary/30 group transition-all"
            >
              <span>Tanışma Toplantısı Ayarla</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HakkimizdaPage;
