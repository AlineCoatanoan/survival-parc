import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

// Routes pour les utilisateurs
router.post("/", cw(userController.createUser)); // Créer un nouvel utilisateur
router.get("/", cw(userController.getAllUsers)); // Récupérer tous les utilisateurs
router.get("/:id", cw(userController.getUserId)); // Récupérer un utilisateur spécifique par ID
router.put("/:id", cw(userController.updateUser)); // Mettre à jour un utilisateur par ID
router.delete("/:id", cw(userController.deleteUser)); // Supprimer un utilisateur par ID
