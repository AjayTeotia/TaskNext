// IMPORT PACKAGES
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// IMPORT DB
import connectToDB from "./db/connectToDB.js";

// IMPORT ROUTES
import authUserRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

//
const __dirname = path.resolve();

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

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

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
