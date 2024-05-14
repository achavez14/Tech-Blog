const router = require('express').Router();
const BlogPost = require('../../models/BlogPost');

const blogPostController = {
    createPost: async (req, res) => {
        const { title, content, author } = req.body;

        try {
            const newPost = await BlogPost.create({ title, content, author });
            return res.status(201).json({ message: 'Blog post created successfully', post: newPost });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    updatePost: async (req, res) => {
        const { title, content } = req.body;
        const blogPostId = req.params.blogPostId;

        try {
            const existingPost = await BlogPost.findByPk(blogPostId);

            if (!existingPost) {
                return res.status(404).json({ message: 'Blog post not found' });
            }

            existingPost.title = title;
            existingPost.content = content;
            await existingPost.save();

            return res.status(200).json({ message: 'Blog post updated successfully', post: existingPost });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    deletePost: async (req, res) => {
        const blogPostId = req.params.blogPostId;

        try {
            const existingPost = await BlogPost.findByPk(blogPostId);

            if (!existingPost) {
                return res.status(404).json({ message: 'Blog post not found' });
            }

            await existingPost.destroy();

            return res.status(200).json({ message: 'Blog post deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

router.post('/', blogPostController.createPost);
router.put('/:blogPostId', blogPostController.updatePost);
router.delete('/:blogPostId', blogPostController.deletePost);

module.exports = router;