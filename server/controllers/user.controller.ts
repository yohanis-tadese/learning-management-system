import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CatchAsyncError from "./../middleware/catchAsync";

// Interface for activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

// Interface for registration body
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// Register user
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as IRegistrationBody;

      // Check if the email already exists
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      // Create a new user
      const newUser = new userModel({ name, email, password });
      await newUser.save();

      // Create activation token
      const activationData = createActivationToken(newUser);

      // Return success response with activation data
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: newUser,
          activationToken: activationData.token,
          activationCode: activationData.activationCode,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Function to create an activation token
export const createActivationToken = (user: IUser): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};
