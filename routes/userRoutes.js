import express from "express";
import { createUser } from "../controllers/userController.js";

const userRoutes = express.Router();

// Register a new user
userRoutes.post("/register", createUser);

export default userRoutes;
