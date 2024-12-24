const postController = require('../controllers/postControllers');
const authMiddleware = require('../authMiddlewares');
const express = require('express');
const router = express.Router();


// Create a new post
router.post('/posts', postController.createPost);

// Get all posts with likes populated
router.get('/posts', authMiddleware, postController.getAllPosts);

// Get posts by user with likes populated
router.get('/user/:userId', postController.getPostsByUser);

// Delete a post
router.delete('/:postId', postController.deletePost);

module.exports = router;