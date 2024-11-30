require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const UserRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

app.use('/api/users', UserRoutes);

app.use('/api/posts', postRoutes);

app.use('/api/likes', likeRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDb();