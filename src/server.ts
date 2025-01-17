import app from './app';
import connectDB from './config/database';
import { connectRedis } from './config/redis';
import schedulePriceUpdates from './scheduler/priceScheduler';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        try {
            await connectDB();
            console.log('Connected to database');            
        } catch (error) {
            console.log('Error connecting to database:', error);
            process.exit(1); 
        }
        try {
            await connectRedis();
            console.log('Connected to redis');
        } catch (error) {
            console.log('Error connecting to redis:', error);
            process.exit(1);                
        }

        try {
            schedulePriceUpdates();
            console.log('Price update scheduler started');
        } catch (error) {
            console.error('Error starting price update scheduler:', error);
        }
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();

