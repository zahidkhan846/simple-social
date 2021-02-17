const validator = require("validator");

module.exports.signUpInput = (userName, email, password, confirmPassword) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email must be a valid email address";
  }

  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 5 })
  ) {
    errors.password =
      "Password should include atleast 5 charcter and must not be empty";
  }

  if (confirmPassword != password) {
    errors.confirmPassword = "Passowrd does not match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

module.exports.signInInput = (userName, password) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "Username must not be empty";
  }

  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 5 })
  ) {
    errors.password =
      "Password should include atleast 5 charcter and must not be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
