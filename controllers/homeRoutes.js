const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

// GET route for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch existing blog posts
        const blogPosts = await BlogPost.findAll();
        res.render('homepage', { blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add routes for other functionalities as needed

module.exports = router;