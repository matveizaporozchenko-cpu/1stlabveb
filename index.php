<?php
declare(strict_types=1);

// ЦІ ДВА РЯДКИ ЗМУСЯТЬ PHP ПОКАЗУВАТИ УСІ ПОМИЛКИ:
ini_set('display_errors', '1');
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

$view = new \TempleUA\View(__DIR__ . '/pages');
$router = new \TempleUA\Router($view);
$router->handle($_GET['page'] ?? null);
