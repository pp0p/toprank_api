import { NextFunction, Request, Response, Router } from "express";
import { rateLimiterMiddleware } from "../middleware/rateLimiter";
import messageModel from "../Model/message.model";
const router = Router();

router.post(
  "/",
  rateLimiterMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, name, message } = req.body;
      
      if (!title || !name || !message) {
        res.status(400).send({ message: "Please add all fields" });
      }
      const Message = new messageModel({ title, name, message });
      await Message.save();
      res
        .status(201)
        .send({ message: "The message has been sent successfully" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await messageModel.findByIdAndRemove(id);
    if (!message) {
      console.log(message);

      return res.sendStatus(404);
    } else {
      return res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await messageModel.find({});
    if (messages.length === 0) {
      return res.status(404).send({ message: "There are no messages" });
    }
    res.status(200).send( messages );
  } catch (error: any) {
    next(error.message);
  }
});
export default router;
