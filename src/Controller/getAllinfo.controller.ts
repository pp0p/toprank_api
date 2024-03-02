import { Router, Request, Response, NextFunction } from "express";
import projectModel from "../Model/project.model";
import sectionModel from "../Model/section.model";
import devicesModel from "../Model/devices.model";
import systemModel from "../Model/system.model";
import AdImageModel from "../Model/AdImage.model";
import clientModel from "../Model/client.model";
import serviceModel from "../Model/service.model";
import betaDownloadLinkModel from "../Model/betaDownloadLink.model";
import VisitorModel from "../Model/vistor.mode";

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
        ImageAds,
        services,
        visitors,
      ] = await Promise.all([
        devicesModel.find({}, { __v: 0 }),
        systemModel.find({}, { __v: 0 }),
        sectionModel.find({}, { _id: 0, __v: 0 }),
        projectModel.find({}, { _id: 0, __v: 0 }),
        clientModel.find({}, { _id: 0, __v: 0 }),
        AdImageModel.find({}, { _id: 0, __v: 0 }),
        serviceModel.find({}, { _id: 0, __v: 0 }),
        VisitorModel.find({}, { _id: 0, __v: 0 }),
      ]);

      // Group AdImageModel by type
      const adImagesByType = ImageAds.reduce((acc: Record<string, any[]>, image: any) => {
        const type = image.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(image);
        return acc;
      }, {});

      return res.status(200).send({
        devices,
        systems,
        sections,
        projects,
        clients: clients[0],
        ImageAds: adImagesByType,
        services,
        visitors,
        // donwloadLink: downloadLink[0].link,
      });
    } catch (error: any) {
      next(error.message);
    }
  }
);

export default router;
