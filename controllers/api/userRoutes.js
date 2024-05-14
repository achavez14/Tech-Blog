const router = require('express').Router();
const User = require('../../models/User');

const userController = {
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Validate password
            if (user.password !== password) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            // Successful login
            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    signupUser: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            // Create a new user
            const newUser = await User.create({ username, email, password });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    logoutUser: async (req, res) => {
        // Logic to handle user logout
        return res.status(200).json({ message: 'User logged out successfully' });
    }
};

router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);
router.get('/logout', userController.logoutUser);

module.exports = router