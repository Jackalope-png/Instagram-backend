const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send('Token is required for authentication');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        // Attach user data to the request object
        req.userData = {
            id: decoded.id, // User ID
            username: decoded.username, // Username from token
            profileImage: decoded.profileImage, // Profile image from token
        };

        next();
    });
};

module.exports = authMiddleware;
