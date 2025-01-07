require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const UserRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use(cors())
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

app.use(UserRoutes);

app.use('/posts', postRoutes);

app.use(likeRoutes);

app.use('/posts', commentRoutes)

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDb();