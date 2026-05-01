const { createApp } = Vue;

createApp({
    data() {
        return {
            searchQuery: '',
            promoInput: '',
            discount: 0,
            isModalOpen: false,
            isSubmitting: false,
            orderStatus: null,
            orderData: { name: '', phone: '' },
            products: [
                { id: 1, name: 'CBD Олія 10%', price: 1200, category: 'OIL', description: 'Преміальна олія повного спектру.' },
                { id: 2, name: 'CBD Желейки', price: 850, category: 'GUMMIES', description: 'Смак малини та глибокий спокій.' },
                { id: 3, name: 'CBD Бальзам', price: 980, category: 'BALM', description: 'Відновлення м’язів та суглобів.' },
                { id: 4, name: 'CBD Vape Pen', price: 700, category: 'VAPE', description: 'Миттєвий ефект релаксації.' }
            ],
            cart: JSON.parse(localStorage.getItem('temple_cart')) || []
        }
    },
    computed: {
        filteredProducts() {
            return this.products.filter(p => 
                p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        rawTotal() {
            return this.cart.reduce((t, i) => t + (i.price * i.quantity), 0);
        },
        totalSum() {
            return Math.round(this.rawTotal * (1 - this.discount));
        }
    },
    methods: {
        addToCart(product) {
            const item = this.cart.find(i => i.id === product.id);
            if (item) item.quantity++;
            else this.cart.push({ ...product, quantity: 1 });
            this.saveCart();
        },
        updateQuantity(item, amount) {
            item.quantity += amount;
            if (item.quantity <= 0) this.removeFromCart(item);
            this.saveCart();
        },
        removeFromCart(item) {
            this.cart = this.cart.filter(i => i.id !== item.id);
            this.saveCart();
        },
        applyPromo() {
            if(this.promoInput.toUpperCase() === 'TEMPLE10') {
                this.discount = 0.10;
                alert("Промокод застосовано! Знижка 10%");
            } else {
                alert("Невірний код");
            }
        },
        openCheckout() {
            this.isModalOpen = true;
            this.orderStatus = null;
        },
        submitOrder() {
            this.isSubmitting = true;
            
            // Імітація AJAX запиту
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    cart: this.cart,
                    total: this.totalSum,
                    customer: this.orderData
                }),
                headers: { 'Content-type': 'application/json' }
            })
            .then(() => {
                this.orderStatus = { text: '✅ Замовлення прийнято! Дякуємо.', color: 'green' };
                setTimeout(() => {
                    this.cart = [];
                    this.saveCart();
                    this.isModalOpen = false;
                    this.isSubmitting = false;
                    this.orderData = { name: '', phone: '' };
                }, 2500);
            })
            .catch(() => {
                this.orderStatus = { text: '❌ Помилка мережі.', color: 'red' };
                this.isSubmitting = false;
            });
        },
        saveCart() {
            localStorage.setItem('temple_cart', JSON.stringify(this.cart));
        }
    }
}).mount('#app');