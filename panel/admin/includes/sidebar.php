<?php
/**
 * sidebar.php — Simplified Sidebar for Blog-only Panel
 */
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<aside class="sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 d-flex flex-column align-items-center align-items-sm-start">
    <div class="w-100 px-3 py-2 text-center text-sm-start">
        <h4 class="fw-bold text-white mb-0 d-none d-sm-block">ERA DİJİTAL</h4>
        <span class="text-muted small d-none d-sm-block">Blog Yönetim Paneli</span>
        <hr class="border-secondary my-3 w-100">
    </div>
    
    <ul class="nav nav-pills flex-column mb-auto w-100 align-items-center align-items-sm-start px-0" id="menu">
        <li class="w-100">
            <a href="index.php" class="nav-link align-middle px-3 <?php echo ($currentPage == 'index.php') ? 'active' : ''; ?>">
                <i class="fs-5 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
            </a>
        </li>
        <li class="w-100">
            <a href="blog.php" class="nav-link align-middle px-3 <?php echo ($currentPage == 'blog.php' || $currentPage == 'blog-edit.php') ? 'active' : ''; ?>">
                <i class="fs-5 bi-journal-text"></i> <span class="ms-1 d-none d-sm-inline">Blog Yazıları</span>
            </a>
        </li>
    </ul>
    
    <div class="w-100 p-3 mt-auto text-center border-top border-secondary">
        <a href="logout.php" class="btn btn-outline-danger btn-sm w-100 d-none d-sm-block">
            <i class="bi bi-box-arrow-right"></i> Çıkış Yap
        </a>
    </div>
</aside>
