import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized: Missing Authorization header" });
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, config.jwtSecert, (err: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyToken;

