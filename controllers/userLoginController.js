const User = require('../models/userModels');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username, email:existingUser.email},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                id: existingUser._id, 
                username: existingUser.username, 
                email: existingUser.email 
            } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};