// IMPORT PACKAGES
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

// IMPORT MODELS
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // CHECK IF TOKEN EXISTS
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        error: "UNAUTHORIZED - TOKEN NOT FOUND",
      });
    }

    // VERIFY TOKEN
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        error: "UNAUTHORIZED - INVALID TOKEN",
      });
    }

    // FIND USER
    const user = await User.findById(decode.userId).select("-password");
    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        error: "UNAUTHORIZED - USER NOT FOUND",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(`ERROR IN PROTECT ROUTE: ${err.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "INTERNAL SERVER ERROR",
    });
  }
};

export default protectRoute;
