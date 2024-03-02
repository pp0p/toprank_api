import { Router, Request, Response, NextFunction } from "express";
import clientModel from "../Model/client.model";
import projectModel from "../Model/project.model";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await clientModel.find({ name: "clients" });

    res.status(201).send({
      // clients:clientsNumber.
      clients: clients[0],
    });
  } catch (error: any) {
    next(error.message);
  }
});
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { number, isEnabled } = req.body;
    const clients = await clientModel.find({ name: "clients" });
    clients[0].number = number;
    clients[0].isEnabled = isEnabled;
    await clients[0].save();
    res.status(201).send({
      message: "تم التحديث بنجاح",
    });
  } catch (error: any) {
    next(error.message);
  }
});
export default router;
