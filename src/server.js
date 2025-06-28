import express from 'express';
import router from './routes/playground.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/', router);

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
}); 