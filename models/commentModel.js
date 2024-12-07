const { Schema, mongoose } = require('mongoose');

const commentSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
