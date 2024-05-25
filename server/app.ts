import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
require("dotenv").config();
import cookieParser from "cookie-parser";

const app = express();

// Middleware for parsing JSON with a specified limit
app.use(express.json({ limit: "58mb" }));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Define the route for /test
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  // Send a JSON response with status code 200
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Middleware to handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
