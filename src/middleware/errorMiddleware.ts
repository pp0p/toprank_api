import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error.ValidationError) {
    // If the error is a Mongoose validation error
    const errorMessage = err.message; // Extract the error message
    res.status(400).json({
      error: "Validation Failed",
      message: errorMessage, // Send only the error message
    });
  } else {
    // If it's a different type of error, you can handle it accordingly
    // For example, you can use a default error response format
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

export default errorMiddleware;
