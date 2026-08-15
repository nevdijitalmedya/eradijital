<?php
/**
 * blog.php — Blog Yazıları Listesi
 */
require_once __DIR__ . '/includes/header.php';

$message = $_GET['message'] ?? '';
$error = '';

// Handle Delete Request
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    $id = Validator::cleanInt($_GET['id']);
    $post = Database::query("SELECT id, featured_image FROM blog_posts WHERE id = ?", [$id]);
    if ($post) {
        // Delete featured image if exists
        if ($post['featured_image']) {
            $imgPath = PANEL_PATH . $post['featured_image'];
            if (file_exists($imgPath)) {
                @unlink($imgPath);
            }
        }
        Database::execute("DELETE FROM blog_posts WHERE id = ?", [$id]);
        $message = 'Blog yazısı başarıyla silindi.';
    } else {
        $error = 'Blog yazısı bulunamadı.';
    }
}

// Fetch all posts
$posts = Database::queryAll("
    SELECT * FROM blog_posts
    ORDER BY published_at DESC, created_at DESC
");
?>

<div class="premium-card p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h4 class="fw-bold text-white mb-0">Blog Yazıları</h4>
            <span class="text-muted small">Yazıları yönetin, yeni içerik ekleyin</span>
        </div>
        <a href="blog-edit.php" class="btn btn-premium">
            <i class="bi bi-plus-lg"></i> Yeni Yazı Ekle
        </a>
    </div>

    <?php if ($message): ?>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <?php echo htmlspecialchars($message); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    <?php endif; ?>

    <?php if ($error): ?>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <?php echo htmlspecialchars($error); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    <?php endif; ?>

    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th style="width: 100px;">Kapak</th>
                    <th>Başlık</th>
                    <th>Slug</th>
                    <th>Durum</th>
                    <th>Yayın Tarihi</th>
                    <th style="width: 150px;" class="text-end">İşlemler</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($posts)): ?>
                    <tr>
                        <td colspan="6" class="text-center text-muted py-5">
                            Henüz blog yazısı yok. "Yeni Yazı Ekle" butonuna tıklayın.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($posts as $post): ?>
                        <tr>
                            <td>
                                <?php if ($post['featured_image']): ?>
                                    <img src="<?php echo htmlspecialchars($post['featured_image']); ?>" alt="" class="rounded border border-secondary" style="width: 70px; height: 45px; object-fit: cover;">
                                <?php else: ?>
                                    <div class="bg-dark text-muted rounded d-flex align-items-center justify-content-center" style="width: 70px; height: 45px; border: 1px dashed var(--border-color);">
                                        <i class="bi bi-image" style="font-size: 0.8rem;"></i>
                                    </div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <span class="fw-bold text-white d-block"><?php echo htmlspecialchars($post['title']); ?></span>
                                <span class="text-muted small"><?php echo htmlspecialchars($post['author_name']); ?></span>
                            </td>
                            <td class="small text-muted">/blog/<?php echo htmlspecialchars($post['slug']); ?></td>
                            <td>
                                <?php if ($post['status'] === 'published'): ?>
                                    <span class="badge badge-published px-2 py-1">Yayında</span>
                                <?php else: ?>
                                    <span class="badge badge-draft px-2 py-1">Taslak</span>
                                <?php endif; ?>
                            </td>
                            <td class="small text-muted">
                                <?php echo $post['published_at'] ? date('d.m.Y H:i', strtotime($post['published_at'])) : '-'; ?>
                            </td>
                            <td class="text-end">
                                <a href="blog-edit.php?id=<?php echo $post['id']; ?>" class="btn btn-outline-light btn-sm me-1" title="Düzenle">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <a href="blog.php?action=delete&id=<?php echo $post['id']; ?>" class="btn btn-outline-danger btn-sm" title="Sil" onclick="return confirm('Bu yazıyı silmek istediğinizden emin misiniz?');">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
