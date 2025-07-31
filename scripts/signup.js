// Signup page functionality
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;

            // Validate form
            if (!validateSignupForm(firstName, lastName, email, password, confirmPassword, terms)) {
                return;
            }

            // Create user object
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password, // In a real app, this would be hashed
                newsletter: document.getElementById('newsletter').checked,
                signupDate: new Date().toISOString()
            };

            // Save to localStorage (in a real app, this would be sent to a server)
            localStorage.setItem('userData', JSON.stringify(userData));

            // Show success message
            alert('Account created successfully! You can now sign in.');

            // Redirect to home page or sign in page
            window.location.href = 'index.html';
        });
    }

    // Password confirmation validation
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordInput.setCustomValidity("Passwords do not match");
            } else {
                confirmPasswordInput.setCustomValidity("");
            }
        });
    }
});

function validateSignupForm(firstName, lastName, email, password, confirmPassword, terms) {
    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    // Check if terms are agreed
    if (!terms) {
        alert('You must agree to the Terms of Service and Privacy Policy.');
        return false;
    }

    return true;
}