const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { signUpInput, signInInput } = require("../../utils/formValidation");
const { generateToken } = require("../../utils/tokenGenerate");

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { userInput: { userName, email, password, confirmPassword } }
    ) {
      const { errors, isValid } = signUpInput(
        userName,
        email,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const existingUser = await User.findOne({ userName });

      if (existingUser) {
        throw new UserInputError("This username is taken", {
          errors: {
            userName: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    // sign in logic is gonna happen

    async userLogin(_, { userName, password }) {
      const { errors, isValid } = signInInput(userName, password);

      if (!isValid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const existingUser = await User.findOne({ userName });

      if (!existingUser) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const passwordCompare = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordCompare) {
        errors.general = "Wrong Password";
        throw new UserInputError("Wrong Password", { errors });
      }

      const token = generateToken(existingUser);

      return {
        ...existingUser._doc,
        id: existingUser._id,
        token,
      };
    },
  },
};
