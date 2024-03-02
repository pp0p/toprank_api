import { Router, Response, Request } from "express";
import devicesController from "../Controller/devices.controller";
import sectionController from "../Controller/section.controller";
import projectController from "../Controller/project.controller";
import systemController from "../Controller/system.controller";
import serviceController from "../Controller/service.controller";
import clientsController from "../Controller/clients.controller";
import AdImageController from "../Controller/AdImage.controller";
import visitorController from "../Controller/visitor.controller";
const router = Router();

router.use("/device", devicesController);
router.use("/visitors", visitorController);
router.use("/section", sectionController);
router.use("/system", systemController);
router.use("/clients", clientsController);
router.use("/project", projectController);
router.use("/service", serviceController);
router.use("/AdImage", AdImageController);

export default router;
