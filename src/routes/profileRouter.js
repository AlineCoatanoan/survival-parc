// src/routes/profileRouter.js
import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

// Routes pour les profils
router.post("/", cw(profileController.createProfile)); // Changer "/profile" en "/"
router.get("/", cw(profileController.getProfiles)); // Changer "/profile" en "/"
router.get("/:id", cw(profileController.getProfileById)); // Changer "/profile/:id" en "/:id"
router.put("/:id", cw(profileController.updateProfile)); // Changer "/profile/:id" en "/:id"
router.delete("/:id", cw(profileController.deleteProfile)); // Changer "/profile/:id" en "/:id"
