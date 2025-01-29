import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwtManager from "../utils/jwtManager.js"; // Import the JWT manager
import Transactions from "../models/transactions.js";

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

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b30fcddb84e218",
      pass: "cffcee68e1b401",
    },
  });

  transport.sendMail({
    to: newUser.email,
    from: "noreply@mailtrap.io",
    subject: "Welcome to My Budget App!",
    text: `Welcome ${newUser.name}! Your account has been created successfully`,
    html: `<h1>Welcome ${newUser.name}! Your account has been created successfully.`,
  });

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
  const transactions = await Transactions.find({
    user_id: req.user._id,
  })
    .sort("-createdAt")
    .limit(5);
  res.status(200).json({ status: "success", getUser, transactions });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  // Logic to send a password reset link to the user's email
  const { email } = req.body;

  if (!email) throw new Error("Please provide an email");

  const getUser = await User.findOne({ email });

  if (!getUser) throw new Error("User does not exist");

  const resetCode = Math.floor(100000 + Math.random() * 900000);

  await User.updateOne(
    {
      email,
    },
    { reset_code: resetCode },
    {
      runValidators: true,
    }
  );

  await emailHandler(getUser.email);
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, new_password, reset_code } = req.body;

  // validations
  if (!email) throw new Error("Please provide an email");
  if (!new_password) throw new Error("Please provide a new password");
  if (!reset_code) throw new Error("Please provide a reset code");

  const userExist = await User.findOne({ email });

  if (!userExist) throw new Error("User does not exist");

  if (reset_code !== userExist.reset_code)
    throw new Error("Invalid reset code");

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await User.updateOne(
    {
      email,
    },
    {
      password: hashedPassword,
      reset_code: null,
    },
    {
      runValidators: true,
    }
  );

  await emailHandler(userExist.email);
  // Generate JWT token for the logged-in user
  const token = jwtManager(userExist);

  res.status(200).json({
    status: "Password Reset Successfully",
  });
};
