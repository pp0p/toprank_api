import { Router, Request, Response, NextFunction } from "express";
import MobileAppModel from "../Model/mobileApp.model";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
import { config } from "../config/config";
const unlinkAsync = util.promisify(fs.unlink);

const router = Router();

// Get a mobile app by ID
router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const id = req.params.id;

    try {
      const mobileApp = await MobileAppModel.findById(id);

      if (!mobileApp) {
        return res.status(404).send({ message: "Mobile app not found" });
      }

      return res.send(mobileApp);
    } catch (error: any) {
      next(error.message);
    }
  }
);

// Create a new mobile app
router.post(
  "/",
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "mobileImage1", maxCount: 1 },
    { name: "mobileImage2", maxCount: 1 },
    { name: "mobileImage3", maxCount: 1 },
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const basePath =
        req.hostname === "localhost"
          ? `http://localhost:${config.port}/public/`
          : "https://api.toprankiq.com/public/";

      const imageCoverPath = files?.["imageCover"]
        ? `${basePath}${files["imageCover"][0].filename}`
        : "";

      const mobileImages = [];
      for (let i = 1; i <= 3; i++) {
        const fieldName = `mobileImage${i}`;
        if (files[fieldName]) {
          mobileImages.push(`${basePath}${files[fieldName][0].filename}`);
        }
      }

      const newMobileApp = new MobileAppModel({
        name: title,
        description,
        imageCover: imageCoverPath,
        images: mobileImages,
      });

      await newMobileApp.save();
      return res
        .status(201)
        .send({ message: "Mobile app created successfully" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

// Get all mobile apps
router.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const mobileApps = await MobileAppModel.find({});
      if (mobileApps.length === 0) {
        return res.status(404).send({ message: "No mobile apps to show" });
      }
      return res.send(mobileApps);
    } catch (error: any) {
      next(error.message);
    }
  }
);

// Update a mobile app by ID
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage1", maxCount: 1 },
    { name: "mobileImage2", maxCount: 1 },
    { name: "mobileImage3", maxCount: 1 },
  ]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title, description } = req.body;
      const id = req.params.id;

      const mobileApp = await MobileAppModel.findById(id);

      if (!mobileApp) {
        return res.status(404).send({ message: "Mobile app not found" });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      const basePath =
        req.hostname === "localhost"
          ? `http://localhost:${config.port}/public/`
          : "https://api.toprankiq.com/public/";

      const imageCoverPath = files?.["image"]
        ? `${basePath}${files["image"][0].filename}`
        : "";

       const mobileImages = [];
      for (let i = 1; i <= 3; i++) {
        const fieldName = `mobileImage${i}`;
        if (files[fieldName]) {
          mobileImages.push(`${basePath}${files[fieldName][0].filename}`);
        }
      }

      const updatedMobileApp = await MobileAppModel.findByIdAndUpdate(
        id,
        {
          name:title,
          description,
          imageCover: imageCoverPath || mobileApp.imageCover,
          images: mobileImages,
        },
        { new: true }
      );

      if (!updatedMobileApp) {
        return res.status(500).send({ message: "Failed to update mobile app" });
      }

      return res
        .status(200)
        .send({ message: "Mobile app updated successfully" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

// Delete a mobile app by ID
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const removedItem = await MobileAppModel.findByIdAndRemove(id);

      if (!removedItem) {
        return res.sendStatus(404);
      }

      const removedImageCover = removedItem.imageCover;
      const removedImages = removedItem.images;

      try {
        const splitCoverPath = removedImageCover.split("/");
        const imageCoverFilePath = path.join(
          __dirname,
          "../../public",
          splitCoverPath[splitCoverPath.length - 1]
        );
        await unlinkAsync(imageCoverFilePath);

        for (const imagePath of removedImages) {
          const splitPath = imagePath.split("/");
          const imageFilePath = path.join(
            __dirname,
            "../../public",
            splitPath[splitPath.length - 1]
          );
          await unlinkAsync(imageFilePath);
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error deleting image files" });
      }

      return res
        .status(200)
        .send({ message: "Mobile app deleted successfully" });
    } catch (error: any) {
      next(error.message);
    }
  }
);

export default router;
