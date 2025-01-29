import jwt from "jsonwebtoken";

const jwtManager = (user) => {
  // Generate a token
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      balance: user.balance,
    },
    process.env.JWT_SECRET
  );

  return accessToken;
};

export default jwtManager;
