const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

// GET route for the dashboard
router.get('/dashboard', async (req, res) => {
    try {
        // Fetch user's blog posts
        const userPosts = await BlogPost.findAll({ where: { author: req.user.id } }); // Assuming user ID is stored in req.user
        res.render('dashboard', { userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add routes for other functionalities as needed

module.exports = router;