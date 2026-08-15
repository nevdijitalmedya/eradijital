<?php
/**
 * Auth.php — Session-based authentication (single-tenant, simplified from CH)
 */

class Auth {
    
    public static function initSession(): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * Authenticate admin user
     */
    public static function login(string $username, string $password): bool {
        self::initSession();
        
        $user = Database::query(
            "SELECT * FROM admin_users WHERE username = ? AND is_active = 1",
            [$username]
        );

        if ($user && password_verify($password, $user['password_hash'])) {
            // Update last login
            Database::execute("UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [$user['id']]);

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['full_name'] = $user['full_name'];

            return true;
        }

        return false;
    }

    /**
     * Enforce authentication for panel pages
     */
    public static function requireAuth(): void {
        self::initSession();
        if (empty($_SESSION['user_id'])) {
            header('Location: login.php');
            exit;
        }
    }

    /**
     * Check if user is editor (limited permissions)
     */
    public static function isEditor(): bool {
        self::initSession();
        return ($_SESSION['role'] ?? '') === 'editor';
    }

    /**
     * Log user out
     */
    public static function logout(): void {
        self::initSession();
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
    }
}
