import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Edit, Trash2, Save, Download, Copy, Check, 
  RotateCcw, Eye, EyeOff, Lock, Unlock, FileText, Image, Sparkles, KeyRound, Globe,
  Link2, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, ExternalLink
} from 'lucide-react';
import { 
  getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, 
  resetBlogPosts, slugify, DEFAULT_POSTS, syncPostsWithServer, 
  uploadImageToServer, fetchPostsFromServer 
} from '../data/blogPosts';

const ADMIN_PASSWORD = 'admin'; // Yönetici giriş şifresi

export default function AdminBlogModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'edit', 'export', 'api'
  const [editingId, setEditingId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // API & Webhook State
  const [copiedKey, setCopiedKey] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [apiTesting, setApiTesting] = useState(false);
  const [apiTestResult, setApiTestResult] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`📋 ${label} kopyalandı!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleTestApi = async () => {
    setApiTesting(true);
    setApiTestResult(null);
    try {
      const res = await fetch('/panel/api/publish-post.php?test=1', {
        headers: { 'X-API-KEY': 'era_secret_key_2026' }
      });
      if (res.ok) {
        const data = await res.json();
        setApiTestResult({ success: true, message: `Bağlantı Başarılı ✓ (${data.site || 'Era Dijital'} - Versiyon: ${data.version || '1.0'})` });
      } else {
        setApiTestResult({ success: false, message: `HTTP Hata: ${res.status} (Sunucu yanıt vermedi)` });
      }
    } catch (e) {
      setApiTestResult({ success: false, message: `Bağlantı testi yapılamadı (${e.message})` });
    } finally {
      setApiTesting(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author_name: 'Era Dijital Ekibi',
    published_at: new Date().toISOString().split('T')[0],
    featured_image: '/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp',
    excerpt: '',
    content: '',
    seo_title: '',
    seo_description: ''
  });

  // AI Generator State
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('Yapay Zeka & Otomasyon');
  const [aiTone, setAiTone] = useState('Eğitici & Rehber');
  const [aiKeywords, setAiKeywords] = useState('');
  const [aiApiKey, setAiApiKey] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('era_ai_api_key') || '' : '';
  });
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const CATEGORIES = [
    'Yapay Zeka & Otomasyon',
    'Dijital Dönüşüm',
    'WhatsApp & Chatbot Entegrasyonu',
    'E-Ticaret & Satış Artırma',
    'CRM & Müşteri İlişkileri',
    'Performans Pazarlama & Reklam',
    'Klinik & Randevu Otomasyonu'
  ];

  // AI ile Otomatik Blog Yazısı Üretme Fonksiyonu
  const handleGenerateWithAI = async (e) => {
    e.preventDefault();
    if (!aiTopic.trim()) {
      alert('Lütfen bir konu veya anahtar kelime girin.');
      return;
    }

    setIsAiGenerating(true);

    try {
      // Eğer kullanıcının Gemini / OpenAI API anahtarı varsa canlı API'ye bağlan
      if (aiApiKey.trim()) {
        localStorage.setItem('era_ai_api_key', aiApiKey.trim());
        
        // Gemini API çağrısı
        const prompt = `Sen Era Dijital (Yapay Zeka & Dijital Dönüşüm Ajansı) için uzman bir SEO içerik yazarı ve büyüme uzmanısın.
Konu: "${aiTopic}"
Kategori: "${aiCategory}"
Ton: "${aiTone}"
Anahtar Kelimeler: "${aiKeywords}"

Lütfen aşağıdaki JSON formatında, Türkçe, son derece akıcı, profesyonel, zengin HTML etiketleri (h2, h3, p, strong, ul, li, blockquote) içeren eksiksiz bir blog yazısı üret:
{
  "title": "Çarpıcı ve tıklama oranı yüksek SEO uyumlu başlık",
  "slug": "turkce-karakter-icermeyen-seo-uyumlu-slug",
  "excerpt": "Blog listesinde görünecek 2-3 cümlelik çekici özet",
  "content": "<p>Giriş paragrafı...</p><h2>...</h2><p>...</p><h3>...</h3><ul><li>...</li></ul><blockquote>...</blockquote>",
  "seo_title": "Google'da görünecek 60 karakterlik SEO Başlığı | Era Dijital",
  "seo_description": "Google'da görünecek 150-160 karakterlik SEO Açıklaması",
  "category": "${aiCategory}"
}
SADECE geçerli JSON formatında yanıt ver, markdown backtick koyma.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${aiApiKey.trim()}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (res.ok) {
          const apiData = await res.json();
          const rawText = apiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedText);

          setFormData({
            title: parsed.title || aiTopic,
            slug: parsed.slug || slugify(parsed.title || aiTopic),
            author_name: 'Era Dijital AI Lab',
            published_at: new Date().toISOString().split('T')[0],
            featured_image: '/resimler/blog/otonom-ai-ajanlari-rehberi-hero.jpg',
            excerpt: parsed.excerpt || '',
            content: parsed.content || '',
            seo_title: parsed.seo_title || `${parsed.title} | Era Dijital`,
            seo_description: parsed.seo_description || parsed.excerpt
          });

          showToast('✨ AI blog yazısını saniyeler içinde başarıyla üretti!');
          setActiveTab('edit');
          setIsAiGenerating(false);
          return;
        }
      }

      // API anahtarı yoksa akıllı hazır SEO şablon motoru ile eksiksiz yazı üret
      await new Promise(r => setTimeout(r, 800)); // Doğal gecikme simülasyonu

      const cleanTitle = aiTopic.charAt(0).toUpperCase() + aiTopic.slice(1);
      const generatedSlug = slugify(cleanTitle);

      const generatedContent = `
<p>2026 yılı itibarıyla <strong>${cleanTitle}</strong> konusu, işletmelerin verimlilik ve büyüme hedeflerinde en kritik stratejik başlıklardan biri haline geldi. Manuel süreçlerin yarattığı zaman kaybını sıfırlamak ve operasyonel maliyetleri düşürmek isteyen şirketler için yapay zeka entegrasyonları artık bir lüks değil, temel bir zorunluluk.</p>

<h2>Neden ${cleanTitle} İşletmeniz İçin Kritik?</h2>
<p>Geleneksel iş modelleri, artan müşteri taleplerine yetişmekte zorlanırken; <strong>${aiCategory}</strong> alanında kurulan otonom sistemler, insan hatasını ortadan kaldırarak 7/24 kesintisiz çalışma avantajı sağlar.</p>

<h3>1. 7/24 Kesintisiz Yanıt ve Hızlı Aksiyon</h3>
<p>Potansiyel müşterilerinizin en aktif olduğu saatlerde onlara anında dönüş yaparak satış kapatma oranlarınızı <strong>%60'ın üzerinde artırabilirsiniz</strong>.</p>

<h3>2. Uçtan Uca Entegrasyon ve Veri Senkronizasyonu</h3>
<p>CRM, WhatsApp, e-posta ve muhasebe sistemlerinizin birbiriyle pürüzsüz konuşmasını sağlayarak ekiplerinizin angarya işlere harcadığı saatleri stratejik kararlara yönlendirebilirsiniz.</p>

<h3>3. Ölçülebilir Büyüme ve Akıllı Analitik</h3>
<p>Sürecin her adımında elde edilen veriler analiz edilerek hangi kanalların en yüksek dönüşümü getirdiği net olarak raporlanır.</p>

<blockquote>
  "Doğru kurgulanmış bir yapay zeka otomasyonu, işletmenizin kapasitesini çalışan sayısını artırmadan 10 katına çıkarmanın en hızlı yoludur."
</blockquote>

<h2>Era Dijital ile Adım Adım Nasıl Başlayabilirsiniz?</h2>
<p>Era Dijital olarak işletmenizi derinlemesine analiz ediyor, darboğazları tespit ediyor ve <strong>14 gün içinde çalışan ilk yapay zeka prototipinizi</strong> hayata geçiriyoruz.</p>

<p>Süreçlerinizi geleceğe taşımak ve ücretsiz analiz randevusu almak için hemen ekibimizle iletişime geçebilirsiniz.</p>
      `.trim();

      setFormData({
        title: `${cleanTitle}: İşletmeler İçin Kapsamlı Rehber`,
        slug: generatedSlug,
        author_name: 'Era Dijital AI Lab',
        published_at: new Date().toISOString().split('T')[0],
        featured_image: '/resimler/blog/otonom-ai-ajanlari-rehberi-hero.jpg',
        excerpt: `${cleanTitle} alanında işletmenizin satışlarını artıracak, maliyetleri düşürecek ve operasyonları otomatikleştirecek en etkili stratejiler.`,
        content: generatedContent,
        seo_title: `${cleanTitle} Rehberi | Era Dijital`,
        seo_description: `${cleanTitle} ile işletmenizin verimliliğini ve satışlarını katlayacak yapay zeka ve otomasyon çözümleri.`
      });

      showToast('✨ AI şablon motoru makaleyi ve SEO alanlarını başarıyla hazırladı!');
      setActiveTab('edit');

    } catch (err) {
      console.error('AI üretim hatası:', err);
      alert('AI içeriği üretilirken bir hata oluştu.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const [previewMode, setPreviewMode] = useState(false);

  // Klavye kısayolu (Ctrl + Shift + A veya Alt + A) ile paneli açma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Yazıları yükle & sunucuyla senkronize et
  const refreshPosts = () => {
    setPosts(getBlogPosts());
  };

  useEffect(() => {
    refreshPosts();
    // Sunucudan en güncel veriyi çek
    fetchPostsFromServer().then(serverPosts => {
      if (serverPosts) setPosts(serverPosts);
    });

    const handleUpdate = () => refreshPosts();
    window.addEventListener('era_blog_updated', handleUpdate);
    return () => window.removeEventListener('era_blog_updated', handleUpdate);
  }, []);

  // Bildirim göster
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Şifre kontrolü
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Hatalı şifre! (Varsayılan: admin)');
    }
  };

  // Yeni yazı formunu aç
  const handleNewPost = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      author_name: 'Era Dijital Ekibi',
      published_at: new Date().toISOString().split('T')[0],
      featured_image: '/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp',
      excerpt: '',
      content: '',
      seo_title: '',
      seo_description: ''
    });
    setPreviewMode(false);
    setActiveTab('edit');
  };

  // Düzenleme formunu aç
  const handleEditPost = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      author_name: post.author_name || 'Era Dijital Ekibi',
      published_at: post.published_at || '',
      featured_image: post.featured_image || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || ''
    });
    setPreviewMode(false);
    setActiveTab('edit');
  };

  // Başlık değiştiğinde otomatik slug üret
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingId ? prev.slug : slugify(val),
      seo_title: editingId ? prev.seo_title : `${val} | Era Dijital`
    }));
  };

  // Form Kaydet (Hem Yerel Hem Otomatik Sunucuya)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Lütfen bir başlık girin.');
      return;
    }

    setIsSaving(true);

    let finalFeaturedImage = formData.featured_image;
    // Eğer base64 görsel ise sunucuya yükle
    if (finalFeaturedImage && finalFeaturedImage.startsWith('data:image')) {
      const uploadedUrl = await uploadImageToServer(finalFeaturedImage, ADMIN_PASSWORD);
      if (uploadedUrl) finalFeaturedImage = uploadedUrl;
    }

    const payload = {
      ...formData,
      featured_image: finalFeaturedImage,
      slug: formData.slug.trim() || slugify(formData.title)
    };

    let updatedList = [];
    if (editingId) {
      updateBlogPost(editingId, payload);
      updatedList = getBlogPosts();
      showToast('✅ Blog yazısı güncellendi!');
    } else {
      addBlogPost(payload);
      updatedList = getBlogPosts();
      showToast('🎉 Yeni blog yazısı yayına alındı!');
    }

    // Hostinger sunucusuna (api/blog.php) otomatik kaydet
    const serverResult = await syncPostsWithServer(updatedList, ADMIN_PASSWORD);
    if (serverResult.success) {
      showToast('🌐 Yazı Hostinger sunucusuna otomatik kaydedildi ve tüm ziyaretçilere yayınlandı!');
    }

    setIsSaving(false);
    refreshPosts();
    setActiveTab('list');
  };

  // Yazı Sil
  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" başlıklı yazıyı silmek istediğinize emin misiniz?`)) {
      deleteBlogPost(id);
      const updatedList = getBlogPosts();
      await syncPostsWithServer(updatedList, ADMIN_PASSWORD);
      refreshPosts();
      showToast('🗑️ Yazı silindi ve sunucu güncellendi.');
    }
  };

  // Varsayılana dön
  const handleReset = async () => {
    if (window.confirm('Tüm yazıları orijinal varsayılan 3 yazıya sıfırlamak istediğinize emin misiniz?')) {
      resetBlogPosts();
      const updatedList = getBlogPosts();
      await syncPostsWithServer(updatedList, ADMIN_PASSWORD);
      refreshPosts();
      showToast('🔄 Yazılar varsayılana sıfırlandı ve sunucu güncellendi.');
    }
  };

  // JSON / Kodu Kopyala
  const handleCopyCode = () => {
    const code = `export const DEFAULT_POSTS = ${JSON.stringify(posts, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('📋 Kod panoya kopyalandı! (src/data/blogPosts.js içine yapıştırabilirsiniz)');
    setTimeout(() => setCopied(false), 2500);
  };

  // JSON İndir
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `era_blog_posts_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('📥 JSON dosyası indirildi.');
  };

  // Hazır site görselleri listesi
  const PRESET_IMAGES = [
    { label: 'AI Otomasyon & Chatbot', url: '/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp' },
    { label: 'Dijital Dönüşüm Analizi', url: '/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp' },
    { label: 'Performans Pazarlama', url: '/resimler/hizmetler/performans-odakli-dijital-pazarlama.webp' },
    { label: 'Akış & Süreç Tasarımı', url: '/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp' },
    { label: 'Süreç Analizi', url: '/resimler/dijital-donusum-surecimiz/surec-analizi.webp' },
    { label: 'AI Kurulumu & Altyapı', url: '/resimler/dijital-donusum-surecimiz/ai-kurulumu.webp' },
    { label: 'Optimizasyon', url: '/resimler/dijital-donusum-surecimiz/optimizasyon.webp' },
  ];

  // Kapak görseli dosya yükleme (Base64)
  const handleCoverFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Görsel boyutu 2MB üzerinde olamaz. Lütfen optimize edilmiş bir görsel seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result;
      if (base64Url) {
        setFormData(prev => ({ ...prev, featured_image: base64Url }));
        showToast('📷 Kapak görseli başarıyla yüklendi!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Yazı içine inline görsel ekleme (dosyadan)
  const handleInlineImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result;
      if (base64Url) {
        insertImageHtml(base64Url, file.name.split('.')[0]);
        showToast('🖼️ Görsel makale içine eklendi!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  // Makale içine HTML resim tag'i yerleştirme
  const insertImageHtml = (imgUrl, altText = 'Blog Görseli') => {
    const imgTag = `\n<figure class="my-6">\n  <img src="${imgUrl}" alt="${altText}" class="rounded-2xl w-full object-cover border border-white/10 shadow-xl" />\n  <figcaption class="text-xs text-center text-slate-500 mt-2">${altText}</figcaption>\n</figure>\n`;
    insertTag(imgTag, '');
  };

  // Editör Yardımcı Butonları (HTML tag ekleyici)
  const insertTag = (startTag, endTag = '') => {
    const textarea = document.getElementById('blog-content-input');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${startTag}${selected || (endTag ? 'Metin' : '')}${endTag}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: newText }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, start + replacement.length - endTag.length);
    }, 50);
  };

  return (
    <>
      {/* Gizli / Küçük Yönetici Açma Butonu (Sağ Alt Köşe) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-slate-900/80 border border-primary/40 text-slate-400 hover:text-primary hover:border-primary hover:scale-110 shadow-lg backdrop-blur-md transition-all duration-300 group"
        title="Blog Yönetim Paneli (Kısayol: Alt + A veya Ctrl + Shift + A)"
      >
        <Lock className="w-4 h-4 group-hover:hidden" />
        <Unlock className="w-4 h-4 hidden group-hover:block text-primary" />
        <span className="sr-only">Blog Yönetimi</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#120e24] border border-primary/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Era Dijital <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-normal">React Blog Admin</span>
                  </h2>
                  <p className="text-xs text-slate-400">İçerikleri anında yönetin, ekleyin ve kaydedin</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bildirim Toast */}
            {notification && (
              <div className="bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 text-xs px-6 py-2 flex items-center justify-between animate-fade-in">
                <span>{notification}</span>
                <button onClick={() => setNotification('')} className="text-emerald-400 hover:text-white">✕</button>
              </div>
            )}

            {/* İçerik Alanı */}
            {!isAuthenticated ? (
              /* Şifre Giriş Ekranı */
              <div className="p-10 flex flex-col items-center justify-center text-center space-y-5 my-auto">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  <KeyRound className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl font-bold text-white">Yönetici Girişi</h3>
                  <p className="text-xs text-slate-400">Blog yönetim paneline erişmek için şifrenizi girin.</p>
                </div>
                <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
                  <input
                    type="password"
                    placeholder="Şifre (Varsayılan: admin)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-all text-center"
                    autoFocus
                  />
                  {authError && <p className="text-xs text-rose-400">{authError}</p>}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-lg shadow-primary/20"
                  >
                    Panele Gir
                  </button>
                </form>
              </div>
            ) : (
              /* Yönetici Paneli Arayüzü */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Tab Bar */}
                <div className="flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/40">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => { setActiveTab('list'); setEditingId(null); }}
                      className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'list' 
                          ? 'border-primary text-primary bg-primary/5' 
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Yazı Listesi ({posts.length})
                    </button>
                    <button
                      onClick={handleNewPost}
                      className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'edit' && !editingId
                          ? 'border-primary text-primary bg-primary/5' 
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {editingId ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
                    </button>
                    <button
                      onClick={() => setActiveTab('ai')}
                      className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'ai' 
                          ? 'border-violet-400 text-violet-300 bg-violet-500/10' 
                          : 'border-transparent text-violet-400/70 hover:text-violet-300 hover:bg-violet-500/5'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      ✨ AI ile Yazı Oluştur
                    </button>
                    <button
                      onClick={() => setActiveTab('export')}
                      className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'export' 
                          ? 'border-primary text-primary bg-primary/5' 
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Dışa Aktar / Kodu Al
                    </button>
                    <button
                      onClick={() => setActiveTab('api')}
                      className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'api' 
                          ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10' 
                          : 'border-transparent text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/5'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      🔗 API & Webhook
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="text-xs text-slate-500 hover:text-rose-400 px-2 py-1 transition-colors"
                      title="Oturumu Kapat"
                    >
                      Çıkış
                    </button>
                  </div>
                </div>

                {/* Tab İçerikleri */}
                <div className="flex-1 overflow-y-auto p-6">
                  
                  {/* 1. YAZI LİSTESİ */}
                  {activeTab === 'list' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-slate-400">
                          Tarayıcınızda kayıtlı <strong>{posts.length}</strong> blog yazısı var. Yapılan değişiklikler blog sayfasına anında yansır.
                        </span>
                        <button
                          onClick={handleNewPost}
                          className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all"
                        >
                          <Plus className="w-4 h-4" /> Yeni Yazı
                        </button>
                      </div>

                      <div className="grid gap-3">
                        {posts.map((p) => (
                          <div 
                            key={p.id}
                            className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between gap-4 group"
                          >
                            <div className="flex items-center space-x-3.5 min-w-0">
                              <img 
                                src={p.featured_image || '/resimler/placeholder.webp'} 
                                alt=""
                                className="w-14 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0 bg-slate-950" 
                              />
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                                  {p.title}
                                </h4>
                                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                                  <span>{p.published_at}</span>
                                  <span>•</span>
                                  <span className="font-mono text-[11px] text-slate-400 truncate">/blog/{p.slug}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <a
                                href={`/blog/${p.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                title="Sitede Görüntüle"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleEditPost(p)}
                                className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-white/5 transition-colors"
                                title="Düzenle"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id, p.title)}
                                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. YAZI EKLE / DÜZENLE FORMU */}
                  {activeTab === 'edit' && (
                    <form onSubmit={handleSave} className="space-y-5">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <h3 className="text-sm font-bold text-white">
                          {editingId ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı Oluştur'}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setPreviewMode(!previewMode)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              previewMode ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            {previewMode ? 'Editöre Dön' : 'Önizleme'}
                          </button>
                        </div>
                      </div>

                      {previewMode ? (
                        /* Canlı Önizleme */
                        <div className="p-6 rounded-xl bg-slate-950 border border-white/10 space-y-6">
                          <div className="aspect-video max-h-60 overflow-hidden rounded-xl bg-slate-900">
                            <img src={formData.featured_image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <h1 className="text-2xl font-bold text-white">{formData.title || 'Başlık'}</h1>
                          <p className="text-sm text-slate-400 italic">{formData.excerpt}</p>
                          <div 
                            className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formData.content || '<p>İçerik henüz girilmedi...</p>' }}
                          />
                        </div>
                      ) : (
                        /* Form Alanları */
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-400 font-medium">Yazı Başlığı *</label>
                              <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Örn: Yapay Zeka ile Satışları Artırma"
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary"
                                required
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-400 font-medium">URL Slug (Adres) *</label>
                              <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                                placeholder="yapay-zeka-ile-satis-artirma"
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-primary"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-400 font-medium">Yazar Adı</label>
                              <input
                                type="text"
                                value={formData.author_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-400 font-medium">Yayın Tarihi</label>
                              <input
                                type="date"
                                value={formData.published_at}
                                onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Kapak Görseli Seçimi */}
                          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                            <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                              <span>🖼️ Kapak Görseli</span>
                              <span className="text-[11px] text-slate-500 font-normal">Dosyadan yükleyin veya hazır listeden seçin</span>
                            </label>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
                              {/* Görsel Önizleme */}
                              <div className="w-24 h-16 rounded-lg bg-slate-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {formData.featured_image ? (
                                  <img src={formData.featured_image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Image className="w-6 h-6 text-slate-600" />
                                )}
                              </div>

                              <div className="flex-1 w-full space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Bilgisayardan Yükleme Butonu */}
                                  <label className="px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all">
                                    <span>📁 Bilgisayardan Seç</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleCoverFileUpload}
                                      className="hidden"
                                    />
                                  </label>

                                  {/* Hazır Sitedeki Görseller Dropdown */}
                                  <select
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        setFormData(prev => ({ ...prev, featured_image: e.target.value }));
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-primary max-w-xs"
                                    defaultValue=""
                                  >
                                    <option value="" disabled>🎨 Sitedeki Hazır Görsellerden Seç...</option>
                                    {PRESET_IMAGES.map((img, idx) => (
                                      <option key={idx} value={img.url}>{img.label}</option>
                                    ))}
                                  </select>
                                </div>

                                {/* Manuel URL / Dosya Yolu Girişi */}
                                <input
                                  type="text"
                                  value={formData.featured_image}
                                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                                  placeholder="Görsel URL veya dosya yolu..."
                                  className="w-full px-3 py-1.5 bg-slate-950 border border-white/5 rounded-lg text-slate-300 text-xs font-mono focus:outline-none focus:border-primary"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-400 font-medium">Kısa Özet / Giriş (Listede görünür)</label>
                            <textarea
                              rows="2"
                              value={formData.excerpt}
                              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                              placeholder="Makalenin kısa 1-2 cümlelik özeti..."
                              className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary resize-none"
                            />
                          </div>

                          {/* İçerik Editörü ve Araç Çubuğu */}
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <label className="text-xs text-slate-400 font-medium">Makale İçeriği (HTML Destekli)</label>
                              
                              {/* Hızlı HTML & Resim Ekleme Butonları */}
                              <div className="flex flex-wrap items-center gap-1">
                                <button type="button" onClick={() => insertTag('<h2>', '</h2>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-bold">H2</button>
                                <button type="button" onClick={() => insertTag('<h3>', '</h3>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-bold">H3</button>
                                <button type="button" onClick={() => insertTag('<p>', '</p>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300">P</button>
                                <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-bold">B</button>
                                <button type="button" onClick={() => insertTag('<em>', '</em>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300 italic">I</button>
                                <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300">• Liste</button>
                                <button type="button" onClick={() => insertTag('<blockquote>', '</blockquote>')} className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300">❝ Alıntı</button>
                                
                                {/* Yazı İçine Görsel Ekleme (Dosyadan) */}
                                <label className="px-2.5 py-1 text-[11px] bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded text-emerald-300 font-medium cursor-pointer flex items-center gap-1" title="İmlecin olduğu yere bilgisayardan resim ekler">
                                  <span>🖼️ Resim Ekle (Dosya)</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleInlineImageUpload}
                                    className="hidden"
                                  />
                                </label>

                                {/* Yazı İçine Görsel Ekleme (URL) */}
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    const url = prompt('Eklemek istediğiniz görselin URL adresini girin:');
                                    if (url) {
                                      const alt = prompt('Görsel açıklaması (alt metin):', 'Blog Görseli') || 'Blog Görseli';
                                      insertImageHtml(url, alt);
                                    }
                                  }}
                                  className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                                  title="URL ile resim ekle"
                                >
                                  🌐 URL Resim
                                </button>
                              </div>
                            </div>

                            <textarea
                              id="blog-content-input"
                              rows="10"
                              value={formData.content}
                              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="<p>Makale paragraflarınızı buraya yazabilir veya yukarıdaki butonlarla başlık, liste ve görseller ekleyebilirsiniz...</p>"
                              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-primary leading-relaxed"
                            />
                          </div>

                          {/* SEO Bilgileri (Katlanabilir) */}
                          <div className="pt-2 border-t border-white/5 space-y-3">
                            <span className="text-xs font-semibold text-primary block">🌐 SEO & Google Meta Ayarları (Opsiyonel)</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="SEO Başlığı (Google'da çıkacak)"
                                value={formData.seo_title}
                                onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                              />
                              <input
                                type="text"
                                placeholder="SEO Açıklaması"
                                value={formData.seo_description}
                                onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                                className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-3 pt-3">
                            <button
                              type="button"
                              onClick={() => setActiveTab('list')}
                              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                            >
                              İptal
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all"
                            >
                              <Save className="w-4 h-4" />
                              {editingId ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla'}
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  )}

                  {/* 3. AI İLE BLOG YAZISI ÜRETME TABI */}
                  {activeTab === 'ai' && (
                    <form onSubmit={handleGenerateWithAI} className="space-y-5 animate-fade-in">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-900/30 to-primary/20 border border-violet-500/30 flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300 mt-0.5">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white">Era Dijital AI Blog Yazarı</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Konuyu ve kategoriyi seçin; yapay zeka sizin için <strong>SEO başlığı, otomatik slug, zengin HTML makale içeriği, özet ve meta açıklamalarını</strong> saniyeler içinde baştan sona eksiksiz hazırlasın.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                            <span>🎯 Yazılacak Konu / Başlık Fikri *</span>
                            <span className="text-[11px] text-slate-500">Örn: WhatsApp Yapay Zeka Botu ile Satışları 2'ye Katlama</span>
                          </label>
                          <input
                            type="text"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            placeholder="Örn: E-Ticarette Otonom AI Ajanları ile Terk Edilen Sepetleri Kurtarma"
                            className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-400"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs text-slate-300 font-semibold">📂 Sektör / Kategori</label>
                            <select
                              value={aiCategory}
                              onChange={(e) => setAiCategory(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-violet-400"
                            >
                              {CATEGORIES.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-slate-300 font-semibold">🎙️ İçerik Tonu & Yaklaşımı</label>
                            <select
                              value={aiTone}
                              onChange={(e) => setAiTone(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-violet-400"
                            >
                              <option value="Eğitici & Rehber">📘 Eğitici & Adım Adım Rehber</option>
                              <option value="Satış & Dönüşüm Odaklı">🚀 Satış & Büyüme / ROI Odaklı</option>
                              <option value="Kurumsal & Teknik">💼 Kurumsal, Otoriter & Güven Veren</option>
                              <option value="Vaka Analizi & Trend">📊 Vaka Analizi & 2026 Trendleri</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-medium">🔑 Hedef Anahtar Kelimeler (Opsiyonel)</label>
                          <input
                            type="text"
                            value={aiKeywords}
                            onChange={(e) => setAiKeywords(e.target.value)}
                            placeholder="Örn: yapay zeka chatbot, müşteri ilişkileri otomasyonu, whatsapp crm entegrasyonu"
                            className="w-full px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-violet-400"
                          />
                        </div>

                        {/* Opsiyonel Canlı Gemini API Key */}
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
                          <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                            <span>⚡ Google Gemini API Anahtarı (Opsiyonel - Canlı AI Modeli)</span>
                            <span className="text-[10px] text-slate-500">Boş bırakılırsa yerleşik Era AI motoru kullanılır</span>
                          </label>
                          <input
                            type="password"
                            value={aiApiKey}
                            onChange={(e) => setAiApiKey(e.target.value)}
                            placeholder="AIzaSy... (İsteğe bağlı, tarayıcınızda saklanır)"
                            className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-violet-400"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isAiGenerating}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-primary to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                          >
                            {isAiGenerating ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Yapay Zeka Makaleyi ve SEO Alanlarını Hazırlıyor...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>🚀 AI ile Makaleyi & SEO'yu Otomatik Üret</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* 4. DIŞA AKTAR / KODU KOPYALA */}
                  {activeTab === 'export' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block mb-1">💡 Nasıl Kalıcı Yapılır?</strong>
                        Yazdığınız yazılar şu an tarayıcınızda saklanıyor. Eğer bu yazıları tüm ziyaretçiler için sitenin kaynak koduna kalıcı olarak gömmek isterseniz aşağıdaki butona basıp kodu kopyalayın ve projenizdeki <code className="text-primary font-mono">src/data/blogPosts.js</code> dosyasına yapıştırın.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          onClick={handleCopyCode}
                          className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-primary text-center space-y-2 group transition-all"
                        >
                          <div className="mx-auto w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </div>
                          <span className="text-xs font-semibold text-white block">
                            {copied ? 'Kopyalandı!' : 'Kodu Kopyala'}
                          </span>
                          <span className="text-[11px] text-slate-500 block">blogPosts.js formatında panoya kopyalar</span>
                        </button>

                        <button
                          onClick={handleDownloadJSON}
                          className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-primary text-center space-y-2 group transition-all"
                        >
                          <div className="mx-auto w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Download className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-white block">JSON İndir</span>
                          <span className="text-[11px] text-slate-500 block">Tüm blog verilerini JSON yedeği olarak indirir</span>
                        </button>

                        <button
                          onClick={handleReset}
                          className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-rose-500/50 text-center space-y-2 group transition-all"
                        >
                          <div className="mx-auto w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <RotateCcw className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-rose-300 block">Varsayılana Sıfırla</span>
                          <span className="text-[11px] text-slate-500 block">İlk 3 orijinal yazıya geri döner</span>
                        </button>
                      </div>

                      {/* Kod Önizleme Kutusu */}
                      <div className="space-y-2">
                        <span className="text-xs text-slate-400 font-medium">Güncel JSON Verisi:</span>
                        <pre className="p-4 rounded-xl bg-slate-950 border border-white/10 text-slate-300 text-[11px] font-mono max-h-60 overflow-y-auto">
                          {JSON.stringify(posts, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* 5. API & WEBHOOK ENTEGRASYONU */}
                  {activeTab === 'api' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Otomasyon & Ajans Paneli Entegrasyonu</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Bu panel, <strong>sosyalmedya-ajans</strong> platformu ile doğrudan konuşan güvenli bir REST API & Webhook altyapısına sahiptir. Ajans panelinden ürettiğiniz blog yazılarını tek tıkla buraya yayınlayabilirsiniz.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Webhook Endpoint */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>📡 Webhook / REST API Endpoint</span>
                            <span className="text-[10px] text-emerald-400 font-normal">POST & GET</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={typeof window !== 'undefined' ? `${window.location.origin}/panel/api/publish-post.php` : 'https://eradijital.com/panel/api/publish-post.php'}
                              className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-emerald-300 text-xs font-mono select-all focus:outline-none"
                            />
                            <button
                              onClick={() => copyToClipboard(typeof window !== 'undefined' ? `${window.location.origin}/panel/api/publish-post.php` : 'https://eradijital.com/panel/api/publish-post.php', 'Webhook URL')}
                              className="p-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition shrink-0"
                              title="URL Kopyala"
                            >
                              {copiedKey === 'Webhook URL' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            Yazı ekleme istekleri bu uç noktaya JSON payload olarak iletilir.
                          </p>
                        </div>

                        {/* API Gizli Anahtarı */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>🔑 API Gizli Anahtarı (X-API-KEY)</span>
                            <span className="text-[10px] text-amber-400 font-normal">panel/config.php</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type={showSecretKey ? 'text' : 'password'}
                              readOnly
                              value="era_secret_key_2026"
                              className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-amber-300 text-xs font-mono select-all focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSecretKey(!showSecretKey)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition shrink-0"
                              title={showSecretKey ? 'Gizle' : 'Göster'}
                            >
                              {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => copyToClipboard('era_secret_key_2026', 'API Anahtarı')}
                              className="p-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition shrink-0"
                              title="Anahtarı Kopyala"
                            >
                              {copiedKey === 'API Anahtarı' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            HTTP Header: <code className="text-amber-400 font-mono">X-API-KEY: era_secret_key_2026</code>
                          </p>
                        </div>
                      </div>

                      {/* Şifre ve Panel Bilgileri */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Yönetici Modal Şifresi</span>
                          <div className="flex items-center justify-between">
                            <code className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-1 rounded border border-white/10">admin</code>
                            <button
                              onClick={() => copyToClipboard('admin', 'Modal Şifresi')}
                              className="text-xs text-primary hover:underline"
                            >
                              Kopyala
                            </button>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">PHP Admin Paneli</span>
                          <div className="flex items-center justify-between">
                            <code className="text-xs font-mono text-emerald-400">/panel/admin/</code>
                            <span className="text-[10px] text-slate-500">Hostinger</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Görsel Yükleme Formatı</span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">Otomatik WebP</span>
                            <span className="text-[10px] text-emerald-400">Optimize</span>
                          </div>
                        </div>
                      </div>

                      {/* Canlı Bağlantı Testi Butonu */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-white">REST API Canlı Bağlantı Testi</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Sunucudaki publish-post.php endpoint'inin durumunu anlık kontrol edin.</p>
                        </div>
                        <button
                          onClick={handleTestApi}
                          disabled={apiTesting}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 disabled:opacity-50"
                        >
                          {apiTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                          <span>{apiTesting ? 'Test Ediliyor...' : 'Bağlantıyı Test Et'}</span>
                        </button>
                      </div>

                      {apiTestResult && (
                        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border animate-fadeIn ${
                          apiTestResult.success 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}>
                          {apiTestResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                          <span>{apiTestResult.message}</span>
                        </div>
                      )}

                      {/* Ajansa Ekleme Rehberi */}
                      <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🚀 Sosyal Medya Ajans Paneline Nasıl Eklenir?</span>
                        </p>
                        <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside leading-relaxed">
                          <li><strong>sosyalmedya-ajans</strong> panelinde sol menüden <strong>CMS & Web Siteleri</strong> sayfasına gidin.</li>
                          <li><strong>"Site Ekle"</strong> butonuna basıp Platform Türü olarak <strong>"Özel PHP Paneli (REST API)"</strong> seçin.</li>
                          <li>Site Adı: <code className="text-white">Era Dijital</code>, Site URL: <code className="text-emerald-400">https://eradijital.com</code> girin.</li>
                          <li>API Gizli Anahtarı alanına <code className="text-amber-400">era_secret_key_2026</code> yazıp kaydedin.</li>
                        </ol>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
