<?php
/**
 * config.php — Central Application Bootstrap and Autoloader
 * Era Dijital Admin Panel
 */

// Define absolute path helper
if (!defined('PANEL_PATH')) {
    define('PANEL_PATH', __DIR__);
}

// Autoload Core Classes
spl_autoload_register(function ($class) {
    $file = PANEL_PATH . '/core/' . $class . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

// Initialize Config Loader
Config::init();

// Initialize Database connection
try {
    Database::connect();
} catch (Exception $e) {
    die("Database connection failed. Check your database setup and .env file.");
}

// Start Session safely
Auth::initSession();
