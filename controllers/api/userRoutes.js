const router = require('express').Router();
const { User } = require('../../models');

const userController = {
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        console.log('Logging in user:', email);

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

        console.log('Signing up user:', username, email);

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
        console.log('Logging out user');

        try {
            // Clear the user's session by removing the userId
            req.session.userId = null;

            return res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);
router.get('/logout', userController.logoutUser);

module.exports = router