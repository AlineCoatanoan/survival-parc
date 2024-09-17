import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { ctrlWrapper as cw } from "../utils/ctrlWrapper.js";

export const router = Router();

router.post("/register", cw(authController.register));
router.post("/login", cw(authController.login));
router.post("/logout", cw(authController.logout));
