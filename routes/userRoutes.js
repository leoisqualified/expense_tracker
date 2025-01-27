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

// get User dashboard
userRoutes.get("/dashboard", userDashboard);

export default userRoutes;
