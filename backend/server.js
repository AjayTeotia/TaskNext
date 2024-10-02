// IMPORT PACKAGES
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// IMPORT DB
import connectToDB from "./db/connectToDB.js";

// IMPORT ROUTES
import authUserRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

// CONFIG
dotenv.config();

// APP
const app = express();

// MIDDLEWARE
app.use(express.json());

// COOKIES
app.use(cookieParser());

// CORS
app.use(cors());

// PORT
const PORT = process.env.PORT || 5000;

// ROUTES
app.use("/api/user", authUserRoutes);
app.use("/api/note", noteRoutes);

/* TESTING SERVER
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING")
})
*/

// LISTEN TO PORT
app.listen(PORT, () => {
  connectToDB();
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
