import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CatchAsyncError from "../middleware/catchAsync";
import sendMail from "../utils/sendMail";

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
}

// Register user
export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(email);

    try {
      const data = {
        user: { name: user.name },
        activationCode: activationToken.activationCode,
      };

      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email}`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      console.error("Error sending activation email:", error);
      return next(new ErrorHandler("Error sending activation email", 500));
    }
  }
);

// Function to create an activation token
export const createActivationToken = (email: string): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      email,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};
