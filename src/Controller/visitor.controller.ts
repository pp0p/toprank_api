import { Router, Request, Response, NextFunction } from "express";
import VisitorModel from "../Model/vistor.mode";

const router = Router();

// GET all visitors
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const visitors = await VisitorModel.find({});
    if (visitors.length === 0) {
      return res.status(404).send({ message: "No visitors found" });
    }
    return res.send(visitors);
  } catch (error: any) {
    next(error.message);
  }
});

// PUT request to update isEnabled
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  const { isEnabled } = req.body;

  try {
    const updatedVisitor = await VisitorModel.findOneAndUpdate({}, { isEnabled });

    if (!updatedVisitor) {
      return res.status(404).json({ message: "No visitor found" });
    }

    return res.json({ message: "تم التحديث بنجاح" });
  } catch (error: any) {
    next(error.message);
  }
});


export default router;

