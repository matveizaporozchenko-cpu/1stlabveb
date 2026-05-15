<?php
namespace TempleUA;

class View {
    private string $pagesPath;
    public function __construct(string $pagesPath) {
        $this->pagesPath = $pagesPath;
    }
    public function render(?string $page): void {
        $pageName = $page ?: 'home';
        $contentFile = $this->pagesPath . '/' . $pageName . '.php';
        if (!file_exists($contentFile)) $contentFile = $this->pagesPath . '/404.php';
        require __DIR__ . '/../layout.php';
    }
}