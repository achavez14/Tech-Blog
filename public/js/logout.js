const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });

        if (response.ok) {
            // Handle successful logout, e.g., redirect to homepage
            window.location.href = '/';
        } else {
            const errorData = await response.json();
            // Handle logout error, display message to user
            console.error('Logout failed:', errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});