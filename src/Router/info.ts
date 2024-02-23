import { Router, Response, Request } from "express";
import devicesController from "../Controller/devices.controller";
import sectionController from "../Controller/section.controller";
import projectController from "../Controller/project.controller";
import systemController from "../Controller/system.controller";
import serviceController from "../Controller/service.controller";
import clientsController from "../Controller/clients.controller";
import headerAdController from "../Controller/headerAd.controller";

const router = Router();

router.use("/device", devicesController);
router.use("/section", sectionController);
router.use("/system", systemController);
router.use("/clients", clientsController);
router.use("/project", projectController);
router.use("/service", serviceController);
router.use("/headerAd", headerAdController);

export default router;
