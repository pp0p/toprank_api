import { Request, Response, Router } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  const token = req.cookies?.token;
  jwt.verify(token, config.jwtSecert, (err: any) => {
    if (err) {
      return res.status(400).send({ isAuthenticated: false });
    } else {
      res.status(200).send({ isAuthenticated: true });
    }
  });
});

export default router; 
