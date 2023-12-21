import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
const router = Router();
router.post(
  "/login",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(422).send({ message: "Please add all fields" });
      }

      if (username !== config.username) {
        return res
          .status(400)
          .send({ message: "invalid Username or Password ! " });
      }

      const isMatch = await bcrypt.compare(password, config.password);

      if (!isMatch)
        return res
          .status(400)
          .send({ message: "invalid Username or Password ! " });
      const token = jwt.sign({ username: config.username }, config.jwtSecert, {
        expiresIn: "2d",
      });
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 2, // 3 Day Age,
          domain: "localhost",
          sameSite: "lax",
        })
        .send({
          message: "done login",
          token,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.post("/logout", (req: Request, res: Response) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 1,
        domain: "localhost",
        sameSite: "lax",
      })
      .send({
        message: "done logout",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
