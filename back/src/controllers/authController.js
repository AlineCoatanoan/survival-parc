import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { badRequestResponse } from "../middlewares/errors.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { generateToken } from "../../utils/jwt.js";
import { setCookies, clearCookies } from "../../utils/cookieUtils.js"; // Chemin à adapter

import bcrypt from "bcrypt"; // Assure-toi d'avoir installé bcrypt

const { User } = models;

// login
export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Vérifie si l'email et le mot de passe sont fournis
  if (!email || !password) {
    return badRequestResponse(res, "Email and password are required");
  }

  // Recherche l'utilisateur par email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return error404(res, "User not found");
  }

  // Vérifie le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return badRequestResponse(res, "Wrong password");
  }

  // Génère un token JWT pour l'utilisateur
  const token = generateToken(user); // Passer l'utilisateur complet

  // Sauvegarde le token dans la base de données pour l'utilisateur
  user.token = token;
  await user.save();

  // Définir le cookie avec le token
  setCookies(res, token);

  // Envoie une réponse avec succès
  successResponse(res, "Login successful", { user, token });
});

// logout
export const logout = ctrlWrapper(async (req, res) => {
  const { id } = req.body;

  // Recherche l'utilisateur par son ID
  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  // Supprime le token de l'utilisateur pour déconnecter
  user.token = null;
  await user.save();

  // Effacer le cookie
  clearCookies(res);

  successResponse(res, "Logout successful");
});
