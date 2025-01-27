import User from "../models/users.js"; // import the user model
import bcrypt from "bcrypt"; // for user authentication and validation

// register a user
export const createUser = async (req, res) => {
  const { name, email, password, confirm_password, balance } = req.body;

  // Validations
  if (!name) throw "Please provided a name";
  if (!email) throw "Please provided an email address";
  if (!password) throw "Please provided a password";
  if (password.length < 5) throw "Password must be more than 5 characters";
  if (password !== confirm_password) throw "Passwords do not match";
  if (!balance) throw "Please provide a balance";

  const getDuplicateEmail = await User.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "Email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    name: name,
    balance: balance,
    password: hashedPassword,
    email: email,
  });

  res.status(201).json({
    status: "User registered successfully!",
  });
};

// login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validations
  const userExist = await User.findOne({ email: email });

  if (!userExist) throw "User does not exist";
  if (!email) throw "Please provide a valid email";
  if (!password) throw "Please provide a password";

  const isMatch = await bcrypt.compare(password, userExist.password);

  // invalid credentials
  if (!isMatch) throw "Invalid Credentials";

  // generate JWT token
  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .json({ status: "success", message: "Login Successful", token: token });
};

// dashboard logic
export const userDashboard = async (req, res) => {
  // const {};

  res.status(200).json({ status: "success", message: "Hello from dashboard!" });
};
