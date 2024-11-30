const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage:{type:String},
    bio:{type:String},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Posts"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;