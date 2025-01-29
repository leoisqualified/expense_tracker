import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    transaction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },

    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Transactions = mongoose.model("Transactions", transactionSchema);

export default Transactions;
