// IMPORT PACKAGES
import express from "express";

// IMPORT CONTROLLERS
import { Login, Logout, SignUp } from "../controllers/auth.controller.js";

// ROUTER
const router = express.Router();

// SIGNUP ROUTE
router.post("/signup", SignUp);

// LOGIN ROUTE
router.post("/login", Login);

// LOGOUT ROUTE
router.post("/logout", Logout);

// EXPORT ROUTER
export default router;
