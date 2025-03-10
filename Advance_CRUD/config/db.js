import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Db connected successfully.");
    }
    catch (error) {
        console.log(error);
        console.log("Failed to connect Db.");
    }
}