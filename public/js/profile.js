// Function to handle updating user information
const updateUserInformation = async (userData) => {
    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const updatedUser = await response.json();
            // Handle successful update, e.g., display success message to user
            console.log('User information updated successfully:', updatedUser);
        } else {
            const errorData = await response.json();
            // Handle update error, display error message to user
            console.error('Update failed:', errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Event listener for updating user information form submission
const updateForm = document.getElementById('update-form');

updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const userData = { username, email };

    updateUserInformation(userData);
});
