const Comment = require('../models/commentModel');
const Post = require('../models/postModels');
const User = require('../models/userModels');

// Create a comment on a post
exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  const { userId } = req.body; // User ID should come from authenticated user (typically via token)

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      postId,
      userId,
      content,
    });

    await newComment.save();

    // Add the comment to the post's comments array (optional, if you want to track comments directly in Post model)
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({
      message: 'Comment created successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  load all comments from a post
exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId })
      .populate('userId', 'username profileImage') // Populate user details
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body; // Assuming userId comes from the request body or auth middleware

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // check if its your own comment that you trying to delete
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    // Delete the comment from the database
    await comment.remove();

    // Optionally, remove the comment from the post's comments array (if you're tracking comments inside the Post model)
    const post = await Post.findById(comment.postId);
    post.comments.pull(commentId);
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
