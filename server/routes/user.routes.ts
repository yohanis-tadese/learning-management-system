import express from "express";
import { registrationUser } from "../controllers/user.controller";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registrationUser);

export default userRouter;
