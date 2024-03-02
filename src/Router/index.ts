import { Router } from "express";
import auth from "./auth";
import info from "./info";
import verifyToken from "../middleware/verifyToken";
import incrementedVistor from "../Controller/incrementedVistor"
import getAllInfo from "../Controller/getAllinfo.controller";
import message from "./message";
const router = Router();

router.use("/auth", auth);
router.use("/incrementedVistor",incrementedVistor);
router.use("/message", message);
router.use("/getAllInfo", getAllInfo);
router.use("/info", verifyToken, info);

export default router;
