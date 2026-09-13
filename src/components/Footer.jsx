import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#070a10] text-ink">
      {/* Top Status Strip */}
      <div className="border-b border-border/70 py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-faint">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-emerald"></span>
          <span>SİSTEM DURUMU: TÜM ALTYAPI NOMİNAL // 7/24 İZLEME AKTİF</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Gecikme: &lt;1.5s</span>
          <span>•</span>
          <span>SLA: %99.9</span>
          <span>•</span>
          <span>Bölge: TR-IST</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Intro */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-surface border border-border flex items-center justify-center text-primary font-mono font-bold text-xs">
                ERA
              </div>
              <span className="font-display font-semibold text-base text-ink">Era Dijital</span>
            </Link>
            <p className="text-xs text-ink-muted leading-relaxed">
              İşletmelerin operasyonel yükünü hafifleten, WhatsApp, web ve CRM kanallarını birbirine bağlayan yapay zekâ otomasyon sistemleri ve dijital dönüşüm çözümleri.
            </p>
            <div className="pt-2 flex gap-3 font-mono text-xs text-ink-faint">
              <span className="mono-tag">AI ARCHITECTURE</span>
              <span className="mono-tag">AUTOMATION</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <span className="font-mono text-xs text-ink-faint uppercase tracking-wider block mb-4">
              [NAVİGASYON]
            </span>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>
                <Link to="/" className="hover:text-ink transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/hizmetler" className="hover:text-ink transition-colors">Hizmetlerimiz & Modüller</Link>
              </li>
              <li>
                <Link to="/fiyatlar" className="hover:text-ink transition-colors">Paketler & Fiyatlandırma</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="hover:text-ink transition-colors">Hakkımızda & Yaklaşımımız</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-ink transition-colors">Teknik Blog & Rehberler</Link>
              </li>
              <li>
                <Link to="/on-analiz" className="hover:text-ink text-primary transition-colors flex items-center gap-1 font-semibold">
                  <span>Ücretsiz Ön Analiz Al</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <span className="font-mono text-xs text-ink-faint uppercase tracking-wider block mb-4">
              [ÇÖZÜM MODÜLLERİ]
            </span>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>WhatsApp & Instagram AI Asistanları</li>
              <li>CRM & Webhook Veri Köprüleri</li>
              <li>Otomatik Randevu & Sipariş Akışları</li>
              <li>7/24 Şirket Bilgi Tabanı (RAG)</li>
              <li>Performans Analitiği & Dönüşüm Optimizasyonu</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-ink-faint uppercase tracking-wider block mb-4">
              [İLETİŞİM BİLGİLERİ]
            </span>
            <ul className="space-y-3 text-xs text-ink-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Esenkent Mah. Cemalpaşa Cad. No:30/C Bahçeşehir / İstanbul
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+905433619239" className="hover:text-ink transition-colors">
                  +90 543 361 92 39
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@eradijital.com" className="hover:text-ink transition-colors">
                  info@eradijital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink-faint font-mono">
          <p>
            &copy; {new Date().getFullYear()} Era Dijital. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-ink cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-ink cursor-pointer">KVKK Aydınlatma Metni</span>
            <span className="hover:text-ink cursor-pointer">Hizmet Sözleşmesi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}