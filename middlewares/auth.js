import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// configurations
dotenv.config();

const authHandler = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object for downstream use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors (e.g., invalid token, expired token)
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authHandler;
