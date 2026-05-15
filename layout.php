<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Temple UA | PHP Edition</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <header>
        <nav>
            <a href="?page=home" class="logo">Temple UA</a>
            <ul class="nav-links">
                <li><a href="?page=home">Головна</a></li>
                <li><a href="?page=products">Каталог</a></li>
                <li><a href="?page=contact">Контакти</a></li>
                <li><button id="theme-toggle" style="background:none; border:none; cursor:pointer; font-size:1.2rem; margin-left: 15px;">🌙</button></li>
            </ul>
        </nav>
    </header>

    <main id="app">
        <?php require $contentFile; ?>
    </main>

    <footer><p>&copy; 2026 Temple UA</p></footer>
    <script src="script.js"></script>
    
</body>
</html>