const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            // Handle successful login, e.g., redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            const errorData = await response.json();
            // Handle login error, display message to user
            console.error('Login failed:', errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});