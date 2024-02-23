import { Router, Request, Response, NextFunction } from "express";
import projectModel from "../Model/project.model";
import sectionModel from "../Model/section.model";
import devicesModel from "../Model/devices.model";
import systemModel from "../Model/system.model";
import hedaerAdModel from "../Model/hedaerAd.model";
import clientModel from "../Model/client.model";
import serviceModel from "../Model/service.model";
import betaDownloadLinkModel from "../Model/betaDownloadLink.model";
const router = Router();
router.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const [
        devices,
        systems,
        sections,
        projects,
        clients,
        headerAds,
        services,
      ] = await Promise.all([
        devicesModel.find({}, { _id: 0, __v: 0 }),
        systemModel.find({}, { _id: 0, __v: 0 }),
        sectionModel.find({}, { _id: 0, __v: 0 }),
        projectModel.find({}, { _id: 0, __v: 0 }),
        clientModel.find({}, { _id: 0, __v: 0 }),
        hedaerAdModel.find({}, { _id: 0, __v: 0 }),
        serviceModel.find({}, { _id: 0, __v: 0 }),
      ]);
      
      return res.status(200).send({
        devices,
        systems,
        sections,
        projects,
        clients: clients[0].number,
        headerAds,
        services,
        // donwloadLink: downloadLink[0].link,
      });
    } catch (error: any) {
      next(error.message);
    }
  }
);

export default router;
