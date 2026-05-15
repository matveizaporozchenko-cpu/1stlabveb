<?php
namespace TempleUA\Api;

class ProductsRepository {
    public function all(): array {
        return [
            ['id' => 1, 'name' => 'CBD Олія 10%', 'price' => 1200, 'category' => 'OIL', 'description' => 'Преміальна олія повного спектру для щоденного балансу.'],
            ['id' => 2, 'name' => 'CBD Желейки', 'price' => 850, 'category' => 'GUMMIES', 'description' => 'Смак стиглої малини та глибокий, приємний спокій.'],
            ['id' => 3, 'name' => 'CBD Бальзам', 'price' => 980, 'category' => 'BALM', 'description' => 'Швидке відновлення м’язів та суглобів після тренувань.'],
            ['id' => 4, 'name' => 'CBD Vape Pen', 'price' => 700, 'category' => 'VAPE', 'description' => 'Миттєвий ефект релаксації у зручному форматі.'],
            ['id' => 5, 'name' => 'CBD Капсули', 'price' => 1100, 'category' => 'CAPSULES', 'description' => 'Точне дозування та тривалий ефект протягом усього дня.'],
            ['id' => 6, 'name' => 'CBD Чай Релакс', 'price' => 450, 'category' => 'TEA', 'description' => 'Органічний трав’яний збір із коноплями для міцного сну.'],
            ['id' => 7, 'name' => 'Pet CBD Олія', 'price' => 950, 'category' => 'PETS', 'description' => 'Спеціальна м’яка формула для зняття тривожності у тварин.'],
            ['id' => 8, 'name' => 'CBD Крем для обличчя', 'price' => 1350, 'category' => 'COSMETICS', 'description' => 'Зволоження та зняття запалень. Ідеально для проблемної шкіри.']
        ];
    }
}