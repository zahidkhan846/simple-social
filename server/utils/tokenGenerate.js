const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      userName: user.userName,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};
