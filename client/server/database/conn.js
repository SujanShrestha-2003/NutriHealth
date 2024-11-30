import mongoose from 'mongoose';
import config from '../config.js'; // Import your config file

async function connect() {
    try {
        mongoose.set('strictQuery', true); // Enable strict query for better compatibility

        const db = await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected');
        return db; // Return the connection instance if needed
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error; // Throw error to handle it in the calling code
    }
}

export default connect;
