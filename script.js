document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("temple_theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");

      // Зберігаємо вибір користувача
      localStorage.setItem("temple_theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }
});

const { createApp } = Vue;

// Запускаємо Vue тільки там, де є <main id="app">
if (document.getElementById("app")) {
  createApp({
    data() {
      // Безпечно дістаємо кошик із LocalStorage
      let savedCart = [];
      try {
        const localData = localStorage.getItem("temple_cart");
        if (localData) {
          savedCart = JSON.parse(localData);
          if (!Array.isArray(savedCart)) savedCart = [];
        }
      } catch (e) {
        console.error("Помилка читання кошика:", e);
        savedCart = [];
      }

      return {
        searchQuery: "",
        promoInput: "",
        discount: 0,
        isModalOpen: false,
        isSubmitting: false,
        orderStatus: null,
        orderData: { name: "", phone: "" },
        products: [], // Сюди прилетять товари з PHP API
        cart: savedCart,
      };
    },
    mounted() {
      // Отримуємо товари з нашого PHP-бекенду
      fetch("api/products.php")
        .then((response) => {
          if (!response.ok)
            throw new Error("Помилка завантаження товарів з API");
          return response.json();
        })
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error("Помилка бекенду:", error);
        });
    },
    computed: {
      filteredProducts() {
        // Живий пошук по каталогу
        return this.products.filter((p) =>
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
        );
      },
      rawTotal() {
        return this.cart.reduce((t, i) => t + i.price * i.quantity, 0);
      },
      totalSum() {
        return Math.round(this.rawTotal * (1 - this.discount));
      },
    },
    methods: {
      addToCart(product) {
        const item = this.cart.find((i) => i.id === product.id);
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
        this.cart = this.cart.filter((i) => i.id !== item.id);
        this.saveCart();
      },
      applyPromo() {
        if (this.promoInput.toUpperCase() === "TEMPLE10") {
          this.discount = 0.1;
          alert("Промокод застосовано! Знижка 10%");
        } else {
          alert("Невірний код. Спробуйте TEMPLE10");
        }
      },
      openCheckout() {
        this.isModalOpen = true;
        this.orderStatus = null;
      },
      submitOrder() {
        this.isSubmitting = true;
        // Імітуємо відправку на сервер (можна замінити на реальний fetch)
        setTimeout(() => {
          this.orderStatus = {
            text: "✅ Замовлення успішно прийнято!",
            color: "green",
          };
          this.cart = [];
          this.saveCart();

          // Закриваємо модалку через 2 секунди
          setTimeout(() => {
            this.isModalOpen = false;
            this.isSubmitting = false;
            this.orderData = { name: "", phone: "" };
          }, 2000);
        }, 1000);
      },
      saveCart() {
        localStorage.setItem("temple_cart", JSON.stringify(this.cart));
      },
    },
  }).mount("#app");
}
