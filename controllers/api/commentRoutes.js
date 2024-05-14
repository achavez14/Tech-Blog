const router = require('express').Router();
const Comment = require('../../models/Comment');

const commentController = {
    addComment: async (req, res) => {
        const { content, author, postId } = req.body;
        try {
            // Add new comment to blog post
            const newComment = await Comment.create({ content, author, postId });
            return res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },

    deleteComment: async (req, res) => {
        const { commentId } = req.params;
        try {
            // Find the comment by ID and delete it
            const deletedComment = await Comment.findByIdAndDelete(commentId);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

router.post('/', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;