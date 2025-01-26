import User from "../models/users.js";
import mongoose from "mongoose";

// register a user
export const createUser = async (req, res) => {
  const { name, user, password, balance } = req.body;

  res.status(200).json({
    status: "success",
    message: "Hello from create user!",
  });
};
