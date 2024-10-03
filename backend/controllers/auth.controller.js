// IMPORT PACKAGES
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

// USER MODEL
import User from "../models/user.model.js";

// IMPORT UTILS
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// SIGNUP ROUTES
export const SignUp = async (req, res) => {
  try {
    // CHECK IF REQUEST BODY IS EMPTY
    if (!req.body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "REQUEST BODY IS EMPTY",
      });
    }

    const { fullName, username, password } = req.body;

    // IF FIELDS ARE EMPTY
    if (!fullName || !username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }

    // CHECK PASSWORD LENGTH
    if (password.length < 6) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "PASSWORD MUST BE AT LEAST 6 CHARACTERS",
      });
    }

    // CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: "USER ALREADY EXISTS",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
    });

    // JWT AND COOKIE CREATION
    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "USER CREATED SUCCESSFULLY",
      data: {
        newUser: { ...newUser.toObject(), password: undefined },
      },
    });
  } catch (err) {
    console.log(`ERROR WHILE CREATING USER: ${err.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// LOGIN ROUTE
export const Login = async (req, res) => {
  try {
    // CHECK IF REQUEST BODY IS EMPTY
    if (!req.body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "REQUEST BODY IS EMPTY",
      });
    }

    const { username, password } = req.body;

    // IF FIELDS ARE EMPTY
    if (!username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }

    const user = await User.findOne({ username });

    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "INCORRECT PASSWORD",
      });
    }

    // JWT AND COOKIE CREATION
    generateTokenAndSetCookie(user?._id, res);

    await user.save();

    return res.status(httpStatus.OK).json({
      success: true,
      message: "LOGGED IN SUCCESSFULLY",
      data: {
        user: { ...user.toObject(), password: undefined },
      },
    });
  } catch (err) {
    console.log(`ERROR WHILE LOGGING IN USER: ${err.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// LOGOUT ROUTE
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(httpStatus.OK).json({
      success: true,
      message: "LOGGED OUT SUCCESSFULLY",
    });
  } catch (err) {
    console.log(`ERROR WHILE LOGGING OUT: ${err.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};
