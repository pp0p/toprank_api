import { Router, Request, Response, NextFunction } from "express";
import teamModel from "../Model/team.model";
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
      const { name, description } = req.body;

      const imagePath: string =
        req.protocol +
        "://" +
        req.get("host") +
        `/public/${req.file?.filename}`;
      const newMember = new teamModel({
        name,
        description,
        photoPath: imagePath,
      });
      await newMember.save();
      return res.status(201).send({ message: "تم إضافة عضو جديد بنجاح" });
    } catch (error: any) {
      next(error.message);
    }
  }
);
// get members
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  const team = await teamModel.find({});
  if (team.length === 0) {
    return res.status(404).send({ message: "no member to show" });
  }
  return res.send( team );
});

// update section
router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;
    const id = req.params.id;
    const member: any = teamModel.find({ _id: id });
    // image path
    const imagePath: string =
      req.protocol + "://" + req.get("host") + `/public/${req.file?.filename}`;
    //
    const updateMemeber = await teamModel.findByIdAndUpdate(id, {
      title,
      description,
      photoPath: req.file ? imagePath : member.imageCover || " ",
    });
    if (!updateMemeber) {
      return res.status(404).send({ message: "memeber not found" });
    }
    return res.status(200).send({ message: "تم التحديث بنجاح" });
  }
);

// remove section
router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const team = await teamModel.findByIdAndRemove(id);
    if (!team) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
