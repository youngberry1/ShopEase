// Shop page functionality
document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const productsContainer = document.getElementById('products-container');

    // Sample products data
    const products = [
        { id: 1, name: "Premium Headphones", price: 89.99, category: "Electronics" },
        { id: 2, name: "Smart Watch", price: 129.99, category: "Electronics" },
        { id: 3, name: "Wireless Charger", price: 24.99, category: "Electronics" },
        { id: 4, name: "Bluetooth Speaker", price: 59.99, category: "Electronics" },
        { id: 5, name: "Portable SSD", price: 119.99, category: "Computers" },
        { id: 6, name: "Fitness Tracker", price: 49.99, category: "Fitness" },
        { id: 7, name: "Phone Case", price: 19.99, category: "Accessories" },
        { id: 8, name: "Laptop Stand", price: 34.99, category: "Office" }
    ];

    // Sort products
    function sortProducts(productsArray, sortBy) {
        switch (sortBy) {
            case 'name-asc':
                return productsArray.sort((a, b) => a.name.localeCompare(b.name));
            case 'price-asc':
                return productsArray.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return productsArray.sort((a, b) => b.price - a.price);
            default:
                return productsArray;
        }
    }

    // Filter products by search term
    function filterProducts(productsArray, searchTerm) {
        if (!searchTerm) return productsArray;
        return productsArray.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Render products
    function renderProducts(productsArray) {
        if (!productsContainer) return;

        productsContainer.innerHTML = '';

        productsArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="https://picsum.photos/300/300?random=${product.id + 100}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>High-quality ${product.category.toLowerCase()} product</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // Re-attach event listeners to new buttons
        attachAddToCartListeners();
    }

    // Attach add to cart event listeners
    function attachAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(button.getAttribute('data-id'));
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));

                if (window.shoppingCart) {
                    window.shoppingCart.addToCart(id, name, price);
                }
            });
        });
    }

    // Initial render
    renderProducts(products);

    // Sort event listener
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortedProducts = sortProducts([...products], e.target.value);
            const searchTerm = searchInput ? searchInput.value : '';
            const filteredProducts = filterProducts(sortedProducts, searchTerm);
            renderProducts(filteredProducts);
        });
    }

    // Search event listener
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            const sortBy = sortSelect ? sortSelect.value : 'name-asc';
            const sortedProducts = sortProducts([...products], sortBy);
            const filteredProducts = filterProducts(sortedProducts, searchTerm);
            renderProducts(filteredProducts);
        });

        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});