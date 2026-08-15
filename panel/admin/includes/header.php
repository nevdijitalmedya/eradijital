<?php
/**
 * header.php — Admin Panel Common Header
 */
require_once dirname(dirname(__DIR__)) . '/config.php';
Auth::requireAuth();
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Era Dijital</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Premium Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Custom Admin CSS -->
    <link href="assets/css/admin.css" rel="stylesheet">
    <!-- TinyMCE WYSIWYG -->
    <script src="https://cdn.jsdelivr.net/npm/tinymce@6.8.2/tinymce.min.js" referrerpolicy="origin"></script>
</head>
<body>
    <div class="d-flex">
        <!-- Sidebar Navigation -->
        <?php require_once __DIR__ . '/sidebar.php'; ?>
        
        <!-- Main Content Area -->
        <div class="flex-grow-1" style="min-width: 0;">
            <!-- Top Navbar -->
            <header class="navbar-header d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <span class="fs-4 fw-bold text-white me-2">
                        <i class="bi bi-lightning-charge-fill" style="color: var(--primary-color);"></i> Era Dijital
                    </span>
                    <span class="badge" style="background: var(--primary-color);">Blog Paneli</span>
                </div>
                <div class="dropdown">
                    <button class="btn btn-outline-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle"></i> <?php echo htmlspecialchars($_SESSION['full_name'] ?? $_SESSION['username']); ?>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="logout.php"><i class="bi bi-box-arrow-right"></i> Çıkış Yap</a></li>
                    </ul>
                </div>
            </header>
            
            <main class="p-4">
