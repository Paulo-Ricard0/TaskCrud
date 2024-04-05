import express from "express";
const router = express.Router();
import controller from "../controllers/User.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.route("/register").post(controller.create);
router.route("/login").post(controller.login);
router.route("/uptime").head(controller.uptime);
router.route("/profile").get(authMiddleware, controller.getProfile);

export default router;
