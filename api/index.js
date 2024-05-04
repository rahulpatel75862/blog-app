import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB connected Successfully');
})
.catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/user', userRoutes);