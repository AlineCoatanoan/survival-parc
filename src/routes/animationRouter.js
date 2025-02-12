import { Router } from "express";
import * as animationController from "../controllers/animationController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.get("/", cw(animationController.getAllAnimations));
router.get("/search", cw(animationController.searchAnimation));
router.get("/:type", cw(animationController.getAnimationsByType));
router.get("/:id", cw(animationController.getAnimationId));
router.post("/", cw(animationController.createAnimation));
router.put("/:id", cw(animationController.updateAnimation));
router.delete("/:id", cw(animationController.deleteAnimation));
