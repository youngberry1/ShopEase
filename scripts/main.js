// Main JavaScript file for common functionality

// Navigation toggle for mobile
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Hero image rotation
    let heroIndex = 1;
    const heroImg = document.getElementById('hero-img');

    function rotateHeroImage() {
        if (heroImg) {
            heroIndex = heroIndex === 5 ? 1 : heroIndex + 1;
            heroImg.src = `https://picsum.photos/1200/600?random=${heroIndex}`;
        }
    }

    if (heroImg) {
        setInterval(rotateHeroImage, 4000);
    }

    // Dynamic year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Thumbnail selection for product page
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('main-img');

    if (thumbs.length > 0 && mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                mainImg.src = this.getAttribute('data-src');
            });
        });
    }

    // Set order date on thank you page
    const orderDateElement = document.getElementById('order-date');
    if (orderDateElement) {
        const now = new Date();
        orderDateElement.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
});