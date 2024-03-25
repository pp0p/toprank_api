import { Request, Response, Router } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ isAuthenticated: false, message: "Unauthorized: Missing Authorization header" });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, config.jwtSecert, (err: any) => {
    if (err) {
      return res.status(401).send({ isAuthenticated: false, message: "Unauthorized: Invalid token" });
    } else {
      res.status(200).send({ isAuthenticated: true });
    }
  });
});

export default router;

