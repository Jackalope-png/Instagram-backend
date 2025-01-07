const express = require("express");
const postModel = require("../models/postModels");
const User = require("../models/userModel");

const likeRouter = express.Router();

likeRouter.post("/posts/like", async (req, res) => {
  const { postId, userId } = req.body;
  if (!postId || !userId) {
    return res.status(400).json({ message: 'Post ID and User ID are required' });
  }
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      message: 'Post liked successfully',
      post: {
        id: post._id,
        content: post.content,
        likes: post.likes.length,
      },
      user: {
        username: user.username,
        profileImage: user.profileImage,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

likeRouter.post("/posts/unlike", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have not liked this post' });
    }

    post.likes.pull(userId);
    await post.save();

    res.status(200).json({
      message: 'Post unliked successfully',
      post: {
        id: post._id,
        content: post.content,
        likes: post.likes.length,
      },
      user: {
        // username: user.username,
        // profileImage: user.profileImage,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = likeRouter;
