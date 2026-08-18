<?php
/**
 * Era Dijital — Otomatik Blog & REST API (JSON Tabanlı)
 * 
 * Bu dosya:
 * 1. GET: Tüm blog yazılarını, tekil yazıyı (slug ile) veya bağlantı testini döner.
 * 2. POST (API Key / Şifreli): React panelinden veya sosyalmedya-ajans platformundan gelen yazıları kaydeder.
 * 3. Görsel Yükleme: Yüklenen görselleri `uploads/` klasörüne kaydeder ve URL döner.
 */

// Hata raporlama & JSON Başlığı
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

// CORS Ayarları (Tüm kaynaklardan gelen isteklere izin ver)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-Password, X-API-KEY, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Güvenlik: Kabul edilen anahtarlar
define('ADMIN_PASSWORD', 'admin');
define('API_SECRET_KEY', 'era_secret_key_2026');

// Veri Dosyası ve Yükleme Klasörü Yolu
$dataFile = __DIR__ . '/blog_posts.json';
$uploadDir = __DIR__ . '/uploads';

if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

// Varsayılan Blog Yazıları
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
        "content" => "<p>2026 yılı itibarıyla dijital dünyada rekabet kuralları baştan yazılıyor. Eskiden sadece önceden tanımlanmış kurallara göre cevap veren basit botlar kullanılırken, bugün <strong>Geniş Dil Modelleri (LLM)</strong> ve <strong>Otonom AI Ajanları</strong> işletmelerin satış, pazarlama ve müşteri ilişkileri süreçlerini baştan uca tek başlarına yönetebiliyor.</p><h2>Otonom AI Ajanı Nedir ve Geleneksel Botlardan Farkı Nedir?</h2><p>Geleneksel botlar sadece '1\\'e basınız, 2\\'ye basınız' mantığında katı menüler sunarken; bir <strong>Era Dijital Otonom AI Ajanı</strong>, firmanızın kurumsal kimliğini, ürün kataloğunu, stok durumunu ve satış politikalarını derinlemesine öğrenir. Müşterinin yazdığı karmaşık soruları doğal bir dille anlar ve gerçek bir uzman gibi konuşmayı yönlendirir.</p>"
    ],
    [
        "id" => 1,
        "title" => "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma Yolları",
        "slug" => "yapay-zeka-musteri-temsilcileri-satis-artirma",
        "excerpt" => "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.",
        "author_name" => "Era Dijital Ekibi",
        "published_at" => "2026-06-25",
        "featured_image" => "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
        "seo_title" => "Yapay Zeka Müşteri Temsilcileri ile Satışları Artırma | Era Dijital",
        "seo_description" => "WhatsApp ve Instagram üzerinde 7/24 çalışan yapay zeka entegrasyonlarının satış kapatma oranlarına etkileri.",
        "content" => "<p>Günümüzde tüketiciler her zamankinden daha sabırsız. Yapılan araştırmalara göre, bir mesajlaşma kanalından gelen müşteri talebine ilk 5 dakika içinde yanıt verilmediğinde, satış kapatma ihtimali <strong>%80 oranında düşüyor</strong>.</p>"
    ]
];

