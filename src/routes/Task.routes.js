import express from "express";
const router = express.Router();
import controller from "../controllers/Task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// router.use(authMiddleware);
router
  .route("/")
  .get(controller.findAll)
  .post(authMiddleware, controller.create);

router
  .route("/:id")
  .get(controller.findOne)
  .put(authMiddleware, controller.updateOne)
  .put(authMiddleware, controller.updateOne)
  .delete(authMiddleware, controller.deleteOne);

export default router;
