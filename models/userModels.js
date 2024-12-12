const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, ref: "author"},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage:{ type: String, 
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC29mdR0ZLibl0JNBx29bEqJ3oWLZHTLRhzA&s', 
        ref: "pfp"},
    bio:{type:String},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Posts"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;