import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Intro */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="p-1.5 bg-primary/10 rounded-xl border border-primary/20">
                <img src="/logo.png" alt="Era Dijital Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-lg font-bold text-white">Era Dijital</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Era Dijital olarak uzun yıllara dayanan dijital medya ve pazarlama tecrübemizi; bugün iş dünyasının en büyük devrimi olan <strong>Yapay Zeka (AI)</strong> ile birleştiriyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl border border-white/5 hover:border-primary/20 text-slate-400 hover:text-white transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl border border-white/5 hover:border-primary/20 text-slate-400 hover:text-white transition-all">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl border border-white/5 hover:border-primary/20 text-slate-400 hover:text-white transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Şirket</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/hakkimizda" className="text-sm text-slate-400 hover:text-white transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/hizmetler" className="text-sm text-slate-400 hover:text-white transition-colors">Hizmetlerimiz</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/fiyatlar" className="text-sm text-slate-400 hover:text-white transition-colors">Fiyatlar</Link>
              </li>
              <li>
                <Link to="/on-analiz" className="text-sm text-slate-400 hover:text-white transition-colors">Ücretsiz Ön Analiz</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Esenkent Mah. Cemalpaşa Cad. No.30/C Bahçeşehir / İstanbul
                </span>
              </li>
              <li className="flex items-center space-x-3.5">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+905433619239" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +90 543 361 92 39
                </a>
              </li>
              <li className="flex items-center space-x-3.5">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@eradijital.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@eradijital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Era Dijital. Tüm Hakları Saklıdır.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-300">KVKK Aydınlatma Metni</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
