import express from "express";
import authHandler from "../middlewares/auth";
import {
  addIncome,
  addExpense,
  getTransactions,
} from "../controllers/transactionController";

// Transaction routes
const transactionRoutes = express.Router();

// PROTECTED ROUTES...
transactionRoutes.use(authHandler);

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);

export default transactionRoutes;
