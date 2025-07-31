// Checkout page functionality
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');

    // Load cart data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update order summary
    function updateOrderSummary() {
        const subtotalElement = document.getElementById('subtotal-amount');
        const taxElement = document.getElementById('tax-amount');
        const totalElement = document.getElementById('total-amount');

        if (!subtotalElement || !taxElement || !totalElement) return;

        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = 5.99;
        const total = subtotal + tax + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Update summary on page load
    updateOrderSummary();

    // Form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(checkoutForm);
            const customerData = {
                name: formData.get('fullname'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip'),
                cardName: formData.get('card-name')
            };

            // In a real application, you would send this data to a server
            // For this demo, we'll just store it in localStorage
            localStorage.setItem('customerData', JSON.stringify(customerData));

            // Clear cart
            localStorage.removeItem('cart');

            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        });
    }

    // Form validation
    if (checkoutForm) {
        const inputs = checkoutForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    }

    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('invalid');
            return false;
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('invalid');
                return false;
            }
        }

        field.classList.remove('invalid');
        return true;
    }
});