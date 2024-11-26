import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";
import { validateRegister } from "../middlewares/validate.js";

export const router = Router();

// Route pour la création d'un utilisateur
router.post("/register", validateRegister, cw(userController.createUser));
router.get("/", cw(userController.getAllUsers));
router.get("/:id", cw(userController.getUserById));
router.put("/:id", cw(userController.updateUser));
router.delete("/:id", cw(userController.deleteUser));
