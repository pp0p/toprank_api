import { Router, Request, Response, NextFunction } from "express";
import systemModel from "../Model/system.model";
import ISystems from "../types/system";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);
import { config } from "../config/config";
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "exeFile", maxCount: 1 },
  ]), // Use upload.fields to handle multiple files
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description, price, type, betaLink } = req.body;

      // Determine the host based on the request

      const host = req.get("host");
      const basePath =
        req.hostname === "localhost"
          ? `http://localhost:${config.port}/public/`
          : "https://api.toprankiq.com/public/";

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Construct image and exe file paths using the determined host
      const imagePath: string = `${basePath}${files["image"][0]?.filename}`;
      const exeFilePath: string = `${basePath}${files["exeFile"][0]?.filename}`;

      const newScetion = new systemModel({
        name: title,
        price,
        description,
        image: imagePath,
        type,
        betaVersion: exeFilePath,
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "exeFile", maxCount: 1 },
  ]), // Use upload.fields to handle multiple files
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

      // Determine the host based on the request
      const host = req.get("host");
      const basePath =
        req.hostname === "localhost"
          ? `http://localhost:${config.port}/public/`
          : "https://api.toprankiq.com/public/";

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Construct image and exe file paths using the determined host
      const imagePath: string = `${basePath}${files["image"][0]?.filename}`;
      const exeFilePath: string = `${basePath}${files["exeFile"][0]?.filename}`;

      // Update device
      const updatedSystem = await systemModel.findByIdAndUpdate(
        id,
        {
          name: title,
          description,
          price,
          image: imagePath || system.image, // Use new image if provided, otherwise retain the old image
          betaVersion: exeFilePath || system.betaVersion, // Use new exe file if provided, otherwise retain the old exe file
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
