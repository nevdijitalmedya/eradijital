<?php
/**
 * blog-edit.php — Blog Yazısı Oluştur / Düzenle
 */
require_once __DIR__ . '/includes/header.php';

$id = isset($_GET['id']) ? Validator::cleanInt($_GET['id']) : 0;
$isEdit = $id > 0;

$error = '';
$message = '';

$post = [
    'title' => '',
    'slug' => '',
    'excerpt' => '',
    'content' => '',
    'featured_image' => '',
    'author_name' => 'Era Dijital Ekibi',
    'status' => 'draft',
    'seo_title' => '',
    'seo_description' => '',
    'published_at' => date('Y-m-d H:i')
];

if ($isEdit) {
    $loadedPost = Database::query("SELECT * FROM blog_posts WHERE id = ?", [$id]);
    if (!$loadedPost) {
        echo '<div class="alert alert-danger">Yazı bulunamadı.</div>';
        require_once __DIR__ . '/includes/footer.php';
        exit;
    }
    $post = $loadedPost;
}

// Handle Form Submit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $title = trim($_POST['title'] ?? '');
        $excerpt = trim($_POST['excerpt'] ?? '');
        $content = Validator::cleanHtml($_POST['content'] ?? '');
        $authorName = trim($_POST['author_name'] ?? 'Era Dijital Ekibi');
        $status = Validator::cleanString($_POST['status'] ?? 'draft');
        $publishedAt = $_POST['published_at'] ? date('Y-m-d H:i:s', strtotime($_POST['published_at'])) : null;
        $seoTitle = trim($_POST['seo_title'] ?? '');
        $seoDesc = trim($_POST['seo_description'] ?? '');

        // Auto slug generator
        $slug = trim($_POST['slug'] ?? '');
        if (empty($slug)) {
            $slug = Validator::slugify($title);
        }
        $slug = Validator::cleanString($slug);

        if (empty($title) || empty($slug)) {
            throw new Exception('Başlık ve slug alanları zorunludur.');
        }

        // Verify slug uniqueness
        $slugCheckSql = "SELECT id FROM blog_posts WHERE slug = ?" . ($isEdit ? " AND id != ?" : "");
        $slugCheckParams = $isEdit ? [$slug, $id] : [$slug];
        if (Database::query($slugCheckSql, $slugCheckParams)) {
            throw new Exception("Bu slug ('$slug') başka bir yazı tarafından kullanılıyor.");
        }

        $featuredImagePath = $post['featured_image'];

        // Handle featured image upload
        if (isset($_FILES['featured_image']) && $_FILES['featured_image']['error'] === UPLOAD_ERR_OK) {
            // Delete old featured image if replacing
            if ($isEdit && $post['featured_image']) {
                $oldPath = PANEL_PATH . $post['featured_image'];
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $processed = ImageProcessor::process($_FILES['featured_image'], 'blog');
            $featuredImagePath = $processed['path'];
        }

        if ($isEdit) {
            Database::execute("
                UPDATE blog_posts SET 
                    title = ?, slug = ?, excerpt = ?, content = ?, 
                    featured_image = ?, author_name = ?, status = ?, 
                    seo_title = ?, seo_description = ?, published_at = ?
                WHERE id = ?
            ", [$title, $slug, $excerpt, $content, $featuredImagePath, $authorName, $status, $seoTitle, $seoDesc, $publishedAt, $id]);
        } else {
            Database::execute("
                INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_name, status, seo_title, seo_description, published_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ", [$title, $slug, $excerpt, $content, $featuredImagePath, $authorName, $status, $seoTitle, $seoDesc, $publishedAt]);
        }

        header("Location: blog.php?message=" . urlencode('Yazı başarıyla kaydedildi.'));
        exit;

    } catch (Exception $ex) {
        $error = $ex->getMessage();
    }
}
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h4 class="fw-bold text-white mb-0"><?php echo $isEdit ? 'Yazıyı Düzenle' : 'Yeni Yazı Oluştur'; ?></h4>
        <span class="text-muted small"><?php echo $isEdit ? 'Blog yazısını güncelleyin' : 'Yeni bir blog yazısı yazın'; ?></span>
    </div>
    <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-info text-white border-info d-flex align-items-center gap-2 px-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#aiModal" style="background: linear-gradient(135deg, rgba(13,110,253,0.2), rgba(111,66,193,0.3));">
            <i class="bi bi-stars text-warning"></i>
            <span class="fw-semibold">✨ AI ile Makale Üret</span>
        </button>
        <a href="blog.php" class="btn btn-premium-outline">
            <i class="bi bi-chevron-left"></i> Listeye Dön
        </a>
    </div>
</div>

<!-- AI Generator Modal -->
<div class="modal fade" id="aiModal" tabindex="-1" aria-labelledby="aiModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: #1e1b2e; border: 1px solid rgba(255,255,255,0.1); color: #fff;">
            <div class="modal-header border-secondary">
                <h5 class="modal-title d-flex align-items-center gap-2" id="aiModalLabel">
                    <i class="bi bi-robot text-info"></i>
                    <span>AI SEO Blog Yazarı</span>
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Kapat"></button>
            </div>
            <div class="modal-body p-4">
                <div class="mb-3">
                    <label class="form-label text-muted small">Odak Anahtar Kelime *</label>
                    <input type="text" class="form-control" id="ai_keyword" placeholder="Örn: 2026 Yapay Zeka Trendleri" required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small">Detaylı Konu / Hedef Başlık (Opsiyonel)</label>
                    <input type="text" class="form-control" id="ai_topic" placeholder="Örn: KOBİ'ler için yapay zeka entegrasyonu rehberi">
                </div>
                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <label class="form-label text-muted small">Yazım Tonu</label>
                        <select class="form-select" id="ai_tone">
                            <option value="bilgilendirici" selected>Bilgilendirici & Uzman</option>
                            <option value="samimi">Samimi & Akıcı</option>
                            <option value="ikna edici">İkna Edici / Satış Odaklı</option>
                            <option value="akademik">Teknik & Analitik</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label class="form-label text-muted small">Makale Uzunluğu</label>
                        <select class="form-select" id="ai_length">
                            <option value="long" selected>Kapsamlı Rehber (~1000 Kelime)</option>
                            <option value="short">Özet & Hap Bilgi (~400 Kelime)</option>
                        </select>
                    </div>
                </div>

                <div id="ai_error" class="alert alert-danger d-none py-2 small"></div>
                <div id="ai_status" class="alert alert-info d-none py-2 small d-flex align-items-center gap-2">
                    <div class="spinner-border spinner-border-sm text-info" role="status"></div>
                    <span>SEO uyumlu makale ve meta veriler üretiliyor, lütfen bekleyin...</span>
                </div>
            </div>
            <div class="modal-footer border-secondary">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                <button type="button" class="btn btn-primary d-flex align-items-center gap-2" id="ai_generate_btn" onclick="generateAiArticle()">
                    <i class="bi bi-sparkles"></i>
                    <span>Makaleyi Oluştur</span>
                </button>
            </div>
        </div>
    </div>
</div>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <?php echo htmlspecialchars($error); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<form action="blog-edit.php<?php echo $isEdit ? "?id=$id" : ""; ?>" method="POST" enctype="multipart/form-data">
    <div class="row g-4">
        <!-- Main Form Left Side -->
        <div class="col-lg-8">
            <div class="premium-card p-4 mb-4">
                <div class="mb-3">
                    <label class="form-label text-muted small">Yazı Başlığı *</label>
                    <input type="text" class="form-control" name="title" id="title" data-slugify="slug" value="<?php echo htmlspecialchars($post['title']); ?>" required placeholder="Örn: Yapay Zeka ile Satışları Artırma">
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted small">Özet / Giriş</label>
                    <textarea class="form-control" name="excerpt" id="excerpt" rows="3" placeholder="Yazının kısa özeti (blog listesinde görünür)"><?php echo htmlspecialchars($post['excerpt']); ?></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted small">Yazı İçeriği</label>
                    <textarea class="form-control wysiwyg" name="content" id="content"><?php echo htmlspecialchars($post['content']); ?></textarea>
                </div>
            </div>

            <!-- SEO Section -->
            <div class="premium-card p-4">
                <h5 class="fw-bold text-white mb-3"><i class="bi bi-search"></i> SEO Ayarları</h5>
                <div class="mb-3">
                    <label class="form-label text-muted small">SEO Başlığı</label>
                    <input type="text" class="form-control" name="seo_title" id="seo_title" value="<?php echo htmlspecialchars($post['seo_title']); ?>" placeholder="Google'da görünecek başlık (boş bırakırsanız yazı başlığı kullanılır)">
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small">SEO Açıklaması</label>
                    <textarea class="form-control" name="seo_description" id="seo_description" rows="2" placeholder="Google'da görünecek açıklama metni"><?php echo htmlspecialchars($post['seo_description']); ?></textarea>
                </div>
            </div>
        </div>

        <!-- Right Sidebar Controls -->
        <div class="col-lg-4">
            <!-- Publishing settings -->
            <div class="premium-card p-4 mb-4">
                <h5 class="fw-bold text-white mb-3">Yayın Ayarları</h5>
                
                <div class="mb-3">
                    <label class="form-label text-muted small">URL Slug *</label>
                    <input type="text" class="form-control" name="slug" id="slug" value="<?php echo htmlspecialchars($post['slug']); ?>" required>
                    <span class="text-muted small" style="font-size:0.75rem;">eradijital.com/blog/<strong id="slug-preview"><?php echo htmlspecialchars($post['slug']); ?></strong></span>
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted small">Yazar</label>
                    <input type="text" class="form-control" name="author_name" value="<?php echo htmlspecialchars($post['author_name']); ?>">
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted small">Yayın Durumu</label>
                    <select class="form-select" name="status">
                        <option value="draft" <?php echo $post['status'] == 'draft' ? 'selected' : ''; ?>>Taslak</option>
                        <option value="published" <?php echo $post['status'] == 'published' ? 'selected' : ''; ?>>Yayında</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted small">Yayın Tarihi</label>
                    <input type="datetime-local" class="form-control" name="published_at" value="<?php echo date('Y-m-d\TH:i', strtotime($post['published_at'])); ?>">
                </div>
            </div>

            <!-- Cover Image Upload -->
            <div class="premium-card p-4 mb-4">
                <h5 class="fw-bold text-white mb-3">Kapak Görseli</h5>
                
                <?php if ($post['featured_image']): ?>
                    <div class="mb-3 text-center border border-secondary rounded p-2" style="background: var(--dark-bg);">
                        <img src="<?php echo htmlspecialchars($post['featured_image']); ?>" alt="" class="img-fluid rounded" style="max-height: 160px; object-fit: cover;">
                        <span class="small text-muted d-block mt-2">Mevcut kapak görseli</span>
                    </div>
                <?php endif; ?>

                <div class="mb-3">
                    <label class="form-label text-muted small"><?php echo $post['featured_image'] ? 'Yeni Görsel Yükle (değiştirmek için)' : 'Görsel Yükle'; ?></label>
                    <input class="form-control" type="file" name="featured_image" accept="image/*">
                </div>
            </div>

            <!-- Save Button -->
            <div class="premium-card p-4">
                <button type="submit" class="btn btn-premium w-100 py-2">
                    <i class="bi bi-floppy"></i> <?php echo $isEdit ? 'Yazıyı Güncelle' : 'Yazıyı Kaydet'; ?>
                </button>
            </div>
        </div>
    </div>
</form>

<script>
// Live slug preview
document.getElementById('slug')?.addEventListener('input', function() {
    const preview = document.getElementById('slug-preview');
    if (preview) preview.textContent = this.value;
});

// AI Article Generator
async function generateAiArticle() {
    const keyword = document.getElementById('ai_keyword').value.trim();
    const topic = document.getElementById('ai_topic').value.trim();
    const tone = document.getElementById('ai_tone').value;
    const lengthType = document.getElementById('ai_length').value;

    const errorDiv = document.getElementById('ai_error');
    const statusDiv = document.getElementById('ai_status');
    const btn = document.getElementById('ai_generate_btn');

    errorDiv.classList.add('d-none');
    errorDiv.textContent = '';

    if (!keyword && !topic) {
        errorDiv.textContent = 'Lütfen anahtar kelime girin.';
        errorDiv.classList.remove('d-none');
        return;
    }

    btn.disabled = true;
    statusDiv.classList.remove('d-none');

    try {
        const response = await fetch('../api/ai-generate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword: keyword,
                topic: topic || keyword,
                tone: tone,
                length_type: lengthType
            })
        });

        const res = await response.json();

        if (!response.ok || !res.ok) {
            throw new Error(res.error || 'AI üretimi başarısız oldu.');
        }

        const data = res.data;

        // Form alanlarını doldur
        if (data.title) {
            document.getElementById('title').value = data.title;
        }
        if (data.slug) {
            document.getElementById('slug').value = data.slug;
            const preview = document.getElementById('slug-preview');
            if (preview) preview.textContent = data.slug;
        }
        if (data.excerpt) {
            document.getElementById('excerpt').value = data.excerpt;
        }
        if (data.seo_title) {
            document.getElementById('seo_title').value = data.seo_title;
        }
        if (data.seo_description) {
            document.getElementById('seo_description').value = data.seo_description;
        }

        // TinyMCE editor içeriğini güncelle
        if (data.content) {
            if (typeof tinymce !== 'undefined' && tinymce.get('content')) {
                tinymce.get('content').setContent(data.content);
            } else {
                document.getElementById('content').value = data.content;
            }
        }

        // Modalı kapat
        const modalEl = document.getElementById('aiModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        alert('✨ Makale başarıyla üretildi ve form alanlarına aktarıldı!');

    } catch (err) {
        errorDiv.textContent = err.message || 'Bir hata oluştu.';
        errorDiv.classList.remove('d-none');
    } finally {
        btn.disabled = false;
        statusDiv.classList.add('d-none');
    }
}
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
