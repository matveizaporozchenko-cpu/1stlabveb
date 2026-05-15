<?php
namespace TempleUA;

class Router {
    private View $view;
    public function __construct(View $view) { $this->view = $view; }
    public function handle(?string $page): void { $this->view->render($page); }
}
