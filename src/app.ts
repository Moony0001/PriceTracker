import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;