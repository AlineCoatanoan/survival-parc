// src/routes/profileRouter.js
import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

// Routes pour les profils
router.post("/", cw(profileController.createProfile));
router.get("/", cw(profileController.getProfiles));
router.get("/:id", cw(profileController.getProfileById));
router.put("/:id", cw(profileController.updateProfile));
router.delete("/:id", cw(profileController.deleteProfile));
