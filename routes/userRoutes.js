import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  userDashboard,
  resetPassword,
} from "../controllers/userController.js";
import authHandler from "../middlewares/auth.js";

const userRoutes = express.Router();

// Register a new user
userRoutes.post("/register", createUser);

// Login a user
userRoutes.post("/login", loginUser);

// Forgot password
userRoutes.post("/forgotpassword", forgotPassword);
userRoutes.post("/resetpassword", resetPassword);

// PROTECTED ROUTES...
userRoutes.use(authHandler); // auth middleware

// get User dashboard
userRoutes.get("/dashboard", userDashboard);

export default userRoutes;
