import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from environment variables
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    // Attempt to connect to the database
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
