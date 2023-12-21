import { Router, Request, Response, NextFunction } from "express";
import projectModel from "../Model/project.model";
import upload from "../config/multer";
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
      const { title, description } = req.body;

      const imagePath =
        req.protocol +
        "://" +
        req.get("host") +
        `/public/${req.file?.filename}`;
      const newScetion = new projectModel({
        title,
        description,
        imageCover: imagePath,
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
    return res.send(projects );
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// update project
router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;
    const id = req.params.id;
    const project: any = projectModel.find({ _id: id });
    // image path
    const imagePath =
      req.protocol +
      "://" +
      req.get("host") +
      `/public/${req.file ? req.file?.filename : project.imageCover}`;
    //
    const updateProject = await projectModel.findByIdAndUpdate(id, {
      title,
      description,
      imageCover: req.file ? imagePath : project.imageCover || " ",
    });
    if (!updateProject) {
      return res.status(404).send({ message: "project not found" });
    }
    return res.status(200).send({ message: "تم التحديث بنجاح" });
  }
);

// remove project
router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const project = await projectModel.findByIdAndRemove(id);
    if (!project) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
