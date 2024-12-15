import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** middlewares */
app.use(express.json({ limit: '10mb' }));  // Increase the payload size limit to 10MB (adjust as needed)
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

// CORS configuration to allow requests only from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend (localhost:3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
    credentials: true // Allow cookies to be sent (optional, if your requests involve cookies)
}));

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/** API routes */
app.use('/api', router);

/** Start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection...!");
});
