import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwtManager from "../utils/jwtManager.js"; // Import the JWT manager

// Register a user
export const createUser = async (req, res) => {
  const { name, email, password, confirm_password, balance } = req.body;

  // Validations
  if (!name) throw "Please provide a name";
  if (!email) throw "Please provide an email address";
  if (!password) throw "Please provide a password";
  if (password.length < 5) throw "Password must be more than 5 characters";
  if (password !== confirm_password) throw "Passwords do not match";
  if (!balance) throw "Please provide a balance";

  const getDuplicateEmail = await User.findOne({ email });

  if (getDuplicateEmail) throw "Email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    balance,
    password: hashedPassword,
    email,
  });

  // Generate JWT token for the new user
  const token = jwtManager(newUser);

  res.status(201).json({
    status: "User registered successfully!",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  });
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validations
  if (!email) throw "Please provide a valid email";
  if (!password) throw "Please provide a password";

  const userExist = await User.findOne({ email });

  if (!userExist) throw "User does not exist";

  const isMatch = await bcrypt.compare(password, userExist.password);

  if (!isMatch) throw "Invalid Credentials";

  // Generate JWT token for the logged-in user
  const token = jwtManager(userExist);

  res.status(200).json({
    status: "success",
    message: "Login Successful",
    token,
  });
};

// Dashboard logic
export const userDashboard = async (req, res) => {
  const getUser = await User.findOne({ _id: req.user._id }).select("-password");

  res.status(200).json({ status: "success", getUser });
};
