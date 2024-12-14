const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

// Add a comment to a post
router.post('/:postId/comments', commentController.createComment);

// Get all comments for a specific post
router.get('/:postId', commentController.getCommentsByPost);

// Delete a specific comment
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
