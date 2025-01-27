import express from "express";
import {
  createUser,
  loginUser,
  userDashboard,
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Register a new user
userRoutes.post("/register", createUser);

// Login a user
userRoutes.post("/login", loginUser);

// Protected Routes...
app.use(authHandler); // auth middleware

// get User dashboard
userRoutes.get("/dashboard", userDashboard);

export default userRoutes;
