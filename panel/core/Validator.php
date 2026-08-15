<?php
/**
 * Validator.php — Form and query input security sanitizer
 * Adapted from Cultural Heritage panel
 */

class Validator {

    /**
     * Sanitizes inputs to prevent XSS
     */
    public static function cleanString(string $data): string {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Sanitizes HTML inputs (for rich text editors like WYSIWYG)
     */
    public static function cleanHtml(string $html): string {
        $html = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $html);
        return trim($html);
    }

    /**
     * Sanitizes integers
     */
    public static function cleanInt($val): int {
        return (int) filter_var($val, FILTER_SANITIZE_NUMBER_INT);
    }

    /**
     * Generate URL-safe slug from Turkish text
     */
    public static function slugify(string $text): string {
        // Turkish character map
        $tr = ['ç','ğ','ı','ö','ş','ü','Ç','Ğ','İ','Ö','Ş','Ü'];
        $en = ['c','g','i','o','s','u','c','g','i','o','s','u'];
        $text = str_replace($tr, $en, $text);
        
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9\-]/', '-', $text);
        $text = preg_replace('/-+/', '-', $text);
        $text = trim($text, '-');
        return $text;
    }
}
