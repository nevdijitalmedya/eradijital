<?php
/**
 * blog.php — Public REST API endpoint for blog posts
 * 
 * Usage:
 *   GET /api/blog.php              → All published posts (list)
 *   GET /api/blog.php?slug=my-post → Single post detail
 */
require_once dirname(__DIR__) . '/config.php';

// CORS headers (fallback for servers without mod_headers)
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://eradijital.com',
    'https://www.eradijital.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$slug = trim($_GET['slug'] ?? '');

if (!empty($slug)) {
    // ─── Single Post Detail ───
    $post = Database::query("
        SELECT id, title, slug, excerpt, content, featured_image, 
               author_name, seo_title, seo_description, published_at, created_at
        FROM blog_posts 
        WHERE slug = ? AND status = 'published'
    ", [$slug]);

    if (!$post) {
        Response::error('Blog yazısı bulunamadı.', 404);
    }

    Response::json($post);

} else {
    // ─── List All Published Posts ───
    $posts = Database::queryAll("
        SELECT id, title, slug, excerpt, featured_image, 
               author_name, seo_title, seo_description, published_at, created_at
        FROM blog_posts 
        WHERE status = 'published'
        ORDER BY published_at DESC, id DESC
    ");

    Response::json($posts);
}
