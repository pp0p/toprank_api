import { Router, Request, Response, NextFunction } from "express";
import sectionModel from "../Model/section.model";
import upload from "../config/multer";
const router = Router();

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

      const imagePath =
        req.protocol +
        "://" +
        req.get("host") +
        `/public/${req.file?.filename}`;
      const newScetion = new sectionModel({
        title,
        description,
        imageCover: imagePath,
      });
      await newScetion.save();
      return res.status(201).send({ message: "تم انشاء قسم جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get sections
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const sections = await sectionModel.find({});
  if (sections.length === 0) {
    return res.status(404).send({ message: "no section to show" });
  }
  return res.send(sections );
});

// update section
router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;

    const id = req.params.id;
    const section: any = await sectionModel.find({ _id: id });
    // image path
    const imagePath =
      req.protocol + "://" + req.get("host") + `/public/${req.file?.filename}`;
    //

    const updateSection = await sectionModel.findByIdAndUpdate(id, {
      title,
      description,
      imageCover: req.file ? imagePath : section.imageCover || " ",
    });
    if (!updateSection) {
      return res.status(404).send({ message: "section not found" });
    }
    return res.status(200).send({ message: "تم التحديث بنجاح" });
  }
);

// remove section
router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const section = await sectionModel.findByIdAndRemove(id);
    if (!section) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
