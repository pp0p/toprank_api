import { Router, Request, Response, NextFunction } from "express";
import serviceModel from "../Model/service.model";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);
const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const id = req.params.id;
    const service = await serviceModel.findById(id);

    if (!service) {
      return res.status(404).send({ message: "العنصر غير موجود" });
    }

    return res.send(service);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// created service
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

      const newScetion = new serviceModel({
        title,
        description,
        imageCover: imagePath,
      });
      await newScetion.save();
      return res.status(201).send({ message: "تم انشاء خدمة جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get services
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const services = await serviceModel.find({});
  if (services.length === 0) {
    return res.status(404).send({ message: "no service to show" });
  }
  return res.send(services);
});

// update service
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
      const service = await serviceModel.findById(id);

      if (!service) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      // Prepare the image path
      const imagePath: string | undefined = req.file ? `https://api.toprankiq.com/public/${req.file.filename}` : undefined;


      // Update device
      const updatedService = await serviceModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          imageCover: imagePath || service.imageCover, // Use new image if provided, otherwise retain the old image
        },
        { new: true } // Return the updated document
      );

      if (!updatedService) {
        return res.status(500).send({ message: "فشل في تحديث العنصر" });
      }

      return res.status(200).send({ message: "تم تحديث العنصر بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

// remove service
router.delete("/:id", async (req: Request, res: Response , next:NextFunction) => {
  const id = req.params.id;

  try {
    const removedItem = await serviceModel.findByIdAndRemove(id);

    if (!removedItem) {
      return res.sendStatus(404);
    }
    const splitPath = removedItem.imageCover.split("/");

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
});
export default router;
