import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;    
    jwt.verify(token, config.jwtSecert, (err: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
export default verifyToken;
