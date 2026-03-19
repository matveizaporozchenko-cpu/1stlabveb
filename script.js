document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ЛОГІКА МОДАЛЬНОГО ВІКНА ТА ЗАМОВЛЕННЯ
       ========================================== */
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const orderForm = document.getElementById('order-form');
    
    // Елементи всередині модалки для підміни тексту
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const orderMessage = document.getElementById('order-message');

    let currentProduct = {}; // Тут будемо зберігати товар, який купують

    // Відкриття модалки при кліку на "Купити"
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            // Знаходимо батьківський блок .product-details, щоб витягнути назву і ціну
            const productCard = this.closest('.product-details');
            currentProduct.name = productCard.querySelector('h3').textContent;
            currentProduct.price = productCard.querySelector('.price').textContent;

            // Підставляємо дані у модальне вікно
            modalProductName.textContent = currentProduct.name;
            modalProductPrice.textContent = `До сплати: ${currentProduct.price}`;
            
            // Показуємо модалку (змінюємо display з none на flex)
            if(modal) modal.style.display = 'flex';
        });
    });

    // Закриття модалки на хрестик
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            orderMessage.textContent = ''; // Очищаємо повідомлення
        });
    }

    // Закриття модалки при кліку поза її межами (на темний фон)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            orderMessage.textContent = '';
        }
    });

    // Відправка замовлення на сервер (Асинхронний запит)
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Зупиняємо стандартну відправку форми

            const customerName = document.getElementById('order-name').value;
            const customerPhone = document.getElementById('order-phone').value;
            const submitBtn = document.getElementById('confirm-order-btn');

            // Формуємо об'єкт (JSON) з даними замовлення
            const orderData = {
                product: currentProduct.name,
                price: currentProduct.price,
                customer: customerName,
                phone: customerPhone
            };

            // Міняємо текст кнопки під час завантаження
            submitBtn.textContent = 'Відправляємо...';
            submitBtn.disabled = true;

            // Використовуємо fetch API для відправки запиту на тестовий сервер
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json()) // Отримуємо проміс
            .then(data => {
                // Сервер відповів успішно
                console.log('Відповідь сервера:', data); // Можеш глянути це в консолі розробника (F12)
                orderMessage.textContent = '✅ Замовлення успішно оформлено! Ми вам зателефонуємо.';
                orderMessage.style.color = 'green';
                orderForm.reset();
                submitBtn.textContent = 'Підтвердити замовлення';
                submitBtn.disabled = false;
                
                // Автоматично закриваємо вікно через 3 секунди
                setTimeout(() => {
                    modal.style.display = 'none';
                    orderMessage.textContent = '';
                }, 3000);
            })
            .catch(error => {
                // Якщо сталась помилка мережі
                console.error('Помилка:', error);
                orderMessage.textContent = '❌ Помилка відправки. Спробуйте пізніше.';
                orderMessage.style.color = 'red';
                submitBtn.textContent = 'Підтвердити замовлення';
                submitBtn.disabled = false;
            });
        });
    }

    /* ==========================================
       2. ВАЛІДАЦІЯ ФОРМИ КОНТАКТІВ (залишається як була)
       ========================================== */
    const contactForm = document.getElementById('cbd-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const name = document.getElementById('user-name').value;
            formMessage.textContent = `Дякуємо, ${name}! Ваше повідомлення відправлено.`;
            formMessage.style.color = 'green';
            contactForm.reset();
        });
    }
});