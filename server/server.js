import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongoose');
}).catch((err) => {
    console.log(err);
});

app.use("/server/user", userRoutes);
app.use("/server/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode,
    });
})
app.listen(5000,() => {
    console.log('Server listening on port 5000');
});