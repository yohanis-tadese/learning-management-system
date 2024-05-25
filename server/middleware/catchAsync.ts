import { NextFunction, Request, Response } from "express";

const CatchAsyncError = (
  theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export default CatchAsyncError;
