import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandlers.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// end of routes
app.all("*", () => {
  res.status(404).json({ status: "Failed", message: "Page not Found" });
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
