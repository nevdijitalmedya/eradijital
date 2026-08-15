import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { getBlogPostBySlug } from '../data/blogPosts';

const API_URL = import.meta.env.VITE_PANEL_API_URL || '';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(() => getBlogPostBySlug(slug));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Dinamik Event Listener (AdminModal üzerinden güncellendiğinde yenile)
    const handleLocalUpdate = () => {
      setPost(getBlogPostBySlug(slug));
    };
    window.addEventListener('era_blog_updated', handleLocalUpdate);

    // 2. Harici API varsa API'den de sorgula
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
        // API çalışmıyorsa sessizce yerel verileri koru
      }
    };

    fetchApiPost();

    return () => window.removeEventListener('era_blog_updated', handleLocalUpdate);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="max-w-xl mx-auto text-center py-40 space-y-6">
          <h2 className="text-2xl font-bold text-white">Yazı Bulunamadı</h2>
          <p className="text-slate-400">Aradığınız makale mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/blog" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bloga geri dön
          </Link>
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
    <>
      <SEO
        title={`${post.seo_title || post.title} | Era Dijital Blog`}
        description={post.seo_description || post.excerpt}
      />

      <Header />

      <article className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm Yazılar
        </Link>

        {/* Post Header */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4.5 h-4.5 text-primary" />
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>{post.author_name || 'Era Dijital'}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-slate-900 border border-white/5 rounded-3xl">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content (HTML from WYSIWYG editor) */}
        <div 
          className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </>
  );
};

export default BlogPostPage;
