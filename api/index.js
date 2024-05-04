import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB connected Successfully');
})
.catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        sucess: false,
        statusCode,
        message
     });
})