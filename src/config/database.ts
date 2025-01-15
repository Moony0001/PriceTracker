import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://siddhantbaiswar15:nCXDCFaMMpgYaj6g@cluster0.l8rft.mongodb.net/price-tracker?retryWrites=true&w=majority&appName=Cluster0';
        
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        await mongoose.connect(mongoURI);

        console.log('MongoDB Connected...');
    } catch (error) {
        console.error("MongoDB Connection Error: ", error);
        process.exit(1);
    }
}

export default connectDB;