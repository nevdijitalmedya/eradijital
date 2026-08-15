-- ═══════════════════════════════════════════════════════════
-- Era Dijital — Seed Data
-- Admin kullanıcı + mevcut mock blog yazıları
-- ═══════════════════════════════════════════════════════════

-- Varsayılan admin kullanıcı
-- Şifre: admin123 (production'da mutlaka değiştirin!)
INSERT INTO admin_users (username, password_hash, full_name, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Era Dijital Admin', 'admin');

-- ───────────────────────────────────────────────────────────
-- BLOG YAZILARI (mevcut mock verilerden)
-- ───────────────────────────────────────────────────────────

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_name, status, seo_title, seo_description, published_at) VALUES
(
    'Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma Yolları',
    'yapay-zeka-musteri-temsilcileri-satis-artirma',
    'WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri ve en iyi senaryolar.',
    '<p>Günümüzde tüketiciler her zamankinden daha sabırsız. Yapılan araştırmalara göre, bir mesajlaşma kanalından gelen müşteri talebine ilk 5 dakika içinde yanıt verilmediğinde, satış kapatma ihtimali <strong>%80 oranında düşüyor</strong>. İşte bu noktada yapay zeka destekli müşteri temsilcileri devreye giriyor.</p>
<h3>1. 7/24 Kesintisiz Yanıt Hızı</h3>
<p>Müşterileriniz genellikle akşam saatlerinde, hafta sonları veya tatillerde sosyal medyada gezinirken size ulaşır. Ekibiniz mesai dışındayken gelen mesajlara yapay zeka saniyeler içinde doğal bir dille yanıt vererek randevu oluşturabilir veya sipariş talebi toplayabilir.</p>
<h3>2. Doğal ve Kişiselleştirilmiş İletişim</h3>
<p>Eski nesil ''seçenek seçiniz'' mantığındaki botlar yerine, güncel geniş dil modelleri (LLM) ile beslenen yapay zeka ajanları, müşterinin yazdığı serbest metinleri mükemmel şekilde anlar. İşletmenizin kurallarına göre müşteriye özel indirimler sunabilir, stok bilgisini sorgulayabilir.</p>
<h3>3. CRM ve Satış Kanalları Entegrasyonu</h3>
<p>Yapay zeka temsilcileri konuşma esnasında müşterinin isim, telefon, e-posta gibi bilgilerini toplayıp doğrudan CRM veri tabanınıza (Hubspot, Salesforce, yerel sistemler vb.) kaydeder. Böylece satış ekibiniz mesaiye başladığında hazır ve ısınmış lead''lerle karşılaşır.</p>
<p>İşletmenizi yapay zeka entegrasyonlarıyla güçlendirmek ve satış kaçırmayı durdurmak için bizimle iletişime geçip ücretsiz ön analiz alabilirsiniz.</p>',
    '/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp',
    'Era Dijital Ekibi',
    'published',
    'Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma | Era Dijital',
    'WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.',
    '2026-06-25 10:00:00'
),
(
    'İşletmenizde Otomasyon Yapmanız Gereken 5 Darboğaz Süreç',
    'isletmelerde-otomasyon-yapilmasi-gereken-darbogazlar',
    'Sürekli kopyala-yapıştır yaptığınız, randevuları onaylarken zaman kaybettiğiniz ve rapor hazırlamakta zorlandığınız süreçleri nasıl otomatikleştirebilirsiniz?',
    '<p>Bir işletmenin büyümesinin önündeki en büyük engeller, tekrarlayan manuel iş yükleridir. Çalışanlarınız zamanlarını rutin işlere harcadıklarında stratejik büyüme adımlarına odaklanamazlar. İşte otomatikleştirebileceğiniz en kritik 5 alan:</p>
<h3>1. WhatsApp &amp; Instagram DM Cevaplama</h3>
<p>Aynı sorulara (''Fiyat nedir?'', ''Adresiniz neresi?'', ''Çalışma saatleriniz nedir?'') yüzlerce kez el ile cevap yazmak yerine, bu akışı yapay zekaya devredebilirsiniz.</p>
<h3>2. Randevu &amp; Rezervasyon Takibi</h3>
<p>Güzellik merkezleri, klinikler veya danışmanlık firmalarında randevu almak, saat teyit etmek ve hatırlatma mesajları göndermek tamamen otonom akışlarla çözülebilir.</p>
<h3>3. Lead (Müşteri Adayı) Toplama ve CRM Kaydı</h3>
<p>Web sitenizden, sosyal medyalardan gelen form verilerinin tek tek elle CRM sistemine girilmesi zaman kaybıdır. Otomatik entegrasyonlarla veriler milisaniyeler içinde senkronize edilir.</p>
<h3>4. Fatura ve Teklif Süreçleri</h3>
<p>Onaylanan siparişlerin muhasebe sistemine aktarılması ve faturaların kesilmesi otomatik tetikleyicilerle insansız yürütülebilir.</p>
<h3>5. Düzenli Haftalık/Aylık Raporlama</h3>
<p>Satış veya reklam verilerini Excel tablolarında birleştirmek yerine, n8n veya Make gibi otomasyon araçlarıyla otomatik paneller (dashboard) hazırlayabilirsiniz.</p>',
    '/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp',
    'Era Dijital Ekibi',
    'published',
    'İşletmelerde Otomasyon Yapılması Gereken 5 Darboğaz | Era Dijital',
    'Tekrarlayan manuel süreçleri otomatikleştirerek işletmenizin verimliliğini artırın.',
    '2026-06-20 10:00:00'
),
(
    'Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır?',
    'dijital-donusum-nedir-nereden-baslanmali',
    'Dijital dönüşüm sadece yazılım satın almak değildir. Doğru bir strateji ile maliyetlerinizi düşürüp operasyonunuzu nasıl büyütebilirsiniz?',
    '<p>Dijital dönüşüm sadece sunucuları buluta taşımak veya yeni bir bilgisayar almak değildir. Dönüşüm, işletmenizin süreçlerini teknoloji yardımıyla kökten değiştirerek verimlilik ve müşteri memnuniyeti yaratma çabasıdır.</p>
<h3>Nereden Başlanmalı?</h3>
<p><strong>1. Kültür ve Farkındalık:</strong> Ekibinizin yeni teknolojileri benimsemesi en kritik adımdır. Otomasyonun onların işini ellerinden alacağını değil, onları angarya işlerden kurtaracağını anlatmalısınız.</p>
<p><strong>2. Süreç Analizi:</strong> En çok zaman alan ve hata yapılan 3 süreci listeleyin. Dönüşüme buralardan başlamak en hızlı verimi almanızı sağlar.</p>
<p><strong>3. Doğru Araç Seçimi:</strong> Büyük bütçeli, karmaşık yazılımlar yerine ihtiyaçlarınızı tam karşılayan esnek ve entegre edilebilir API dostu sistemleri tercih edin.</p>
<p>Era Dijital olarak dönüşüm sürecinizde size yol göstermek ve en verimli AI altyapısını kurmak için yanınızdayız.</p>',
    '/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp',
    'Era Dijital Ekibi',
    'published',
    'Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır? | Era Dijital',
    'Maliyetlerinizi düşürüp verimliliğinizi artıracak doğru dijitalleşme stratejileri.',
    '2026-06-15 10:00:00'
);

-- ───────────────────────────────────────────────────────────
-- SİTE AYARLARI
-- ───────────────────────────────────────────────────────────

INSERT INTO site_settings (setting_key, setting_value) VALUES
('site_name', 'Era Dijital'),
('tagline', 'Yapay Zeka & Dijital Dönüşüm Ajansı');
