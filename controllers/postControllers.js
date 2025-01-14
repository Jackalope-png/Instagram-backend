const Post = require('../models/postModels');
const User = require('../models/userModels');

// Create a new post
exports.createPost = async (req, res) => {
    const { content, author } = req.body;

    try {
        const newPost = new Post({
            content,
            author,
        });

        await newPost.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profileImage')
            .populate('likes', 'username profileImage')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPostsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const posts = await Post.find({ author: userId })
            
            .populate('author', 'username profileImage')
            .populate('likes', 'username profileImage')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};