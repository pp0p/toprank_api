import { Router, Request, Response, NextFunction } from "express";
import systemModel from "../Model/system.model";
import ISystems from "../types/system";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);

const router = Router();
router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const id = req.params.id;

    try {
      const system = await systemModel.findById(id);

      if (!system) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      return res.send(system);
    } catch (error: any) {
      next(error.message);
    }
  }
);
// created system
router.post(
  "/",
  upload.single("image"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description, price, type, betaLink } = req.body;
      const imagePath: string = `https://api.toprankiq.com/public/${req.file?.filename}`;

      const newScetion = new systemModel({
        name: title,
        price,
        description,
        image: imagePath,
        type,
        betaLink,
      });
      await newScetion.save();
      return res.status(201).send({ message: "تم انشاء نظام جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get systems
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const systems = await systemModel.find({});
  if (systems.length === 0) {
    return res.status(404).send({ message: "no system to show" });
  }
  return res.send(systems);
});

// update system
router.put(
  "/:id",
  upload.single("image"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description, price } = req.body;
      const id = req.params.id;

      // Find the device by ID
      const system = await systemModel.findById(id);

      if (!system) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      // Prepare the image path
      const imagePath: string | undefined = req.file
        ? `https://api.toprankiq.com/public/${req.file.filename}`
        : undefined;

      // Update device
      const updatedSystem = await systemModel.findByIdAndUpdate(
        id,
        {
          name: title,
          description,
          price,
          image: imagePath || system.image, // Use new image if provided, otherwise retain the old image
        },
        { new: true } // Return the updated document
      );

      if (!updatedSystem) {
        return res.status(500).send({ message: "فشل في تحديث العنصر" });
      }

      return res.status(200).send({ message: "تم تحديث العنصر بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// remove system

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const removedItem = await systemModel.findByIdAndRemove(id);

      if (!removedItem) {
        return res.sendStatus(404);
      }
      const splitPath = removedItem.image.split("/");

      const imagePath = path.join(
        __dirname,
        "../../public",
        splitPath[splitPath.length - 1]
      );

      try {
        await unlinkAsync(imagePath);
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error deleting image file" });
      }

      return res.status(200).send({ message: "تم الحذف بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
export default router;
