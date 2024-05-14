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

// GET route for viewing an individual blog post
router.get('/post/:blogPostId', async (req, res) => {
    try {
        const blogPostId = req.params.blogPostId;
        // Fetch the specific blog post by ID
        const post = await BlogPost.findByPk(blogPostId);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        // Fetch comments related to this post
        const comments = await Comment.findAll({ where: { postId: blogPostId } });
        res.render('post', { post, comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route for creating a new blog post
router.post('/create', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        // Create a new blog post
        const newPost = await BlogPost.create({ title, content, author });
        return res.status(201).json({ message: 'Blog post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST route for adding a comment to a blog post
router.post('/post/:blogPostId/comment', async (req, res) => {
    try {
        const { text, author } = req.body;
        const blogPostId = req.params.blogPostId;
        // Create a new comment
        const newComment = await Comment.create({ text, author, postId: blogPostId });
        return res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;