<?php
/**
 * Response.php — Standardized HTTP Response Helper
 * Adapted from Cultural Heritage panel
 */

class Response {
    
    /**
     * Send JSON response
     */
    public static function json($data, int $statusCode = 200): void {
        if (ob_get_level()) {
            ob_clean();
        }

        header('Content-Type: application/json; charset=utf-8');
        http_response_code($statusCode);

        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send structured error response
     */
    public static function error(string $message, int $statusCode = 400): void {
        self::json([
            'status' => 'error',
            'code' => $statusCode,
            'message' => $message
        ], $statusCode);
    }
}
