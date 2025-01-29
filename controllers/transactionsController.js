import errorHandler from "../middlewares/errorHandlers.js";
import Transactions from "../models/transactions.js";
import User from "../models/transactions.js";
import transactionRoutes from "../routes/transactionRoutes.js";

// Income logic
export const addIncome = async (res, req) => {
  const { amount, remarks } = req.body;

  // Validations
  if (!amount) throw new Error("Amount is Required");
  if (!remarks) throw new Error("Remarks are Required");
  if (remarks.length < 5)
    throw new Error("Remark must be more than  characters long!");

  if (validator.isNumeric(amount.toString()))
    throw new Error("Amount must be a valid Number");

  if (amount < 0) throw "Amount cannot be negative";

  await Transactions.create({
    user_id: req.user_id,
    amount: amount,
    remarks: remarks,
    transaction_type: "income",
  });

  await User.updateOne(
    {
      _id: req.user_id,
    },
    {
      $inc: { balance: amount },
    },
    {
      runValidators: true,
    }
  );

  const newTransaction = new Transactions({
    user_id,
    amount,
    transaction_type,
    remarks,
  });

  try {
    await newTransaction.save();
    res.status(201).json({
      status: "success",
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to create transaction",
      error,
    });
  }
};

// Expense logic
export const addExpense = async (res, req) => {
  const { amount, remarks } = req.body;

  // Validations
  if (!amount) throw new Error("Amount is Required");
  if (!remarks) throw new Error("Remarks are Required");
  if (remarks.length < 5)
    throw new Error("Remark must be more than  characters long!");

  if (validator.isNumeric(amount.toString()))
    throw new Error("Amount must be a valid Number");

  if (amount < 0) throw "Amount cannot be negative";

  await Transactions.create({
    user_id: req.user_id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });

  await User.updateOne(
    {
      _id: req.user_id,
    },
    {
      $inc: { balance: amount * -1 },
    },
    {
      runValidators: true,
    }
  );

  const newTransaction = new Transactions({
    user_id,
    amount,
    transaction_type,
    remarks,
  });

  try {
    await newTransaction.save();
    res.status(201).json({
      status: "success",
      message: "Expense created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to create transaction",
      error,
    });
  }
};

// Get Transactions
export const getTransactions = async (req, res) => {
  const transactions = await Transactions.find({
    user_id: req.user_id,
    ...req.query,
  });
  res.status(200).json({ status: "Success", data: transactions });
};
