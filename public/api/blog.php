<?php
/**
 * Era Dijital — Hafif & Otomatik Blog API (JSON Tabanlı)
 * 
 * Bu dosya:
 * 1. GET: Tüm blog yazılarını veya tekil yazıyı JSON olarak döner.
 * 2. POST (Admin Şifreli): React panelinden gelen yeni yazıları / düzenlemeleri `blog_posts.json` dosyasına kaydeder.
 * 3. Görsel Yükleme: Yüklenen görselleri `uploads/` klasörüne kaydeder ve URL döner.
 */

// Hata raporlama & JSON Başlığı
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

// CORS Ayarları (React sitenizden gelen isteklere izin ver)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-Password, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Güvenlik: Yönetici Şifresi
define('ADMIN_PASSWORD', 'admin');

// Veri Dosyası ve Yükleme Klasörü Yolu
$dataFile = __DIR__ . '/blog_posts.json';
$uploadDir = __DIR__ . '/uploads';

// Uploads klasörü yoksa oluştur
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

// Varsayılan Blog Yazıları (Dosya henüz oluşmadıysa otomatik oluşturulur)
$defaultPosts = [
    [
        "id" => 4,
        "title" => "2026'da İşletmenizi Büyütecek Otonom AI Ajanları ve İş Akışı Otomasyonları Rehberi",
        "slug" => "otonom-ai-ajanlari-ve-is-akisi-otomasyonlari-rehberi",
        "excerpt" => "Geleneksel chatbotların ötesine geçerek müşteri bulma, randevu oluşturma ve satış kapatma süreçlerini 7/24 otonom yöneten yeni nesil AI ajanları ile tanışın.",
        "author_name" => "Era Dijital Ekibi",
        "published_at" => "2026-08-15",
        "featured_image" => "/resimler/blog/otonom-ai-ajanlari-rehberi-hero.jpg",
        "seo_title" => "Otonom AI Ajanları ve İş Akışı Otomasyonları Rehberi | Era Dijital",
        "seo_description" => "İşletmenizde satış, CRM ve müşteri desteği süreçlerini 7/24 otonom yürüten yapay zeka ajanları ve otomasyon stratejileri.",
        "content" => "<p>2026 yılı itibarıyla dijital dünyada rekabet kuralları baştan yazılıyor. Eskiden sadece önceden tanımlanmış kurallara göre cevap veren basit botlar kullanılırken, bugün <strong>Geniş Dil Modelleri (LLM)</strong> ve <strong>Otonom AI Ajanları</strong> işletmelerin satış, pazarlama ve müşteri ilişkileri süreçlerini baştan uca tek başlarına yönetebiliyor.</p><h2>Otonom AI Ajanı Nedir ve Geleneksel Botlardan Farkı Nedir?</h2><p>Geleneksel botlar sadece '1\\'e basınız, 2\\'ye basınız' mantığında katı menüler sunarken; bir <strong>Era Dijital Otonom AI Ajanı</strong>, firmanızın kurumsal kimliğini, ürün kataloğunu, stok durumunu ve satış politikalarını derinlemesine öğrenir. Müşterinin yazdığı karmaşık soruları doğal bir dille anlar ve gerçek bir uzman gibi konuşmayı yönlendirir.</p><figure class=\"my-8\"><img src=\"/resimler/blog/ai-entegrasyon-surecleri.jpg\" alt=\"Era Dijital Çok Kanallı AI Entegrasyon Süreci\" class=\"rounded-3xl w-full object-cover border border-white/10 shadow-2xl\" /><figcaption class=\"text-xs text-center text-slate-400 mt-2.5 font-medium\">Şekil 1: WhatsApp, Instagram ve CRM sistemleri arasında uçtan uca otonom veri akışı</figcaption></figure><h2>İşletmenizi Dönüştürecek 4 Temel AI Otomasyon Alanı</h2><h3>1. 7/24 Omnichannel Satış Temsilcisi (WhatsApp & Instagram)</h3><p>Potansiyel müşteriniz gece saat 01:00\\'de Instagram reklamınızdan veya WhatsApp hattınızdan size yazdığında, AI temsilciniz saniyeler içinde devreye girer. Müşterinin ihtiyacını analiz eder, ürün/hizmet tavsiyesi verir ve doğrudan randevu takviminize (Google Calendar, Cal.com vb.) rezervasyonu işler.</p><h3>2. Uçtan Uca CRM & Lead Otomasyonu</h3><p>Görüşme sırasında müşterinin isim, telefon, e-posta, talep ettiği hizmet ve bütçe bilgileri otomatik olarak yapılandırılır ve CRM sisteminize (Hubspot, Salesforce veya yerel veri tabanınıza) anında <em>'Sıcak Müşteri Adayı'</em> olarak kaydedilir.</p><h3>3. Dinamik Teklif ve Fatura Hazırlama</h3><p>Tekrarlayan fiyatlandırma hesaplamaları veya standart teklif mektupları AI ajanları tarafından saniyeler içinde PDF formatında oluşturulup müşteriye iletilebilir. Ekibiniz operasyonel angaryalardan kurtularak stratejik kararlara odaklanır.</p><h3>4. Akıllı Veri Analitiği ve Haftalık Raporlama</h3><p>En çok hangi saatlerde talep geliyor? Müşterilerin en sık itiraz ettiği noktalar neler? AI ajanı tüm konuşma geçmişlerini periyodik olarak özetleyerek yöneticilere aksiyon odaklı içgörüler sunar.</p><blockquote>'Yapay zeka operasyonlarınızı devraldığında çalışanlarınızın işini elinden almaz; onları rutin ve yorucu işlerden kurtararak işletmenizin büyümesine doğrudan katkı sağlamalarını mümkün kılar.'</blockquote><h2>Era Dijital ile Dönüşüme Nereden Başlamalısınız?</h2><p>Dijital dönüşümde en sık yapılan hata tüm süreçleri aynı anda otomatikleştirmeye çalışmaktır. Era Dijital olarak işletmenizi analiz ediyor, <strong>en çok zaman ve ciro kaybına sebep olan 1-2 kritik darboğazı</strong> tespit ederek ilk 14 gün içinde çalışan AI prototipinizi devreye alıyoruz.</p><p>İşletmenizin yapay zeka potansiyelini keşfetmek ve ücretsiz süreç analizi randevusu almak için bizimle iletişime geçebilirsiniz.</p>"
    ],
    [
        "id" => 1,
        "title" => "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma Yolları",
        "slug" => "yapay-zeka-musteri-temsilcileri-satis-artirma",
        "excerpt" => "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri ve en iyi senaryolar.",
        "author_name" => "Era Dijital Ekibi",
        "published_at" => "2026-06-25",
        "featured_image" => "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
        "seo_title" => "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma | Era Dijital",
        "seo_description" => "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.",
        "content" => "<p>Günümüzde tüketiciler her zamankinden daha sabırsız. Yapılan araştırmalara göre, bir mesajlaşma kanalından gelen müşteri talebine ilk 5 dakika içinde yanıt verilmediğinde, satış kapatma ihtimali <strong>%80 oranında düşüyor</strong>. İşte bu noktada yapay zeka destekli müşteri temsilcileri devreye giriyor.</p><h3>1. 7/24 Kesintisiz Yanıt Hızı</h3><p>Müşterileriniz genellikle akşam saatlerinde, hafta sonları veya tatillerde sosyal medyada gezinirken size ulaşır. Ekibiniz mesai dışındayken gelen mesajlara yapay zeka saniyeler içinde doğal bir dille yanıt vererek randevu oluşturabilir veya sipariş talebi toplayabilir.</p><h3>2. Doğal ve Kişiselleştirilmiş İletişim</h3><p>Eski nesil 'seçenek seçiniz' mantığındaki botlar yerine, güncel geniş dil modelleri (LLM) ile beslenen yapay zeka ajanları, müşterinin yazdığı serbest metinleri mükemmel şekilde anlar. İşletmenizin kurallarına göre müşteriye özel indirimler sunabilir, stok bilgisini sorgulayabilir.</p><h3>3. CRM ve Satış Kanalları Entegrasyonu</h3><p>Yapay zeka temsilcileri konuşma esnasında müşterinin isim, telefon, e-posta gibi bilgilerini toplayıp doğrudan CRM veri tabanınıza (Hubspot, Salesforce, yerel sistemler vb.) kaydeder. Böylece satış ekibiniz mesaiye başladığında hazır ve ısınmış lead'lerle karşılaşır.</p><p>İşletmenizi yapay zeka entegrasyonlarıyla güçlendirmek ve satış kaçırmayı durdurmak için bizimle iletişime geçip ücretsiz ön analiz alabilirsiniz.</p>"
    ],
    [
        "id" => 2,
        "title" => "İşletmenizde Otomasyon Yapmanız Gereken 5 Darboğaz Süreç",
        "slug" => "isletmelerde-otomasyon-yapilmasi-gereken-darbogazlar",
        "excerpt" => "Sürekli kopyala-yapıştır yaptığınız, randevuları onaylarken zaman kaybettiğiniz ve rapor hazırlamakta zorlandığınız süreçleri nasıl otomatikleştirebilirsiniz?",
        "author_name" => "Era Dijital Ekibi",
        "published_at" => "2026-06-20",
        "featured_image" => "/resimler/dijital-donusum-surecimiz/akis-tasarimi.webp",
        "seo_title" => "İşletmelerde Otomasyon Yapılması Gereken 5 Darboğaz | Era Dijital",
        "seo_description" => "Sürekli kopyala-yapıştır yaptığınız süreçleri nasıl otomatikleştirebilirsiniz?",
        "content" => "<p>Bir işletmenin büyümesinin önündeki en büyük engeller, tekrarlayan manuel iş yükleridir. Çalışanlarınız zamanlarını rutin işlere harcadıklarında stratejik büyüme adımlarına odaklanamazlar. İşte otomatikleştirebileceğiniz en kritik 5 alan:</p><h3>1. WhatsApp & Instagram DM Cevaplama</h3><p>Aynı sorulara ('Fiyat nedir?', 'Adresiniz neresi?', 'Çalışma saatleriniz nedir?') yüzlerce kez el ile cevap yazmak yerine, bu akışı yapay zekaya devredebilirsiniz.</p><h3>2. Randevu & Rezervasyon Takibi</h3><p>Güzellik merkezleri, klinikler veya danışmanlık firmalarında randevu almak, saat teyit etmek ve hatırlatma mesajları göndermek tamamen otonom akışlarla çözülebilir.</p><h3>3. Lead (Müşteri Adayı) Toplama ve CRM Kaydı</h3><p>Web sitenizden, sosyal medyalardan gelen form verilerinin tek tek elle CRM sistemine girilmesi zaman kaybıdır. Otomatik entegrasyonlarla veriler milisaniyeler içinde senkronize edilir.</p><h3>4. Fatura ve Teklif Süreçleri</h3><p>Onaylanan siparişlerin muhasebe sistemine aktarılması ve faturaların kesilmesi otomatik tetikleyicilerle insansız yürütülebilir.</p><h3>5. Düzenli Haftalık/Aylık Raporlama</h3><p>Satış veya reklam verilerini Excel tablolarında birleştirmek yerine, n8n veya Make gibi otomasyon araçlarıyla otomatik paneller (dashboard) hazırlayabilirsiniz.</p>"
    ],
    [
        "id" => 3,
        "title" => "Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır?",
        "slug" => "dijital-donusum-nedir-nereden-baslanmali",
        "excerpt" => "Dijital dönüşüm sadece yazılım satın almak değildir. Doğru bir strateji ile maliyetlerinizi düşürüp operasyonunuzu nasıl büyütebilirsiniz?",
        "author_name" => "Era Dijital Ekibi",
        "published_at" => "2026-06-15",
        "featured_image" => "/resimler/hizmetler/dijital-donusum-danismanligi-analiz.webp",
        "seo_title" => "Dijital Dönüşüm Nedir ve Nereden Başlanmalıdır? | Era Dijital",
        "seo_description" => "Maliyetlerinizi düşürüp verimliliğinizi artıracak doğru dijitalleşme stratejileri.",
        "content" => "<p>Dijital dönüşüm sadece sunucuları buluta taşımak veya yeni bir bilgisayar almak değildir. Dönüşüm, işletmenizin süreçlerini teknoloji yardımıyla kökten değiştirerek verimlilik ve müşteri memnuniyeti yaratma çabasıdır.</p><h3>Nereden Başlanmalı?</h3><p><strong>1. Kültür ve Farkındalık:</strong> Ekibinizin yeni teknolojileri benimsemesi en kritik adımdır. Otomasyonun onların işini ellerinden alacağını değil, onları angarya işlerden kurtaracağını anlatmalısınız.</p><p><strong>2. Süreç Analizi:</strong> En çok zaman alan ve hata yapılan 3 süreci listeleyin. Dönüşüme buralardan başlamak en hızlı verimi almanızı sağlar.</p><p><strong>3. Doğru Araç Seçimi:</strong> Büyük bütçeli, karmaşık yazılımlar yerine ihtiyaçlarınızı tam karşılayan esnek ve entegre edilebilir API dostu sistemleri tercih edin.</p><p>Era Dijital olarak dönüşüm sürecinizde size yol göstermek ve en verimli AI altyapısını kurmak için yanınızdayız.</p>"
    ]
];

