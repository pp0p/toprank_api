import { Router, Request, Response, NextFunction } from "express";
import sectionModel from "../Model/section.model";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);
const router = Router();
router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const id = req.params.id;
    const section = await sectionModel.findById(id);

    if (!section) {
      return res.status(404).send({ message: "العنصر غير موجود" });
    }

    return res.send(section);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// created section
router.post(
  "/",
  upload.single("image"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description } = req.body;
      const imagePath: string = `https://api.toprankiq.com/public/${req.file?.filename}`;
      const newScetion = new sectionModel({
        title,
        description,
        imageCover: imagePath,
      });
      await newScetion.save();
      return res.status(201).send({ message: "تم انشاء منشور جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get sections
router.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const sections = await sectionModel.find({});
      if (sections.length === 0) {
        return res.status(404).send({ message: "no section to show" });
      }
      return res.send(sections);
    } catch (error: any) {
      next(error.message);
    }
  }
);

// update section
router.put(
  "/:id",
  upload.single("image"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description } = req.body;
      const id = req.params.id;

      // Find the device by ID
      const section = await sectionModel.findById(id);

      if (!section) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      // Prepare the image path
      const imagePath: string | undefined = req.file ? `https://api.toprankiq.com/public/${req.file.filename}` : undefined;

      // Update device
      const updatedSection = await sectionModel.findByIdAndUpdate(
        id,
        {
          title,
          description,

          imageCover: imagePath || section.imageCover, // Use new image if provided, otherwise retain the old image
        },
        { new: true } // Return the updated document
      );

      if (!updatedSection) {
        return res.status(500).send({ message: "فشل في تحديث العنصر" });
      }

      return res.status(200).send({ message: "تم تحديث العنصر بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// remove section
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const removedItem = await sectionModel.findByIdAndRemove(id);

      if (!removedItem) {
        return res.sendStatus(404);
      }
      const splitPath = removedItem.imageCover.split("/");

      const imagePath = path.join(
        __dirname,
        "../public",
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
