const User = require('../models/userModels');

// Follow a user
exports.follow = async (req, res) => {
    const { userIdToFollow } = req.body;  // The ID of the user to follow
    const { userId } = req.params; 
    // authenitication later needed
    try {
        const user = await User.findById(userId);
        const userToFollow = await User.findById(userIdToFollow);

        if (!user || !userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already following the user
        if (user.following.includes(userIdToFollow)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Add to following and followers
        user.following.push(userIdToFollow);
        userToFollow.followers.push(userId);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: 'Successfully followed the user' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unfollow a user
exports.unfollow = async (req, res) => {
    const { userIdToUnfollow } = req.body;  // The ID of the user to unfollow
    const { userId } = req.params;           // The ID of the currently logged-in user (This should come from the URL, or be hardcoded for now)

    try {
        const user = await User.findById(userId);
        const userToUnfollow = await User.findById(userIdToUnfollow);

        if (!user || !userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if not following the user
        if (!user.following.includes(userIdToUnfollow)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove from following and followers
        user.following.pull(userIdToUnfollow);
        userToUnfollow.followers.pull(userId);

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'Successfully unfollowed the user' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
