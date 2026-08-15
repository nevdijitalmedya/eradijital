<?php
/**
 * logout.php — Session logout
 */
require_once dirname(__DIR__) . '/config.php';
Auth::logout();
header('Location: login.php');
exit;
