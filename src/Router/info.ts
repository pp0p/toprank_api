import { Router, Response, Request } from "express";
import teamController from "../Controller/team.controller";
import sectionController from "../Controller/section.controller";
import projectController from "../Controller/project.controller";
const router = Router();

router.use("/team", teamController);
router.use("/section", sectionController);
router.use("/project",projectController);
export default router;
