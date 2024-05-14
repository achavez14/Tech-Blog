const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

// GET route for the dashboard
router.get('/dashboard', async (req, res) => {
    try {
        // Fetch user's blog posts
        const userPosts = await BlogPost.findAll({ where: { author: req.user.id } });
        res.render('dashboard', { userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route for updating a blog post
router.put('/dashboard/:blogPostId', async (req, res) => {
    try {
        const { title, content } = req.body;
        const blogPostId = req.params.blogPostId;

        // Find the existing blog post by ID
        const existingPost = await BlogPost.findByPk(blogPostId);

        if (!existingPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Update the post with new data
        existingPost.title = title;
        existingPost.content = content;
        await existingPost.save();

        return res.status(200).json({ message: 'Blog post updated successfully', post: existingPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route for deleting a blog post
router.delete('/dashboard/:blogPostId', async (req, res) => {
    try {
        const blogPostId = req.params.blogPostId;

        // Find the existing blog post by ID
        const existingPost = await BlogPost.findByPk(blogPostId);

        if (!existingPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Delete the post
        await existingPost.destroy();

        return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;