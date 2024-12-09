import { successResponse } from "../middlewares/success.js";
import { error404 } from "../middlewares/error404.js";
import { badRequestResponse } from "../middlewares/errors.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { models } from "../models/index.js";
import { generateToken } from "../../utils/jwt.js";
import { setCookies, clearCookies } from "../../utils/cookieUtils.js";
import bcrypt from "bcrypt";

const { User } = models;

// login
export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Recherche l'utilisateur par mail
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return error404(res, "User not found");
  }

  // Vérifie le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return badRequestResponse(res, "Erreur mot de passe");
  }

  // Vérification du rôle de l'utilisateur
  if (user.role === "admin") {
    console.log("Admin logged in: ", user.id);
  } else {
    console.log("User logged in: ", user.id);
  }

  // Génère un token pour l'utilisateur
  const token = generateToken(user);

  // Sauvegarde le token dans la bdd pour le user
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

  // Recherche le user par son ID
  const user = await User.findByPk(id);
  if (!user) return error404(res, "User not found");

  // Supprime le token du user pour déconnecter
  user.token = null;
  await user.save();

  // Effacer le cookie
  clearCookies(res);

  successResponse(res, "Logout successful");
});
