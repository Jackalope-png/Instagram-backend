const express = require("express");
const postModel = require("../models/postModels");
const authMiddleware = require('../authMiddlewares');

const likeRouter = express.Router();

likeRouter.post("/posts/like", authMiddleware, async (req, res) => {
  const { postId } = req.body;
  const { username, profileImage, id } = req.userData; // userData will now be available from the authMiddleware

  if (!postId || !id) {
    return res.status(400).json({ message: 'Post ID and User ID are required' });
  }

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked this post
    if (post.likes.includes(id)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    // Add the userId to the likes array
    post.likes.push(id);
    await post.save();

    res.status(200).json({
      message: 'Post liked successfully',
      post: {
        id: post._id,
        content: post.content,
        likes: post.likes.length,
      },
      user: {
        username: username,
        profileImage: profileImage,
        _id: id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

likeRouter.post("/posts/unlike", authMiddleware, async (req, res) => {
  const { postId } = req.body;
  const { username, profileImage, id } = req.userData; // userData will now be available from the authMiddleware

  if (!postId || !id) {
    return res.status(400).json({ message: 'Post ID and User ID are required' });
  }

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has liked this post
    if (!post.likes.includes(id)) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }

    // Remove the userId from the likes array
    post.likes.pull(id);
    await post.save();

    res.status(200).json({
      message: 'Post unliked successfully',
      post: {
        id: post._id,
        content: post.content,
        likes: post.likes.length,
      },
      user: {
        username: username,
        profileImage: profileImage,
        _id: id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = likeRouter;
