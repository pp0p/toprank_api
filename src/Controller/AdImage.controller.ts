import { Router, Request, Response, NextFunction } from "express";

import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);

import AdImage from "../Model/AdImage.model";
const router = Router();
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ads = await AdImage.find({});
    if (ads.length === 0) {
      return res.status(404).send({ message: "no ads to show" });
    }
    return res.send(ads);
  } catch (error: any) {
    next(error.message);
  }
});
router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imagePath: string = `https://api.toprankiq.com/public/${req.file?.filename}`;
      const { type } = req.body;
      
      const newAd = new AdImage({
        path: imagePath,
        type:type,
      });
      await newAd.save();
      res.status(201).send({
        message: "تمت الاضافة بنجاح",
      });
    } catch (error: any) {
      next(error.message);
    }
  }
);
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const removedItem = await AdImage.findByIdAndRemove(id);

      if (!removedItem) {
        return res.sendStatus(404);
      }
      const splitPath = removedItem.path.split("/");

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
