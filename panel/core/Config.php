<?php
/**
 * Config.php — Environmental Variable Loader
 * Adapted from Cultural Heritage panel
 */

class Config {
    private static array $vars = [];
    private static bool $loaded = false;

    public static function init(): void {
        if (self::$loaded) return;
        
        $envPath = PANEL_PATH . '/.env';
        if (file_exists($envPath)) {
            self::load($envPath);
        }
        
        self::$loaded = true;
    }

    public static function load(string $path): void {
        if (!file_exists($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || strpos($line, '#') === 0) {
                continue;
            }

            if (strpos($line, '=') === false) {
                continue;
            }

            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);

            // Strip surrounding quotes
            if (preg_match('/^["\'](.*)["\']\s*$/', $value, $matches)) {
                $value = $matches[1];
            }

            self::$vars[$name] = $value;
            $_ENV[$name] = $value;
            putenv("$name=$value");
        }
    }

    public static function get(string $key, $default = null) {
        self::init();
        if (array_key_exists($key, self::$vars)) {
            return self::$vars[$key];
        }
        $val = getenv($key);
        if ($val !== false) {
            return $val;
        }
        return $_ENV[$key] ?? $default;
    }
}
