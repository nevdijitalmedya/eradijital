<?php
/**
 * login.php — Admin Giriş Sayfası
 */
require_once dirname(__DIR__) . '/config.php';

// If already logged in, redirect to dashboard
if (!empty($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = 'Lütfen kullanıcı adı ve şifre girin.';
    } else {
        if (Auth::login($username, $password)) {
            header('Location: index.php');
            exit;
        } else {
            $error = 'Geçersiz kullanıcı adı veya şifre.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Giriş - Era Dijital</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="assets/css/admin.css" rel="stylesheet">
</head>
<body class="d-flex align-items-center py-4">
    
    <div class="login-container mt-5">
        <div class="text-center mb-4">
            <h2 class="fw-bold text-white mb-1" style="letter-spacing: 1px;">
                <i class="bi bi-lightning-charge-fill" style="color: var(--primary-color);"></i> ERA DİJİTAL
            </h2>
            <span class="text-muted small">Blog Yönetim Paneli</span>
        </div>

        <?php if ($error): ?>
            <div class="alert alert-danger text-center py-2" role="alert">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="mb-3">
                <label for="username" class="form-label text-muted small">Kullanıcı Adı</label>
                <input type="text" class="form-control" id="username" name="username" required autocomplete="username" autofocus>
            </div>
            
            <div class="mb-4">
                <label for="password" class="form-label text-muted small">Şifre</label>
                <input type="password" class="form-control" id="password" name="password" required autocomplete="current-password">
            </div>

            <button type="submit" class="btn btn-premium w-100 py-2">
                <i class="bi bi-box-arrow-in-right"></i> Giriş Yap
            </button>
        </form>
        
        <div class="text-center mt-4">
            <span class="text-muted small">Era Dijital © 2026</span>
        </div>
    </div>

</body>
</html>
