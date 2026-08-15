<?php
/**
 * ai-generate.php — In-panel AI Blog Post Generator via Gemini API
 * Era Dijital Admin Panel
 */
require_once dirname(__DIR__) . '/config.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-API-KEY");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Auth check: Must be logged in or have valid API key
$hasValidSession = Auth::check();
$providedApiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
$configuredApiKey = Config::get('API_SECRET_KEY', 'era_secret_key_2026');
$hasValidApiKey = (!empty($providedApiKey) && $providedApiKey === $configuredApiKey);

if (!$hasValidSession && !$hasValidApiKey) {
    Response::error('Yetkisiz erişim. Lütfen giriş yapın.', 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Sadece POST istekleri kabul edilir.', 405);
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$keyword = trim($input['keyword'] ?? '');
$topic = trim($input['topic'] ?? $keyword);
$tone = trim($input['tone'] ?? 'bilgilendirici');
$lengthType = trim($input['length_type'] ?? 'long'); // 'short' | 'long'

if (empty($keyword) && empty($topic)) {
    Response::error('Anahtar kelime veya konu girilmelidir.', 422);
}

// 2. Gemini API Key
$geminiApiKey = Config::get('GEMINI_API_KEY');
if (empty($geminiApiKey)) {
    // Check .env in parent or system env
    $geminiApiKey = getenv('GEMINI_API_KEY') ?: Config::get('GOOGLE_API_KEY');
}

if (empty($geminiApiKey)) {
    Response::error('GEMINI_API_KEY .env dosyasında tanımlı değil. Lütfen panel/.env dosyasına GEMINI_API_KEY=... ekleyin.', 500);
}

$wordCountDesc = ($lengthType === 'long') 
    ? 'yaklaşık 900-1200 kelimelik kapsamlı, H2 ve H3 alt başlıklı, derinlemesine SEO rehberi'
    : 'yaklaşık 400-500 kelimelik net, akıcı, hap bilgi sunan odaklı makale';

$prompt = <<<PROMPT
Sen Türkiye'nin önde gelen dijital ajansı Era Dijital için çalışan kıdemli bir SEO İçerik Stratejisti ve Baş Editörsün.
Aşağıdaki kriterlere göre Google'da 1. sıraya oynayacak, özgün, akıcı, okuyucuyu bağlayan profesyonel bir blog makalesi üret:

- Anahtar Kelime: {$keyword}
- Konu / Odak: {$topic}
- Yazım Tonu: {$tone} (Profesyonel, güncel, güven verici)
- Uzunluk: {$wordCountDesc}

KURALLAR:
1. Makale içeriği HTML formatında olmalıdır (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> etiketleri kullanılmalı).
2. <h1> etiketi KULLANMA (h1 başlık alanı için ayrılmıştır).
3. Hashtag (#) kesinlikle KULLANMA.
4. Başlık (title) tıklama oranı (CTR) yüksek, SEO uyumlu ve dikkat çekici olmalı.
5. Slug Türkçe karakter içermeyen, küçük harfli ve tirelerle ayrılmış olmalı.
6. Excerpt (özet) 2-3 cümlelik vurucu bir meta özeti olmalı.
7. seo_title maksimum 60 karakter olmalı.
8. seo_description maksimum 155 karakter olmalı.
9. image_prompt: Bu makale için DALL-E / Flux / Midjourney için İngilizce, fotogerçekçi ve profesyonel bir görsel prompt'u üret.

Çıktıyı KESİNLİKLE sadece aşağıdaki JSON formatında ver, başka hiçbir açıklama veya markdown bloğu (```json vb.) ekleme:
{
  "title": "SEO Uyumlu Çekici Başlık",
  "slug": "seo-uyumlu-cekici-baslik",
  "excerpt": "Kısa ve etkileyici özet metni...",
  "content": "<p>Giriş paragrafı...</p><h2>İlk Ana Başlık</h2><p>Detaylı açıklama...</p><ul><li>Madde 1</li><li>Madde 2</li></ul><h3>Alt Başlık</h3><p>Sonuç ve tavsiyeler...</p>",
  "seo_title": "Google İçin 60 Karakter SEO Başlığı | Era Dijital",
  "seo_description": "Arama motorlarında listelenecek 155 karakterlik tıklama odaklı meta açıklama.",
  "image_prompt": "Ultra-detailed high resolution corporate photography representing ..."
}
PROMPT;

// Call Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . urlencode($geminiApiKey);

$payload = [
    "contents" => [
        [
            "parts" => [
                ["text" => $prompt]
            ]
        ]
    ],
    "generationConfig" => [
        "temperature" => 0.7,
        "responseMimeType" => "application/json"
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_TIMEOUT, 90);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode !== 200 || empty($response)) {
    // Fallback to gemini-1.5-flash if 2.5 is unavailable
    $fallbackUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . urlencode($geminiApiKey);
    $ch2 = curl_init($fallbackUrl);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_POST, true);
    curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch2, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch2, CURLOPT_TIMEOUT, 90);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch2);
    $httpCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
    curl_close($ch2);

    if ($httpCode !== 200) {
        Response::error("Gemini API çağrısı başarısız oldu (HTTP $httpCode): " . substr($response, 0, 300), 502);
    }
}

$responseData = json_decode($response, true);
$rawText = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? '';

// Clean potential markdown blocks
$rawText = trim($rawText);
if (strpos($rawText, '```json') === 0) {
    $rawText = substr($rawText, 7);
}
if (strpos($rawText, '```') === 0) {
    $rawText = substr($rawText, 3);
}
if (substr($rawText, -3) === '```') {
    $rawText = substr($rawText, 0, -3);
}
$rawText = trim($rawText);

$parsed = json_decode($rawText, true);

if (!$parsed || !isset($parsed['title'])) {
    Response::error("AI yanıtı JSON olarak ayrıştırılamadı. Ham yanıt: " . substr($rawText, 0, 300), 500);
}

Response::json([
    'ok' => true,
    'data' => $parsed
]);
