import express from "express";
import { login, logout } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/validate.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const router = express.Router();

// Route pour le login (pas besoin d'authenticateToken car on ne vérifie pas encore d'utilisateur)
router.post("/login", validateLogin, login);

// Route pour le logout (nécessite que l'utilisateur soit authentifié)
router.post("/logout", authenticateToken, logout);
