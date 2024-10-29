import { Router } from "express";
import * as animationController from "../controllers/animationController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.post("/", cw(animationController.createAnimation));
router.get("/", cw(animationController.getAllAnimations));
router.get("/search", cw(animationController.searchAnimation));
router.get("/:id", cw(animationController.getAnimationId));
router.put("/:id", cw(animationController.updateAnimation));
router.delete("/:id", cw(animationController.deleteAnimation));
