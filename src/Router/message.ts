import { Router } from "express";
import messageController from "../Controller/message.controller";
const router = Router();

router.use("/", messageController);

export default router;
