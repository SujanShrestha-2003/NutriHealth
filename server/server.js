import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongoose');
}).catch((err) => {
    console.log(err);
})
app.listen(5000,() => {
    console.log('Server listening on port 5000');
});