// Dosyadan verileri oku
function loadPosts($dataFile, $defaultPosts) {
    if (file_exists($dataFile)) {
        $json = file_get_contents($dataFile);
        $data = json_decode($json, true);
        if (is_array($data) && count($data) > 0) {
            return $data;
        }
    }
    // Dosya yoksa varsayılanları kaydet
    file_put_contents($dataFile, json_encode($defaultPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    return $defaultPosts;
}

// ─── 1. GET İSTEKLERİ: Yazıları Listele veya Tekil Getir ───
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $posts = loadPosts($dataFile, $defaultPosts);
    $slug = trim($_GET['slug'] ?? '');

    if (!empty($slug)) {
        // Tekil yazı bul
        foreach ($posts as $p) {
            if (($p['slug'] ?? '') === $slug) {
                echo json_encode($p, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                exit;
            }
        }
        http_response_code(404);
        echo json_encode(["error" => "Yazı bulunamadı."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Tüm yazıları dön
    echo json_encode($posts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ─── 2. POST İSTEKLERİ: Yazı Kaydetme veya Resim Yükleme (Şifre Korumalı) ───
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Şifre kontrolü
    $authHeader = $_SERVER['HTTP_X_ADMIN_PASSWORD'] ?? '';
    
    // Gelen JSON gövdesini oku
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true);

    $password = $authHeader ?: ($inputData['password'] ?? $_POST['password'] ?? '');

    if ($password !== ADMIN_PASSWORD) {
        http_response_code(401);
        echo json_encode(["error" => "Yetkisiz erişim: Hatalı yönetici şifresi."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $action = $inputData['action'] ?? $_POST['action'] ?? 'save_posts';

    // ── Resim Yükleme İşlemi ──
    if ($action === 'upload_image') {
        $base64Data = $inputData['image_base64'] ?? '';
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $fileName = 'img_' . time() . '_' . rand(1000, 9999) . '.' . ($ext ?: 'webp');
            $targetPath = $uploadDir . '/' . $fileName;
            
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                echo json_encode([
                    "success" => true,
                    "url" => "/api/uploads/" . $fileName
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }
        } elseif ($base64Data) {
            // Base64 görseli kaydet
            if (preg_match('/^data:image\/(\w+);base64,/', $base64Data, $type)) {
                $base64Data = substr($base64Data, strpos($base64Data, ',') + 1);
                $ext = strtolower($type[1]);
                if ($ext === 'jpeg') $ext = 'jpg';
                
                $decoded = base64_decode($base64Data);
                if ($decoded !== false) {
                    $fileName = 'img_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
                    file_put_contents($uploadDir . '/' . $fileName, $decoded);
                    echo json_encode([
                        "success" => true,
                        "url" => "/api/uploads/" . $fileName
                    ], JSON_UNESCAPED_UNICODE);
                    exit;
                }
            }
        }

        http_response_code(400);
        echo json_encode(["error" => "Görsel yüklenemedi."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── Blog Yazılarını Kaydetme İşlemi ──
    $newPosts = $inputData['posts'] ?? null;

    if (is_array($newPosts)) {
        file_put_contents($dataFile, json_encode($newPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode([
            "success" => true,
            "message" => "Blog yazıları başarıyla sunucuya kaydedildi.",
            "count" => count($newPosts)
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(400);
    echo json_encode(["error" => "Geçersiz veri formatı."], JSON_UNESCAPED_UNICODE);
    exit;
}
