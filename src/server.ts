import app from './app';
import connectDB from './config/database';
import { connectRedis } from './config/redis';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
