import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectedToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    }
    catch (error) {
        console.log("Failed to connect DB", error);
        process.exit(1);
    }
}