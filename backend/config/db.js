import mongoose from "mongoose";

export const connect = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};