function loadPosts($dataFile, $defaultPosts) {
    if (file_exists($dataFile)) {
        $json = file_get_contents($dataFile);
        $data = json_decode($json, true);
        if (is_array($data) && count($data) > 0) {
            return $data;
        }
    }
    file_put_contents($dataFile, json_encode($defaultPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    return $defaultPosts;
}

function slugifyText($text) {
    if (!$text) return 'post-' . time();
    $trMap = ['ç'=>'c', 'ğ'=>'g', 'ı'=>'i', 'ö'=>'o', 'ş'=>'s', 'ü'=>'u', 'Ç'=>'c', 'Ğ'=>'g', 'İ'=>'i', 'Ö'=>'o', 'Ş'=>'s', 'Ü'=>'u'];
    $result = strtr($text, $trMap);
    $result = preg_replace('/[^a-zA-Z0-9\s-]/', '', strtolower($result));
    $result = preg_replace('/[\s-]+/', '-', trim($result));
    return trim($result, '-');
}

// ─── 1. GET İSTEKLERİ: Test, Tekil Getir veya Listele ───
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Canlı Bağlantı Testi (?test=1)
    if (isset($_GET['test'])) {
        echo json_encode([
            "ok" => true,
            "site" => "Era Dijital",
            "type" => "custom_panel",
            "status" => "connected",
            "version" => "2.0"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $posts = loadPosts($dataFile, $defaultPosts);
    $slug = trim($_GET['slug'] ?? '');

    if (!empty($slug)) {
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

    echo json_encode($posts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ─── 2. POST İSTEKLERİ: Yazı Yayınlama / Güncelleme / Resim Yükleme ───
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true) ?: [];

    // Yetkilendirme Kontrolü
    $apiKeyHeader = $_SERVER['HTTP_X_API_KEY'] ?? $_SERVER['HTTP_X_ADMIN_PASSWORD'] ?? '';
    if (empty($apiKeyHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authParts = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
        if (count($authParts) === 2 && strcasecmp($authParts[0], 'Bearer') === 0) {
            $apiKeyHeader = $authParts[1];
        }
    }
    $givenPass = $apiKeyHeader ?: ($inputData['password'] ?? $_POST['password'] ?? '');

    if ($givenPass !== ADMIN_PASSWORD && $givenPass !== API_SECRET_KEY && $givenPass !== 'ch_secret_key_2026') {
        http_response_code(401);
        echo json_encode(["error" => "Yetkisiz erişim: Geçersiz API anahtarı veya şifre."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $action = $inputData['action'] ?? $_POST['action'] ?? '';

    // ── Resim Yükleme İşlemi ──
    if ($action === 'upload_image') {
        $base64Data = $inputData['image_base64'] ?? '';
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $fileName = 'img_' . time() . '_' . rand(1000, 9999) . '.' . ($ext ?: 'webp');
            $targetPath = $uploadDir . '/' . $fileName;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                echo json_encode(["success" => true, "url" => "/api/uploads/" . $fileName], JSON_UNESCAPED_UNICODE);
                exit;
            }
        } elseif ($base64Data && preg_match('/^data:image\/(\w+);base64,/', $base64Data, $type)) {
            $base64Data = substr($base64Data, strpos($base64Data, ',') + 1);
            $ext = strtolower($type[1]) === 'jpeg' ? 'jpg' : strtolower($type[1]);
            $decoded = base64_decode($base64Data);
            if ($decoded !== false) {
                $fileName = 'img_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
                file_put_contents($uploadDir . '/' . $fileName, $decoded);
                echo json_encode(["success" => true, "url" => "/api/uploads/" . $fileName], JSON_UNESCAPED_UNICODE);
                exit;
            }
        }
        http_response_code(400);
        echo json_encode(["error" => "Görsel yüklenemedi."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── Tekil Yazı Yayınlama (sosyalmedya-ajans veya webhook üzerinden) ──
    if (isset($inputData['title']) && isset($inputData['content'])) {
        $posts = loadPosts($dataFile, $defaultPosts);
        
        $newTitle = trim($inputData['title']);
        $newSlug = trim($inputData['slug'] ?? '') ?: slugifyText($newTitle);
        $newExcerpt = trim($inputData['excerpt'] ?? '') ?: substr(strip_tags($inputData['content']), 0, 160) . '...';
        
        $newPost = [
            "id" => intval($inputData['id'] ?? (time() * 1000)),
            "title" => $newTitle,
            "slug" => $newSlug,
            "excerpt" => $newExcerpt,
            "content" => $inputData['content'],
            "author_name" => $inputData['author_name'] ?? "Era Dijital Ekibi",
            "published_at" => $inputData['published_at'] ?? date('Y-m-d'),
            "featured_image" => $inputData['featured_image_url'] ?? $inputData['featured_image'] ?? "/resimler/hizmetler/ai-otomasyon-sistemleri-chat.webp",
            "seo_title" => $inputData['seo_title'] ?? $newTitle,
            "seo_description" => $inputData['seo_description'] ?? $newExcerpt,
            "status" => $inputData['status'] ?? "publish"
        ];

        // Slug veya ID eşleşen varsa güncelle, yoksa başa ekle
        $found = false;
        foreach ($posts as $idx => $existing) {
            if (($existing['id'] ?? 0) === $newPost['id'] || ($existing['slug'] ?? '') === $newPost['slug']) {
                $posts[$idx] = array_merge($existing, $newPost);
                $found = true;
                break;
            }
        }
        if (!$found) {
            array_unshift($posts, $newPost);
        }

        file_put_contents($dataFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        echo json_encode([
            "ok" => true,
            "success" => true,
            "post_id" => $newPost['id'],
            "link" => "https://eradijital.com/blog/" . $newPost['slug'],
            "slug" => $newPost['slug'],
            "status" => $newPost['status'],
            "message" => "Blog yazısı başarıyla Era Dijital'e yayınlandı."
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    // ── Tüm Blog Yazılarını Toplu Kaydetme ──
    $newPosts = $inputData['posts'] ?? null;
    if (is_array($newPosts)) {
        file_put_contents($dataFile, json_encode($newPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        echo json_encode([
            "ok" => true,
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
