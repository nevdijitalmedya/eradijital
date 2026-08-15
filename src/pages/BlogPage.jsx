import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { getBlogPosts } from '../data/blogPosts';

const API_URL = import.meta.env.VITE_PANEL_API_URL || '';

const BlogPage = () => {
  const [posts, setPosts] = useState(() => getBlogPosts());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 1. Dinamik Event Listener (AdminModal üzerinden anlık güncelleme)
    const handleLocalUpdate = (e) => {
      if (e.detail) {
        setPosts(e.detail);
      } else {
        setPosts(getBlogPosts());
      }
    };
    window.addEventListener('era_blog_updated', handleLocalUpdate);

    // 2. Eğer harici API tanımlıysa API'den de senkronize et
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
        // API çalışmıyorsa sessizce yerel verileri koru
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
    <>
      <SEO
        title="Blog & Güncel AI Makaleleri | Era Dijital"
        description="Yapay zeka otomasyonları, dijital dönüşüm süreçleri ve performans pazarlaması hakkında güncel makaleler ve rehberler."
      />

      <Header />

      {/* Blog Intro */}
      <section className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Era Dijital Blog</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white">
              Bilgi Merkezi & Rehberler
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              İşinizi büyütmenizi sağlayacak yapay zekâ ipuçları, otomasyon senaryoları ve vaka analizleri.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Makale ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl focus:border-primary focus:outline-none text-white text-sm transition-all"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            Aradığınız kriterlere uygun makale bulunamadı.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const imageSrc = post.featured_image || '/resimler/placeholder.webp';
              const dateStr = new Date(post.published_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden bg-slate-900 border-b border-white/5">
                      <img
                        src={imageSrc}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author_name || 'Era Dijital'}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold text-primary hover:text-secondary group transition-colors"
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
