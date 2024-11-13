import express from "express";
import { connectDb } from "./config/dbConenction.js";
import cors from "cors"
// *********** All-Routes *************
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";
// *********** All-Routes *************

import cookieParser from "cookie-parser";
const app = express();
// Use cors middleware
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's URL in production
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Ensure OPTIONS is allowed
  credentials: true, // Enable this if you use cookies or tokens
  allowedHeaders: "Content-Type, Authorization", // Allow necessary headers
};

app.use(cors(corsOptions));

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

app.get("/", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// for wrong apis
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

app.listen(7000, async () => {
  console.log("Server is running on port 7000");
  await connectDb();
});
