<?php
/**
 * publish-post.php — Secure REST API endpoint for receiving blog posts
 * Used by external platforms (e.g. sosyalmedya-ajans SEO Generator)
 */
require_once dirname(__DIR__) . '/config.php';

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-API-KEY");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. API Key Authentication
$configuredApiKey = Config::get('API_SECRET_KEY', 'era_secret_key_2026');
$providedApiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';

if (!$providedApiKey && isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (preg_match('/Bearer\s+(.*)$/i', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
        $providedApiKey = trim($matches[1]);
    }
}

if (empty($providedApiKey) || $providedApiKey !== $configuredApiKey) {
    Response::error('Yetkisiz erişim. Geçerli bir X-API-KEY gereklidir.', 401);
}

// 2. Health check / Connection Test
if ($_SERVER['REQUEST_METHOD'] === 'GET' || isset($_GET['test'])) {
    Response::json([
        'ok' => true,
        'site' => 'Era Dijital',
        'type' => 'custom_panel',
        'version' => '1.0',
        'status' => 'connected',
        'timestamp' => date('c')
    ]);
}

// 3. Post Publishing
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Sadece POST ve GET istekleri kabul edilir.', 405);
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!$input) {
    Response::error('Geçersiz JSON verisi.', 400);
}

$title = trim($input['title'] ?? '');
if (empty($title)) {
    Response::error('Yazı başlığı (title) zorunludur.', 422);
}

$content = $input['content'] ?? '';
$excerpt = trim($input['excerpt'] ?? '');
$authorName = trim($input['author_name'] ?? 'Era Dijital Ekibi');
$status = in_array($input['status'] ?? '', ['draft', 'published']) ? $input['status'] : 'draft';
$seoTitle = trim($input['seo_title'] ?? $title);
$seoDesc = trim($input['seo_description'] ?? $excerpt);
$publishedAt = ($status === 'published') ? date('Y-m-d H:i:s') : (isset($input['published_at']) ? date('Y-m-d H:i:s', strtotime($input['published_at'])) : null);

// Generate / Clean Slug
$slug = trim($input['slug'] ?? '');
if (empty($slug)) {
    $slug = Validator::slugify($title);
} else {
    $slug = Validator::slugify($slug);
}

// Ensure Slug Uniqueness
$originalSlug = $slug;
$counter = 1;
while (true) {
    $exists = Database::query("SELECT id FROM blog_posts WHERE slug = ?", [$slug]);
    if (!$exists) {
        break;
    }
    $counter++;
    $slug = "{$originalSlug}-{$counter}";
}

// 4. Download and process featured image if provided
$featuredImagePath = null;
$featuredImageUrl = trim($input['featured_image_url'] ?? '');

if (!empty($featuredImageUrl)) {
    try {
        $uploadDir = PANEL_PATH . '/uploads/blog';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Fetch image bytes
        $ch = curl_init($featuredImageUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 EraDijital-Bot/1.0');
        $imgData = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && !empty($imgData)) {
            $imgName = 'blog_' . time() . '_' . substr(md5($slug), 0, 8);
            $tmpFile = tempnam(sys_get_temp_dir(), 'era_img_');
            file_put_contents($tmpFile, $imgData);

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $tmpFile);
            finfo_close($finfo);

            $ext = 'jpg';
            if ($mimeType === 'image/png') $ext = 'png';
            elseif ($mimeType === 'image/webp') $ext = 'webp';

            $targetWebp = "$uploadDir/{$imgName}.webp";

            // If GD is available and supports webp
            if (function_exists('imagewebp')) {
                $src = null;
                if ($mimeType === 'image/jpeg') $src = @imagecreatefromjpeg($tmpFile);
                elseif ($mimeType === 'image/png') $src = @imagecreatefrompng($tmpFile);
                elseif ($mimeType === 'image/webp') $src = @imagecreatefromwebp($tmpFile);

                if ($src) {
                    imagewebp($src, $targetWebp, 82);
                    imagedestroy($src);
                    $featuredImagePath = "/uploads/blog/{$imgName}.webp";
                }
            }

            if (!$featuredImagePath) {
                // Fallback direct copy
                $targetFile = "$uploadDir/{$imgName}.{$ext}";
                copy($tmpFile, $targetFile);
                $featuredImagePath = "/uploads/blog/{$imgName}.{$ext}";
            }

            @unlink($tmpFile);
        }
    } catch (Exception $e) {
        error_log("Featured image download error: " . $e->getMessage());
    }
}

// 5. Insert post into database
try {
    Database::execute("
        INSERT INTO blog_posts (
            title, slug, excerpt, content, featured_image, 
            author_name, status, seo_title, seo_description, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ", [
        $title,
        $slug,
        $excerpt,
        $content,
        $featuredImagePath,
        $authorName,
        $status,
        $seoTitle,
        $seoDesc,
        $publishedAt
    ]);

    $postId = (int)Database::lastInsertId();
    $frontendUrl = rtrim(Config::get('FRONTEND_URL', 'https://eradijital.com'), '/');

    Response::json([
        'ok' => true,
        'post_id' => $postId,
        'slug' => $slug,
        'link' => "{$frontendUrl}/blog/{$slug}",
        'status' => $status,
        'featured_image' => $featuredImagePath,
        'message' => 'Blog yazısı başarıyla eklendi.'
    ], 201);

} catch (Exception $e) {
    Response::error('Veritabanına kayıt başarısız: ' . $e->getMessage(), 500);
}
