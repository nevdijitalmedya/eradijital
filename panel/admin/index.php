<?php
/**
 * index.php — Dashboard (Blog Stats Overview)
 */
require_once __DIR__ . '/includes/header.php';

// Fetch stats
$totalPosts = Database::query("SELECT COUNT(*) as count FROM blog_posts")['count'] ?? 0;
$publishedPosts = Database::query("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'")['count'] ?? 0;
$draftPosts = Database::query("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'draft'")['count'] ?? 0;

// Recent posts
$recentPosts = Database::queryAll("
    SELECT id, title, slug, status, published_at, created_at 
    FROM blog_posts 
    ORDER BY created_at DESC 
    LIMIT 5
");
?>

<!-- Stats Row -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="stat-card">
            <div class="text-muted small mb-1"><i class="bi bi-journal-text"></i> Toplam Yazı</div>
            <div class="stat-number"><?php echo $totalPosts; ?></div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="stat-card">
            <div class="text-muted small mb-1"><i class="bi bi-check-circle"></i> Yayında</div>
            <div class="stat-number" style="background: linear-gradient(135deg, #10b981, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"><?php echo $publishedPosts; ?></div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="stat-card">
            <div class="text-muted small mb-1"><i class="bi bi-pencil-square"></i> Taslak</div>
            <div class="stat-number" style="background: linear-gradient(135deg, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"><?php echo $draftPosts; ?></div>
        </div>
    </div>
</div>

<!-- Quick Actions -->
<div class="premium-card p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold text-white mb-0">Hızlı İşlemler</h5>
    </div>
    <a href="blog-edit.php" class="btn btn-premium">
        <i class="bi bi-plus-lg"></i> Yeni Blog Yazısı Ekle
    </a>
    <a href="blog.php" class="btn btn-premium-outline ms-2">
        <i class="bi bi-journal-text"></i> Tüm Yazıları Gör
    </a>
</div>

<!-- Recent Posts Table -->
<div class="premium-card p-4">
    <h5 class="fw-bold text-white mb-3">Son Eklenen Yazılar</h5>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Başlık</th>
                    <th>Durum</th>
                    <th>Tarih</th>
                    <th class="text-end">İşlem</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($recentPosts)): ?>
                    <tr>
                        <td colspan="4" class="text-center text-muted py-5">
                            Henüz blog yazısı yok. "Yeni Blog Yazısı Ekle" butonuna tıklayın.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($recentPosts as $post): ?>
                        <tr>
                            <td>
                                <span class="fw-bold text-white"><?php echo htmlspecialchars($post['title']); ?></span>
                            </td>
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
                                <a href="blog-edit.php?id=<?php echo $post['id']; ?>" class="btn btn-outline-light btn-sm">
                                    <i class="bi bi-pencil"></i>
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
