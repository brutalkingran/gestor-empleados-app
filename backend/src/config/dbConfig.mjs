import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        await mongoose.connect(import.meta.env.DATABASE_ACCESS);
    } catch ( error ) {
        process.exit(1);
    }
}