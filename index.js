import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./handlers/errorHandlers.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// end of routes
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
