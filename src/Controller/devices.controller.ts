import { Router, Request, Response, NextFunction } from "express";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
import devicesModel from "../Model/devices.model";
const unlinkAsync = util.promisify(fs.unlink);
const router = Router();
// get single item
router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const id = req.params.id;

    try {
      const device = await devicesModel.findById(id);

      if (!device) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      return res.send(device);
    } catch (error: any) {
      next(error.message);
    }
  }
);
// created device
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
      const newDevice = new devicesModel({
        name: title,
        price,
        description,
        image: imagePath,
        type,
        betaLink,
      });
      await newDevice.save();
      return res.status(201).send({ message: "تم إضافة جهاز جديد بنجاح" });
    } catch (error: any) {
      console.log(error);

      next(error.message);
    }
  }
);
// get members
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const team = await devicesModel.find({});
  if (team.length === 0) {
    return res.status(404).send({ message: "no device to show" });
  }
  return res.send(team);
});

// update device

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
      const device = await devicesModel.findById(id);

      if (!device) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      // Prepare the image path
      const imagePath: string | undefined = req.file
        ? `https://api.toprankiq.com/public/${req.file.filename}`
        : undefined;

      // Update device
      const updatedDevice = await devicesModel.findByIdAndUpdate(
        id,
        {
          name: title,
          description,
          price,
          image: imagePath || device.image, // Use new image if provided, otherwise retain the old image
        },
        { new: true } // Return the updated document
      );

      if (!updatedDevice) {
        return res.status(500).send({ message: "فشل في تحديث العنصر" });
      }

      return res.status(200).send({ message: "تم تحديث العنصر بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

// remove device
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const removedItem = await devicesModel.findByIdAndRemove(id);

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
