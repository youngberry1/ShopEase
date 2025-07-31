// Cart functionality
class ShoppingCart {
    constructor() {
        // Safe initialization
        try {
            const storedCart = JSON.parse(localStorage.getItem('cart'));
            this.cart = Array.isArray(storedCart) ? storedCart : [];
        } catch (e) {
            this.cart = [];
        }

        this.updateCartCount();
        this.renderCart();
        this.initEventListeners();
    }

    addToCart(id, name, price, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: id,
                name: name,
                price: parseFloat(price),
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${name} added to cart!`);
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(id, quantity) {
        const item = this.cart.find(item => item.id === id);
        if (item && quantity > 0) {
            item.quantity = quantity;
        } else if (item) {
            this.removeFromCart(id);
        }

        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        let count = 0;
        if (Array.isArray(this.cart)) {
            count = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        }
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';

        if (this.cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-quantity" />
                <button data-id="${item.id}" class="remove-btn">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    initEventListeners() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        cartContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('cart-quantity')) {
                const id = event.target.getAttribute('data-id');
                const quantity = parseInt(event.target.value);
                this.updateQuantity(id, quantity);
            }
        });

        cartContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const id = event.target.getAttribute('data-id');
                this.removeFromCart(id);
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});
