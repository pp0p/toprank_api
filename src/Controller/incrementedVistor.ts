import { Router, Request, Response, NextFunction } from "express";
import VisitorModel from "../Model/vistor.mode";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the existing visitor document
    const existingVisitor = await VisitorModel.findOne({});
    
    // If no visitor document exists, create a new one with count 1
    if (!existingVisitor) {
      const newVisitor = new VisitorModel({ count: 1 });
      await newVisitor.save();
    } else {
      // Increment the existing visitor count by 1
      existingVisitor.count += 1;
      await existingVisitor.save();
    }

    return res.json({ message: "Visitor count incremented successfully" });
  } catch (error: any) {
    next(error.message);
  }
});

export default router;
