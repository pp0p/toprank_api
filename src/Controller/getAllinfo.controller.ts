import { Router, Request, Response } from "express";
import projectModel from "../Model/project.model";
import sectionModel from "../Model/section.model";
import teamModel from "../Model/team.model";
const router = Router();
router.get("/", async (req: Request, res: Response): Promise<Response> => {
  try {

    const [team, sections, projects] = await Promise.all([
      teamModel.find({}, { _id: 0, __v: 0 }),
      sectionModel.find({}, { _id: 0, __v: 0 }),
      projectModel.find({}, { _id: 0, __v: 0 }),
    ]);
    return res.status(200).send({ team, sections, projects });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
