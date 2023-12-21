import { Router } from "express";
import authController from "../Controller/auth.controller";
import authStatus from "../Controller/authStatus.controller";
const router = Router();

router.use("/auth-status", authStatus);
router.use("/", authController);
export default router;
