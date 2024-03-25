import { Router, Request, Response, NextFunction } from "express";
import projectModel from "../Model/project.model";
import upload from "../config/multer";
import util from "util";
import path from "path";
import fs from "fs";
const unlinkAsync = util.promisify(fs.unlink);
const router = Router();

// created project
router.post(
  "/",
  upload.single("image"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const { title } = req.body;

      const imagePath: string = `https://api.toprankiq.com/public/${req.file?.filename}`;

      const newScetion = new projectModel({
        link:title,
        logo: imagePath,
      });
      await newScetion.save();
      return res.status(201).send({ message: "تم انشاء مشروع جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get projects
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await projectModel.find({});
    if (projects.length === 0) {
      return res.status(404).send({ message: "no project to show" });
    }
    return res.send(projects);
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id;
    const project = await projectModel.findById(id);

    if (!project) {
      return res.status(404).send({ message: "العنصر غير موجود" });
    }

    return res.send(project);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title } = req.body;
      const id = req.params.id;

      // Find the device by ID
      const project = await projectModel.findById(id);

      if (!project) {
        return res.status(404).send({ message: "العنصر غير موجود" });
      }

      // Prepare the image path
      const imagePath: string | undefined = req.file ? `https://api.toprankiq.com/public/${req.file.filename}` : undefined;


      // Update device
      
      const updateProject = await projectModel.findByIdAndUpdate(
        id,
        {
          link:title,
          logo: imagePath || project.logo, // Use new image if provided, otherwise retain the old image
        },
        { new: true } // Return the updated document
      );


      if (!updateProject) {
        return res.status(500).send({ message: "فشل في تحديث العنصر" });
      }

      return res.status(200).send({ message: "تم تحديث العنصر بنجاح" });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
);
// remove project
router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const removedItem = await projectModel.findByIdAndRemove(id);

    if (!removedItem) {
      return res.sendStatus(404);
    }
    const splitPath = removedItem.logo.split("/");

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
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
