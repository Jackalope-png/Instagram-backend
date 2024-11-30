const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');

// Create a new post
router.post('/', postController.createPost);

// Get all posts with likes populated
router.get('/', postController.getAllPosts);

// Get posts by user with likes populated
router.get('/user/:userId', postController.getPostsByUser);

// Delete a post
router.delete('/:postId', postController.deletePost);

module.exports = router;