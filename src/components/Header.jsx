import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Fiyatlar', path: '/fiyatlar' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center text-primary font-mono font-bold text-sm tracking-tighter group-hover:border-primary/50 transition-colors">
              ERA
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-base tracking-tight text-ink">
                Era Dijital
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                AI & Otomasyon
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-ink bg-surface-elevated font-semibold'
                    : 'text-ink-muted hover:text-ink hover:bg-surface'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
              <span className="w-2 h-2 rounded-full bg-signal-emerald"></span>
              <span>Sistem Aktif</span>
            </div>
            <Link
              to="/on-analiz"
              className="btn-primary py-2 px-3.5 text-xs flex items-center gap-1.5"
            >
              <span>Ön Analiz Al</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-ink-muted hover:text-ink rounded bg-surface border border-border focus:outline-none"
              aria-label="Menüyü aç/kapat"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-surface-elevated text-ink font-semibold border-l-2 border-primary'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-elevated'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/on-analiz"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full py-2.5 text-xs text-center justify-center"
              >
                Ücretsiz Ön Analiz Al
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}