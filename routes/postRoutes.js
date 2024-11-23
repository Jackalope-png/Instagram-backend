const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');

// Create a new post
router.post('/', postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get posts by user
router.get('/user/:userId', postController.getPostsByUser);

// Delete a post
router.delete('/:postId', postController.deletePost);

module.exports = router;
