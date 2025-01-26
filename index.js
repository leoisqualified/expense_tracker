import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to add two numbers
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
