// src/routes/profileRouter.js
import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

// Routes pour les profils
router.post("/:userId", cw(profileController.createProfile));
router.get("/", cw(profileController.getProfiles));
router.get("/:userId", cw(profileController.getProfileByUserId));
router.put("/:userId", cw(profileController.updateProfile));
router.delete("/:userId", cw(profileController.deleteProfile));
