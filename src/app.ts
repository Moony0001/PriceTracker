import express from 'express';
import dotenv from 'dotenv';
import alertRoutes from './routes/alertRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/alerts', alertRoutes);

export default app;