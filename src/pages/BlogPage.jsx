import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogPosts } from '../data/blogPosts';

const API_URL = import.meta.env.VITE_PANEL_API_URL || '';

export default function BlogPage() {
  const [posts, setPosts] = useState(() => getBlogPosts());
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleLocalUpdate = (e) => {
      if (e.detail) {
        setPosts(e.detail);
      } else {
        setPosts(getBlogPosts());
      }
    };
    window.addEventListener('era_blog_updated', handleLocalUpdate);

    const fetchApiPosts = async () => {
      if (!API_URL) return;
      try {
        const res = await fetch(`${API_URL}/blog.php`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (err) {
        // API fallback
      }
    };

    fetchApiPosts();

    return () => window.removeEventListener('era_blog_updated', handleLocalUpdate);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title="Blog & Güncel AI Makaleleri | Era Dijital"
        description="Yapay zekâ otomasyonları, dijital dönüşüm süreçleri ve performans pazarlaması hakkında teknik makaleler ve rehberler."
      />

      <Header />

      <main className="flex-1">
        {/* Intro */}
        <section className="py-16 hairline-b bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="mono-tag">[BİLGİ MERKEZİ // TEKNİK REHBERLER]</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                Yapay Zekâ ve Otomasyon Notları
              </h1>
              <p className="text-sm text-ink-muted leading-relaxed">
                İşletmenizi büyütmenizi sağlayacak yapay zekâ uygulamaları, webhook senaryoları ve dönüşüm vaka analizleri.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Konu veya anahtar kelime ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#0d121c] border border-border rounded text-xs text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-xs font-mono text-ink-muted">
              Arama kriterlerine uygun makale bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const imageSrc = post.featured_image || '/resimler/placeholder.webp';
                const dateStr = new Date(post.published_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <article
                    key={post.id}
                    className="tech-panel-interactive p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {imageSrc && (
                        <div className="h-44 w-full rounded bg-[#0b0e16] border border-border/80 overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-[11px] font-mono text-ink-faint">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                        <span>•</span>
                        <span>{post.category || 'AI Otomasyon'}</span>
                      </div>

                      <h2 className="text-base font-bold text-ink leading-snug">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-primary font-semibold hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>İncele</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="font-mono text-[10px] text-ink-faint">
                        {post.read_time || '4 dk okuma'}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}