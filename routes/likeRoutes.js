const express = require("express");
const postModel = require("../models/postModels");

const likeRouter = express.Router();

likeRouter.post("/posts/like", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this post' });
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'skill issue 1' });
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = likeRouter;
