const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { AuthenticationError } = require("apollo-server");

dotenv.config();

module.exports = ({ req }) => {
  // getting HEADER from context.req
  const authHeader = req.headers.authorization;

  // getting token from context.req.headers.authoriation
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication token must be  'Bearer [token]'");
  }
  throw new Error("Authorization header must be provided");
};
