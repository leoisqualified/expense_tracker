import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a fullname"] },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, // Don't return password in response
  },

  balance: {
    type: String,
    default: 0,
    required: [true, "Please provide a balance"],
  },
  reset_code: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
