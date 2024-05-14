const router = require('express').Router();
const BlogPost = require('../../models/BlogPost');

const blogPostController = {
    createPost: async (req, res) => {
        const { title, content, author } = req.body;
        try {
            // Create a new blog post
            const newPost = await BlogPost.create({ title, content, author });
            return res.status(201).json({ message: 'Blog post created successfully', post: newPost });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    updatePost: async (req, res) => {
        // Logic to update an existing blog post
    },

    deletePost: async (req, res) => {
        // Logic to delete a blog post
    }
};

router.post('/', blogPostController.createPost);
router.put('/:blogPostId', blogPostController.updatePost);
router.delete('/:blogPostId', blogPostController.deletePost);

module.exports = router;