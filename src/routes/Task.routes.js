import express from "express";
const router = express.Router();
import controller from "../controllers/Task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.use(authMiddleware);
router.route("/").get(controller.findAll).post(controller.create);

router
  .route("/:id")
  .get(controller.findOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
