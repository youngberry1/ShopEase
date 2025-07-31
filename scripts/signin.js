// Signin page functionality
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Validate form
            if (!validateSigninForm(email, password)) {
                return;
            }

            // Check if user exists (in a real app, this would be verified with a server)
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                alert('No account found. Please sign up first.');
                return;
            }

            if (userData.email !== email) {
                alert('No account found with this email address.');
                return;
            }

            // In a real app, you would verify the password properly (hashed)
            // For this demo, we'll just check if it matches
            if (userData.password !== password) {
                alert('Incorrect password. Please try again.');
                return;
            }

            // Save user session (in a real app, this would be a secure token)
            const sessionData = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                signInTime: new Date().toISOString(),
                rememberMe: rememberMe
            };

            if (rememberMe) {
                localStorage.setItem('userSession', JSON.stringify(sessionData));
            } else {
                sessionStorage.setItem('userSession', JSON.stringify(sessionData));
            }

            // Show success message
            alert(`Welcome back, ${userData.firstName}!`);

            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google sign in would open in a real application.');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            alert('Facebook sign in would open in a real application.');
        });
    }

    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt('Please enter your email address:');
            if (email) {
                alert(`Password reset instructions have been sent to ${email}`);
            }
        });
    }
});

function validateSigninForm(email, password) {
    // Check if all required fields are filled
    if (!email || !password) {
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

    return true;
}