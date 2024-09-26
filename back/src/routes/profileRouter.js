import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.post("/profile", cw(profileController.createProfile));
router.get("/profile", cw(profileController.getProfile));
router.put("/profile/:id", cw(profileController.updateProfile));
router.delete("/profile/:id", cw(profileController.deleteProfile));
