import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogPostBySlug } from '../data/blogPosts';

const API_URL = import.meta.env.VITE_PANEL_API_URL || '';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => getBlogPostBySlug(slug));
  const [loading] = useState(false);

  useEffect(() => {
    const handleLocalUpdate = () => {
      setPost(getBlogPostBySlug(slug));
    };
    window.addEventListener('era_blog_updated', handleLocalUpdate);

    const fetchApiPost = async () => {
      if (!API_URL) return;
      try {
        const res = await fetch(`${API_URL}/blog.php?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && !data.status && data.title) {
            setPost(data);
          }
        }
      } catch (err) {
        // Fallback
      }
    };

    fetchApiPost();

    return () => window.removeEventListener('era_blog_updated', handleLocalUpdate);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-background text-ink">
        <Header />
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-background text-ink">
        <Header />
        <div className="max-w-xl mx-auto text-center py-40 space-y-4 px-4">
          <span className="mono-tag">[404 // BULUNAMADI]</span>
          <h2 className="text-2xl font-bold text-ink">Yazı Bulunamadı</h2>
          <p className="text-sm text-ink-muted">Aradığınız makale mevcut değil veya yayından kaldırılmış olabilir.</p>
          <div className="pt-2">
            <Link to="/blog" className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tüm Makalelere Dön</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const imageSrc = post.featured_image || '/resimler/placeholder.webp';
  const dateStr = new Date(post.published_at).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-primary selection:text-white">
      <SEO
        title={`${post.seo_title || post.title} | Era Dijital Blog`}
        description={post.seo_description || post.excerpt}
      />

      <Header />

      <main className="flex-1 py-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back Nav */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[GERİ // BLOG DİZİNİ]</span>
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-faint border-y border-border py-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{dateStr}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>{post.author_name || 'Era Dijital Teknik Ekip'}</span>
              </div>
              {post.category && (
                <>
                  <span>•</span>
                  <span className="mono-tag text-[10px]">{post.category}</span>
                </>
              )}
            </div>
          </div>

          {/* Hero Thumbnail */}
          {imageSrc && (
            <div className="tech-panel overflow-hidden bg-[#0d111a] border border-border">
              <img
                src={imageSrc}
                alt={post.title}
                className="w-full h-auto max-h-[440px] object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div 
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base pt-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-ink-muted">
              Yapay zekâ otomasyonu hakkında daha fazla bilgi almak için ön analiz toplantısı talep edebilirsiniz.
            </div>
            <Link to="/on-analiz" className="btn-primary text-xs shrink-0">
              Ücretsiz Ön Analiz Al
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}