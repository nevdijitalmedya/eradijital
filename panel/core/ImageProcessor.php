<?php
/**
 * ImageProcessor.php — Image optimization with WebP conversion
 * Adapted from Cultural Heritage panel
 */

class ImageProcessor {
    const MAX_WIDTH = 1200;
    const WEBP_QUALITY = 82;

    /**
     * Process uploaded file: optimize, resize, convert to WebP
     */
    public static function process(array $file, string $folder): array {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("Dosya yükleme hatası: " . $file['error']);
        }

        // Validate MIME type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes)) {
            throw new Exception("Geçersiz dosya türü. Sadece JPEG, PNG ve WebP kabul edilir.");
        }

        // Set up directory structure: uploads/{folder}/
        $baseUploadDir = PANEL_PATH . "/uploads/$folder";

        if (!is_dir($baseUploadDir)) {
            mkdir($baseUploadDir, 0755, true);
        }

        // Clean filename
        $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
        $cleanName = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $originalName) . '_' . time();
        $webpFilename = "$cleanName.webp";
        $webpPath = "$baseUploadDir/$webpFilename";

        // Load image into GD
        $srcImage = self::loadImageResource($file['tmp_name'], $mimeType);
        if (!$srcImage) {
            throw new Exception("Görsel işlenemedi.");
        }

        // Fix rotation if JPEG EXIF orientation exists
        if ($mimeType === 'image/jpeg' && function_exists('exif_read_data')) {
            $exif = @exif_read_data($file['tmp_name']);
            if (!empty($exif['Orientation'])) {
                switch ($exif['Orientation']) {
                    case 3: $srcImage = imagerotate($srcImage, 180, 0); break;
                    case 6: $srcImage = imagerotate($srcImage, -90, 0); break;
                    case 8: $srcImage = imagerotate($srcImage, 90, 0); break;
                }
            }
        }

        // Resize if needed
        $w = imagesx($srcImage);
        $h = imagesy($srcImage);
        if ($w > self::MAX_WIDTH) {
            $newW = self::MAX_WIDTH;
            $newH = round($h * (self::MAX_WIDTH / $w));
            $dst = imagecreatetruecolor($newW, $newH);
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            imagecopyresampled($dst, $srcImage, 0, 0, 0, 0, $newW, $newH, $w, $h);
            imagedestroy($srcImage);
            $srcImage = $dst;
        }

        // Save as WebP
        if (!imagewebp($srcImage, $webpPath, self::WEBP_QUALITY)) {
            imagedestroy($srcImage);
            throw new Exception("WebP görsel kaydedilemedi.");
        }

        imagedestroy($srcImage);

        // Return relative path
        return [
            'path' => "/uploads/$folder/$webpFilename",
            'filename' => $webpFilename
        ];
    }

    /**
     * Load GD image resource depending on mime type
     */
    private static function loadImageResource(string $path, string $mimeType) {
        switch ($mimeType) {
            case 'image/jpeg': return imagecreatefromjpeg($path);
            case 'image/png':  return imagecreatefrompng($path);
            case 'image/webp': return imagecreatefromwebp($path);
            default: return null;
        }
    }
}
